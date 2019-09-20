var callbackUrl = '&callback=onLoad' //网页初始化地图服务回调函数
var url = 'https://webapi.amap.com/maps?v=1.4.15&key=f9d2a4291a8c1899397625dc9bc8646e' + callbackUrl;
var jsapi = document.createElement('script');
var map
jsapi.charset = 'utf-8';
jsapi.src = url;
document.head.appendChild(jsapi);

//获取当前IP地址
var nowCity;

window.onLoad = function () {
    //初始化地图
    map = new AMap.Map('container', {
        resizeEnable: true
    });
    AMap.plugin('AMap.Geolocation', function () {
        var geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,//是否使用高精度定位，默认:true
            timeout: 10000,          //超过10秒后停止定位，默认：5s
        });
        map.addControl(geolocation);
        geolocation.getCityInfo(function (status, result) {
            if (status == 'complete') {
                nowCity = result.city
            } else {
                console.log('loc-error' + result)
            }
        });
    });
}

//账号
$(document).on('click', '.pass-form-normal .pass-text-input-userName', function () {
    $(this).css('color', '#F69')
    $(this).css('border-color', '#F69')
    $('.pass-form-normal .pass-label-userName').css('background-position', '-366px -116px')

})
$(document).on('blur', '.pass-form-normal .pass-text-input-userName', function () {
    var identifier = $('.pass-form-normal .pass-text-input-userName').val()
    $(this).css('color', '')
    $(this).css('border-color', '')
    $('.pass-form-normal .pass-label-userName').css('background-position', '-366px -97px')
    $.ajax({
        url: "/login",
        type: "post",
        dataType: "json",
        data: {"identifier": identifier},
        async: false,
        success: function (data) {
            ipsearch(data.loginIp)
        },
        error: function (data) {

        }
    })
})


//密码
$(document).on('click', '.pass-form-normal .pass-text-input-password', function () {
    $(this).css('color', '#F69')
    $(this).css('border-color', '#F69')
    $('.pass-form-normal .pass-label-password').css('background-position', '-366px -157px')

})
$(document).on('blur', '.pass-form-normal .pass-text-input-password', function () {
    $(this).css('color', '')
    $(this).css('border-color', '')
    $('.pass-form-normal .pass-label-password').css('background-position', '-366px -135px')
})


//表单提交，多次错误验证码显示，判断输入信息
var num = 0
$(document).on('submit', '.pass-form-normal', function () {
    var flag = false
    var identifier = $('.pass-form-normal .pass-text-input-userName').val()
    var credential = $('.pass-form-normal .pass-text-input-password').val()
    if (identifier == null || identifier == '') {
        console.log("username")
        $('.pass-form-normal .pass-generalErrorWrapper .pass-generalError-error').text('')
        $('.pass-form-normal .pass-generalErrorWrapper .pass-generalError-error').append("请您输入手机/邮箱/用户名")
        flag = false
    } else if (credential == null || credential == '') {
        console.log("password")
        $('.pass-form-normal .pass-generalErrorWrapper .pass-generalError-error').text('')
        $('.pass-form-normal .pass-generalErrorWrapper .pass-generalError-error').append("请您输入密码")
        flag = false
    } else {
        $('.pass-form-normal .pass-generalErrorWrapper .pass-generalError-error a').remove()
        $('.pass-form-normal .pass-generalErrorWrapper .pass-generalError-error').text('')
        var check = document.getElementById("memberPass").checked
        flag = login(identifier, credential, flag, check)
    }
    if (flag == true) {
        updatelogin(identifier)
    }
    return flag;
})

//账号登录判断
function login(identifier, credential, flag, check) {
    $.ajax({
        url: "/login",
        type: "post",
        dataType: "json",
        data: {"identifier": identifier, "credential": credential},
        async: false,
        success: function (data) {
            if (nowCity != beforeCity) {
                alert("异地登录，请使用短信登录")
                $('#j-login').css('display', 'none')
                $('#j-login').css('visibility', 'hidden')
                $('#sms').css('display', 'block')
                $('#sms').css('visibility', 'visible')
                $('.pass-sms-link-back').css('visibility','hidden')
                flag = false
            } else {
                saveCookie(data, check)//保存cookie
                flag = true
            }
        },
        error: function (data) {
            html = '用户名或密码错误，请重新输入或' +
                '<a href="' +
                '#">' +
                '找回密码' +
                '</a>';
            $('.pass-form-normal .pass-generalErrorWrapper').html(html);
            num++;
            if (num >= 3) {
                $('.pass-form-normal .pass-form-item-verifyCode').css('display', 'block')
                $('.pass-form-normal .pass-form-item-verifyCode').css('visibility', 'visible')
                $('.pass-form-normal .pass-form-item-verifyCode .pass-text-input-verifyCode').css('color', '#F69')
                $('.pass-form-normal .pass-form-item-verifyCode .pass-text-input-verifyCode').css('border-color', '#F69')
            }
        }
    })
    return flag
}

//获取短信动态密码
$(document).on('click','.pass-item-timer',function () {
    var identifier = $('.pass-text-input-smsPhone').val()
    if (identifier == null || identifier == '') {
        $('.pass-form-normal .pass-generalErrorWrapper .pass-generalError-error').text('')
        $('.pass-form-normal .pass-generalErrorWrapper .pass-generalError-error').append("请您输入手机号")
    } else {
        $.ajax({
            url: "/shortMessageSend",
            type: "post",
            dataType: "json",
            data: {"identifier": identifier},
            async: false,
            success: function (data) {
                console.log("获取验证码：" + data)
            }
        })
    }
})

//短信登录表单提交
$(document).on('submit', '#smsForm', function () {
    var smsflag = false
    var identifier = $('.pass-text-input-smsPhone').val()
    var smsVerifyCode = $('.pass-text-input-smsVerifyCode').val()
    if (identifier == null || identifier == ""){
        $('.pass-form-normal .pass-generalErrorWrapper .pass-generalError-error').text('')
        $('.pass-form-normal .pass-generalErrorWrapper .pass-generalError-error').append("请您输入手机号")
    }
    if (smsVerifyCode == null || smsVerifyCode == ""){
        $('#verifyCode-span').css('display', 'inline')
        $('#verifyCode-span').css('display', 'none')
        $('#verifyCodeSend-span').css('display', 'none')
    }
    $.ajax({
        url:"smsLogin",
        type:"post",
        dataType:"json",
        data:{"identifier":identifier, "smsVerifyCode":smsVerifyCode},
        async:false,
        success:function (data) {
            if (data == "ture"){
                smsflag = true
            } else if(data = "false"){
                smsflag = false
                $('#verifyCode-span').css('display','none')
                $('#verifyCodeError-span').css('display','none')
                $('#verifyCodeExpiration-span').css('display','inline')
            } else{
                smsflag = false
                $('#verifyCode-span').css('display','none')
                $('#verifyCodeError-span').css('display','inline')
                $('#verifyCodeExpiration-span').css('display','none')
            }
        },
        error:function (data) {
            console.log("出错了")
        }
    })
    return smsflag
})



var beforeCity
//判断是否异地登录
function ipsearch(ip) {
    AMap.plugin('AMap.CitySearch', function () {
        var citysearch = new AMap.CitySearch()
        citysearch.getCityByIp(ip, function (status, result) {
            if (status == 'complete') {
                beforeCity = result.city

            } else {
                console.log(result)

            }
        })
    })
}

//修改登录数据
function updatelogin(identifier) {
    $.ajax({
        url: "/loginIp",
        dataType: "text",
        type: "post",
        data: {"identifier": identifier},
        async: false,
        success: function (data) {
            console.log("跳转成功")
        },
        error: function (data) {
            console.log("跳转失败")
        }
    })
}


//短信验证码登录和账号密码登录切换
$(document).on('click', '#j-login .pass-form-normal .pass-smsSwitchWrapper .pass-sms-btn', function () {
    $('#j-login').css('display', 'none')
    $('#j-login').css('visibility', 'hidden')
    $('#sms').css('display', 'block')
    $('#sms').css('visibility', 'visible')
})
$(document).on('click', '#sms #smsForm #smsSubmitWrapper #sms_btn_back', function () {
    $('#sms').css('display', 'none')
    $('#sms').css('visibility', 'hidden')
    $('#j-login').css('display', 'block')
    $('#j-login').css('visibility', 'visible')
})

//Cookie保存，自动登录
function saveCookie(data, check) {
    var date = new Date()
    date.setTime(date.getTime()+(7*24*60*60*1000));
    document.cookie = "identifier=" + data.identifier
    document.cookie = "credential=" + data.credential
    document.cookie = "check=" + check
    document.cookie = "expires=" + date.toGMTString()
}
function getCookie(user){
    console.log(user)
    var arrCookie = document.cookie.split('; ');
    for(var i=0; i<arrCookie.length; i++) {
        var arr = arrCookie[i].split('=')
        if (arr[0] == user) {
            return arr[1];
        }
    }
    return "";
}
function checkCookie(){
    console.log("======" +document.cookie.split(";")+ "======")
    var identifier=getCookie("identifier");
    var credential = getCookie("credential")
    console.log("identifier:" + identifier +"，credential"+credential)
    var check = getCookie("check")
    if (identifier!="" && check == "true"){
        $.ajax({
            url: "/login",
            type: "post",
            dataType: "json",
            data: {"identifier": identifier, "credential": credential},
            async: false,
            success: function (data) {
                saveCookie(data, check)//保存cookie
                alert("自动登录成功")
                window.location.href='http://localhost:8080/index.html'
            },
            error: function (data) {

            }
        })
    }
}

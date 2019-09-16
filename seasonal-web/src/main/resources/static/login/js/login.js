//获取当前IP地址
var nowCity;
//初始化地图
var map = new AMap.Map('container', {
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
            console.log("login")
            ipsearch(data.loginIp)
        },
        error: function (data) {

        }
    })
})

function a() {

}


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


//多次错误验证码显示，判断输入信息
var num = 0
$(document).on('submit', '.pass-form-normal', function () {
    var flag
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
        flag = login(identifier, credential, flag)
    }
    if (flag == true) {
        updatelogin(identifier)
    }
    return flag;
})

//登录判断
function login(identifier, credential, flag) {
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
                flag = false
            } else {
                flag = true
                console.log("ddd:"+flag)
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


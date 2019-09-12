//账号
$(document).on('click','.pass-form-normal .pass-text-input-userName',function () {
    $(this).css('color','#F69')
    $(this).css('border-color','#F69')
    $('.pass-form-normal .pass-label-userName').css('background-position','-366px -116px')

})
$(document).on('blur','.pass-form-normal .pass-text-input-userName',function () {
    $(this).css('color','')
    $(this).css('border-color','')
    $('.pass-form-normal .pass-label-userName').css('background-position','-366px -97px')
})


//密码
$(document).on('click','.pass-form-normal .pass-text-input-password',function () {
    $(this).css('color','#F69')
    $(this).css('border-color','#F69')
    $('.pass-form-normal .pass-label-password').css('background-position','-366px -157px')

})
$(document).on('blur','.pass-form-normal .pass-text-input-password',function () {
    $(this).css('color','')
    $(this).css('border-color','')
    $('.pass-form-normal .pass-label-password').css('background-position','-366px -135px')
})


//验证码
var num = 0
var flag = false
$(document).on('submit','.pass-form-normal',function () {
    var identifier = $('.pass-form-normal .pass-text-input-userName').val()
    var credential = $('.pass-form-normal .pass-text-input-password').val()
    if (identifier == null || identifier == ''){
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
        $.ajax({
            url: "/login",
            type: "post",
            dataType: "json",
            data: {"identifier":identifier,"credential":credential},
            async: false,
            success: function (data) {
                console.log(data.identifier)
                console.log("true")
                ipCheck(data.identifier,data.loginIp)
            },
            error:function (data) {
                console.log("error")
                flag = false
                html = '用户名或密码错误，请重新输入或' +
                    '<a href="' +
                    '#">' +
                    '找回密码' +
                    '</a>';
                $('.pass-form-normal .pass-generalError .pass-generalError-error').html(html);
                num++;
                if (num >= 3) {
                    $('.pass-form-normal .pass-form-item-verifyCode').css('display','block')
                    $('.pass-form-normal .pass-form-item-verifyCode').css('visibility','visible')
                    $('.pass-form-normal .pass-form-item-verifyCode .pass-text-input-verifyCode').css('color','#F69')
                    $('.pass-form-normal .pass-form-item-verifyCode .pass-text-input-verifyCode').css('border-color','#F69')
                }
            }
        });
    }
    setTimeout(function () {
        console.log("flag = " + flag)
    },2000)
    return false;
})

//短信验证码登录和账号密码登录切换
$(document).on('click','#j-login .pass-form-normal .pass-smsSwitchWrapper .pass-sms-btn',function () {
    $('#j-login').css('display', 'none')
    $('#j-login').css('visibility','hidden')
    $('#sms').css('display','block')
    $('#sms').css('visibility','visible')
})
$(document).on('click','#sms #smsForm #smsSubmitWrapper #sms_btn_back',function () {
    $('#sms').css('display', 'none')
    $('#sms').css('visibility','hidden')
    $('#j-login').css('display','block')
    $('#j-login').css('visibility','visible')
})

//IP地址检测,判断此次登录ip与上一次是否在同一个市
function ipCheck(identifier, loginIp) {
    console.log("identifier:"+ identifier +",loginIp:" + loginIp)
    $.ajax({
        url:"/loginIp",
        dataType:"text",
        type:"post",
        data:{"identifier":identifier},
        async: false,
        success:function (data) {
            console.log("data:" + data + ",loginIp:" + loginIp)
            flag = compare(data,loginIp)
            return flag
        },
        error:function (data) {
            console.log("data:" + data)
            console.log("ip:error")
        }
    })
}

//比较两个ip地址
var ipCites = new Array()

function compare(data,loginIp){
    ipsearch(loginIp)
    ipsearch(data)
    setTimeout(function () {
        if(ipCites[0] != ipCites[1]){
            alert("异地登录，请使用短信登录")
            $('#j-login').css('display', 'none')
            $('#j-login').css('visibility','hidden')
            $('#sms').css('display','block')
            $('#sms').css('visibility','visible')
            flag = false
        }else {
            console.log('didian:'+ipCites[0])
            flag = true
        }
        ipCites.length = 0
    },1000)

}

function ipsearch(ip) {
    AMap.plugin('AMap.CitySearch', function() {
        var citysearch = new AMap.CitySearch()
        citysearch.getCityByIp(ip, function (status, result) {
            if (status == 'complete') {
                console.log(result.province)
                ipCites.push(result.province)
            } else {
                console.log(result)
            }
        })
    })
}
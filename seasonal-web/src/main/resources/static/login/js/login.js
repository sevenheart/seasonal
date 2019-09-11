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
                console.log("true")
                flag = true
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
    console.log("flag = " + flag)
    return flag;
})

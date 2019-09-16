//手机号
$(document).on('click', '.pass-text-input-phone', function () {
    $('#phone-span').text('')
    if ($('#phone-span').text() == null || $('#phone-span').text() == '') {
        $('#phone-span').append("请输入中国大陆手机号，其他用户不可见")
    }
    $(this).css('border-color', '#F69')
})
$(document).on('blur', '.pass-text-input-phone', function () {
    $('#phone-span').text('')
    var phone = $('.pass-text-input-phone').val()
    if (phone.length > 0) {
        if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(phone))) {
            $('#phone-span-div').remove()
            html = '<div id="phone-span-div"></div>'
            $('#phone-span').html(html)
            $('#phone-span-div').append("手机号码格式不正确")
            $('#phone-span-div').css('background', 'url(../../img/registration/err_small.png) 0 0 no-repeat')
            $('#phone-span-div').css('float', 'left')
            $('#phone-span-div').css('position', 'relative')
            $('#phone-span-div').css('width', '250px')
            $('#phone-span-div').css('top', '12px')
            $('#phone-span-div').css('color', '#fc4343')
            $('#phone-span-div').css('height', '16px')
            $('#phone-span-div').css('line-height', '14px')
            $('#phone-span-div').css('padding-left', '20px')
        } else {
            $.ajax({
                url: "/registrationPhone",
                type: "post",
                dataType: "json",
                data: {"identifier":phone},
                async: true,
                success: function (data) {
                    var identifier = data.identifier
                    if (identifier == phone) {
                        $('#phone-span-div').remove()
                        html = '<div id="phone-span-div"></div>'
                        $('#phone-span').html(html)
                        $('#phone-span-div').append("此号码已注册")
                        $('#phone-span-div').css('background', 'url(../../img/registration/err_small.png) 0 0 no-repeat')
                        $('#phone-span-div').css('float', 'left')
                        $('#phone-span-div').css('position', 'relative')
                        $('#phone-span-div').css('width', '250px')
                        $('#phone-span-div').css('top', '12px')
                        $('#phone-span-div').css('color', '#fc4343')
                        $('#phone-span-div').css('height', '16px')
                        $('#phone-span-div').css('line-height', '14px')
                        $('#phone-span-div').css('padding-left', '20px')
                    }
                },
                error:function (data) {
                    $('#phone-span-div').remove()
                    html = '<div id="phone-span-div"></div>'
                    $('#phone-span').html(html)
                    $('#phone-span-div').css('background', 'url(../../img/registration/reg_icons.png) -80px 0 no-repeat')
                    $('#phone-span-div').css('float', 'left')
                    $('#phone-span-div').css('position', 'relative')
                    $('#phone-span-div').css('width', '250px')
                    $('#phone-span-div').css('top', '12px')
                    $('#phone-span-div').css('color', '#fc4343')
                    $('#phone-span-div').css('height', '16px')
                    $('#phone-span-div').css('line-height', '14px')
                    $('#phone-span-div').css('padding-left', '20px')
                }
            })
        }
    }
    $(this).css('border-color', '')
})


//密码
$(document).on('click', '.pass-text-input-password', function () {
    $('#password-span-div').remove()
    if ($('#password-span').val() == null || $('#password-span').val() == '') {
        html = '<div id="password-span-div">' +
            '<ul id="pwdChecklist" class="pwd-checklist">' +
            '<li id="pwd-checklist-len" data-rule="len" class="pwd-checklist-item">长度为8~14个字符,不允许有空格</li>' +
            '<li id="pwd-checklist-cha" data-rule="cha" class="pwd-checklist-item">支持数字,大小写字母和标点符号</li>' +
            '</ul></div>'
        $('#password-span').html(html)
        $('#password-span-div').css('float', 'left')
        $('#password-span .pwd-checklist').css('margin-left', '10px')
        $('#password-span .pwd-checklist').css('padding', '4px 10px')
        $('#password-span .pwd-checklist').css('border', '1px solid #ddd')
        $('#password-span .pwd-checklist').css('box-shadow', '1px 1px 1px #efefef')
        $('#password-span .pwd-checklist').css('background', '#f9f9f9')
        $('#password-span .pwd-checklist').css('width', '200px')
    }
    $(this).css('border-color', '#F69')
})
$(document).on('blur', '.pass-text-input-password', function () {
    $('#password-span-div').remove()
    var pwd = $('.pass-text-input-password').val()
    if (pwd.length > 0) {
        if (!(/^\S{8,14}$/.test(pwd))) {
            console.log("error:" + pwd)
            html = '<div id="password-span-div"></div>'
            $('#password-span').html(html)
            $('#password-span-div').append("密码格式不正确")
            $('#password-span-div').css('background', 'url(../../img/registration/err_small.png) 0 0 no-repeat')
            $('#password-span-div').css('float', 'left')
            $('#password-span-div').css('position', 'relative')
            $('#password-span-div').css('width', '250px')
            $('#password-span-div').css('top', '12px')
            $('#password-span-div').css('color', '#fc4343')
            $('#password-span-div').css('height', '16px')
            $('#password-span-div').css('line-height', '14px')
            $('#password-span-div').css('padding-left', '20px')
        } else {
            console.log("right:" + pwd)
            html = '<div id="password-span-div"></div>'
            $('#password-span').html(html)
            $('#password-span-div').css('background', 'url(../../img/registration/reg_icons.png) -80px 0 no-repeat')
            $('#password-span-div').css('float', 'left')
            $('#password-span-div').css('position', 'relative')
            $('#password-span-div').css('width', '250px')
            $('#password-span-div').css('top', '12px')
            $('#password-span-div').css('color', '#fc4343')
            $('#password-span-div').css('height', '16px')
            $('#password-span-div').css('line-height', '14px')
            $('#password-span-div').css('padding-left', '20px')
        }
    }
    $(this).css('border-color', '')
})


//短信验证码
$(document).on('click', '.pass-text-input-verifyCode', function () {
    $(this).css('border-color', '#F69')
})
$(document).on('blur', '.pass-text-input-verifyCode', function () {
    $(this).css('border-color', '')
})
$(document).on('click', '.pass-button-verifyCodeSend', function () {

})


//注册

// $(document).on('submit', '.form', function () {
//
// }

$(document).on('click', '.pass-button-submit', function () {
    var username = $('.pass-text-input-userName').val()
    var phone = $('.pass-text-input-phone').val()
    console.log(username)
    console.log(phone)
    console.log($('.pass-checkbox-isAgree').is(':checked'))

})


//注册
$(document).on('submit', '#form', function () {
    var userName = $('.pass-text-input-userName').val()
    var identifier = $('.pass-text-input-phone').val()
    var credenntial = $('.pass-text-input-password').val()
    if (userName == null || userName == ''){

    }
})



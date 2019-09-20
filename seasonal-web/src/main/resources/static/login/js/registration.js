//手机号
$(document).on('click', '.pass-text-input-phone', function () {
    $('#phone-span').text('')
    html = ''
    if ($('#phone-span').text() == null || $('#phone-span').text() == '') {
        html = '<div id="phone-span-div"></div>'
        $('#phone-span').html(html)
        $('#phone-span-div').append("请输入中国大陆手机号，其他用户不可见")
        $('#phone-span-div').css('float', 'left')
        $('#phone-span-div').css('position', 'relative')
        $('#phone-span-div').css('width', '250px')
        $('#phone-span-div').css('top', '12px')
        $('#phone-span-div').css('height', '16px')
        $('#phone-span-div').css('line-height', '14px')
    }
    $(this).css('border-color', '#F69')
})
$(document).on('blur', '.pass-text-input-phone', function () {
    $('#phone-span').text('')
    var phone = $('.pass-text-input-phone').val()
    console.log(phone)
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
                data: {"identifier": phone},
                async: true,
                success: function (data) {
                    var identifier = data.identifier
                    if (identifier == phone) {
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
                error: function (data) {
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
    $('#verifyCodeSend-span').css('display', 'none')
    $('#verifyCode-span').css('display', 'none')
    $(this).css('border-color', '#F69')
})
$(document).on('blur', '.pass-text-input-verifyCode', function () {
    $(this).css('border-color', '')
})
//发送短信验证码
var time = 60
$(document).on('click', '.pass-button-verifyCodeSend', function () {
    var identifier = $('.pass-text-input-phone').val()
    if (identifier == null || identifier == '') {
        $('#phone-span-div').remove()
        html = '<div id="phone-span-div"></div>'
        $('#phone-span').html(html)
        $('#phone-span-div').append("请您输入手机号")
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
            url: "/shortMessageSend",
            type: "post",
            dataType: "json",
            data: {"identifier": identifier},
            async: false,
            success: function (data) {
                console.log("获取验证码：" + data)
                sendCode()
            }
        })
    }
})

function sendCode(){
    if(time==0){//重新获取验证码
        $(".pass-button-verifyCodeSend").attr("disabled",false);
        $(".pass-button-verifyCodeSend").val("获取短信验证码");
        time = 60;
        return false;//清除定时器
    }else{
        $(".pass-button-verifyCodeSend").attr("disabled",true);
        $(".pass-button-verifyCodeSend").val("重新发送("+time+")");
        time--;
    }
    //设置一个定时器
    setTimeout(function(){
        sendCode()
    },1000)
}

//用户协议
$(document).on('click', '.pass-checkbox-isAgree', function () {
    var isAgree = document.getElementById("isAgree-checkbox").checked
    if (isAgree == true) {
        $('#isAgreeError').css('display', 'none')
    }
})

//注册
$(document).on('submit', '#form', function () {
    var identifier = $('.pass-text-input-phone').val()
    var credential = $('.pass-text-input-password').val()
    var verifyCode = $('.pass-text-input-verifyCode').val()
    var isAgree = document.getElementById("isAgree-checkbox").checked
    var flag = false

    if (identifier == null || identifier == '') {
        $('#phone-span-div').remove()
        html = '<div id="phone-span-div"></div>'
        $('#phone-span').html(html)
        $('#phone-span-div').append("请您输入手机号")
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

    if (credential == null || credential == '') {
        html = '<div id="password-span-div"></div>'
        $('#password-span').html(html)
        $('#password-span-div').append("请您输入密码")
        $('#password-span-div').css('background', 'url(../../img/registration/err_small.png) 0 0 no-repeat')
        $('#password-span-div').css('float', 'left')
        $('#password-span-div').css('position', 'relative')
        $('#password-span-div').css('width', '250px')
        $('#password-span-div').css('top', '12px')
        $('#password-span-div').css('color', '#fc4343')
        $('#password-span-div').css('height', '16px')
        $('#password-span-div').css('line-height', '14px')
        $('#password-span-div').css('padding-left', '20px')
    }

    if (verifyCode == null || verifyCode == '') {
        $('#verifyCode-span').css('display', 'inline')
        $('#verifyCodeError-span').css('display', 'none')
        $('#verifyCodeExpiration-span').css('display', 'none')
    }

    if (isAgree == false) {
        $('#isAgreeError').css('display', 'inline')
    } else {
        $('#isAgreeError').css('display', 'none')
        $.ajax({
            url:"/registrationInsert",
            type:"post",
            data:{"identifier":identifier,"credential":credential,"verifyCode":verifyCode},
            dataType:"text",
            async: false,
            success:function (data) {
                if (data == "True"){
                    flag = true
                } else if(data == "False"){
                    flag = false
                    $('#verifyCode-span').css('display','inline')
                    $('#verifyCodeError-span').css('display','none')
                    $('#verifyCodeExpiration-span').css('display','none')
                } else{
                    flag = false
                    $('#verifyCode-span').css('display','none')
                    $('#verifyCodeError-span').css('display','inline')
                    $('#verifyCodeExpiration-span').css('display','none')
                }
            }
        })
    }
    return flag
})



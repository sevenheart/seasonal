//手机号
$(document).on('click', '.pass-text-input-phone', function () {
    let phone_span = $('#phone-span');
    phone_span.text('');
    html = '';
    if (phone_span.text() === null || phone_span.text() === '') {
        html = '<div id="phone-span-div"></div>';
        phone_span.html(html);
        let phone_span_div = $('#phone-span-div');
        phone_span_div.append("请输入中国大陆手机号，其他用户不可见");
        phone_span_div.css('float', 'left');
        phone_span_div.css('position', 'relative');
        phone_span_div.css('width', '250px');
        phone_span_div.css('top', '12px');
        phone_span_div.css('height', '16px');
        phone_span_div.css('line-height', '14px');
    }
    $(this).css('border-color', '#F69')
});
$(document).on('blur', '.pass-text-input-phone', function () {
    let phone_span = $('#phone-span');
    phone_span.text('');
    var phone = $('.pass-text-input-phone').val();
    console.log(phone);
    if (phone.length > 0) {
        if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(phone))) {
            html = '<div id="phone-span-div"></div>';
            phone_span.html(html);
            let phone_span_div = $('#phone-span-div');
            phone_span_div.append("手机号码格式不正确");
            phone_span_div.css('background', 'url(../../img/registration/err_small.png) 0 0 no-repeat');
            phone_span_div.css('float', 'left');
            phone_span_div.css('position', 'relative');
            phone_span_div.css('width', '250px');
            phone_span_div.css('top', '12px');
            phone_span_div.css('color', '#fc4343');
            phone_span_div.css('height', '16px');
            phone_span_div.css('line-height', '14px');
            phone_span_div.css('padding-left', '20px');
        } else {
            $.ajax({
                url: "/registrationPhone",
                type: "post",
                dataType: "json",
                data: {"identifier": phone},
                async: true,
                success: function (data) {
                    var identifier = data.identifier;
                    if (identifier === phone) {
                        html = '<div id="phone-span-div"></div>';
                        phone_span.html(html);
                        let phone_span_div = $('#phone-span-div');
                        phone_span_div.append("此号码已注册");
                        phone_span_div.css('background', 'url(../../img/registration/err_small.png) 0 0 no-repeat');
                        phone_span_div.css('float', 'left');
                        phone_span_div.css('position', 'relative');
                        phone_span_div.css('width', '250px');
                        phone_span_div.css('top', '12px');
                        phone_span_div.css('color', '#fc4343');
                        phone_span_div.css('height', '16px');
                        phone_span_div.css('line-height', '14px');
                        phone_span_div.css('padding-left', '20px');
                    }
                },
                error: function (data) {
                    html = '<div id="phone-span-div"></div>';
                    phone_span.html(html);
                    let phone_span_div = $('#phone-span-div');
                    phone_span_div.css('background', 'url(../../img/registration/reg_icons.png) -80px 0 no-repeat');
                    phone_span_div.css('float', 'left');
                    phone_span_div.css('position', 'relative');
                    phone_span_div.css('width', '250px');
                    phone_span_div.css('top', '12px');
                    phone_span_div.css('color', '#fc4343');
                    phone_span_div.css('height', '16px');
                    phone_span_div.css('line-height', '14px');
                    phone_span_div.css('padding-left', '20px');
                }
            })
        }
    }
    $(this).css('border-color', '');
});


//密码
$(document).on('click', '.pass-text-input-password', function () {
    let password_span = $('#password-span');
    if (password_span.val() === null || password_span.val() === '') {
        html = '<div id="password-span-div">' +
            '<ul id="pwdChecklist" class="pwd-checklist">' +
            '<li id="pwd-checklist-len" data-rule="len" class="pwd-checklist-item">长度为8~14个字符,不允许有空格</li>' +
            '<li id="pwd-checklist-cha" data-rule="cha" class="pwd-checklist-item">支持数字,大小写字母和标点符号</li>' +
            '</ul></div>';
        password_span.html(html);
        let password_span_div = $('#password-span-div');
        let pwd_checklist = $('#password-span .pwd-checklist');
        password_span_div.css('float', 'left');
        pwd_checklist.css('margin-left', '10px');
        pwd_checklist.css('padding', '4px 10px');
        pwd_checklist.css('border', '1px solid #ddd');
        pwd_checklist.css('box-shadow', '1px 1px 1px #efefef');
        pwd_checklist.css('background', '#f9f9f9');
        pwd_checklist.css('width', '200px');
    }
    $(this).css('border-color', '#F69');
});
$(document).on('blur', '.pass-text-input-password', function () {
    var pwd = $('.pass-text-input-password').val();
    if (pwd.length > 0) {
        if (!(/^\S{8,14}$/.test(pwd))) {
            html = '<div id="password-span-div"></div>';
            $('#password-span').html(html);
            let password_span_div = $('#password-span-div');
            password_span_div.append("密码格式不正确");
            password_span_div.css('background', 'url(../../img/registration/err_small.png) 0 0 no-repeat');
            password_span_div.css('float', 'left');
            password_span_div.css('position', 'relative');
            password_span_div.css('width', '250px');
            password_span_div.css('top', '12px');
            password_span_div.css('color', '#fc4343');
            password_span_div.css('height', '16px');
            password_span_div.css('line-height', '14px');
            password_span_div.css('padding-left', '20px');
        } else {
            html = '<div id="password-span-div"></div>';
            $('#password-span').html(html);
            let password_span_div = $('#password-span-div');
            password_span_div.css('background', 'url(../../img/registration/reg_icons.png) -80px 0 no-repeat');
            password_span_div.css('float', 'left');
            password_span_div.css('position', 'relative');
            password_span_div.css('width', '250px');
            password_span_div.css('top', '12px');
            password_span_div.css('color', '#fc4343');
            password_span_div.css('height', '16px');
            password_span_div.css('line-height', '14px');
            password_span_div.css('padding-left', '20px');
        }
    }
    $(this).css('border-color', '');
});


//短信验证码
$(document).on('click', '.pass-text-input-verifyCode', function () {
    $('#verifyCodeSend-span').css('display', 'none');
    $('#verifyCode-span').css('display', 'none');
    $(this).css('border-color', '#F69');
});
$(document).on('blur', '.pass-text-input-verifyCode', function () {
    $(this).css('border-color', '');
});
//发送短信验证码
var time = 60;
$(document).on('click', '.pass-button-verifyCodeSend', function () {
    var identifier = $('.pass-text-input-phone').val();
    if (identifier === null || identifier === '') {
        html = '<div id="phone-span-div"></div>';
        $('#phone-span').html(html);
        let phone_span_div = $('#phone-span-div');
        phone_span_div.append("请您输入手机号");
        phone_span_div.css('background', 'url(../../img/registration/err_small.png) 0 0 no-repeat');
        phone_span_div.css('float', 'left');
        phone_span_div.css('position', 'relative');
        phone_span_div.css('width', '250px');
        phone_span_div.css('top', '12px');
        phone_span_div.css('color', '#fc4343');
        phone_span_div.css('height', '16px');
        phone_span_div.css('line-height', '14px');
        phone_span_div.css('padding-left', '20px');
    } else if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(identifier))){
        html = '<div id="phone-span-div"></div>';
        $('#phone-span').html(html);
        let phone_span_div = $('#phone-span-div');
        phone_span_div.append("手机号码格式不正确");
        phone_span_div.css('background', 'url(../../img/registration/err_small.png) 0 0 no-repeat');
        phone_span_div.css('float', 'left');
        phone_span_div.css('position', 'relative');
        phone_span_div.css('width', '250px');
        phone_span_div.css('top', '12px');
        phone_span_div.css('color', '#fc4343');
        phone_span_div.css('height', '16px');
        phone_span_div.css('line-height', '14px');
        phone_span_div.css('padding-left', '20px');
    } else {
        $.ajax({
            url: "/shortMessageSend",
            type: "post",
            dataType: "json",
            data: {"identifier": identifier},
            async: false,
            success: function (data) {
                console.log("获取验证码：" + data);
                sendCode();
            }
        })
    }
});
function sendCode(){
    let pass_button_verifyCodeSend = $(".pass-button-verifyCodeSend");
    if(time===0){//重新获取验证码
        pass_button_verifyCodeSend.attr("disabled",false);
        pass_button_verifyCodeSend.val("获取短信验证码");
        time = 60;
        return false;//清除定时器
    }else{
        pass_button_verifyCodeSend.attr("disabled",true);
        pass_button_verifyCodeSend.val(time+"s后可重新获取");
        time--;
    }
    //设置一个定时器
    setTimeout(function(){
        sendCode()
    },1000)
}

//用户协议
$(document).on('click', '.pass-checkbox-isAgree', function () {
    var isAgree = document.getElementById("isAgree-checkbox").checked;
    if (isAgree === true) {
        $('#isAgreeError').css('display', 'none');
    } else {
        $('#isAgreeError').css('display', 'inline');
    }
});

//注册
$(document).on('submit', '#form', function () {
    var identifier = $('.pass-text-input-phone').val();
    var credential = $('.pass-text-input-password').val();
    var verifyCode = $('.pass-text-input-verifyCode').val();
    var isAgree = document.getElementById("isAgree-checkbox").checked;
    var flag = false;
    var errorFlag = messageError(identifier, credential, verifyCode, isAgree);
    if (errorFlag === true){
        console.log("进来了")
        $.ajax({
            url:"/registrationInsert",
            type:"post",
            data:{"identifier":identifier,"credential":credential,"verifyCode":verifyCode},
            dataType:"text",
            async: false,
            success:function (data) {
                if (data === "True"){
                    flag = true;
                } else if(data === "False"){
                    flag = false;
                    $('#verifyCode-span').css('display','none');
                    $('#verifyCodeError-span').css('display','none');
                    $('#verifyCodeExpiration-span').css('display','inline');
                } else{
                    flag = false;
                    $('#verifyCode-span').css('display','none');
                    $('#verifyCodeError-span').css('display','inline');
                    $('#verifyCodeExpiration-span').css('display','none');
                }
            }
        })
    }
    return flag;
});

function messageError(identifier, credential, verifyCode, isAgree) {
    //判断手机号是否为空
    if (identifier === null || identifier === '') {
        html = '<div id="phone-span-div"></div>';
        $('#phone-span').html(html);
        let phone_span_div = $('#phone-span-div');
        phone_span_div.append("请您输入手机号");
        phone_span_div.css('background', 'url(../../img/registration/err_small.png) 0 0 no-repeat');
        phone_span_div.css('float', 'left');
        phone_span_div.css('position', 'relative');
        phone_span_div.css('width', '250px');
        phone_span_div.css('top', '12px');
        phone_span_div.css('color', '#fc4343');
        phone_span_div.css('height', '16px');
        phone_span_div.css('line-height', '14px');
        phone_span_div.css('padding-left', '20px');
    } else if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(identifier))){
        html = '<div id="phone-span-div"></div>';
        $('#phone-span').html(html);
        let phone_span_div = $('#phone-span-div');
        phone_span_div.append("手机号码格式不正确");
        phone_span_div.css('background', 'url(../../img/registration/err_small.png) 0 0 no-repeat');
        phone_span_div.css('float', 'left');
        phone_span_div.css('position', 'relative');
        phone_span_div.css('width', '250px');
        phone_span_div.css('top', '12px');
        phone_span_div.css('color', '#fc4343');
        phone_span_div.css('height', '16px');
        phone_span_div.css('line-height', '14px');
        phone_span_div.css('padding-left', '20px');
    }
    //判断密码是否为空
    if (credential === null || credential === '') {
        html = '<div id="password-span-div"></div>';
        $('#password-span').html(html);
        let password_span_div = $('#password-span-div');
        password_span_div.append("请您输入密码");
        password_span_div.css('background', 'url(../../img/registration/err_small.png) 0 0 no-repeat');
        password_span_div.css('float', 'left');
        password_span_div.css('position', 'relative');
        password_span_div.css('width', '250px');
        password_span_div.css('top', '12px');
        password_span_div.css('color', '#fc4343');
        password_span_div.css('height', '16px');
        password_span_div.css('line-height', '14px');
        password_span_div.css('padding-left', '20px');
    } else if (!(/^\S{8,14}$/.test(credential))) {
        html = '<div id="password-span-div"></div>';
        $('#password-span').html(html);
        let password_span_div = $('#password-span-div');
        password_span_div.append("密码格式不正确");
        password_span_div.css('background', 'url(../../img/registration/err_small.png) 0 0 no-repeat');
        password_span_div.css('float', 'left');
        password_span_div.css('position', 'relative');
        password_span_div.css('width', '250px');
        password_span_div.css('top', '12px');
        password_span_div.css('color', '#fc4343');
        password_span_div.css('height', '16px');
        password_span_div.css('line-height', '14px');
        password_span_div.css('padding-left', '20px');
    }
    //判断验证码是否为空
    if (verifyCode === null || verifyCode === '') {
        $('#verifyCode-span').css('display', 'inline');
        $('#verifyCodeError-span').css('display', 'none');
        $('#verifyCodeExpiration-span').css('display', 'none');
    }
    //判断用户协议是否选中
    if (isAgree === false) {
        $('#isAgreeError').css('display', 'inline');
    } else {
        $('#isAgreeError').css('display', 'none');
    }
    //返回值用于判断是否执行ajax
    if ((identifier !== null && identifier !== '' && (/^1(3|4|5|6|7|8|9)\d{9}$/.test(identifier))) &&
        (credential !== null && credential !== ''&& (/^\S{8,14}$/.test(credential))) &&
        (verifyCode !== null && verifyCode !== '' ) &&
        isAgree === true) {
        console.log("true");
        return true;
    }
    console.log("false");
    return false;
}

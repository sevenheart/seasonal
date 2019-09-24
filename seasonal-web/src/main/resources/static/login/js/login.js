let callbackUrl = '&callback=onLoad' //网页初始化地图服务回调函数
let url = 'https://webapi.amap.com/maps?v=1.4.15&key=f9d2a4291a8c1899397625dc9bc8646e' + callbackUrl;
let jsapi = document.createElement('script');
let map;
let beforeCity;
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
            if (status === 'complete') {
                nowCity = result.city;
                console.log("nowCity:" + nowCity);
            } else {
                console.log('loc-error' + result);
            }
        });
    });
};

function lastIp() {
    var identifier = $('.pass-form-normal .pass-text-input-userName').val();
    if (identifier === null || identifier === '') {
        pass_generalError_error.text('');
        pass_generalError_error.append("请您输入手机号");
    } else if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(identifier))) {
        pass_generalError_error.text('');
        pass_generalError_error.append("手机号码格式不正确");
    } else {
        //手机号格式正确，用于获取上次登录IP地址
        $.ajax({
            url: "/registrationPhone",
            type: "post",
            dataType: "json",
            data: {"identifier": identifier},
            async: true,
            success: function (data) {
                if (data.code === 200) {
                    $.ajax({
                        url: "/login",
                        type: "post",
                        dataType: "json",
                        data: {"identifier": identifier},
                        async: false,
                        success: function (data) {
                            if (data.code === 200) {
                                //调用ipseatch获取当前地址所在市
                                ipsearch(data.data.loginIp);
                            } else {
                                alert("获取用户信息出错了！")
                            }
                        }
                    })
                } else {
                    pass_generalError_error.text('');
                    pass_generalError_error.append("这个手机号还未注册，请先注册");
                }
            }
        })
    }
}

//账号
$(document).on('click', '.pass-form-normal .pass-text-input-userName', function () {
    $(this).css('color', '#F69');
    $(this).css('border-color', '#F69');
    $('.pass-form-normal .pass-label-userName').css('background-position', '0 -115px');
});
$(document).on('blur', '.pass-form-normal .pass-text-input-userName', function () {
    var pass_generalError_error = $('.pass-form-normal .pass-generalErrorWrapper .pass-generalError-error');
    pass_generalError_error.text('');
    var identifier = $('.pass-form-normal .pass-text-input-userName').val();
    $(this).css('color', '');
    $(this).css('border-color', '');
    $('.pass-form-normal .pass-label-userName').css('background-position', '0 -91px');
    if (identifier === null || identifier === '') {
        pass_generalError_error.text('');
        pass_generalError_error.append("请您输入手机号");
    } else if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(identifier))) {
        pass_generalError_error.text('');
        pass_generalError_error.append("手机号码格式不正确");
    } else {
        //手机号格式正确，用于获取上次登录IP地址
        $.ajax({
            url: "/registrationPhone",
            type: "post",
            dataType: "json",
            data: {"identifier": identifier},
            async: true,
            success: function (data) {
                if (data.code === 200) {
                    $.ajax({
                        url: "/login",
                        type: "post",
                        dataType: "json",
                        data: {"identifier": identifier},
                        async: false,
                        success: function (data) {
                            if (data.code === 200) {
                                //调用ipseatch获取当前地址所在市
                                ipsearch(data.data.loginIp);
                            } else {
                                alert("获取用户信息出错了！")
                            }
                        }
                    })
                } else {
                    pass_generalError_error.text('');
                    pass_generalError_error.append("这个手机号还未注册，请先注册");
                }
            }
        })
    }
});

//密码
$(document).on('click', '.pass-form-normal .pass-text-input-password', function () {
    $(this).css('color', '#F69');
    $(this).css('border-color', '#F69');
    $('.pass-form-normal .pass-label-password').css('background-position', '0 -24px');
});
$(document).on('blur', '.pass-form-normal .pass-text-input-password', function () {
    var pass_generalError_error = $('.pass-form-normal .pass-generalErrorWrapper .pass-generalError-error');
    pass_generalError_error.text('');
    var credential = $('.pass-form-normal .pass-text-input-password').val();
    $(this).css('color', '');
    $(this).css('border-color', '');
    $('.pass-form-normal .pass-label-password').css('background-position', '0 0');
    if (credential === null || credential === '') {
        pass_generalError_error.text('');
        pass_generalError_error.append("请您输入密码");
    }
});

//表单提交，多次错误验证码显示，判断输入信息
var num = 0;
$(document).on('submit', '.pass-form-normal', function () {
    var pass_generalError_error = $('.pass-form-normal .pass-generalErrorWrapper .pass-generalError-error');
    var flag = false;
    var identifier = $('.pass-form-normal .pass-text-input-userName').val();
    var credential = $('.pass-form-normal .pass-text-input-password').val();
    if (identifier === null || identifier === '') {
        pass_generalError_error.text('');
        pass_generalError_error.append("请您输入手机号");
        flag = false
    } else if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(identifier))) {
        pass_generalError_error.text('');
        pass_generalError_error.append("手机号码格式不正确");
        flag = false;
    } else if (credential === null || credential === '') {
        pass_generalError_error.text('');
        pass_generalError_error.append("请您输入密码");
        flag = false;
    } else {
        $('.pass-form-normal .pass-generalErrorWrapper .pass-generalError-error a').remove();
        pass_generalError_error.text('');
        var check = document.getElementById("memberPass").checked;
        //调用login方法，判断输入值
        flag = login(identifier, credential, flag, check);
    }
    if (flag === true) {
        //登录成功，修改用户登录信息
        updatelogin(identifier);
    }
    return flag;
});

//账号登录判断
function login(identifier, credential, flag, check) {
    let j_login = $('#j-login');
    let sms = $('#sms');
    let pass_form_item_verifyCode = $('.pass-form-normal .pass-form-item-verifyCode');
    let pass_text_input_verifyCode = $('.pass-form-normal .pass-form-item-verifyCode .pass-text-input-verifyCode');
    //判断异地登录
    if (nowCity !== beforeCity) {
        alert("异地登录，请使用短信登录");
        j_login.css('display', 'none');
        j_login.css('visibility', 'hidden');
        sms.css('display', 'block');
        sms.css('visibility', 'visible');
        $('.pass-sms-link-back').css('visibility', 'hidden');
        flag = false
    } else {
        //登录信息查找比对
        $.ajax({
            url: "/login",
            type: "post",
            dataType: "json",
            data: {"identifier": identifier, "credential": credential},
            async: false,
            success: function (data) {
                if (data.code === 200) {
                    savelocalStorage(data, check);//保存localStorage
                    flag = true
                } else {
                    html = '用户名或密码错误，请重新输入或' +
                        '<a href="' +
                        '#">' +
                        '找回密码' +
                        '</a>';
                    $('.pass-form-normal .pass-generalErrorWrapper').html(html);
                    num++;
                    if (num >= 3) {//多次输入信息错误后，弹出验证码
                        pass_form_item_verifyCode.css('display', 'block');
                        pass_form_item_verifyCode.css('visibility', 'visible');
                        pass_text_input_verifyCode.css('color', '#F69');
                        pass_text_input_verifyCode.css('border-color', '#F69');
                    }
                }

            }
        })
    }
    return flag;
}

//短信登录手机号检测的焦点事件
$(document).on('blur', '.pass-text-input-smsPhone', function () {
    let pass_generalError = $('#smsForm .pass-generalErrorWrapper .pass-generalError');
    var identifier = $('.pass-text-input-smsPhone').val();
    if (identifier.length > 0) {
        if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(identifier))) {
            pass_generalError.text('');
            pass_generalError.append("手机号码格式不正确");
        }
    }
});


//获取短信验证码
var time = 60;
$(document).on('click', '.pass-button-verifyCodeSend', function () {
    let pass_generalError = $('#smsForm .pass-generalErrorWrapper .pass-generalError');
    var phone = $('.pass-text-input-smsPhone').val();
    if (phone.length > 0) {
        if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(phone))) {
            pass_generalError.text('');
            pass_generalError.append("手机号码格式不正确");
        } else {
            $.ajax({
                url: "/registrationPhone",
                type: "post",
                dataType: "json",
                data: {"identifier": phone},
                async: true,
                success: function (data) {
                    if (data.code === 200) {
                        var identifier = data.identifier;
                        $.ajax({
                            url: "/shortMessageSend",
                            type: "post",
                            dataType: "json",
                            data: {"identifier": identifier},
                            async: false,
                            success: function (data) {
                                //调用倒计时方法
                                sendCode();
                                if (data.code === 200) {
                                    alert("发送成功！");
                                } else if (data.message === "0" && data.code === 100) {
                                    alert("发送失败！");
                                } else {
                                    time = parseInt(data.message);
                                    alert("您请求验证码太过频繁，请计时结束在重新获取！");
                                }
                            }
                        })
                    } else {
                        pass_generalError.text('');
                        pass_generalError.append("该手机号还未注册,请先注册");
                    }
                }
            })
        }
    } else {
        pass_generalError.text('');
        pass_generalError.append("请您输入手机号");
    }
});

function sendCode() {
    let pass_button_verifyCodeSend = $(".pass-button-verifyCodeSend");
    if (time === 0) {//重新获取验证码
        pass_button_verifyCodeSend.attr("disabled", false);
        pass_button_verifyCodeSend.val("获取短信验证码");
        time = 60;
        return false;//清除定时器
    } else {
        pass_button_verifyCodeSend.attr("disabled", true);
        pass_button_verifyCodeSend.val("重新发送 " + time + "s");
        time--;
    }
    //设置一个定时器
    setTimeout(function () {
        sendCode();
    }, 1000)
}

//短信登录表单提交
$(document).on('submit', '#smsForm', function () {
    let pass_generalError = $('#smsForm .pass-generalErrorWrapper .pass-generalError');
    var smsflag = false;
    var identifier = $('.pass-text-input-smsPhone').val();
    var smsVerifyCode = $('.pass-text-input-smsVerifyCode').val();
    if (identifier === null || identifier === "") {
        pass_generalError.text('');
        pass_generalError.append("请您输入手机号");
    } else if (smsVerifyCode === null || smsVerifyCode === "") {
        pass_generalError.text('');
        pass_generalError.append("请先输入验证码");
    } else {
        $.ajax({
            url: "/smsLogin",
            type: "post",
            dataType: "json",
            data: {"identifier": identifier, "smsVerifyCode": smsVerifyCode},
            async: false,
            success: function (data) {
                console.log("data:" + data);
                if (data.code === 200) {
                    //短信登录成功
                    smsflag = true;
                } else if (data.code === 404) {
                    smsflag = false;
                    pass_generalError.text('');
                    pass_generalError.append("验证码已过期，请重新获取");
                } else {
                    smsflag = false;
                    pass_generalError.text('');
                    pass_generalError.append("验证码错误，请确认后再输入");
                }
            }
        })
    }
    if (smsflag === true) {
        //登录成功，修改用户登录信息
        updatelogin(identifier);
    }
    return smsflag;
});


//将上一次登录的ip转换为真实地址
function ipsearch(ip) {
    AMap.plugin('AMap.CitySearch', function () {
        var citysearch = new AMap.CitySearch();
        citysearch.getCityByIp(ip, function (status, result) {
            if (status === 'complete') {
                beforeCity = result.city;
                console.log("beforeCity:" + beforeCity);
            } else {
                console.log(result);
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
    let j_login = $('#j-login');
    let sms = $('#sms');
    j_login.css('display', 'none');
    j_login.css('visibility', 'hidden');
    sms.css('display', 'block');
    sms.css('visibility', 'visible');
});
$(document).on('click', '#sms #smsForm #smsSubmitWrapper #sms_btn_back', function () {
    let j_login = $('#j-login');
    let sms = $('#sms');
    sms.css('display', 'none');
    sms.css('visibility', 'hidden');
    j_login.css('display', 'block');
    j_login.css('visibility', 'visible');
});


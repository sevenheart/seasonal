let userId;
let userName;
let login_html;
$.ajax({
    url: "/getsessionUserId",
    type: "post",
    dataType: "json",
    async: false,
    success: function (data) {
        console.log(data);
        if (data.code === 200) {
            userId = data.data[0].userId;
            userName = data.data[0].userName;
            login_html = '<li class="login">\n' +
                '                    <img alt="" src="https://seasonal-1300148510.cos.ap-shanghai.myqcloud.com/img/index/login_icon.jpg">\n' +
                '                    <span class="login-span">用户名：</span>\n' +
                '                    <a class="already-login">' + userName + '</a>\n' +
                '                </li>\n' +
                '                <li class="registration">\n' +
                '                    <a href="#" class="cancellation">退出账号</a>\n' +
                '                </li>';
            $(".login_bar").children("ul").html(login_html);
        } else {
            login_html = ' <li class="login">\n' +
                '                    <img alt="" src="https://seasonal-1300148510.cos.ap-shanghai.myqcloud.com/img/index/login_icon.jpg">\n' +
                '                    <a href="../../login/view/login.html" class="not-login">请登录</a>\n' +
                '                </li>\n' +
                '                <li class="registration">\n' +
                '                    <img alt=""\n' +
                '                         src="https://seasonal-1300148510.cos.ap-shanghai.myqcloud.com/img/index/register_icon.jpg"\n' +
                '                         >\n' +
                '                    <a href="../../login/view/registration.html">免费注册</a>\n' +
                '                </li>';
            $(".login_bar").children("ul").html(login_html);
        }
    },
    error: function (data) {
        console.log('error:' + data)
    }
})


$(document).on('click', '.cancellation', function () {

    $.ajax({
        url: "/cancellation",
        type: "post",
        dataType: "text",
        success: function (data) {
            alert("退出成功");
            window.location.reload();
        }
    })
})
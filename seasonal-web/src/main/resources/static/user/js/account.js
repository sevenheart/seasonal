//

//初始化用户信息
function accountInit(){
    $.post({
        url:"/user/finduserbyid",
        data:{id:userId},
        async:false,
        dataType:"json",
        success:function (data) {
            if (data.code === 0) {
            $("#userId").text("用户id" + userId);
            $("#userImg").attr("src", userImg);
            $("#userName").text("昵称：" + userName);
            $('#userAge').text("年龄："+data.data[0].userAge);
            $('#userSex').text(Number(data.data[0])===0?"男":"女");
            }
            else{
                alert(data.message);
            }

        }
    })
}
//修改头像
$('#ipt-file').click(function () {
    $(this).next().click();
})
/*点击修改个人信息按钮*/
$('#user_info_form .button').click(function () {
    let fd = new FormData();
    fd.append("id", userId);
    fd.append("userName", $('#userName').val());
    fd.append("userId", $('#userId').val());
    fd.append("usrType", $('#userType').val());
    fd.append("isVip", $('#isVip').val());
    fd.append("userSex", $('#userSex').val());
    fd.append("userAge", $('#userAge').val());
    fd.append("multipartFile", $('#user_info_form input[type="file"]')[0].files[0]);
    $.post({
        url:"/user/updateUserInfo",
        data:fd,
        dataType:"json",
        processData: false,
        contentType: false,
        success:function (data) {
            alert(data.message);
            window.location.href="personCenter.html"
        }
    })
});

$(".btn-change").click(function () {
    $(".container").css("display", "block");
});

/*修改其他信息*/





/*模态框*/
/*
$(".btn-change").click(function () {
    $(".container").css("display", "block");
});*/

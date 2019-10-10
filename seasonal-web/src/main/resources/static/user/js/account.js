accountInit();

//初始化用户信息
function accountInit() {
    $.post({
        url: "/user/finduserbyid",
        data: {id: userId},
        async: false,
        dataType: "json",
        success: function (data) {
            if (data.code === 0) {
                $("#userId").text(userId);
                $(".head-img").attr("src", userImg);
                $("#userName").text(userName);
                // $('#J_addressNameInput').val(userName);
                $('#userAge').text(data.data[0].userAge);
                //$('#J_addressZipcodeInput').val(data.data[0].userAge);
                $('#userSex').text(Number(data.data[0]) === 0 ? "男" : "女");
                Number(data.data[0]) === 0 ? document.getElementById('J_addressPhoneInput')[0].selected = true : document.getElementById('J_addressPhoneInput')[1].selected = true

            } else {
                alert(data.message);
            }

        }
    })
}

//修改头像
$('#userImg').click(function () {
    $(this).next().click();
})

function preview() {
    //获取点击的文本框userimg
    let file = document.getElementById("bookimg");
    let imgUrl = window.URL.createObjectURL(file.files[0]);
    $('#userImg').attr('src', imgUrl); // 修改img标签src属性值
}

$('#bookimg').change(preview);
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
        url: "/user/updateUserInfo",
        data: fd,
        dataType: "json",
        processData: false,
        contentType: false,
        success: function (data) {
            alert(data.message);
            window.location.href = "personCenter.html"
        }
    })
});

$(".btn-change").click(function () {
    $(".container").css("display", "block");
});
//模态框取消按钮
$('.btn-gray').click(function () {
    $(".container").css("display", "none");
    console.log("摩天狂的值是" + document.getElementById('J_addressPhoneInput').value)
})
//模态框确定按钮
//修改用户的信息
$('.btn-primary').click(function () {
    console.log("文件时"+$('#bookimg')[0].files[0]);
    if (isNaN($('#J_addressZipcodeInput').val())|| $('#J_addressZipcodeInput').val()<0||$('#J_addressZipcodeInput').val()>120) {
        alert("请输入合法的年龄！");
        return;
    }else if ($('#bookimg')[0].files[0] != undefined){

        if ($('#bookimg')[0].files[0].size > 3145728) {
            alert("文件超出了限制大小请重新上传！");
            return;
        }
    }


        let fd = new FormData();
        fd.append("oldlocation", userImg);
        fd.append("userId", userId);
        if($('#J_addressNameInput').val()==""){
            fd.append("userName",userName);
        }
        else {
            fd.append("userName", $('#J_addressNameInput').val());
        }
        fd.append("userName", $('#J_addressNameInput').val());
        fd.append("userSex", document.getElementById('J_addressPhoneInput').value);
        fd.append("userAge", $('#J_addressZipcodeInput').val());
        fd.append("multipartFile", $('#bookimg')[0].files[0]);
        $.post({
            url: "/user/updateUserInfo",
            data: fd,
            dataType: "json",
            processData: false,
            contentType: false,
            success: function (data) {
                alert(data.message);
                window.location.href = "/user/view/account.html"
            }

        });
});

/*模态框*/
/*$(".btn-change").click(function () {
    $(".container").css("display", "block");
});*/

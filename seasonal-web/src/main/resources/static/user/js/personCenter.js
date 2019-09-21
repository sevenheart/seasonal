if (userId === "") {
    alert("请先登录，再访问个人中心！");
    $(location).attr('href', "../../login/view/login.html");
}

$(".main_right_function_order_menu li").click(function () {
    $(this).parent().children("li").removeClass("currentmenu1");
    $(this).addClass("currentmenu1");
    var num = $(this).index();
    $(this).parent().parent().parent().children(".detailemessage").css("display", "none");
    $(this).parent().parent().parent().children(".detailemessage").eq(num).css("display", "block")
    /* $(this).addClass("currentmenu")*/
});
/*控制右侧的功能页的显示与隐藏
*右侧最大的main_right_function_order
* 右侧子菜单
* detailemessage
* 顺序为
* 1.订单页
* 2.用户信息页
* 3.地址管理页
* */
$(".main_left_function a").click(function () {
    var num = $(this).attr("name")
    /*先隐藏右侧的页面在显示*/
    $(".main_right_function_order").css("display", "none")
    /*找到第几个显示它*/
    $(".main_right_function_order").eq(num).css("display", "block")
})
/*选项卡切换*/
/*表单的js代码*/

/*$("#userimg img").click(function () {
    $("#userimg input").click()
})*/
function changeStyle() {
    var template = document.getElementById("template");
    var index = template.selectedIndex;
    var templatevalue = template.options[index].value;
    var templatecss = document.getElementById("templatecss");
    templatecss.setAttribute("href", "css/" + templatevalue + ".css");
    document.getElementsByTagName("form")[0].setAttribute("class", templatevalue);
}

/*修改头像*/
function preview(obj) {

    //获取点击的文本框userimg
    var file = document.getElementById("bookimg");
    var imgUrl = window.URL.createObjectURL(file.files[0]);
    $('#userimg img').attr('src', imgUrl); // 修改img标签src属性值

}

/*展示地址信息*/
function showaddress(data) {
    var html = '  <tr>\n' +
        '                            <td> <span>全部</span></td>\n' +
        '                            <td> <span>收货人姓名:</span></td>\n' +
        '                            <td> <span>收货人电话:</span></td>\n' +
        '                            <td><span>省:</span></td>\n' +
        '                            <td><span>市:</span></td>\n' +
        '                            <td><span>区:</span></td>\n' +
        '                            <td><span>详细信息:</span></td>\n' +
        '                        </tr>';
    //循环拼接得到的地址信息
    if (data.data !== null) {
        for (var i = 0; i < data.data.length; i++) {
            html += '    <tr>\n' +
                '                            <td> <input  type="checkbox" name="check" value="' + data.data[i].id + '"/></td>\n' +
                '                            <td> <input  type="text" readonly  value=' + data.data[i].userName + ' /></td>\n' +
                '                            <td> <input  type="text"  readonly value=' + data.data[i].userPhone + ' /></td>\n' +
                '                            <td> <input  type="text" readonly  value=' + data.data[i].province + ' /></td>\n' +
                '                            <td> <input  type="text"  readonly value=' + data.data[i].city + ' /></td>\n' +
                '                            <td> <input  type="text" readonly value=' + data.data[i].district + ' /></td>\n' +
                '                            <td> <input  type="text"  readonly value=' + data.data[i].address + ' /></td>\n' +
                '                            <td><input type="button" class="button delete_address" value="删除"  data-id=' + data.data[i].id + ' /></td>\n' +
                '                            <td><input type="button" class="button update_address" value="修改" data-type="0"/></td>\n' +
                '                        </tr>'
        }
    }

    html += '    <tr>\n' +
        '                            <td><input type="button" class="button delete_all" value="批量删除" /></td>\n' +
        '                        </tr>';
    $("#alladdresstable").html(html);

    /*删除地址*/
    $("#alladdresstable .delete_address").click(function () {
        var title = $(this).attr("data-id");
        $.post({
            url: "/address/deleteuseraddressByid",
            data: {id: title},
            dataType: "json",
            success: function (data) {
                alert(data.message);
                window.location.href = "personCenter.html";
            }
        })
    })
    /*批量删除地址*/
    $("#alladdresstable .delete_all").click(function () {
        var check = new Array();
        $("#alladdresstable tr td input[type=checkbox]:checked").each(function () {
            check.push($(this).val())
        })


        $.post({
            url: "/address/deletecheckeduseraddress",
            data: JSON.stringify(check),
            contentType: "application/json",
            dataType: "json",
            success: function (data) {
                alert(data.message);
                window.location.href = "personCenter.html"
            }
        })
    })
    /*修改用户的地址信息*/
    $("#alladdresstable .update_address").click(function () {
        var flag = $(this).attr("data-type");
        if (flag == 0) {
            $(this).parents("tr").children("td").children("input[type='text']").removeAttr("readonly")
            $(this).attr("data-type", 1)
        } else {
            var fd = new FormData();
            fd.append("userName", $(this).parents("tr").children("td").children("input").eq(1).val());
            fd.append("userPhone", $(this).parents("tr").children("td").children("input").eq(2).val());
            fd.append("province", $(this).parents("tr").children("td").children("input").eq(3).val());
            fd.append("city", $(this).parents("tr").children("td").children("input").eq(4).val());
            fd.append("district", $(this).parents("tr").children("td").children("input").eq(5).val());
            fd.append("address", $(this).parents("tr").children("td").children("input").eq(6).val());
            fd.append("id", $(this).parents("tr").children("td").children("input").eq(7).attr("data-id"));
            $.post({
                url: "/address/updateuseraddress",
                data: fd,
                dataType: "json",
                processData: false,
                contentType: false,
                success: function (data) {
                    alert(data.message)
                }
            })
        }


    })
}

function init() {
    //查找用户的个人信息
    $.post({
        url: "/user/finduserbyid",
        data: {id: String(userId)},
        async: false,
        dataType: "json",
        success: function (data) {
            if (data.code == 0) {
                $('#id').val(data.data[0].id);
                $('#userimg img').attr("src", data.data[0].userImg);
                $('#userbigimg').attr("src", data.data[0].userImg);
                $('#userId').val(data.data[0].userId);
                $('#userName').val(data.data[0].userName);
                $('#isVip').val(data.data[0].isVip);
                $('#userAge').val(data.data[0].userAge);
                $('#userType').val(data.data[0].userType);
                /*$('#updateTime').val(data.data[0].updateTime);*/
            }

            /*先隐藏右侧的页面在显示*/

        }
    })
    //查找用户的地址信息
    $.post({
        url: "/address/selectalladdress",
        data: {userId: userId},
        async: false,
        dataType: "json",
        success: function (data) {
            showaddress(data)

        }
    })
}

init();


/*查找用户的地址信息*/
$('#addressManage').click(function () {
    var num = $(this).attr("name")
    /*只读*/
    /* $('#addressManage input[type="text"]').attr("readonly","readonly")*/
    /*先隐藏右侧的页面在显示*/
    $(".main_right_function_order").css("display", "none")
    /*找到第几个显示它*/
    $(".main_right_function_order").eq(num).css("display", "block")
})

/*点击新建收货用户信息*/
$('#addAddressFrom .button').click(function () {
    $.post({
        url: "/address/insertuseraddress?userId=" + userId,
        data: $('#addAddressFrom').serialize(),
        dataType: "json",
        success: function (data) {
            alert(data.message)
            window.location.href = "personCenter.html"

        }
    })
});
/*点击提交修改用户信息信息*/
$('#user_info_form .button').click(function () {
    var fd = new FormData();
    fd.append("id", $('#id').val());
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
            alert(data.message)
            window.location.href = "personCenter.html"
        }
    })
})
/*点击按钮查找用户信息*/
$('#userInfoManage').click(function () {
    var num = $(this).attr("name")
    $(".main_right_function_order").css("display", "none")
    /*找到第几个显示它*/
    $(".main_right_function_order").eq(num).css("display", "block")
})


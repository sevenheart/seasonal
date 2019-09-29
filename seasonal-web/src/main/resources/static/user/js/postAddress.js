//页面加载刷新
showAddress();

let flag = 0;
let addressId;
//模态框确定点击事件
$("#J_editAddressSave").click(function () {
    if (flag === 0) {
        addressenter();
        $(".container").css("display", "none");
    } else {
        updateAddress(addressId);
        $(".container").css("display", "none");
    }
});
//模态框取消点击事件
$("#J_editAddressCancel").click(function () {
    $(".container").css("display", "none");
});


//插入地址信息完成后局部刷新
function addressenter() {
    let userAddress = {
        "userId": userId,
        "province": province,
        "city": city,
        "district": district,
        "address": $("#J_addressDetailInput").val(),
        "postcode": $("#J_addressZipcodeInput").val(),
        "addressTag": $("#J_addressTagInput").val(),
        "userPhone": $("#J_addressPhoneInput").val(),
        "userName": $("#J_addressNameInput").val()
    };

    $.ajax({
        url: "/address/InsertUserAddress",
        contentType: "application/json",
        data: JSON.stringify(userAddress),
        type: "post",
        dataType: "json",
        success: function (data) {
            if (data.code == '0') {
                showAddress();
            }
        }

    });
}

//地址删除方法
function deleteAddress(id) {

    $.ajax({
        url: "/address/deleteuseraddressByid",
        data: {"id": id},
        type: "post",
        dataType: "json",
        success: function (data) {
            if (data.code == '0') {
                showAddress();
            }
        }
    });
}

//地址更新方法
function updateAddress(id) {
    let userAddress = {
        "id": id,
        "userId": userId,
        "province": province,
        "city": city,
        "district": district,
        "address": $("#J_addressDetailInput").val(),
        "postcode": $("#J_addressZipcodeInput").val(),
        "addressTag": $("#J_addressTagInput").val(),
        "userPhone": $("#J_addressPhoneInput").val(),
        "userName": $("#J_addressNameInput").val()
    };

    $.ajax({
        url: "/address/updateuseraddress",
        contentType: "application/json",
        data: JSON.stringify(userAddress),
        type: "post",
        dataType: "json",
        success: function (data) {
            console.log(data);
            if (data.code == '0') {
                showAddress();
            }
        }
    });
}

//局部页面清除重新刷新
function showAddress() {
    html = "";
    html += ' <li class="address-item address-item-new">\n' +
        '                            <i class="iconfont">&#xe603</i>\n' +
        '                            添加新地址\n' +
        '                        </li>';
    $.ajax({
        url: "/address/selectalladdress",
        data: {"userId": userId},
        dataType: "json",
        type: "post",
        async: false,
        success: function (data) {
            $.each(data.data, function (k, v) {
                html += '<li class="address-item" >\n' +
                    '                            <dl>\n' +
                    '                                <dt>\n' +
                    '                                    <span class="tag">' + v.addressTag + '</span>\n' +
                    '                                    <em class="uname">' + v.userName + '</em>\n' +
                    '                                </dt>\n' +
                    '                                <dd class="utel">' + v.userPhone + '</dd>\n' +
                    '                                <dd class="uaddress" postcode="' + v.postcode + '" province="' + v.province + '" city="' + v.city + '" district="' + v.district + '" address="' + v.address + '">\n' +
                    '                                    ' + v.province + ' ' + v.city + ' ' + v.district + '\n' +
                    '                                    <br>\n' +
                    '                                    ' + v.address + '(' + v.postcode + ')\n' +
                    '                                </dd>\n' +
                    '                            </dl>\n' +
                    '                            <div class="actions">\n' +
                    '                                <a class="modify J_addressModify" value="' + v.id + '">修改</a>\n' +
                    '                                <a class="modify J_addressDel" value="' + v.id + '">删除</a>\n' +
                    '                            </div>\n' +
                    '                        </li>';
            });
        }
    });
    $("#user-address").html(html);
    $(".address-item-new").click(function () {
        flag = 0;
        $(".modal-header .title").html("添加收货地址");
        $(".container").css("display", "block");

        $("#J_addressNameInput").val("");
        $("#J_addressPhoneInput").val("");
        $("#J_addressZipcodeInput").val("");
        $("#J_selectAddressTrigger").val("选择省 / 市 / 区");
        $("#J_selectAddressTrigger").css("color","#b0b0b0")
        $("#J_addressDetailInput").val("");

        $(".form-section").removeClass("form-section-focus");
        $(".form-section").removeClass("form-section-active");
    });
    $(".J_addressDel").click(function () {
        deleteAddress($(this).attr("value"));
    });
    $(".J_addressModify").click(function () {
        flag = 1;
        addressId = $(this).attr("value");
        $(".modal-header .title").html("修改收货地址");
        $(".container").css("display", "block");

        let $Jaddress = $(this).parent().parent();
        $("#J_addressNameInput").val($Jaddress.find(".uname").text());
        $("#J_addressPhoneInput").val($Jaddress.find(".utel").text());
        $("#J_addressTagInput").val($Jaddress.find(".tag").text());
        let $uaddress = $Jaddress.find(".uaddress");
        province = $uaddress.attr("province");
        city = $uaddress.attr("city");
        district = $uaddress.attr("district");
        let uad = province + " " + city + " " + district;
        $("#J_selectAddressTrigger").val(uad);
        $("#J_addressDetailInput").val($Jaddress.find(".uaddress").attr("address"));
        $("#J_addressZipcodeInput").val($Jaddress.find(".uaddress").attr("postcode"));


        $(".form-section").addClass("form-section-focus");
        $(".form-section").addClass("form-section-active");

    });

}
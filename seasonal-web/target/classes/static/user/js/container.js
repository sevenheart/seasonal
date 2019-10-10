let sheng = "";
let shi = "";
let qu = "";
let addressData;
let province = "";
let city = "";
let district = "";
function focus($fothis) {
    if($fothis.val() === ""){
        $fothis.parent("div").addClass("form-section-focus");
        $fothis.parent("div").addClass("form-section-active");
    }
}

function blur($blthis) {
    if ($blthis.val() !== "") {
        $blthis.parent("div").removeClass("form-section-focus");
        $blthis.parent("div").addClass("form-section-valid");
        // $(this).parent("div").addClass("form-section-error");
    } else {
        $blthis.parent("div").removeClass("form-section-focus");
        $blthis.parent("div").removeClass("form-section-active");
        $blthis.parent("div").removeClass("form-section-error");
        $blthis.parent("div").removeClass("form-section-valid");
    }
}

$("#J_addressNameInput").focus(function () {
    focus($(this));
});

$("#J_addressNameInput").blur(function () {
    blur($(this));
});

$("#J_addressPhoneInput").focus(function () {
    focus($(this));
});
$("#J_addressPhoneInput").blur(function () {
    blur($(this));
});
$("#J_addressDetailInput").focus(function () {
    focus($(this));
});
$("#J_addressDetailInput").blur(function () {
    blur($(this));
});
$("#J_addressZipcodeInput").focus(function () {
    focus($(this));
});
$("#J_addressZipcodeInput").blur(function () {
    blur($(this));
});
$("#J_addressTagInput").focus(function () {
    focus($(this));
});
$("#J_addressTagInput").blur(function () {
    blur($(this));
});

$("#J_selectAddressTrigger").focus(function () {
    const $option0 = $(".options-list").eq(0);
    if ($option0.attr("a") == "0") {
        getScenemapData();
        $option0.html('');
        $.each(addressData, function (k, v) {
            $option0.append('<li class="option J_option" data-value="' + k + '" data-txt="' + v.name + '">' + v.name + '</li>')
        });
    }
    $(".J_option").click(function () {
        sheng = $(this).attr("data-txt");
        const $selectboxitem = $(".select-box .select-item");
        $selectboxitem.eq(0).text(sheng);
        $selectboxitem.eq(0).addClass("active");
        $selectboxitem.eq(1).text($selectboxitem.eq(1).attr("data-init-txt"));
        $.each(addressData, function (k, v) {
            if (sheng == v.name) {
                $option0.html("");
                addressData = v.city;
                $.each(v.city, function (k1, v1) {
                    $option0.append('<li class="option J_option" data-value="' + k1 + '" data-txt="' + v1.name + '">' + v1.name + '</li>')
                });
            }
        });
        $(".J_option").click(function () {
            shi = $(this).attr("data-txt");
            const $selectboxitem = $(".select-box .select-item");
            $selectboxitem.eq(1).text(shi);
            $selectboxitem.eq(1).addClass("active");
            $selectboxitem.eq(2).text($selectboxitem.eq(2).attr("data-init-txt"));
            $.each(addressData, function (k, v) {
                if (shi == v.name) {
                    $option0.html("");
                    $.each(v.area, function (k1, v1) {
                        console.log(v1);
                        $option0.append('<li class="option J_option" data-value="' + k1 + '" data-txt="' + v1 + '">' + v1 + '</li>')
                    });
                }
            });
            $(".J_option").click(function () {
                qu = $(this).attr("data-txt");
                $("#J_selectAddressTrigger").val(sheng + " " + shi + " " + qu);
                $("#J_selectAddressTrigger").css("color", "black");
                $(".select-address-wrapper").css("display", "none");
                province = sheng;
                city=shi;
                district = qu;
                sheng = "";
                shi = "";
                qu = "";
                $(".options-list").eq(0).attr("a", "0");

                $("#J_selectWrapper").html('<div class="select-first select-item J_select" data-init-txt="选择省份/自治区">选择省份/自治区</div>\n' +
                    '                                <div class="select-item J_select hide" data-init-txt="选择城市/地区"></div>\n' +
                    '                                <div class="select-item J_select hide" data-init-txt="选择区县"></div>');

            });
        });
    });
    $option0.attr("a", "1");
    $(".select-address-wrapper").css("display", "block");

});
$(".select-address-close").click(function () {
    $(".select-address-wrapper").css("display", "none");
    sheng = "";
    shi = "";
    qu = "";
    $(".options-list").eq(0).attr("a", "0");
    $("#J_selectWrapper").html('<div class="select-first select-item J_select" data-init-txt="选择省份/自治区">选择省份/自治区</div>\n' +
        '                                <div class="select-item J_select hide" data-init-txt="选择城市/地区"></div>\n' +
        '                                <div class="select-item J_select hide" data-init-txt="选择区县"></div>');

});
$(".address-item-new").click(function () {
    $(".container").css("display", "block");
});
$(".close").click(function () {
    $(".container").css("display", "none");
});

function getScenemapData() {
    $.ajax({
        url: "../res/address.json", //json文件位置
        type: "GET", //请求方式为get
        dataType: "json",
        async: false,
        success: function (data) { //请求成功完成后要执行的方法
            addressData = data;
        }
    })
}


function getQueryVariable(variable) {
    let query = window.location.search.substring(1);
    let vars = query.split("&");
    for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return (false);
}


function ajax_test(id) {
    $.ajax({
        url: "/ShowDetailGood", //json文件位置
        type: "POST", //请求方式为get
        dataType: "json", //返回数据格式为json
        data: {"id": id},
        async: false,
        success: function (data) {
            $("#classify_name").text(data.classify.classifyName);
            $("#classify_name").attr("href", "http://localhost:8080/main/view/getGoodsList.html?classifyId=" + data.classify.id);
            $("#generalities_name").text(data.classify.generalities.generalitiesName);
            $("#generalities_name").attr("href", "http://localhost:8080/main/view/getGoodsList.html?classifyId=" + data.classify.generalities.id);
            $(".goods_describe_name").text(data.composeGoodName);
            $("#goods_describe_pc").text("￥" + data.composeGoodPrice + ".00");
            $(".goods_describe_ds").html("<li>净重：" + data.composeGoodWeight + "g/杯</li><li>服务：由果酷负责发货，并提供售后服务。</li>");
            let index = 0;
            $.each(data.composeGoodImgs, function (k, v) {
                if (index == 0) {
                    $("#bigimg").attr("src", v.composeGoodImg);
                }
                if (v.imgType == 0) {
                    $(".goods_small_image_scoll_rongqi").append(' <ul class="goods_small_image_scoll_itme_ul">\n' +
                        '                        <li><img src="' + v.composeGoodImg + '"></li>\n' +
                        '                        </ul>')
                } else {
                    $(".goods_signal_describe").append('<img src="' + v.composeGoodImg + '" alt="" />\n')
                }
                index += 1;
            })
        }
    });
}

ajax_test(getQueryVariable("id"));

/*
* 商品小图滑动效果
* */
$(".goods_small_image_scoll_left").click(function () {
    var margin = $(".goods_small_image_scoll_rongqi").css("margin-left");
    console.log(margin)
    margin = Number.parseInt(margin);
    console.log(margin)
    var num = $(".goods_small_image_scoll_rongqi").children("ul").length;
    console.log(num);
    if (88 * num >= 355) {
        if (margin > -88 * (num - 4))
            $(".goods_small_image_scoll_rongqi").css("margin-left", margin - 88);
    }
})
$(".goods_small_image_scoll_right").click(function () {
    var margin = $(".goods_small_image_scoll_rongqi").css("margin-left");
    console.log(margin)
    margin = Number.parseInt(margin);
    console.log(margin)

    if (margin < 0) {
        margin = margin + 80
        if (margin > 0) {
            margin = 0;
        }
        $(".goods_small_image_scoll_rongqi").css("margin-left", margin);

    }
})


/*选择商品规格js
*商品小图片滑动展示大图
*
* */
$('.goods_product_guige,.goods_compose_fruit').click(function () {
    $(this).children("li").css("border", "1px solid red");
})
$('.goods_small_image_scoll_itme_ul img').hover(function () {
    // $(this).css("border", "2px solid black");
    var src = $(this).attr("src");
    $("#bigimg").attr("src", src);
}, function () {
    $(this).css("border", " 1px solid #CCC");
})
/**
 * 商品数量添加
 */
$(".add_goods").click(function () {
    let num = $(this).parent().children("input").eq(0).val();
    $(this).parent().children("input").eq(0).val(parseInt(num) + 1);
});
$(".delete_goods").click(function () {
    let num = $(this).parent().children("input").eq(0).val();
    if (num > 1) {
        $(this).parent().children("input").eq(0).val(parseInt(num) - 1);
    }
});
/**购买商品**/
$('.goods_describe_option li').click(function () {
    $('.goods_describe_option li').css("background-color", "#ffeded")
    $('.goods_describe_option li').children("a").css("color", "#d2605e")
    $(this).css("background-color", "#e51e13")
    $(this).children("a").css("color", "white")
})


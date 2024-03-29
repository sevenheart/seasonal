function getQueryVariable(variable) {
    let query = window.location.search.substring(1);
    let vars = query.split("&");
    for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split("=");
        if (pair[0] === variable) {
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
        data: {"id": id, "userId": userId},
        async: false,
        success: function (data) {
            const $cname = $("#classify_name");
            const $gname = $("#generalities_name");
            $cname.text(data.classify.classifyName);
            $cname.attr("href", "getGoodsList.html?classifyId=" + data.classify.id);
            $gname.text(data.classify.generalities.generalitiesName);
            $gname.attr("href", "getGoodsList.html?classifyId=" + data.classify.generalities.id);
            $("#good_name").text(data.composeGoodName);
            if (data.skillType === 1) {
                $("#goods_describe_pc").text("￥" + data.secKillGood.seckillPrice + ".00");
                $("#ckill_good_price_t").text("￥" + data.composeGoodPrice + ".00");
                $("#seckill_font").text("该商品正在秒杀！");
            } else {
                $("#goods_describe_pc").text("￥" + data.composeGoodPrice + ".00");
            }
            $(".goods_describe_ds").html("<li>净重：" + data.composeGoodWeight + "g/杯</li><li>服务：由果酷负责发货，并提供售后服务。</li>");
            let index = 0;
            $.each(data.composeGoodImgs, function (k, v) {
                if (index === 0) {
                    $("#bigimg").attr("src", v.composeGoodImg);
                }
                if (v.imgType === 0) {
                    $(".goods_small_image_scoll_rongqi").append(' <ul class="goods_small_image_scoll_itme_ul">\n' +
                        '                        <li><img alt="" src="' + v.composeGoodImg + '"></li>\n' +
                        '                        </ul>');
                } else {
                    $(".goods_signal_describe").append('<img src="' + v.composeGoodImg + '" alt="" />\n');
                }
                index += 1;

            })
            //选择查看用户评论时隐藏商品介绍
            $('#goods_discribe').click(function () {
                $('#goods_discribe_div').hide();
            });
        }
    });
}

ajax_test(getQueryVariable("id"));

/*
* 商品小图滑动效果
* */
let $good_small = $(".goods_small_image_scoll_rongqi");
$(".goods_small_image_scoll_left").click(function () {
    var margin = $good_small.css("margin-left");
    margin = Number.parseInt(margin);
    var num = $good_small.children("ul").length;
    if (88 * num >= 355) {
        if (margin > -88 * (num - 4))
            $(".goods_small_image_scoll_rongqi").css("margin-left", margin - 88);
    }
});
$(".goods_small_image_scoll_right").click(function () {
    var margin = $good_small.css("margin-left");
    margin = Number.parseInt(margin);

    if (margin < 0) {
        margin = margin + 80;
        if (margin > 0) {
            margin = 0;
        }
        $(".goods_small_image_scoll_rongqi").css("margin-left", margin);
    }
});


/*选择商品规格js
*商品小图片滑动展示大图
*
* */
$('.goods_product_guige,.goods_compose_fruit').click(function () {
    $(this).children("li").css("border", "1px solid red");
});
$('.goods_small_image_scoll_itme_ul img').hover(function () {
    // $(this).css("border", "2px solid black");
    var src = $(this).attr("src");
    $("#bigimg").attr("src", src);
}, function () {
    $(this).css("border", " 1px solid #CCC");
});
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
    let $good_de = $('.goods_describe_option li');
    $good_de.css("background-color", "#ffeded");
    $good_de.children("a").css("color", "#d2605e");
    $(this).css("background-color", "#e51e13");
    $(this).children("a").css("color", "white");
});

//添加入购物车
$('.goods_describe_option span').click(function () {
    let goodCount = $('#good_count').val();
    let goodId = getQueryVariable("id");
    if (!(typeof userId === "undefined" || userId === null || userId === "")) {
        $.ajax({
            url: '/addCart',
            type: 'post',
            dataType: 'json',
            data: {'userId': userId, 'goodId': goodId, 'goodCount': goodCount},
            success: function (data) {
                if (data.code === 200) {
                    alert('添加入购物车成功');
                } else if (data.code === 500) {
                    alert('添加入购物车失败,刷新后重试！');
                }
            },
            error: function (data) {
                alert('添加入购物车失败');
            }
        });
    } else {
        alert('请先登录！');
    }
});

// 立即购买
$('.goods_describe_option').find('li').eq(0).click(function () {
    let goodCount = $('#good_count').val();
    let goodId = getQueryVariable("id");
    if (!(typeof userId === "undefined" || userId === null || userId === "")) {
        $.ajax({
            url: '/addCart',
            type: 'post',
            dataType: 'json',
            data: {'userId': userId, 'goodId': goodId, 'goodCount': goodCount},
            success: function (data) {
                if (data.code === 200) {
                    window.open("/cart/view/myCarts.html");
                } else if (data.code === 500) {
                    alert('购买失败,请刷新后重试！');
                }
            },
            error: function (data) {
                alert('购买失败,请刷新后重试！');
            }
        });
    } else {
        alert('请先登录！');
    }
});



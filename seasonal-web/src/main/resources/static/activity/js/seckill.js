$(".selling-item").click(function () {
    $(".comming-item").removeClass("cur");
    $(this).addClass("cur");
    $(".product_box").html("");

});
$(".comming-item").click(function () {
    $(".selling-item").removeClass("cur");
    $(this).addClass("cur");
    $(".product_box").html("");
    $.ajax({
        url: "/ShowSecKillGood", //json文件位置
        type: "POST", //请求方式为get
        data: {"flag": true},
        dataType: "json", //返回数据格式为json
        async: false,
        success: function (data) { //请求成功完成后要执行的方法
            let html = "";
            $.each(data.data, function (k, v) {
                html += ' <div class="ckill_good">\n' +
                    '                        <a href="../../main/view/detailGoods.html?id=' + v.composeGood.id + '"><img src="' + v.composeGood.composeGoodIcon + '"\n' +
                    '                                         style="width: 100%;height: 250px;border-radius: 15px;" alt="' + v.composeGood.composeGoodName + '"/></a>\n' +
                    '                        <span class="ckill_good_name"><a href="../../main/view/detailGoods.html?id=' + v.composeGood.id + '">' + v.composeGood.composeGoodName + '</a></span>\n' +
                    '                        <span class="ckill_good_price">秒杀价：￥' + v.seckillPrice + '.00&nbsp&nbsp</span>\n' +
                    '                        <span class="ckill_good_price_t">￥' + v.composeGood.composeGoodPrice + '.00</span>\n' +
                    '                        <span class="ckill_good_count">一共：' + v.seckillCount + '个</span>\n' +
                    '                        <span class=""></span>\n' +
                    '                    </div>';

                $(".ckill_time").children("span").eq(0).html("下一轮开启时间");
                $(".ckill_time").children("span").eq(1).html(v.seckillTime);
            });
            $(".product_box").html(html);
        }
    });
});

$(".ckill_good_shopping").click(function () {

});

function ajax_test() {
    $.ajax({
        url: "/ShowSecKillGood", //json文件位置
        type: "POST", //请求方式为get
        dataType: "text", //返回数据格式为json
        data: {"flag": true},
        async: false,
        success: function (data) { //请求成功完成后要执行的方法
            console.log(data)
        }

    });
}

ajax_test();
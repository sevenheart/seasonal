var hours;
var minutes;
var seconds;
var ctime;

function seckill() {
    $(".product_box").html("");
    $.ajax({
        url: "/ShowSecKillGood", //json文件位置
        type: "POST", //请求方式为get
        data: {"flag": false},
        dataType: "json", //返回数据格式为json
        async: false,
        success: function (data) { //请求成功完成后要执行的方法
            if (data.code === 100) {
                $(".ckill_time").children("span").eq(0).html("今天的秒杀将在6点开始请关注！");
                $("#tishi").css("display", "block");
                $("#tishi").html("");
                $("#come_time").css("display", "none");
                return;
            }
            console.log(data);
            let html = "";
            $.each(data.data, function (k, v) {
                html += '<div class="ckill_good">\n' +
                    '                        <a href="../../main/view/detailGoods.html?id=' + v.composeGood.id + '"><img\n' +
                    '                                src="' + v.composeGood.composeGoodIcon + '"\n' +
                    '                                style="width: 100%;height: 250px;border-radius: 15px;" alt="' + v.composeGood.composeGoodName + '"/></a>\n' +
                    '                        <span class="ckill_good_name"><a href="../../main/view/detailGoods.html?id=' + v.composeGood.id + '">' + v.composeGood.composeGoodName + '</a></span>\n' +
                    '                        <span class="ckill_good_price">秒杀价：￥' + v.seckillPrice + '.00&nbsp&nbsp</span>\n' +
                    '                        <span class="ckill_good_price_t">￥' + v.composeGood.composeGoodPrice + '.00</span>\n' +
                    '                        <span class="ckill_good_count">还剩：' + v.seckillCount + '个</span>\n' +
                    '                        <span class="ckill_good_shopping" ckid="' + v.composeGood.id + '"><i></i>立即购买</span>\n' +
                    '                    </div>';

                $(".ckill_time").children("span").eq(0).html("本轮秒杀倒计时");
                $("#tishi").css("display", "none");
                $("#come_time").css("display", "block");
            });
            $(".product_box").html(html);
            //购买点击事件
            $(".ckill_good_shopping").click(function () {
                console.log("Aaa");
                let id = $(this).attr("ckid");
                const orderData = {
                    "orderId": random_No(4),
                    "orderUserId": userId.toString(),
                    "goodId": id,
                };
                $.ajax({
                    url: "/seckillGood", //json文件位置
                    type: "POST", //请求方式为post
                    data: JSON.stringify(orderData),
                    contentType: "application/json",
                    dataType: "json", //返回数据格式为json
                    async: false,
                    success: function (data) {
                        console.log(data);
                        if (data.code === 200) {
                            window.open().location = '../../order/view/orderUnpaid.html?orderId=' + data.data;
                        }
                    }
                });

            });
        }
    });
}

//当前秒杀点击事件
$(".selling-item").click(function () {
    $(".comming-item").removeClass("cur");
    $(this).addClass("cur");
    seckill();
});
//下一轮秒杀点击事件
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
            comeTime();
            if (data.code === 101) {
                $(".ckill_time").children("span").eq(0).html("今天的秒杀已经结束请等待下一天的秒杀活动！");
                $("#tishi").css("display", "block");
                $("#tishi").html("");
                $("#come_time").css("display", "none");
                return;
            }
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
                $("#tishi").css("display", "block");
                $("#tishi").html(v.seckillTime);
                $("#come_time").css("display", "none");
            });
            $(".product_box").html(html);
        }
    });
});

//订单号生成 j位随机数
function random_No(j) {
    var random_no = "";
    for (var i = 0; i < j; i++) //j位随机数，用以加在时间戳后面。
    {
        random_no += Math.floor(Math.random() * 10);
    }
    random_no = new Date().getTime() + random_no;
    return random_no;
}


//初始化执行方法
function ajax_test() {
    seckill();
}

//倒计时方法
function comeTime() {
    var myDate = new Date;
    var newDate = new Date;
    var comeDate;
    var h = myDate.getHours();//获取当前小时数(0-23)
    var m = myDate.getMinutes();//获取当前分钟数(0-59)
    var s = myDate.getSeconds();//获取当前秒
    if (h >= 6 && h < 10) {
        newDate.setHours(10);
        newDate.setMinutes(0);
        newDate.setSeconds(0);
        comeDate = newDate.getTime() - myDate.getTime();
        //计算出小时数
        var leave1 = comeDate % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
        hours = Math.floor(leave1 / (3600 * 1000));
        //计算相差分钟数
        var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
        minutes = Math.floor(leave2 / (60 * 1000));
        //计算相差秒数
        var leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
        seconds = Math.round(leave3 / 1000);
    } else if (h >= 10 && h < 14) {
        newDate.setHours(14);
        newDate.setMinutes(0);
        newDate.setSeconds(0);
        comeDate = newDate.getTime() - myDate.getTime();
        //计算出小时数
        var leave1 = comeDate % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
        hours = Math.floor(leave1 / (3600 * 1000));
        //计算相差分钟数
        var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
        minutes = Math.floor(leave2 / (60 * 1000));
        //计算相差秒数
        var leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
        seconds = Math.round(leave3 / 1000);
    } else if (h >= 14 && h < 18) {
        newDate.setHours(18);
        newDate.setMinutes(0);
        newDate.setSeconds(0);
        comeDate = newDate.getTime() - myDate.getTime();
        //计算出小时数
        var leave1 = comeDate % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
        hours = Math.floor(leave1 / (3600 * 1000));
        //计算相差分钟数
        var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
        minutes = Math.floor(leave2 / (60 * 1000));
        //计算相差秒数
        var leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
        seconds = Math.round(leave3 / 1000);
    } else if (h >= 18 && h < 22) {
        newDate.setHours(22);
        newDate.setMinutes(0);
        newDate.setSeconds(0);
        comeDate = newDate.getTime() - myDate.getTime();
        //计算出小时数
        var leave1 = comeDate % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
        hours = Math.floor(leave1 / (3600 * 1000));
        //计算相差分钟数
        var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
        minutes = Math.floor(leave2 / (60 * 1000));
        //计算相差秒数
        var leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
        seconds = Math.round(leave3 / 1000);
    } else {

    }
    ctime = "";

    ctime += "0" + hours;
    ctime += ":";
    if (minutes / 10 < 1) {
        ctime += "0" + minutes;
    } else {
        ctime += minutes;
    }
    ctime += ":";
    if (seconds / 10 < 1) {
        ctime += "0" + seconds;
    } else {
        ctime += seconds;
    }

    $("#come_time").html(ctime);
}

//倒计时每隔1s执行
setInterval("comeTime()", "1000");
ajax_test();
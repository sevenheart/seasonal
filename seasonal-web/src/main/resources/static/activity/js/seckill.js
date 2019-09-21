$(".selling-item").click(function () {
    $(".comming-item").removeClass("cur");
    $(this).addClass("cur");
});
$(".comming-item").click(function () {
    $(".selling-item").removeClass("cur");
    $(this).addClass("cur");
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
            console.log(data);
        }

    });
}

ajax_test();
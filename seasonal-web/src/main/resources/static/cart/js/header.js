$(function() {

    //鼠标滑过英文导航，中英文切换
    $("#home").mouseover(function () {
        $("#home").text("首页");
        $("#home").css("color", "#e51e13");
    });
    $("#home").mouseout(function () {
        $("#home").text("HOME");
        $("#home").css("color", "");
    });
    $("#sales").mouseover(function () {
        $("#sales").text("闪购促销");
        $("#sales").css("color", "#e51e13");
    });
    $("#sales").mouseout(function () {
        $("#sales").text("SALES");
        $("#sales").css("color", "");
    });
    $("#activity").mouseover(function () {
        $("#activity").text("最新活动");
        $("#activity").css("color", "#e51e13");
    });
    $("#activity").mouseout(function () {
        $("#activity").text("ACTIVITY");
        $("#activity").css("color", "");
    });
    $("#taste").mouseover(function () {
        $("#taste").text("免费试吃");
        $("#taste").css("color", "#e51e13");
    });
    $("#taste").mouseout(function () {
        $("#taste").text("TASTE");
        $("#taste").css("color", "");
    });
});

$(".header_nav a").hover(function () {
    const temp = $(this).attr("name");
    $(this).attr("name", $(this).html());
    $(this).html(temp);

}, function () {
    const temp = $(this).attr("name");
    $(this).attr("name", $(this).html());
    $(this).html(temp);
});
$("#main_sub_nav").mouseover(function () {
    $("#main_sub_nav").show();

}).mouseout(function () {
    $("#main_sub_nav").hide()
});
$(".ct_tit").mouseover(function () {
    $(".ct_dv").children("div").hide();
    $(this).next().next().children("div").show();
});

$('#main_nav_goods_nav').hover(function () {
    // 鼠标移入时添加hover类
    $("#main_sub_nav").show();
}, function () {
    // 鼠标移出时移出hover类
    $("#main_sub_nav").hide();
});

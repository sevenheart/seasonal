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
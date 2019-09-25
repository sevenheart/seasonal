//点击重新加载数据选项卡效果
$(".collections-box .orders-ul li").click(function () {
    console.log("点击了")
    $(this).parent("ul").children("li").removeClass("active");
    $(this).addClass("active");
    //在orders-body下追加div即可
    let html = '';

    $(".collections-box .orders-body").html(html);
})
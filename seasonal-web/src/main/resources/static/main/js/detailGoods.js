/*
* 商品小图滑动效果
* */
$(".goods_small_image_scoll_left").click(function () {
    var margin = $(".goods_small_image_scoll_rongqi").css("margin-left");
    console.log(margin)
    margin=Number.parseInt(margin);
    console.log(margin)
    var num = $(".goods_small_image_scoll_rongqi").children("ul").length;
    console.log(num);
    if(88*num >=355) {
        if (margin > -88 * (num - 4))
            $(".goods_small_image_scoll_rongqi").css("margin-left", margin - 88);
    }
})
$(".goods_small_image_scoll_right").click(function () {
    var margin = $(".goods_small_image_scoll_rongqi").css("margin-left");
    console.log(margin)
    margin=Number.parseInt(margin);
    console.log(margin)

    if(margin<0) {
        margin=margin+80
        if (margin>0){
            margin=0;
        }
        $(".goods_small_image_scoll_rongqi").css("margin-left", margin);

    }
})


/*选择商品规格js
*商品小图片滑动展示大图
*
* */
$('.goods_product_guige,.goods_compose_fruit').click(function () {
    $(this).children("li").css("border","1px solid red");
})
$('.goods_small_image_scoll_itme_ul img').hover(function () {
    $(this).css("border","2px solid black");
    var src = $(this).attr("src");
    $("#bigimg").attr("src",src);
},function () {
    $(this).css("border"," 1px solid #CCC");
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
    $('.goods_describe_option li').css("background-color","#ffeded")
    $('.goods_describe_option li').children("a").css("color","#d2605e")
    $(this).css("background-color","#e51e13")
    $(this).children("a").css("color","white")
})

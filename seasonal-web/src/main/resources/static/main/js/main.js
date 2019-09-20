var userId
window.onload = function () {
    $.ajax({
        url: "/getsessionUserId",
        type: "post",
        dataType: "text",
        success: function (data) {
            userId = data
            console.log('userid:' + userId)
            if (data){
                console.log("success->userId:" + userId)
                $('.already-login').text('')
                $('.already-login').text(userId)
                $('.login-span').css('display', 'inline')
                $('.already-login').css('display','inline')
                $('.registration img').css('display', 'none')
                $('.registration a').css('display', 'none')
                $('.not-login').css('display','none')
                $('.cancellation').css('display', 'inline')
            } else{
                $('.already-login').text('')
                $('.login-span').css('display', 'none')
                $('.already-login').css('display','none')
                $('.registration img').css('display', 'inline')
                $('.registration a').css('display', 'inline')
                $('.not-login').css('display','inline')
                $('.cancellation').css('display', 'none')
            }
        },
        error: function (data) {
            console.log('error:' + data)
        }
    })
}

$(document).on('click','.cancellation',function () {

    $.ajax({
        url:"/cancellation",
        type:"post",
        dataType: "text",
        success:function (data) {
            alert("退出成功")
            window.location.reload();
        }
    })
})

$(function () {
    // showAD();
    setInterval("showAD()", 4000);
});

let t = 1;

function showAD() {
    if (t === 1) {
        $("#img4").hide();
        $("#img1").show();
        t += 1;
        return;
    }
    if (t === 2) {
        $("#img1").hide();
        $("#img2").show();
        t += 1;
        return;
    }
    if (t === 3) {
        $("#img2").hide();
        $("#img3").show();
        t += 1;
        return;
    }
    if (t === 4) {
        $("#img3").hide();
        $("#img4").show();
        t = 1;
    }

}

$(".goods_show_nav_ul_li").hover(function () {
    $(this).parent().children(".goods_show_nav_ul_li").css("background-color", "white");
    $(this).parent().children(".goods_show_nav_ul_li").children("a").css("color", "#666");
    $(this).css("background-color", "#e51e13");
    $(this).children("a").css("color", "white");
    const $goodShowNavUlLi = $(this);
    let num;//对应第几个div
    $(this).parent().children(".goods_show_nav_ul_li").each(function (i) {
        if ($(this).index() === $goodShowNavUlLi.index()) {//遍历判断找到和当前元素一样的标签来确定div是第几个
            num = i;
        }
    });
    const $father = $(this).parent().parent();
    const $children = $father.next().children(".main_right");//找到nav对应的所有的div
    $children.each(function (i) {
        if (i === num) {//如果div等于nav对应的值就显示div
            $(this).css("display", "block");
        } else {//将不是对应的div全部隐藏
            $(this).css("display", "none");
        }
    });
});
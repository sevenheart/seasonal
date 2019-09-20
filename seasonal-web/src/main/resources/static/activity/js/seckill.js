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
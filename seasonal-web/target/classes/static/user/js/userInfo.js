//个人信息的展示
$(".userinfo-box .user-info .head-img img").attr("src",userImg);
$(".userinfo-box .nick-name-txt").text(userName);
$('.userinfo-box .user-money').text("我的id："+userId);
//查询待付款信息
/*$.post(function () {
    url: "/upsertcomment",
        data: mongocomment,
        dataType: "json",
        success: function (data) {
        alert(data.message);
        $('#commentmodal').modal("hide")
    }
})*/

//推荐商品的图片地址

$.post({
    url:"/FindUpGoodsByNumber",
    dataType: "json",
    success: function (data) {
        let html='';
        $.each(data.data,function (i,content) {

            html+=' <a href="/main/view/detailGoods.html?id='+content.id+'" class=\n' +
                '                        "link recommend-item-box" target="_blank">\n' +
                '\n' +
                '                    <div class="recommend-card-wrapper">\n' +
                '                        <div class="img-box"><img src="'+content.composeGoodIcon+'"' +
                '                                                  class="image"></div>\n' +
                '\n' +
                '                        <div class="info-box">\n' +
                '                            <div class="title" title="">\n' +
                '                                '+content.composeGoodName+'\n' +
                '                            </div>\n' +
                '\n' +
                '                            <div class="score-line">\n' +
                '                                <div class="score rate-stars">\n' +
                '                                    <ul class="rate-stars-ul rate-stars-dark">\n' +
                '                                        <li><img  src="../css/xingxing%20.png"></li>\n' +
                '                                        <li><img src="../css/xingxing%20.png"></li>\n' +
                '                                        <li><img  src="../css/xingxing%20.png"></li>\n' +
                '                                        <li><img  src="../css/xingxing%20.png"></li>\n' +
                '                                        <li><img src="../css/xingxing%20.png"></li>\n' +
                '                                    </ul>\n' +
                '                                </div>\n' +
                '\n' +
                '                                <div class="comment-number">\n' +
                '                                    '+content.commentNumber+'个评价\n' +
                '                                </div>\n' +
                '                            </div>\n' +
                '\n' +
                '                            <div class="desc-line">应季精选</div>\n' +
                '\n' +
                '                            <div class="bottom-line price-box">\n' +
                '            <span><span class="yuan">￥</span><span class=\n' +
                '                                                           "price-number numfont">'+content.composeGoodPrice+'</span><span class=\n' +
                '                                                                                                           "price-desc">起</span></span>\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                    </div></a>';
        })
        $('.recommend-list').append(html);
    }
})
/*查找待评论的数量*/
$.post({
    url:"/FindNoCommentGoods",
    data:{"userId":userId},
    dataType:"json",
    success:function (data) {
        //查询待评论
        $('.userfn-ls .userfn-ul ').children("li").eq(2).children().append('<b class="num">'+data.data.length+'</b>');

    }
})
var num = 18;
//带付款个数
//$('.userfn-ls .userfn-ul ').children("li").eq(1).children().append('<b class="num">'+num+'</b>');


//通知标识
//$('.userfn-ls .userfn-ul ').children("li").eq(4).children().append('<b class="num">'+num+'</b>');








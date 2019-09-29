var num;//数据总条数
var pagesize = 5;//每页的条数
var arr1;//用来所有存储数据
var nowPage = 1;//当前页

//点击重新加载数据选项卡效果
$(".collections-box .orders-ul li").click(function () {
    console.log("点击了");
    $(this).parent("ul").children("li").removeClass("active");
    $(this).addClass("active");
    //在orders-body下追加div即可
    let html = '';
    $(".collections-box .orders-body").html(html);
});

//查询收藏信息，判断是否已收藏
$.ajax({
    url: "/selectAllCollectionById",
    type: "POST",
    dataType: "json",
    data: {"userId": userId},
    async: false,
    success: function (data) {
        if (data.code === 200) {
            num = data.data.length;
            arr1 = data.data;
            //给分页初始化赋值
            var html1 = "";
            for (let j = 0; j < pagesize; j++) {
                if (j <= arr1.length - 1) {
                    html1 +=('<div class="col-item clearfix" value="' + j + '">' +
                        '<div class="item-img">' +
                        '<img src="' + arr1[j].composeGood.composeGoodIcon +
                        '" class="image">' +
                        '</div>' +
                        '<div class="item-info">' +
                        '<p class="poi-name">' + arr1[j].composeGood.composeGoodName +
                        '</p>' +
                        '<p class="poi-price">￥' + arr1[j].composeGood.composeGoodPrice +
                        '元</p>' +
                        '<div class="rate-stars">' +
                        '<ul class="rate-stars-ul rate-stars-dark"></ul>' +
                        '<ul class="rate-stars-ul rate-stars-light" style="width: 100%;"></ul>' +
                        '</div>' +
                        '</div>' +
                        '<div class="btn-box">' +
                        '<a href="/main/view/detailGoods.html?id=' + arr1[j].goodId +
                        '" class="link show-deal" target="_blank">进入商品</a>' +
                        '<a href="javascript:void(0);" value="' + arr1[j].goodId + '" class="link delete-collection">删除</a>' +
                        '</div>' +
                        '</div>');
                }
            }
            $('.col-poi').html(html1);
        } else {
            $('.col-poi').append('<div>' +
                '<p class="no-collection-text">' + data.message + '</p>' +
                '</div>');
        }
    }
});


//删除商品收藏的点击事件
$(document).on('click', '.col-poi .btn-box .delete-collection', function () {
    var goodId = $(this).attr("value");
    let col_item = $(this).parents('.btn-box').parents('.col-item');
    //删除收藏信息
    $.ajax({
        url: "/DeleteGoodCollection",
        type: "POST",
        dataType: "json",
        data: {"userId": userId, "goodId": goodId},
        async: false,
        success: function (data) {
            if (data.code === 200) {
                if ($('.col-item').length === 1) {
                    $('.col-poi').html('<div>' +
                        '<p class="no-collection-text">您还没有收藏哟！</p>' +
                        '</div>');
                } else {
                    col_item.remove();

                }
            } else {
                alert("删除失败，请刷新重试！");
            }
        }
    })
});

//分页,显示数据条数
var $content = $('.content');
Helper.ui.page("#page-2", {
    total: num,
    pageSize: pagesize,
    showTotal: true,
    change: function (i) {
        createContent(i, 1);//change事件，只有发生改变是才会触发，所以需要给分页初始化值
    }
});
//换页是触发change方法，执行该函数
function createContent(i, index) {
    var html = "";
    for (let j = 0; j < pagesize; j++) {
        if (((i - 1) * pagesize + j) <= arr1.length - 1) {
            html +=('<div class="col-item clearfix" value="' + ((i - 1) * pagesize + j) + '">' +
                '<div class="item-img">' +
                '<img src="' + arr1[(i - 1) * pagesize + j].composeGood.composeGoodIcon +
                '" class="image">' +
                '</div>' +
                '<div class="item-info">' +
                '<p class="poi-name">' + arr1[(i - 1) * pagesize + j].composeGood.composeGoodName +
                '</p>' +
                '<p class="poi-price">￥' + arr1[(i - 1) * pagesize + j].composeGood.composeGoodPrice +
                '元</p>' +
                '<div class="rate-stars">' +
                '<ul class="rate-stars-ul rate-stars-dark"></ul>' +
                '<ul class="rate-stars-ul rate-stars-light" style="width: 100%;"></ul>' +
                '</div>' +
                '</div>' +
                '<div class="btn-box">' +
                '<a href="/main/view/detailGoods.html?id=' + arr1[(i - 1) * pagesize + j].goodId +
                '" class="link show-deal" target="_blank">进入商品</a>' +
                '<a href="javascript:void(0);" value="' + arr1[(i - 1) * pagesize + j].goodId + '" class="link delete-collection">删除</a>' +
                '</div>' +
                '</div>');
        }
    }
    $content.empty().html(html);
}










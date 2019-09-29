var collectionsHtml = '';
var collectionsCount = 0;
var collectionArray = new Array();
const $col_poi = $('.col-poi');

//查询收藏信息，判断是否已收藏
$.ajax({
    url: "/selectAllCollectionById",
    type: "POST",
    dataType: "json",
    data: {"userId": userId},
    async: false,
    success: function (data) {
        if (data.code === 200) {
            $.each(data.data, function (k, v) {//所有收藏商品的kv对(如专利分格：value)
                collectionsCount++;
                collectionsHtml += '<div class="col-item clearfix">' +
                    '<div class="item-img">' +
                    '<img src="' + v.composeGood.composeGoodIcon +
                    '" class="image">' +
                    '</div>' +
                    '<div class="item-info">' +
                    '<p class="poi-name">' + v.composeGood.composeGoodName +
                    '</p>' +
                    '<p class="poi-price">￥' + v.composeGood.composeGoodPrice +
                    '元</p>' +
                    '<div class="rate-stars">' +
                    '<ul class="rate-stars-ul rate-stars-dark"></ul>' +
                    '<ul class="rate-stars-ul rate-stars-light" style="width: 100%;"></ul>' +
                    '</div>' +
                    '</div>' +
                    '<div class="btn-box">' +
                    '<a href="/main/view/detailGoods.html?id=' + v.goodId +
                    '" class="link show-deal" target="_blank">进入商品</a>' +
                    '<a href="javascript:void(0);" value="' + v.goodId + '" class="link delete-collection">删除</a>' +
                    '</div>' +
                    '</div>';
                if(collectionsCount % 5 === 0){
                    collectionArray.push(collectionsHtml);
                    collectionsHtml = '';
                }
            });
            if(collectionsCount % 5 !== 0){
                collectionArray.push(collectionsHtml);
                collectionsHtml = '';
            }
            // 调用分页插件回调函数，显示全部订单
            $("#Pagination").pagination(collectionsCount, {
                callback: showAllCollections,
            });
        } else {
            $col_poi.append('<div>' +
                '<p class="no-collection-text">' + data.message + '</p>' +
                '</div>');
        }
    }
});


//删除商品收藏的点击事件
$(document).on('click', '.col-poi .btn-box .delete-collection', function () {
    var goodId = $(this).attr("value");
    let col_item = $(this).parents('.btn-box').parents('.col-item');
    console.log($('.col-item').length);
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
                    $col_poi.html('<div>' +
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

// 根据页码显示相应的页数
function showAllCollections(current_page){
    console.log('页数:'+current_page)
    $col_poi.html(collectionArray[current_page]);
}













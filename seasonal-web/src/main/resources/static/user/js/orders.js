var allOrderHtml = '';
var unpaidHtml = '';
var paidHtml = '';
var orderAndIndex = new Array();

// 查看用户的订单信息
if(orderAndIndex.length === 0) {
    $.post({
        url: "/order/FindAllorderFormById",
        data: {userId: userId},
        async: false,
        dataType: "json",
        success: function (data) {
            console.log(data);
            if (data.code === 100) {
                console.log("查询失败！");
                //alert("没有订单信息！");
            } else if (data.code === 200) {
                $.each(data.data, function (i, value) {
                    showOrders(i, value);
                })
            }
        }
    });
}

function showOrders(i, data){
    var goodsCount = 0;
    var goodsPrice = 0;
    var status;
    orderAndIndex.push(data);
    var orderStatus = data.orderStatus;
    var goodsIcon = data.detailedCommodityForms[0].composeGoods[0].composeGoodIcon;
    var goodsName = data.detailedCommodityForms[0].composeGoods[0].composeGoodName + '...';
    var orderUrl;

    // 确认该订单的支付状态
    if(orderStatus === 1){
        status = '已支付';
        orderUrl = '/user/view/orderDetails.html?index=' + i;
    }else{
        status = '未支付';
        orderUrl = '/order/view/orderUnpaid.html?orderId=' + data.orderId;
    }

    // 遍历该订单中的所有商品，并将该商品显示到页面
    $.each(data.detailedCommodityForms, function (i, value) {
        goodsCount += value.goodCount;
        goodsPrice += value.goodCount * value.composeGoods[0].composeGoodPrice;
    });

    let orderHtml = '<div class="order-item clearfix">\n' +
        '                            <div class="order-img">\n' +
        '                                <a href="'+ orderUrl +'" class="link" target="_blank">\n' +
        '                                    <div><img src="'+ goodsIcon +'" class="image" alt=""></div></a>\n' +
        '                            </div>\n' +
        '                            <div class="order-info info-box">\n' +
        '                                <a href="'+ orderUrl +'" class="link" target="_blank">\n' +
        '                                    <p class="order-title" >'+ goodsName +'</p></a>\n' +
        '                                <p class="info">商品数量：'+ goodsCount +'个</p>\n' +
        '                            </div>\n' +
        '                            <div class="order-price">\n' +
        '                                总价：¥'+ goodsPrice +'\n' +
        '                            </div>\n' +
        '                            <div class="order-status">\n' +
        '                                '+ status +'\n' +
        '                            </div>\n' +
        '                            <div class="order-btn"></div>\n' +
        '                        </div>';

    allOrderHtml += orderHtml;
    if(orderStatus === 1){
        paidHtml += orderHtml;
    }else{
        unpaidHtml += orderHtml;
    }

    $('.orders-body').html(allOrderHtml);
}

//点击重新加载数据选项卡效果
$(".orders-box .orders-ul li").click(function () {
    $(this).parent("ul").children("li").removeClass("active");
    $(this).addClass("active");
    let labelName = $(this).text();
    const $orders_body = $(".orders-box .orders-body");
    //在orders-body下追加div即可

    if(labelName === '全部订单'){
        $orders_body.html(allOrderHtml);
    }else if(labelName === '待付款'){
        if(unpaidHtml === ''){
            unpaidHtml = '<div>\n' +
                '                            <p class="no-order-text">您暂时还没有订单</p>\n' +
                '                        </div>';
        }
        $orders_body.html(unpaidHtml);
    }else if(labelName === '已付款'){
        if(paidHtml === ''){
            paidHtml = '<div>\n' +
                '                            <p class="no-order-text">您暂时还没有订单</p>\n' +
                '                        </div>';
        }
        $orders_body.html(paidHtml);
    }
});
var allOrderHtml = '';
var unpaidHtml = '';
var paidHtml = '';

console.log('userId:'+userId)
//查中用户的订单信息
//评论情况信息
$.post({
    url:"/order/FindAllorderFormById",
    data:{userId:userId},
    async:false,
    dataType:"json",
    success:function (data) {
        console.log(data);
        if(data.code === 100){
            console.log("查询失败！");
            alert("没有订单信息！");
        }else if(data.code === 200){
            $.each(data.data, function (i, value) {
                showOrders(value.detailedCommodityForms, value.orderStatus);
            })
        }
    }
});

function showOrders(data, orderStatus){
    // 确认该订单的支付状态
    if(orderStatus === 1){
        var status = '已支付';
    }else{
        var status = '未支付';
    }
    // 遍历该订单中的所有商品，并将该商品显示到页面
    $.each(data, function (i, value) {
        let orderHtml = '<div class="order-item clearfix">\n' +
            '                            <div class="order-img">\n' +
            '                                <a href="'+ value.composeGoods[0].id +'" class="link" target="_blank">\n' +
            '                                    <div><img src="'+ value.composeGoods[0].composeGoodIcon +'" class="image"></div></a>\n' +
            '                            </div>\n' +
            '                            <div class="order-info info-box">\n' +
            '                                <a href="http://maoyan.com/order/detail/21282407199/" class="link" target="_blank">\n' +
            '                                    <p class="order-title" >'+ value.composeGoods[0].composeGoodName +'</p></a>\n' +
            '                                <p class="info">商品数量：'+ value.goodCount +'个</p>\n' +
            '                            </div>\n' +
            '                            <div class="order-price">\n' +
            '                                总价：¥'+ value.goodCount * value.composeGoods[0].composeGoodPrice +'\n' +
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
    });

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
        $orders_body.html(unpaidHtml);
    }else if(labelName === '已付款'){
        $orders_body.html(paidHtml);
    }
})
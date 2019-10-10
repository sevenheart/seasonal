var allOrderHtml = '';
var unpaidHtml = '';
var paidHtml = '';
var orderAndIndex = new Array();
var allOrderArray = new Array();
var unpaidArray = new Array();
var paidArray = new Array();
let unpaidCount = 0;
let paidCount = 0;
const $orders_body = $(".orders-box .orders-body");

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
                    collationOrders(i, value);
                });
                // 判断是否还有剩余的订单
                if(orderAndIndex.length % 5 !== 0){
                    allOrderArray.push(allOrderHtml);
                    allOrderHtml = '';
                }
                if(unpaidCount % 5 !== 0){
                    unpaidArray.push(unpaidHtml);
                    unpaidHtml = '';
                }
                if(paidCount % 5 !== 0){
                    paidArray.push(paidHtml);
                    paidHtml = '';
                }

                // 调用分页插件回调函数，显示全部订单
                $("#Pagination").pagination(orderAndIndex.length, {
                    callback: showAllOrders,
                });
            }
        }
    });
}

// 分页整理
function collationOrders(i, data){
    // 订单中商品数量
    var goodsCount = 0;
    // 订单总价格
    var goodsPrice = data.orderMoney;
    var status;
    // 将订单按排序索引存入到数组中
    orderAndIndex.push(data);
    // 获取当前订单状态
    var orderStatus = data.orderStatus;
    // 订单显示第一张图片
    var goodsIcon = data.detailedCommodityForms[0].composeGoods[0].composeGoodIcon;
    // 订单描述名称
    var goodsName = data.detailedCommodityForms[0].composeGoods[0].composeGoodName + '...';
    // 订单跳转url
    var orderUrl;

    // 确认该订单的支付状态
    if(orderStatus === 1){
        status = '已支付';
        orderUrl = '/user/view/orderDetails.html?index=' + i;
    }else{
        status = '未支付';
        orderUrl = '/order/view/orderUnpaid.html?orderId=' + data.orderId;
    }

    // 遍历该订单中的所有商品，获取商品数量
    $.each(data.detailedCommodityForms, function (i, value) {
        goodsCount += value.goodCount;
    });

    let orderHtml = '<div class="order-item clearfix">\n' +
        '                            <div class="order-img">\n' +
        '                                <a href="'+ orderUrl +'" class="link" target="_blank" title="查看订单详情">\n' +
        '                                    <div><img src="'+ goodsIcon +'" class="image" alt=""></div></a>\n' +
        '                            </div>\n' +
        '                            <div class="order-info info-box">\n' +
        '                                <a href="'+ orderUrl +'" class="link" target="_blank" title="查看订单详情">\n' +
        '                                    <p class="order-title" >'+ goodsName +'</p></a>\n' +
        '                                <p class="info">商品数量：'+ goodsCount +'个</p>\n' +
        '                            </div>\n' +
        '                            <div class="order-price">\n' +
        '                                总价：¥'+ goodsPrice +'\n' +
        '                            </div>\n' +
        '                            <div class="order-status">\n' +
        '                                '+ status +'\n' +
        '                            </div>\n' +
        '                            <div class="showtime">\n' +
        '                                '+ data.createTime +'\n' +
        '                            </div>\n' +
        '                            <div class="order-btn"></div>\n' +
        '                        </div>';

    allOrderHtml = allOrderHtml + orderHtml;
    if(orderAndIndex.length % 5 === 0){
        allOrderArray.push(allOrderHtml);
        allOrderHtml = '';
    }
    if(orderStatus === 1){
        paidCount++;
        paidHtml = paidHtml + orderHtml;
        if(paidCount % 5 === 0){
            paidArray.push(paidHtml);
            paidHtml = '';
        }
    }else{
        unpaidCount++;
        unpaidHtml = unpaidHtml + orderHtml;
        if(unpaidCount % 5 === 0){
            unpaidArray.push(unpaidHtml);
            unpaidHtml = '';
        }
    }
}

//点击重新加载数据选项卡效果
$(".orders-box .orders-ul li").click(function () {
    $(this).parent("ul").children("li").removeClass("active");
    $(this).addClass("active");
    let labelName = $(this).text();
    //在orders-body下追加div即可

    if(labelName === '全部订单'){
        // 显示全部订单
        if(allOrderArray.length !== 0){
            $("#Pagination").pagination(orderAndIndex.length, {
                callback: showAllOrders,
            });
        }
    }else if(labelName === '待付款'){
        if(unpaidArray.length === 0) {
            unpaidHtml = '<div>\n' +
                '                            <p class="no-order-text">您暂时还没有订单</p>\n' +
                '                        </div>';
            unpaidArray.push(unpaidHtml);
            unpaidHtml = '';
        }
        $("#Pagination").pagination(unpaidCount, {
            callback: showUnpaidOrders,
        });
    }else if(labelName === '已付款'){
        if(paidArray.length === 0){
            paidHtml = '<div>\n' +
                '                            <p class="no-order-text">您暂时还没有订单</p>\n' +
                '                        </div>';
            paidArray.push(paidHtml);
            paidHtml = '';
        }
        $("#Pagination").pagination(paidCount, {
            callback: showPaidOrders,
        });
    }
});

// 根据页码显示相应的页数
function showAllOrders(current_page){
    $orders_body.html(allOrderArray[current_page]);
}

// 根据页码显示相应的页数
function showUnpaidOrders(current_page) {
    $orders_body.html(unpaidArray[current_page]);
}

// 根据页码显示相应的页数
function showPaidOrders(current_page) {
    $orders_body.html(paidArray[current_page]);
}
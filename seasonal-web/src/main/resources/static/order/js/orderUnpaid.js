function getQueryVariable(variable) {
    let query = window.location.search.substring(1);
    let vars = query.split("&");
    for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split("=");
        if (pair[0] === variable) {
            return pair[1];
        }
    }    return (false);
}


let orderId;
let money;
$.ajax({
    url: "/order/FindOrderFormById",
    type: "get",
    dataType: "json",
    data: {"orderId": getQueryVariable("orderId")},
    async: false,
    success: function (data) {
        if(data.data.orderStatus ===1){
            $(location).attr('href', "../view/orderCome.html");
        }else{
            orderId = data.data.detailedCommodityForms[0].orderId;
            money = data.data.orderMoney;
            $("#order-id").text("订单ID:" + orderId);
            $("#order-money").text(data.data.orderMoney);
            $("#order-zhifu").text(data.data.orderMoney);
            //陆旭加了两个input赋值
            $('#WIDtotal_amount').val(money);
            $('#WIDout_trade_no').val(orderId);
        }
    }
});

function getQueryVariable(variable) {
    let query = window.location.search.substring(1);
    let vars = query.split("&");
    for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split("=");
        if (pair[0] === variable) {
            return pair[1];
        }
    }
    return (false);
}

let orderId = data.data.detailedCommodityForms[0].orderId;
let money = data.data.orderMoney;

$.ajax({
    url: "/order/FindOrderFormById",
    type: "post",
    dataType: "json",
    data: {"orderId": getQueryVariable("orderId")},
    async: false,
    success: function (data) {
        console.log(data);
        $("#order-id").text("订单ID:" + orderId);
        $("#order-money").text(data.data.orderMoney);
        $("#order-zhifu").text(data.data.orderMoney);
    }
});

$(".btn").click(function () {

});

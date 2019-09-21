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

let orderId;
let money;
$.ajax({
    url: "/order/FindOrderFormById",
    type: "post",
    dataType: "json",
    data: {"orderId": getQueryVariable("orderId")},
    async: false,
    success: function (data) {
        orderId = data.data.detailedCommodityForms[0].orderId;
        console.log(data);
        money = data.data.orderMoney;
        $("#order-id").text("订单ID:" + orderId);

        $("#order-money").text(data.data.orderMoney);
        $("#order-zhifu").text(data.data.orderMoney);
        //陆旭加了两个input赋值
        $('#WIDtotal_amount').val(money);
        $('#WIDout_trade_no').val(orderId);
    }
});
//付款按钮点击事件
//完成付款页跳转。
/*$(".btn").click(function () {
    console.log("哈hi到后");
    $.ajax({
        url: "/PayMoney",
        data: {"WIDout_trade_no": orderId, "WIDtotal_amount": money, "WIDsubject": " ", "WIDbody": " "},
        dataType:'json',
        type: "post",
        success: function (data) {
            alert("成功");
        }
    })
    console.log("sjkdlfjl")

});*/

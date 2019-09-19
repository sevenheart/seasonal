//订单商品列表
var good_id_arrary = new Array(10);
good_id_arrary.unshift("1");
good_id_arrary.unshift("2");
//订单商品价格列表
var good_price_array = new Array(10);
good_price_array.unshift("22");
good_price_array.unshift("20");
//订单商品数量列表
var good_count_array = new Array(10);
good_count_array.unshift("3");
good_count_array.unshift("2");
let html = "";
let order_money = 50;//订单金额
const order_user_id = "001";//用户id
const order_name = "春野樱";
// let delivery_way = "0";//配送方式
// let delivery_money = "20"//配送费
// let good_type = "0";//商品类型
//保存查到后拼接完成的地址信息
let address_array = new Array(10);
//将拼接完成的地址信息继续拼接成html要用的代码
let html_address = new Array(10);
let html_address_sum = 0;
let html_address_name = new Array(10);
let html_address_phone = new Array(10);
let delivery_way = 0;

//订单号生成 j位随机数
function random_No(j) {
    var random_no = "";
    for (var i = 0; i < j; i++) //j位随机数，用以加在时间戳后面。
    {
        random_no += Math.floor(Math.random() * 10);
    }
    random_no = new Date().getTime() + random_no;
    return random_no;
}

$("#ctf-js").click(function () {
    const cart_flow = $("#cart-flow");
    const cart = $("#cart");
    cart_flow.children("li").eq(1).removeClass("c-f-li-cur");
    cart_flow.children("li").eq(2).addClass("c-f-li-cur");
    $("#c-f-img").css("background", "url(\"../../img/cart/cart_main.png\") no-repeat 0px -303px");
    cart.children("ul").css("display", "none");

    //生成带有4位随机数和时间戳的订单ID
    const orderId = random_No(4);

    $.ajax({
        url: "/address/selectalladdress",
        type: "post",
        data: {"userId": order_user_id},
        dataType: "json",
        async: false,
        success: function (data) {
            $.each(data.data, function (k, v) {
                let user_address = "";
                user_address += v.province;
                user_address += v.city;
                user_address += v.district;
                user_address += v.address;
                address_array[k] = (user_address);
                html_address_name[k] = v.userName;
                html_address_phone[k] = v.userPhone;
                html_address[k] = '<option value="' + user_address + '">' + user_address + '</option>';
                html_address_sum += 1;
            });
        }
    });

    html += '<div style="width: 80%;height: 400px;margin: 50px auto">\n' +
        '        <div style="width: 58%;height: 380px;float: left;padding-top: 20px">\n' +
        '            <span class="of">订单编号：</span><span class="of_sp">' + orderId + '</span><br>\n' +
        '            <span class="of">用户ID：</span><span class="of_sp">' + order_user_id + '</span><br>\n' +
        '            <span class="of">用户名：</span><span class="of_sp">' + order_name + '</span><br>';
    for (let i = 0; i < 3; i++) {
        html += '<span class="og">商品一：</span><span class="og_sp">三分果盒：超级精选 单价：￥22 数量：3 </span><br>';
    }
    html += '<span class="og">总价格：</span><span class="og_sp">￥' + order_money + ' </span><br>\n' +
        '            <span class="og">请选择配送方式(配送按每公里1元收取配送费用，自提无费用)：</span><br>\n' +
        '            <span class="og"><input checked="true" id="pick_up" name="allot" type="radio" value="自提"/><label for="pick_up">自提</label></span>\n' +
        '            <span class="og"><input  id="delivery" name="allot" type="radio" value="配送"/><label for="delivery">配送</label></span>\n' +
        '            <span class="og" id="allot_price">配送费：￥0</span><br>\n' +
        '            <span class="og" id="allot_address" style="display: none;">选择配送地址:\n' +
        '    \t    <select onchange="allotAddressX(this.options[this.options.selectedIndex].value)" id="allot_address_x">';
    for (let j = 0; html_address_sum > j; j++) {
        html += html_address[j];
    }
    html += '</select></span><br>\n' +
        '            <div id="og_shou" style="display: none"><span class="og">收货人姓名：</span><span class="og_sp" id="og_name"></span><span class="og">收货人联系方式：</span><span class="og_sp" id="og_phone"></span></div><br>\n' +
        '            <a href="#" id="og-f">生成订单</a>\n' +
        '        </div>\n' +
        '        <div style="width: 400px;height: 400px;border: #0000cc 1px solid;float: right"></div>\n' +
        '        <br>\n' +
        '\n' +
        '    </div>';
    cart.append(html);


    $("#pick_up").click(function () {
        //自提按钮点击事件
        delivery_way = 0;
        $("#allot_price").text("配送费：￥0");
        $("#allot_address").css("display", "none");
        $("#og_shou").css("display", "none")
    });
    $("#delivery").click(function () {
        //配送按钮点击事件
        delivery_way = 1;
        $("#allot_price").text("配送费：￥10");
        $("#allot_address").css("display", "block");
        $("#og_shou").css("display", "block")
        $("#og_name").text(html_address_name[0]);
        $("#og_phone").text(html_address_phone[0]);
    });
    // $("#allot_address_x").click(function () {
    // });
    // $("#og-f").click(function () {
    //     $.ajax({
    //         url:"pay",
    //         data:{"WIdout_trade_no":orderId,"good_id":id,"good_count":count,}
    //     })
    // });
    $("#og-f").click(function () {
        var orderData = {
            "orderId": orderId,
            "userId": order_user_id,
            "orderMoney": order_money,
            "goodIdArray": good_id_arrary,
            "goodPriceArray": good_price_array,
            "goodCountArray": good_count_array
        };
        if (delivery_way === 0) {
            $.ajax({
                url: "/ProvideOrderForm",
                type: "post",
                data: JSON.stringify(orderData),
                contentType: "application/json",
                success: function (data) {
                    console.log(data);
                }
            });
        } else {

        }

    });
});

function allotAddressX(value) {
    //value为下拉时option 的value值
    $("#og_name").text(html_address_name[$("#allot_address_x ").get(0).selectedIndex]);
    $("#og_phone").text(html_address_phone[$("#allot_address_x ").get(0).selectedIndex]);
    $("#allot_price").text("配送费：￥20");
}
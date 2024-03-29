//订单商品列表
let good_id_arrary = new Array(10);
//订单商品名列表
let good_name_arrary = new Array(10);
//订单商品价格列表
let good_price_array = new Array(10);
//订单商品数量列表
let good_count_array = new Array(10);

let delivery_address = "";
let order_money = 0;//订单金额
let html = "";
const order_user_id = userId;//用户id
const order_name = userName;//用户名
let delivery_way = 0;//配送方式
let delivery_money = 0;//配送费
let good_type = "0";//商品类型
//保存查到后拼接完成的地址信息
let address_array = new Array(10);
//将拼接完成的地址信息继续拼接成html要用的代码
let html_address = new Array(10);
let html_address_sum = 0;
let html_address_name = new Array(10);
let html_address_phone = new Array(10);

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

// 订单生成前，遍历已选择的商品，获取要购买的商品信息
function orderGoods() {
    $("input[name='goods']").each(function (i) { // 遍历并获取已选商品所需的订单信息
        if ($(this).is(':checked')) {
            good_id_arrary.unshift($(this).val()); // 填入商品id
            good_name_arrary.unshift($('#good_name' + i).text()); // 填入商品id
            good_price_array.unshift($('#price' + i).text()); // 填入商品价钱
            good_count_array.unshift($('#good_count' + i).val()); // 填入商品数量
        }
    })
}

$("#ctf-js").click(function () {
    orderGoods();
    const cart = $("#cart");
    //生成带有4位随机数和时间戳的订单ID
    const orderId = random_No(4);
    cart.html("");
    cart.append('<div id="cart-tit" class="clear">\n' +
        '        <span id="cart-tit-txt">我的购物车</span>\n' +
        '        <ul id="cart-flow" class="clear">\n' +
        '            <li id="c-f-img"></li>\n' +
        '            <li class="c-f-li ">1.我的购物车</li>\n' +
        '            <li class="c-f-li c-f-li-cur">2.填写核对订单信息</li>\n' +
        '            <li class="c-f-li">3.成功提交订单</li>\n' +
        '        </ul>\n' +
        '    </div>');
    $("#c-f-img").css("background", "url(\"https://seasonal-1300148510.cos.ap-shanghai.myqcloud.com/img/cart/cart_main.png\") no-repeat 0px -303px");

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
                html_address[k] = '<option value="' + v.city + '">' + user_address + '</option>';
                html_address_sum += 1;
            });
        }
    });

    html += '<div style="width: 80%;height: 400px;margin: 50px auto">\n' +
        '        <div style="width: 58%;height: 380px;float: left;padding-top: 20px">\n' +
        '            <span class="of">订单编号：</span><span class="of_sp">' + orderId + '</span><br>\n' +
        '            <span class="of">用户ID：</span><span class="of_sp">' + order_user_id + '</span><br>\n' +
        '            <span class="of">用户名：</span><span class="of_sp">' + order_name + '</span><br>';
    for (let i = 0; i < good_id_arrary.length; i++) {
        if (good_id_arrary[i] !== undefined) {
            order_money += Number(good_price_array[i]);
            console.log(good_name_arrary[i]);
            html += '<span class="og">商品' + (i + 1) + '：</span><span class="og_sp">' + good_name_arrary[i] + ' 总价：￥' + good_price_array[i] + ' 数量：' + good_count_array[i] + ' </span><br>';
        }
    }
    html += '<span class="og">总价格：￥</span><span class="og_sp" id="order_money">' + order_money + ' </span><br>\n' +
        '            <span class="og">请选择配送方式(配送按每公里1元收取配送费用，自提无费用)：</span><br>\n' +
        '            <span class="og"><input checked="true" id="pick_up" name="allot" type="radio" value="自提"/><label for="pick_up">自提</label></span>\n' +
        '            <span class="og"><input  id="delivery" name="allot" type="radio" value="配送"/><label for="delivery">配送</label></span>\n' +
        '            <span class="og" id="allot_price">配送费：￥' + delivery_money + '</span><br>\n' +
        '            <span class="og" id="allot_address" style="display: none;">选择配送地址:\n' +
        '    \t    <select onchange="allotAddressX(this.options[this.options.selectedIndex].value, this.options[this.options.selectedIndex].text)" id="allot_address_x">';
    for (let j = 0; html_address_sum > j; j++) {
        html += html_address[j];
    }
    html += '</select></span><br>\n' +
        '            <div id="og_shou" style="display: none"><span class="og">收货人姓名：</span><span class="og_sp" id="og_name"></span><span class="og">收货人联系方式：</span><span class="og_sp" id="og_phone"></span></div><br>\n' +
        '            <a href="#" id="og-f">生成订单</a>\n' +
        '        </div>\n' +
        '        <div style="width: 400px;height: 400px;border: #0000cc 1px solid;float: right" id="container"></div>\n' +
        '        <br>\n' +
        '\n' +
        '    </div>';
    cart.append(html);

    const $pick_up = $("#pick_up");
    //自提按钮点击事件
    $pick_up.click(function () {
        delivery_address = "";
        // 将路线规划的路径显示清除
        driving.clear();

        delivery_way = 0;
        order_money -= delivery_money;
        delivery_money = 0;
        $("#allot_price").text("配送费：￥" + delivery_money);
        $("#allot_address").css("display", "none");
        $("#og_shou").css("display", "none");
        $("#order_money").text(order_money);

        // 判断坐标点列表中是否有值，若无值则重新获取
        if (markers.length === 0) {
            // 遍历判断取出的所有地址中五公里内最近的五个点
            $.each(addressAndDistance, function (i, value) {
                if (Number(value.pickupDistance * 0.001).toFixed(2) > 3.0) {
                    // 若超出范围，则直接跳入下一个循环
                    return true;
                }
                // 五公里范围内的值进入地理编码，获取坐标
                pushMarkers(value);
            });

            // 若坐标点列表有值，则直接显示到地图中
            map.add(markers);

            // 填入用户自己的坐标点
            map.add(markerOptions);
        } else {
            // 若坐标点列表有值，则直接显示到地图中
            map.add(markers);

            // 填入用户自己的坐标点
            map.add(markerOptions);

            // 以用户坐标点为中心，在地图上显示所有坐标点
            map.setFitView(personAddress.location);
        }
    });

    //配送按钮点击事件
    $("#delivery").click(function () {

        // 移除最近的五个地址的坐标点
        map.remove(markers);

        //移除用户自己的坐标点
        map.remove(markerOptions);

        let selectAddress = $('#allot_address_x');

        delivery_way = 1;
        $("#allot_address").css("display", "block");
        $("#og_shou").css("display", "block");
        $("#og_name").text(html_address_name[0]);
        $("#og_phone").text(html_address_phone[0]);

        // 判断地址下拉列表是否选中值，若选中则直接进入路线规划
        if(selectAddress.val() !== '' && selectAddress.val() !== null){
            allotAddressX(selectAddress.val(), selectAddress.text());
        }
    });

    $("#og-f").click(function () {
        const orderData = {
            "orderId": orderId,
            "userId": order_user_id,
            "orderMoney": order_money,
            "goodIdArray": good_id_arrary,
            "goodPriceArray": good_price_array,
            "goodCountArray": good_count_array,
            "goodType": good_type,
            "deliveryMoney": delivery_money,
            "deliveryAddress": delivery_address,
            "deliveryWay": delivery_way
        };
        $.ajax({
            url: "/ProvideOrderForm",
            type: "post",
            data: JSON.stringify(orderData),
            contentType: "application/json",
            success: function (data) {
                console.log(delivery_address);
                if (data.code === 200) {
                    cart.html("");
                    cart.append('<div id="cart-tit" class="clear">\n' +
                        '        <span id="cart-tit-txt">我的购物车</span>\n' +
                        '        <ul id="cart-flow" class="clear">\n' +
                        '            <li id="c-f-img"></li>\n' +
                        '            <li class="c-f-li ">1.我的购物车</li>\n' +
                        '            <li class="c-f-li">2.填写核对订单信息</li>\n' +
                        '            <li class="c-f-li c-f-li-cur">3.成功提交订单</li>\n' +
                        '        </ul>\n' +
                        '    </div>');
                    $("#c-f-img").css("background", "url(\"https://seasonal-1300148510.cos.ap-shanghai.myqcloud.com/img/cart/cart_main.png\") no-repeat 0px -326px");
                    cart.append('<div style="width: 80%;height: 400px;margin: 50px auto">\n' +
                        '    请在新页面支付订单后，耐心等待配送，祝您用餐愉快！    \n' +
                        '    </div>');
                    window.open().location = '../../order/view/orderUnpaid.html?orderId=' + orderId;
                }
            }
        });
    });

    // 订单生成时，重新定义地图，显示到页面中
    map = new AMap.Map('container', {
        resizeEnable: true
    });

    // 地图中加入当前用户自己的坐标点
    map.add(markerOptions);

    // 遍历判断取出的所有地址中五公里内最近的五个点
    if ($pick_up.is(':checked')) {
        $.each(addressAndDistance, function (i, value) {
            if (Number(value.pickupDistance * 0.001).toFixed(2) > 3.0) {
                // 若超出范围，则直接跳入下一个循环
                return true;
            }
            // 三公里范围内的值进入点创建，存入点列表
            pushMarkers(value);
        });
        // 将所有点放入到地图中
        map.add(markers);
        // 以用户的点为中
        map.setFitView(personAddress.location);
    }
});

function allotAddressX(city, address) {
    driving.clear();

    order_money -= delivery_money;
    delivery_money = 0;
    delivery_address = '';

    // city为下拉列表的value值，address为下拉列表的text值，分别表示城市、详细地址
    const $allot_address_x = $("#allot_address_x ");
    $("#og_name").text(html_address_name[$allot_address_x.get(0).selectedIndex]);
    $("#og_phone").text(html_address_phone[$allot_address_x.get(0).selectedIndex]);
    delivery_address = address;

    // 根据city和address值进行路线规划，选出最短路径，并计算配送费
    getGeoCode(city, address);
    setTimeout(function () {
        console.log('deliveryAddress:'+ JSON.stringify(deliveryAddress));
        console.log('最短距离为:'+planDistance * 0.001)
        driving = new AMap.Driving({
            map: map
        });
        delivery_money = parseInt(planDistance * 0.001);
        order_money += delivery_money;
        $("#allot_price").text("配送费：￥" + delivery_money);
        $("#order_money").text(order_money);
        planningRoute(city, address);
    }, 500);
}

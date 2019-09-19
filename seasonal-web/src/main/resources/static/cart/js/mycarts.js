//已选商品数量插入
function chooseNum(chooseGoodsNum) {
    $('#count').text(chooseGoodsNum) //已选商品数量插入
}

//计算已选商品的所有总价格
function sumAllPrice() {
    var sumPrice = 0.00;
    $("input[name='goods']").each(function (i) { //遍历并计算已选商品的所有总价格
        if ($(this).is(':checked')) {
            sumPrice = sumPrice + parseFloat($('#price' + i).text())
        }
    });
    console.log('sumPrice:' + sumPrice);
    $('#total').text(Number(sumPrice).toFixed(2))
}

//商品全选
$("input[name='all']").click(function () {
    console.log('#all:' + $(this).is(':checked'));
    if ($(this).is(':checked')) {
        console.log('.goodsTrue:' + $("input[name='goods']").val());
        $("input[name='all']").prop('checked', true);
        $("input[name='goods']").prop('checked', true);
        chooseNum($("input[name='goods']").length);
        sumAllPrice()
    } else {
        console.log('.goodsFalse:' + $("input[name='goods']").val());
        $("input[name='all']").prop('checked', false);
        $("input[name='goods']").prop('checked', false);
        chooseNum(0);
        sumAllPrice()
    }
})

//商品勾选
$(document).on('click', "input[name='goods']", function () {
    var allGoods = true;//判断所有商品是否已勾选
    var chooseGoodsNum = 0;
    if ($(this).is(':checked')) {
        chooseGoodsNum++
    } else {
        chooseGoodsNum--
    }
    $("input[name='goods']").each(function () { //遍历循环判断所有商品是否已勾选
        if (!$(this).is(':checked')) {
            allGoods = false
        }
    });

    if (allGoods) {
        $("input[name='all']").prop('checked', true)
    } else {
        $("input[name='all']").prop('checked', false)
    }

    chooseNum(chooseGoodsNum);
    sumAllPrice()
});

function minusOneCallback(_input) {
    console.log('-1');
    console.log(_input.parents('ul').children('li').children(':checkbox').val());
    var userId = '002';
    var goodId = _input.parents('ul').children('li').children(':checkbox').val();
    var goodCount = _input.val();
    console.log('userId:' + userId + ',goodId:' + goodId + ',goodCount:' + goodCount);
    updateGoods(userId, goodId, goodCount, _input)
}

function plusOneCallback(_input) {
    console.log('+1');
    console.log(_input.parents('ul').children('li').children(':checkbox').val());
    var userId = '002';
    var goodId = _input.parents('ul').children('li').children(':checkbox').val();
    var goodCount = _input.val();
    console.log('userId:' + userId + ',goodId:' + goodId + ',goodCount:' + goodCount);
    updateGoods(userId, goodId, goodCount, _input)
}

// 修改商品数量
function updateGoods(userId, goodId, goodCount, _input) {
    $.ajax({
        url: '/updateGoodCount',
        type: 'post',
        data: {'userId': userId, 'goodId': goodId, 'goodCount': goodCount},
        dataType: 'json',
        success: function (data) {
            console.log('success:' + data);
            var unitPrice = _input.parents('ul').children('li .co-dj').text();
            var lastPrice = parseFloat(unitPrice) * goodCount;
            _input.parents('ul').children('li .co-je').text(Number(lastPrice).toFixed(2));
            sumAllPrice()
        },
        error: function (data) {
            console.log('error:' + data)
        }
    })
}

var goodHtml = '';

$.ajax({
    url: '/showCartList',
    type: 'post',
    data: {'userId': '002'},
    dataType: 'json',
    success: function (data) {
        $.each(data, function (i, value) {
            goodHtml = goodHtml + '<li class="cart-con-li">\n' +
                '                <ul class="cart-obj clear">\n' +
                '                    <li class="co-inp">\n' +
                '                        <input type="checkbox" name="goods" value="' + value.goodId + '">\n' +
                '                    </li>\n' +
                '                    <li class="co-img">\n' +
                '                        <a href="http://localhost:8080/main/view/detailGoods.html?id=' + value.goodId + '" target="_blank">\n' +
                '                            <img alt="" src="' + value.composeGood.composeGoodIcon + '" width="100" height="100">\n' +
                '                        </a>\n' +
                '                    </li>\n' +
                '                    <li class="co-name">\n' +
                '                        <a href="http://localhost:8080/main/view/detailGoods.html?id=' + value.goodId + '" title="' + value.composeGood.composeGoodName + '" class="hover-a" target="_blank">' + value.composeGood.composeGoodName + '</a>\n' +
                '                    </li>\n' +
                '                    <li class="co-dj" id="">' + value.composeGood.composeGoodPrice + '</li>\n' +
                '                    <li class="co-sl">\n' +
                '                        <span class="co-sl-span">\n' +
                '                            <a href="javascript:;" onclick="minusOne(this);" class="num-changes">-</a>\n' +
                '                            <input type="text" value="' + value.goodCount + '" class="num-inp" onchange="isInteger(this)" maxlength="4" disabled="disabled">\n' +
                '                            <a href="javascript:;" onclick="plusOne(this);" class="num-changes">+</a>\n' +
                '                        </span>\n' +
                '                        <span class="co-sl-remark" title></span>\n' +
                '                    </li>\n' +
                '                    <li class="co-je" id="price' + i + '">' + Number(value.composeGood.composeGoodPrice * value.goodCount).toFixed(2) + '</li>\n' +
                '                    <li class="co-del">\n' +
                '                        <a href="#" onclick="deleteProducts(this)" class="hover-a">删除</a>\n' +
                '                    </li>\n' +
                '                </ul>\n' +
                '            </li>'
        });
        $('#cart-con').html(goodHtml)
    },
    error: function (data) {
        goodHtml = '<div id="mc-msg">\n' +
            '                <span>购物车内暂时没有商品，登录后将显示您之前加入的商品</span>\n' +
            '                <a href="../../login/view/login.html" onclick="">登录</a>\n' +
            '                <a href="../../main/view/main.html">去购物</a>\n' +
            '            </div>';
        $('#cart-con').html(goodHtml)
    }
});

//订单号生成 j位随机数
function random_No(j) {
    var random_no = "";
    for (var i = 0; i < j; i++) //j位随机数，用以加在时间戳后面。
    {
        random_no += Math.floor(Math.random() * 10);
    }
    random_no = new Date().getTime() + random_no;
    return random_no;
};


// let good_id_arary = new Array(10);
// good_id_arary.put("1");
// good_id_arary.put("2");
// let good_price_array = new Array(10);
// good_price_array.put("22");
// good_price_array.put("20");
// let good_count_array = new Array(10);
// good_count_array.put("3");
// good_count_array.put("2");
let html = "";
let order_money = 50;//订单金额
const order_user_id = "001";//用户id
const order_name = "春野樱";
let delivery_way = "0";//配送方式
let delivery_money = "20"//配送费
let good_type = "0";//商品类型
//保存查到后拼接完成的地址信息
let address_array = new Array(10);
//将拼接完成的地址信息继续拼接成html要用的代码
let html_address = new Array(10);
let html_address_sum = 0;

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
            console.log(data);
            $.each(data.data, function (k, v) {
                let user_address = "";
                user_address += v.province;
                user_address += v.city;
                user_address += v.district;
                user_address += v.address;
                address_array[k] = (user_address);
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
    for (let j = 0; j < html_address_sum; j++) {
        console.log(j);
        console.log(html_address);
        html += html_address[j];
    }
    html += '</select></span><br>\n' +
        '            <span class="og">支付方式：</span>\n' +
        '            <span class="og"><input id="wxpay" name="pay" type="radio" value="微信支付"\n' +
        '                                    style="vertical-align:middle;"/><label for="wxpay"><img\n' +
        '                    style="vertical-align:middle;" src="../../img/pc_wxqrpay.png"></label></span>\n' +
        '            <span class="og"><input checked="true" id="alipay" name="pay" type="radio" value="支付宝支付" style="vertical-align:middle;"/><label\n' +
        '                    for="alipay"><img style="vertical-align:middle;" src="../../img/alipaypcnew.png"></label></span>\n' +
        '            <a href="#" id="og-f">结算</a>\n' +
        '        </div>\n' +
        '        <div style="width: 400px;height: 400px;border: #0000cc 1px solid;float: right"></div>\n' +
        '        <br>\n' +
        '\n' +
        '    </div>';
    cart.append(html);


    $("#pick_up").click(function () {
        //自提按钮点击事件
        $("#allot_price").text("配送费：￥0");
        $("#allot_address").css("display", "none");
    });
    $("#delivery").click(function () {
        //配送按钮点击事件
        $("#allot_price").text("配送费：￥10");
        $("#allot_address").css("display", "block");
    });
    // $("#allot_address_x").click(function () {
    // });
    // $("#og-f").click(function () {
    //     $.ajax({
    //         url:"pay",
    //         data:{"WIdout_trade_no":orderId,"good_id":id,"good_count":count,}
    //     })
    // });
});

function allotAddressX(value) {
    //value为下拉时option 的value值
    $("#allot_price").text("配送费：￥20");
}
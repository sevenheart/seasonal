var goodsHtml = '';
var index;

function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    if (url.indexOf("?") !== -1) {    //判断是否有参数
        var str = url.substr(1); //从第一个字符开始 因为第0个是?号 获取所有除问号的所有符串
        strs = str.split("=");   //用等号进行分隔
        index = strs[1];          //直接获取第一个参数
    }
}
GetRequest();

function showDetails() {
    const $tbody = $('.order-table tbody');
    const $price = $('.price-box .price');
    const $info_name = $('.cinema-info .name');
    const $info_address = $('.cinema-info .address');
    const $info_phone = $('.cinema-info .phone');
    const $order_id = $('.order-id');
    var deliveryWay;
    var orderMoney = orderAndIndex[index].orderMoney;
    var orderId = orderAndIndex[index].orderId;
    var account = orderAndIndex[index].getAccount;
    var password = orderAndIndex[index].getPassword;
    var deliveryAddress = orderAndIndex[index].deliveryAddress;
    var deliveryMoney = orderAndIndex[index].deliveryMoney;
    if(orderAndIndex[index].deliveryWay === 0){
        deliveryWay = '自提';
        $info_address.text('提取账号: ' + account);
        $info_phone.text('提取密码: ' + password);
    }else{
        deliveryWay = '配送';
        $info_address.text('配送地址: ' + deliveryAddress);
        $info_phone.text('配送费: ￥' + deliveryMoney);
    }

    $.each(orderAndIndex[index].detailedCommodityForms, function (i, value) {
        let createTime = value.createTime;
        goodsHtml += '<tr>\n' +
            '                <td class="movie-name">'+ value.composeGoods[0].composeGoodName +'</td>\n' +
            '                <td class="showtime">'+ createTime.substr(0, 10) +'</td>\n' +
            '                <td class="cinema-name">'+ value.goodCount +'</td>\n' +
            '                <td>\n' +
            '                    <span class="hall">单价</span>\n' +
            '                    <div class="seats">\n' +
            '                        <div>\n' +
            '                            <span class=""><i>￥'+ value.composeGoods[0].composeGoodPrice +'</i></span>\n' +
            '                            <span class="border"><i>'+ value.composeGoods[0].composeGoodWeight +'g</i></span>\n' +
            '                        </div>\n' +
            '                        <div>\n' +
            '                        </div>\n' +
            '                    </div>\n' +
            '                </td>\n' +
            '            </tr>';
    });

    $tbody.html(goodsHtml);
    $price.text(orderMoney);
    $order_id.text('订单号: ' + orderId);
    $info_name.text('配送方式: ' + deliveryWay);
}
showDetails();
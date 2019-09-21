let goodHtml = '';
let goodsData;
// 已选商品数量
let chooseGoodsNum = 0;
let cartList = $('#cart-con');

window.onLoad = function () {
    if (!(typeof userId == "undefined" || userId == null || userId == "")) {
        $.ajax({
            url: '/showCartList',
            type: 'post',
            data: {'userId': userId},
            dataType: 'json',
            async: false,
            success: function (data) {
                goodsData = data;
                if (!(typeof data == "undefined" || data == null || data == "")) {
                    $.each(data, function (i, value) {
                        goodHtml = goodHtml + '<li class="cart-con-li">\n' +
                            '                <ul class="cart-obj clear">\n' +
                            '                    <li class="co-inp">\n' +
                            '                        <input type="checkbox" name="goods" value="' + value.goodId + '">\n' +
                            '                    </li>\n' +
                            '                    <li class="co-img">\n' +
                            '                        <a href="http://localhost:8080/main/view/detailGoods.html?id=' + value.goodId + '" target="_blank">\n' +
                            '                            <img src="' + value.composeGood.composeGoodIcon + '" width="100" height="100" alt="">\n' +
                            '                        </a>\n' +
                            '                    </li>\n' +
                            '                    <li class="co-name">\n' +
                            '                        <a id="good_name' + i + '" href="http://localhost:8080/main/view/detailGoods.html?id=' + value.goodId + '" title="' + value.composeGood.composeGoodName + '" class="hover-a" target="_blank">' + value.composeGood.composeGoodName + '</a>\n' +
                            '                    </li>\n' +
                            '                    <li class="co-dj" id="">' + value.composeGood.composeGoodPrice + '</li>\n' +
                            '                    <li class="co-sl">\n' +
                            '                        <span class="co-sl-span">\n' +
                            '                            <a href="javascript:;" onclick="minusOne(this);" class="num-changes">-</a>\n' +
                            '                            <input type="text" id="good_count' + i + '" value="' + value.goodCount + '" class="num-inp" onchange="isInteger(this)" maxlength="4" disabled="disabled">\n' +
                            '                            <a href="javascript:;" onclick="plusOne(this);" class="num-changes">+</a>\n' +
                            '                        </span>\n' +
                            '                        <span class="co-sl-remark" title></span>\n' +
                            '                    </li>\n' +
                            '                    <li class="co-je" id="price' + i + '">' + Number(value.composeGood.composeGoodPrice * value.goodCount).toFixed(2) + '</li>\n' +
                            '                    <li class="co-del">\n' +
                            '                        <a href="#" onclick="deleteProducts(this)" class="hover-a">删除</a>\n' +
                            '                    </li>\n' +
                            '                </ul>\n' +
                            '            </li>';
                    });
                    cartList.html(goodHtml);
                    map = new AMap.Map('container', {});
                    //构造路线导航类
                    driving = new AMap.Driving({});
                    //地理编码
                    geocoder = new AMap.Geocoder({
                        city: "", // 城市默认：“全国”
                    });
                    personLoction();
                } else {
                    goodHtml = '<div id="mc-msg">\n' +
                        '                <span>购物车内暂时没有商品，</span>\n' +
                        '                <a href="/index.html">去购物</a>\n' +
                        '            </div>';
                    cartList.html(goodHtml);
                }
            },
            error: function (data) {
                console.log('cartGoodsError:' + data);
            }
        });
    } else {
        goodHtml = '<div id="mc-msg">\n' +
            '                <span>购物车内暂时没有商品，登录后将显示您之前加入的商品</span>\n' +
            '                <a href="/login/view/login.html">登录</a>\n' +
            '                <a href="/index.html">去购物</a>\n' +
            '            </div>';
        cartList.html(goodHtml);
    }
};

//已选商品数量插入
function chooseNum(){
    $('#count').text(chooseGoodsNum); //已选商品数量插入
}

//计算已选商品的所有总价格
function sumAllPrice(){
    let sumPrice = 0.00;
    let allGoods = $("input[name='goods']");
    let total = $('#total');
    allGoods.each(function (i) { //遍历并计算已选商品的所有总价格
        if($(this).is(':checked')){
            sumPrice = sumPrice + parseFloat($('#price'+i).text());
        }
    });
    //console.log('sumPrice:'+sumPrice)
    total.text('￥'+Number(sumPrice).toFixed(2));
}

//商品全选
$("input[name='all']").click(function () {
    //console.log('#all:'+$(this).is(':checked'))
    let allChooseGoods = $("input[name='all']");
    let chooseGood = $("input[name='goods']");
    if($(this).is(':checked')){
        //console.log('.goodsTrue:'+chooseGood.val());
        allChooseGoods.prop('checked',true);
        chooseGood.prop('checked',true);
        chooseGoodsNum = chooseGood.length;
        chooseNum();
        sumAllPrice();
    }else{
        //console.log('.goodsFalse:'+chooseGood.val());
        allChooseGoods.prop('checked', false);
        chooseGood.prop('checked', false);
        chooseGoodsNum = 0;
        chooseNum();
        sumAllPrice();
    }
});

//商品勾选
$(document).on('click', "input[name='goods']",function(){
    let allGoods = true; //判断所有商品是否已勾选
    let allChooseGoods = $("input[name='all']");
    let chooseGood = $("input[name='goods']");

    if($(this).is(':checked')){
        chooseGoodsNum++;
    }else {
        chooseGoodsNum--;
    }

    chooseGood.each(function(){ //遍历循环判断所有商品是否已勾选
        if(!$(this).is(':checked')){
            allGoods = false;
        }
    });

    if(allGoods){
        allChooseGoods.prop('checked', true);
    }else{
        allChooseGoods.prop('checked', false);
    }

    chooseNum();
    sumAllPrice();
});

function minusOneCallback(_input){
    console.log(_input.parents('ul').children('li').children(':checkbox').val());
    let goodId = _input.parents('ul').children('li').children(':checkbox').val();
    let goodCount = _input.val();
    console.log('userId:'+userId+',goodId:'+goodId+',goodCount:'+goodCount);
    updateGoods(userId, goodId, goodCount, _input);
}

function plusOneCallback(_input){
    console.log(_input.parents('ul').children('li').children(':checkbox').val());
    let goodId = _input.parents('ul').children('li').children(':checkbox').val();
    let goodCount = _input.val();
    updateGoods(userId, goodId, goodCount, _input);
}

// 修改商品数量
function updateGoods(userId, goodId, goodCount, _input) {
    let price = _input.parents('ul').children('li .co-je');
    $.ajax({
        url:'/updateGoodCount',
        type:'post',
        data:{'userId':userId, 'goodId':goodId, 'goodCount':goodCount},
        dataType:'json',
        success:function (data) {
            console.log('success:'+data);
            let unitPrice = _input.parents('ul').children('li .co-dj').text();
            let lastPrice = parseFloat(unitPrice) * goodCount;
            price.text(Number(lastPrice).toFixed(2));
            sumAllPrice();
        },
        error:function (data) {
            console.log('error:'+data);
        }
    });
}

// 从购物车中删除商品
function deleteProducts(obj){
    let goodIdList = new Array();
    let goodsElement = $("input[name='goods']");
    if($(obj).attr('value') === 'batchDeletion') {
        goodsElement.each(function () { //遍历并计算已选商品的所有总价格
            if ($(this).is(':checked')) {
                goodIdList.push($(this).val());
            }
        });
    }else {
        let goodId = $(obj).parents('ul').children('li').children(':checkbox').val();
        goodIdList.push(goodId);
    }

    let delGoods = {
        'userId': userId,
        'goodIdList': goodIdList
    };

    //console.log(goodIdList)
    $.ajax({
        url:'/deleteGood',
        type:'post',
        data:JSON.stringify(delGoods),
        dataType:'json',
        contentType:"application/json",
        success:function (data) {
            if(data > 0){
                /*$.each(goodIdList, function (i, value) {
                    if(goodIdList.length > 1){
                        console.log('有几个:'+goodsElement.length)
                        $("input[value='" + value + "']").parents('ul').parents('li').remove();
                        goodIdList.splice(i);
                    }else{
                        goodHtml = '<div id="mc-msg">\n' +
                            '                <span>购物车内暂时没有商品，</span>\n' +
                            '                <a href="/index.html">去购物</a>\n' +
                            '            </div>';
                        cartList.html(goodHtml);
                    }
                })*/
                window.location.reload();
            }else{
                alert('删除失败！请选择商品或刷新页面重试！');
            }
        },
        error:function (data) {
            console.log('error:'+data);
        }
    });
}

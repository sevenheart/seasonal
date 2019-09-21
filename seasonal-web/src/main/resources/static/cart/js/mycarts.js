// 已选商品数量
var chooseGoodsNum = 0;
//已选商品数量插入
function chooseNum() {
    $('#count').text(chooseGoodsNum) //已选商品数量插入
}
//计算已选商品的所有总价格
function sumAllPrice() {
    var sumPrice = 0.00
    $("input[name='goods']").each(function (i) { //遍历并计算已选商品的所有总价格
        if ($(this).is(':checked')) {
            sumPrice = sumPrice + parseFloat($('#price' + i).text())
        }
    })
    console.log('sumPrice:' + sumPrice)
    $('#total').text('￥' + Number(sumPrice).toFixed(2))
}

//商品全选
$("input[name='all']").click(function () {
    console.log('#all:' + $(this).is(':checked'))
    if ($(this).is(':checked')) {
        console.log('.goodsTrue:' + $("input[name='goods']").val())
        $("input[name='all']").prop('checked', true)
        $("input[name='goods']").prop('checked', true)
        chooseGoodsNum = $("input[name='goods']").length
        chooseNum()
        sumAllPrice()
    } else {
        console.log('.goodsFalse:' + $("input[name='goods']").val())
        $("input[name='all']").prop('checked', false)
        $("input[name='goods']").prop('checked', false)
        chooseGoodsNum = 0
        chooseNum()
        sumAllPrice()
    }
})

//商品勾选
$(document).on('click', "input[name='goods']", function () {
    var allGoods = true //判断所有商品是否已勾选

    if ($(this).is(':checked')) {
        chooseGoodsNum++
    } else {
        chooseGoodsNum--
    }

    $("input[name='goods']").each(function () { //遍历循环判断所有商品是否已勾选
        if (!$(this).is(':checked')) {
            allGoods = false
        }
    })

    if (allGoods) {
        $("input[name='all']").prop('checked', true)
    } else {
        $("input[name='all']").prop('checked', false)
    }

    chooseNum()
    sumAllPrice()
})

function minusOneCallback(_input) {
    console.log('-1')
    console.log(_input.parents('ul').children('li').children(':checkbox').val())
    var userId = '002'
    var goodId = _input.parents('ul').children('li').children(':checkbox').val()
    var goodCount = _input.val()
    console.log('userId:' + userId + ',goodId:' + goodId + ',goodCount:' + goodCount)
    updateGoods(userId, goodId, goodCount, _input)
}

function plusOneCallback(_input) {
    console.log('+1')
    console.log(_input.parents('ul').children('li').children(':checkbox').val())
    var userId = '002'
    var goodId = _input.parents('ul').children('li').children(':checkbox').val()
    var goodCount = _input.val()
    console.log('userId:' + userId + ',goodId:' + goodId + ',goodCount:' + goodCount)
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
            console.log('success:' + data)
            var unitPrice = _input.parents('ul').children('li .co-dj').text()
            var lastPrice = parseFloat(unitPrice) * goodCount
            _input.parents('ul').children('li .co-je').text(Number(lastPrice).toFixed(2))
            sumAllPrice()
        },
        error: function (data) {
            console.log('error:' + data)
        }
    })
}

// 从购物车中删除商品
function deleteProducts(obj) {
    //var goodId = $(obj).parents('ul').children('li').children(':checkbox').val()
    //console.log('obj:'+ $(obj).attr('value'))
    var userId = '002'
    var goodIdList = new Array()
    if ($(obj).attr('value') === 'batchDeletion') {
        $("input[name='goods']").each(function (i) { //遍历并计算已选商品的所有总价格
            if ($(this).is(':checked')) {
                goodIdList.push($(this).val())
            }
        })
    } else {
        goodIdList.push($(obj).parents('ul').children('li').children(':checkbox').val())
    }
    var delGoods = {
        'userId': userId,
        'goodIdList': goodIdList
    }
    console.log(goodIdList)
    $.ajax({
        url: '/deleteGood',
        type: 'post',
        data: JSON.stringify(delGoods),
        dataType: 'json',
        contentType: "application/json",
        success: function (data) {
            console.log('success:' + data)
            if (data > 0) {
                $.each(goodIdList, function (i, value) {
                    //console.log($("input[value='" + value + "']").attr('name'))
                    $("input[value='" + value + "']").parents('ul').parents('li').remove()
                })
            }
        },
        error: function (data) {
            console.log('error:' + data)
        }
    })
}

var goodHtml = ''
var goodsData

$.ajax({
    url: '/showCartList',
    type: 'post',
    data: {'userId': '002'},
    dataType: 'json',
    success: function (data) {
        goodsData = data
        $.each(data, function (i, value) {
            goodHtml = goodHtml + '<li class="cart-con-li">\n' +
                '                <ul class="cart-obj clear">\n' +
                '                    <li class="co-inp">\n' +
                '                        <input type="checkbox" name="goods" value="' + value.goodId + '">\n' +
                '                    </li>\n' +
                '                    <li class="co-img">\n' +
                '                        <a href="http://localhost:8080/main/view/detailGoods.html?id=' + value.goodId + '" target="_blank">\n' +
                '                            <img src="' + value.composeGood.composeGoodIcon + '" width="100" height="100">\n' +
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
                '            </li>'
        })
        $('#cart-con').html(goodHtml)
    },
    error: function (data) {
        console.log('cartGoodsError:' + data)
        goodHtml = '<div id="mc-msg">\n' +
            '                <span>购物车内暂时没有商品，登录后将显示您之前加入的商品</span>\n' +
            '                <a href="#" onclick="">登录</a>\n' +
            '                <a href="#">去购物</a>\n' +
            '            </div>'
        $('#cart-con').html(goodHtml)
    }
});




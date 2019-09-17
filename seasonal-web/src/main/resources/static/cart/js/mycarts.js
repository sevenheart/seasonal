//计算已选上的商品数量
var chooseGoodsNum = 0

//已选商品数量插入以及计算已选商品的所有总价格
function chooseNumAndSum(){
    var sumPrice = 0.00
    $('#count').text(chooseGoodsNum) //已选商品数量插入
    $("input[name='goods']").each(function (i) { //遍历并计算已选商品的所有总价格
        if($(this).is(':checked')){
            sumPrice = sumPrice + parseFloat($('#price'+i).text())
        }
    })
    console.log('sumPrice:'+sumPrice)
    $('#total').text(Number(sumPrice).toFixed(2))
}

//商品全选
$("input[name='all']").click(function () {
    console.log('#all:'+$(this).is(':checked'))
    if($(this).is(':checked')){
        console.log('.goodsTrue:'+$("input[name='goods']").val())
        $("input[name='all']").prop('checked',true)
        $("input[name='goods']").prop('checked',true)
        chooseGoodsNum = $("input[name='goods']").length
        chooseNumAndSum()
    }else{
        console.log('.goodsFalse:'+$("input[name='goods']").val())
        $("input[name='all']").prop('checked', false)
        $("input[name='goods']").prop('checked', false)
        chooseGoodsNum = 0
        chooseNumAndSum()
    }
})

//商品勾选
$(document).on('click', "input[name='goods']",function(){
    var allGoods = true //判断所有商品是否已勾选

    if($(this).is(':checked')){
        chooseGoodsNum++
    }else {
        chooseGoodsNum--
    }

    $("input[name='goods']").each(function(){ //遍历循环判断所有商品是否已勾选
        if(!$(this).is(':checked')){
            allGoods = false
        }
    })

    if(allGoods){
        $("input[name='all']").prop('checked', true)
    }else{
        $("input[name='all']").prop('checked', false)
    }

    chooseNumAndSum()
})

function minusOneCallback(_input){
    changeNumber(_input);
}

function plusOneCallback(_input){
    changeNumber(_input);
}

function modifyNumberCallback(_input){
    changeNumber(_input);
}

function changeNumber(_input){
    var _row = _input.parents("ul");
    var id = _row.children("li").children(":checkbox").val();

}

var goodHtml = ''

$.ajax({
    url:'/showCartList',
    type:'post',
    data:{'userId':'002'},
    dataType:'json',
    success:function (data) {
        console.log('cartGoods:' + data[0].goodCount)
        $.each(data,function (i, value) {
            goodHtml = goodHtml + '<li class="cart-con-li">\n' +
                '                <ul class="cart-obj clear">\n' +
                '                    <li class="co-inp">\n' +
                '                        <input type="checkbox" name="goods" value="' + i + '">\n' +
                '                    </li>\n' +
                '                    <li class="co-img">\n' +
                '                        <a href="#" target="_blank">\n' +
                '                            <img src="' + value.composeGoodIcon + '" width="100" height="100">\n' +
                '                        </a>\n' +
                '                    </li>\n' +
                '                    <li class="co-name">\n' +
                '                        <a href="#" title="' + value.composeGoodName + '" class="hover-a" target="_blank">' + value.composeGoodName + '</a>\n' +
                '                    </li>\n' +
                '                    <li class="co-dj" id="price-one">' + value.composeGoodPrice + '</li>\n' +
                '                    <li class="co-sl">\n' +
                '                        <span class="co-sl-span">\n' +
                '                            <a href="javascript:;" onclick="minusOne(this);" class="num-changes">-</a>\n' +
                '                            <input type="text" value="'+ value.goodCount +'" class="num-inp" onchange="isInteger(this)" maxlength="4" disabled="disabled">\n' +
                '                            <a href="javascript:;" onclick="plusOne(this);" class="num-changes">+</a>\n' +
                '                        </span>\n' +
                '                        <span class="co-sl-remark" title></span>\n' +
                '                    </li>\n' +
                '                    <li class="co-je" id="price' + i + '">' + Number(value.composeGoodPrice * value.goodCount).toFixed(2) + '</li>\n' +
                '                    <li class="co-del">\n' +
                '                        <a href="#" onclick="deleteProducts(this)" class="hover-a">删除</a>\n' +
                '                    </li>\n' +
                '                </ul>\n' +
                '            </li>'
        })
        $('#cart-con').html(goodHtml)
    },
    error:function (data) {
        console.log('cartGoodsError:'+data)
        goodHtml = '<div id="mc-msg">\n' +
            '                <span>购物车内暂时没有商品，登录后将显示您之前加入的商品</span>\n' +
            '                <a href="#" onclick="">登录</a>\n' +
            '                <a href="#">去购物</a>\n' +
            '            </div>'
        $('#cart-con').html(goodHtml)
    }
})



//商品全选
$("input[name='all']").click(function () {
    console.log('#all:'+$(this).is(':checked'))
    if($(this).is(':checked')){
        console.log('.goodsTrue:'+$("input[name='goods']").val())
        $("input[name='all']").prop('checked',true)
        $("input[name='goods']").prop('checked',true)
    }else{
        console.log('.goodsFalse:'+$("input[name='goods']").val())
        $("input[name='all']").prop('checked', false)
        $("input[name='goods']").prop('checked', false)
    }
})

//商品勾选
$("input[name='goods']").click(function(){
    var allGoods = true //判断所有商品是否已勾选
    if($(this).is(':checked')){ //遍历循环判断所有商品是否已勾选
        $("input[name='goods']").each(function(){
            console.log($(this).val())
            if(!$(this).is(':checked')){ //若有商品未勾选，则取消全选按钮
                $("input[name='all']").prop('checked', false)
                allGoods = false
            }
        })
    }else{
        $("input[name='all']").prop('checked', false)
        allGoods = false
    }

    if(allGoods){
        $("input[name='all']").prop('checked', true)
    }
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

var goodHtml

$.ajax({
    url:'',
    type:'post',
    dataType:'json',
    success:function (data) {
        console.log('cartGoods:'+data)
        $.each(data,function (i, value) {
            goodHtml = goodHtml + '<li class="cart-con-li" id="bink">\n' +
                '                <ul class="cart-obj clear">\n' +
                '                    <li class="co-inp">\n' +
                '                        <input type="checkbox" name="goods" value="">\n' +
                '                    </li>\n' +
                '                    <li class="co-img">\n' +
                '                        <a href="#" target="_blank">\n' +
                '                            <img src="../img/common/goods.jpg" width="100" height="100">\n' +
                '                        </a>\n' +
                '                    </li>\n' +
                '                    <li class="co-name">\n' +
                '                        <a href="#" title="goodName" class="hover-a" target="_blank">' + value.goodName + '</a>\n' +
                '                    </li>\n' +
                '                    <li class="co-dj">' + value.goodPrice + '</li>\n' +
                '                    <li class="co-dj" id="price-one">' + value.goodPrice + '</li>\n' +
                '                    <li class="co-sl">\n' +
                '                        <span class="co-sl-span">\n' +
                '                            <a href="javascript:;" onclick="minusOne(this);" class="num-changes">-</a>\n' +
                '                            <input type="text" value="'+ value.goodCount +'" class="num-inp" onchange="isInteger(this)" maxlength="4">\n' +
                '                            <a href="javascript:;" onclick="plusOne(this);" class="num-changes">+</a>\n' +
                '                        </span>\n' +
                '                        <span class="co-sl-remark" title></span>\n' +
                '                    </li>\n' +
                '                    <li class="co-je">' + value.goodPrice * value.goodCount + '</li>\n' +
                '                    <li class="co-del">\n' +
                '                        <a href="#" onclick="deleteProducts(this)" class="hover-a">删除</a>\n' +
                '                    </li>\n' +
                '                </ul>\n' +
                '            </li>'
        })
        //$('#cart-con').html(goodHtml)
    },
    error:function (data) {
        console.log('cartGoodsError:'+data)
        goodHtml = '<div id="mc-msg">\n' +
            '                <span>购物车内暂时没有商品，登录后将显示您之前加入的商品</span>\n' +
            '                <a href="#" onclick="">登录</a>\n' +
            '                <a href="#">去购物</a>\n' +
            '            </div>'
        //$('#cart-con').html(goodHtml)
    }
})


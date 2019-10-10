var min = 1;
var max = 100;
//数量选择的数字减1
function minusOne(obj){
    var _input = $(obj).siblings("input");
    if(_input.val() > min){
        let goodId = _input.parents('ul').children('li').children(':checkbox').val();
        let goodCount = parseInt(_input.val()) - 1;
        updateGoods(userId, goodId, goodCount, _input);
    }

}

//数量选择的数字加1
function plusOne(obj){
    var _input = $(obj).siblings("input");
    if(_input.val() < max){
        let goodId = _input.parents('ul').children('li').children(':checkbox').val();
        let goodCount = parseInt(_input.val()) + 1;
        updateGoods(userId, goodId, goodCount, _input);
    }
}
var min = 1;
var max = 200;
//数量选择的数字减1
function minusOne(obj){
    var _input = $(obj).siblings("input");
    var value = parseInt(_input.val());
    if(_input.val() > min){
        _input.val(value-1);
        $(obj).attr("tmp", value-1);
        if(typeof minusOneCallback != 'undefined'){
            minusOneCallback(_input);
        }
    }

}

//数量选择的数字加1
function plusOne(obj){
    var _input = $(obj).siblings("input");
    var value = parseInt(_input.val());
    if(_input.val() < max){
        _input.val(value+1);
        $(obj).attr("tmp", value+1);
        if(typeof plusOneCallback != 'undefined'){
            plusOneCallback(_input);
        }
    }
}

//修改数量
function isInteger(obj){
    var reg = /^[1-9][0-9]*$/;
    var value = $(obj).val();
    if(!reg.test(value)){
        $(obj).val($(obj).attr("tmp"));
    }
    if(value > max){
        $(obj).val($(obj).attr("tmp"));
    }
    /*if(typeof modifyNumberCallback != 'undefined'){
        modifyNumberCallback($(obj));
    }*/
}

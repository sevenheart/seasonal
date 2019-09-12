
$(function() {
    //全选按钮
    var _all = $("#all");
    _all.attr("checked", "checked")
    $("input[name='goods']").each(function(){
        $(this).attr("checked",true)
    });
    _all.click(function(){
        if($(this).checked){
            $("input[name='goods']").attr("checked",true);
        }else{
            $("input[name='goods']").removeAttr("checked");
        }
    });

    //商品勾选
    $("input[name='goods']").click(function(){
        if($(this).checked){
            $("input[name='goods']").each(function(){
                if(!$(this).checked){
                    _all.removeAttr("checked")
                    return
                }
            });
            _all.attr("checked", "checked")
        }else{
            _all.removeAttr("checked")
        }
    });

});

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


$(".main_right_function_order_menu li").click(function(){
    $(this).parent().children("li").removeClass("currentmenu1")
    $(this).addClass("currentmenu1")
    var num = $(this).index()
    $(this).parent().parent().parent().children(".detailemessage").css("display","none")
    $(this).parent().parent().parent().children(".detailemessage").eq(num).css("display","block")
    /* $(this).addClass("currentmenu")*/
})
/*控制右侧的功能页的显示与隐藏
*右侧最大的main_right_function_order
* 右侧子菜单
* detailemessage
* 顺序为
* 1.订单页
* 2.用户信息页
* 3.地址管理页
* */
$(".main_left_function a").click(function () {
    var num = $(this).attr("name")
    /*先隐藏右侧的页面在显示*/
    $(".main_right_function_order").css("display","none")
    /*找到第几个显示它*/
    $(".main_right_function_order").eq(num).css("display","block")
})
/*选项卡切换*/
/*表单的js代码*/
/*$("#userimg img").click(function () {
    $("#userimg input").click()
})*/
function changeStyle() {
    var template = document.getElementById("template");
    var index = template.selectedIndex;
    var templatevalue = template.options[index].value;
    var templatecss = document.getElementById("templatecss");
    templatecss.setAttribute("href","css/" + templatevalue + ".css");
    document.getElementsByTagName("form")[0].setAttribute("class",templatevalue);
}
var userId
window.onload = function () {
    $.ajax({
        url: "/getsessionUserId",
        type: "post",
        dataType: "text",
        success: function (data) {
            userId = data
            console.log('userid:' + userId)
            if (data){
                console.log("success->userId:" + userId)
                $('.already-login').text('')
                $('.already-login').text(userId)
                $('.login-span').css('display', 'inline')
                $('.already-login').css('display','inline')
                $('.registration img').css('display', 'none')
                $('.registration a').css('display', 'none')
                $('.not-login').css('display','none')
                $('.cancellation').css('display', 'inline')
            } else{
                $('.already-login').text('')
                $('.login-span').css('display', 'none')
                $('.already-login').css('display','none')
                $('.registration img').css('display', 'inline')
                $('.registration a').css('display', 'inline')
                $('.not-login').css('display','inline')
                $('.cancellation').css('display', 'none')
            }
        },
        error: function (data) {
            console.log('error:' + data)
        }
    })
}

$(document).on('click','.cancellation',function () {

    $.ajax({
        url:"/cancellation",
        type:"post",
        dataType: "text",
        success:function (data) {
            alert("退出成功")
            window.location.reload();
        }
    })
})

function ajax_test(id, orderName, currPage, likeName) {
    $.ajax({
        url: "/ShowGoodsList", //json文件位置
        type: "POST", //请求方式为get
        dataType: "json", //返回数据格式为json
        data: "currPage=" + currPage + "&id=" + id + "&likeName=" + likeName + "&orderName=" + orderName,
        async: false,
        success: function (data) { //请求成功完成后要执行的方法
            $(".goods_right_list").html("");
            console.log(data);
            $.each(data, function (k, v) {
                let html;
                console.log(v);
                html = '' +
                    '                    <div class="goods_block_main">\n' +
                    '                        <div class="glc_rt_gds" style="border: 1px solid rgb(255, 255, 255);background: #fff;">\n' +
                    '                            <div class="glc_rt_gds_img">\n' +
                    '                                <a target="_blank" href="http://localhost:8080/main/view/detailGoods.html?id='+v.id+'">\n' +
                    '                                    <img alt="" src="' + v.composeGoodIcon + '"\n' +
                    '                                         style="height: 100%;width:100%">\n' +
                    '                                </a>\n' +
                    '                            </div>\n' +
                    '                            <div class="glc_rt_gds_pri clear">\n' +
                    '\t\t\t\t\t\t\t\t\t<span class="grgp_np_grgp_npri">\n' +
                    '\t\t\t\t\t\t\t\t\t\t￥' + v.composeGoodPrice + '.00\n' +
                    '\t\t\t\t\t\t\t\t\t</span>\n' +
                    '                                <a href="" class="grgp_op"></a>\n' +
                    '                            </div>\n' +
                    '                            <div class="glc_rt_gds_des">\n' +
                    '                                <a href="http://localhost:8080/main/view/detailGoods.html?id='+v.id+'" title="' + v.composeGoodName + '">' + v.composeGoodName + '</a>\n' +
                    '                                <div>规格：' + v.composeGoodWeight + 'g</div>\n' +
                    '                            </div>\n' +
                    '                            <div class="goods_control_div">\n' +
                    '                                <ul class="goods_control_ul">\n' +
                    '                                    <li class="goods_control_ul_li1">\n' +
                    '                                        <a class="delete_goods">-</a>\n' +
                    '                                        <input class="goods_control_ul_li1_input" type="text" readonly unselectable="on"  name="num" value="1">\n' +
                    '                                        <a class="add_goods">+</a>\n' +
                    '                                    </li>\n' +
                    '                                    <li class="goods_control_ul_li2">\n' +
                    '                                        <a>\n' +
                    '                                            <i></i>\n' +
                    '                                            加入购物车\n' +
                    '                                        </a>\n' +
                    '                                    </li>\n' +
                    '                                </ul>\n' +
                    '                            </div>\n' +
                    '                        </div>\n' +
                    '                    </div>\n'
                $(".goods_right_list").append(html);
            });
            $(".add_goods").click(function () {
                let num = $(this).parent().children("input").eq(0).val();
                $(this).parent().children("input").eq(0).val(parseInt(num) + 1);
            });
            $(".delete_goods").click(function () {
                let num = $(this).parent().children("input").eq(0).val();
                if (num > 1) {
                    $(this).parent().children("input").eq(0).val(parseInt(num) - 1);
                }
            });
        }

    });
}

function getQueryVariable(variable) {
    let query = window.location.search.substring(1);
    let vars = query.split("&");
    for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return (false);
}

let classifyId;
let currPage;
let orderName = 'id';
let likeName;
if (getQueryVariable("classifyId")) {
    classifyId = getQueryVariable("classifyId");
} else {
    classifyId = "0";
}
if (getQueryVariable("currPage")) {
    currPage = getQueryVariable("currPage");
} else {
    currPage = "1";
}
if (getQueryVariable("likeName")) {
    likeName = getQueryVariable("likeName");
} else {
    likeName = "";
}
ajax_test(classifyId, orderName, currPage, likeName); //执行函数

$(".sort_ul_li").click(function () {

    $(this).parent().children("li").css("backgroundColor", "white");
    $(this).parent().children("li").css("color", "#666");
    $(this).parent().children("li").css("background", 'white url("../../img/inner.png") no-repeat 50px -82px');
    $(this).css("color", "white");
    $(this).css("background", " #e51e13 url('../../img/inner.png') no-repeat 48px -99px");

});
$("#sort_type_1").click(function () {
    ajax_test(classifyId, "id", currPage, likeName);
});
$("#sort_type_2").click(function () {
    ajax_test(classifyId, "compose_good_price", currPage, likeName);
});
$("#sort_type_3").click(function () {
    ajax_test(classifyId, "compose_good_sales", currPage, likeName);
});
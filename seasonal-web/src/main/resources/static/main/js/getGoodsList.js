let way="/ESShowGoodsList";
function ajax_test(id, orderName, currentPage, likeName) {
    $.ajax({
        url: way, //json文件位置
        type: "POST", //请求方式为get
        dataType: "json", //返回数据格式为json
        data: "currPage=" + currentPage + "&id=" + id + "&likeName=" + likeName + "&orderName=" + orderName,
        async: false,
        success: function (data) { //请求成功完成后要执行的方法
            currentPage = Number.parseInt(data['currentpage'])+1;
            console.log(data);
            var ma = JSON.stringify(data["resultlist"].content)
            console.log(JSON.parse(ma))
            var a = JSON.parse(ma);
            console.log(data)
            $(".goods_right_list").html("");
            $.each(a, function (k, v) {
                let html;
                html = '' +
                    '                    <div class="goods_block_main">\n' +
                    '                        <div class="glc_rt_gds" style="border: 1px solid rgb(255, 255, 255);background: #fff;">\n' +
                    '                            <div class="glc_rt_gds_img">\n' +
                    '                                <a target="_blank" href="detailGoods.html?id=' + v.id + '">\n' +
                    '                                    <img alt="" src="' + v.composeGoodIcon + '"\n' +
                    '                                         style="height: 100%;width:100%">\n' +
                    '                                </a>\n' +
                    '                            </div>\n' +
                    '                            <div class="glc_rt_gds_pri clear">\n' +
                    '\t\t\t\t\t\t\t\t\t<span class="grgp_np_grgp_npri">\n' +
                    '\t\t\t\t\t\t\t\t\t\t￥' + v.composeGoodPrice + '.00\n' +
                    '\t\t\t\t\t\t\t\t\t</span>\n' +
                    '                                <a href="javascript:void(0)" class="grgp_op" id="col' + v.id + '" value="' + v.id + '"></a>\n' +
                    '                            </div>\n' +
                    '                            <div class="glc_rt_gds_des">\n' +
                    '                                <a href="detailGoods.html?id=' + v.id + '" title="' + v.composeGoodName + '">' + v.composeGoodName + '</a>\n' +
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
                    '                                        <a href="javascript:void(0);" onclick="addGoodsToCart(this, ' + v.id + ')">\n' +
                    '                                            <i></i>\n' +
                    '                                            加入购物车\n' +
                    '                                        </a>\n' +
                    '                                    </li>\n' +
                    '                                </ul>\n' +
                    '                            </div>\n' +
                    '                        </div>\n' +
                    '                    </div>\n';
                $(".goods_right_list").append(html);


                //查询收藏信息，判断是否已收藏
                $.ajax({
                    url: "/selectCollection",
                    type: "POST",
                    dataType: "json",
                    data: {"userId": userId, "goodId": v.id},
                    async: false,
                    success: function (data) {
                        if (data.code === 100) {
                            $('#col'+v.id).css('backgroundPosition', '0 0');
                        }
                        if (data.code === 200) {
                            $('#col'+v.id).css('backgroundPosition', '0 -15px');
                        }
                    }
                })


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
            //页数信息展示
            $('#nowpage').text("第"+currentPage+"页");
            $('#allpage').text("共"+data['allpage']+"页");
            //让当前页等于最大页
            if(currPage>data['allpage']) {currPage=data['allpage']};
            //让当前页等于第一页
            if (currPage<=0) {currPage = 1};
            //$(".mt-pagination ul").html(html);

        }

    });
}
$("#left").click(function () {
    console.log("第"+currPage+"页")
    currPage--;
    ajax_test(classifyId, orderName, currPage, likeName);
})
$("#right").click(function () {
    console.log("第"+currPage+"页")
    currPage++;
    ajax_test(classifyId, orderName, currPage, likeName);
})
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
    $(this).parent().children("li").css("background", 'white url("https://seasonal-1300148510.cos.ap-shanghai.myqcloud.com/img/indexinner.png") no-repeat 50px -82px');
    $(this).css("color", "white");
    $(this).css("background", " #e51e13 url('https://seasonal-1300148510.cos.ap-shanghai.myqcloud.com/img/index/inner.png') no-repeat 48px -99px");

});
$("#sort_type_1").click(function () {
    currPage = 1;
    ajax_test(classifyId, "id", currPage, likeName);
});
$("#sort_type_2").click(function () {
    currPage = 1;
    ajax_test(classifyId, "composeGoodPrice", currPage, likeName);
});
$("#sort_type_3").click(function () {
    currPage = 1;
    ajax_test(classifyId, "composeGoodSales", currPage, likeName);
});

function addGoodsToCart(obj, id) {
    let goodCount = $(obj).parents('li').siblings('li').children('input').val();
    let goodId = id;
    if (!(typeof userId === "undefined" || userId === null || userId === "")) {
        $.ajax({
            url: '/addCart',
            type: 'post',
            dataType: 'json',
            data: {'userId': userId, 'goodId': goodId, 'goodCount': goodCount},
            success: function (data) {
                if (data.code === 200) {
                    alert('添加入购物车成功');
                } else if (data.code === 500) {
                    alert('添加入购物车失败,刷新后重试！');
                }
            },
            error: function (data) {
                alert('添加入购物车失败');
            }
        });
    } else {
        alert('请先登录！');
    }
}

//点击收藏事件
$(document).on('click', '.grgp_op', function () {
    var goodId = $(this).attr("value");
    var $this = $(this);
    // 查询收藏信息，判断是否已收藏
    $.ajax({
        url: "/selectCollection",
        type: "POST",
        dataType: "json",
        data: {"userId": userId, "goodId": goodId},
        async: false,
        success: function (data) {
            if (data.code === 100) {
                //删除收藏信息
                $.ajax({
                    url: "/DeleteGoodCollection",
                    type: "POST",
                    dataType: "json",
                    data: {"userId": userId, "goodId": goodId},
                    async: false,
                    success: function (data) {
                        if (data.code === 200) {
                            $this.css('backgroundPosition', '0 -15px');
                        } else {
                            alert("删除失败，请刷新重试！");
                        }
                    }
                })
            } else {
                //插入收藏信息
                $.ajax({
                    url: "/GoodCollection",
                    type: "POST",
                    dataType: "json",
                    data: {"userId": userId, "goodId": goodId},
                    async: false,
                    success: function (data) {
                        if (data.code === 200) {
                            $this.css('backgroundPosition', '0 0');
                        } else {
                            alert("收藏失败");
                        }
                    }
                })
            }
        }
    });
});
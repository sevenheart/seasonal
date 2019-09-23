if(userId ===''){
    alert("请先登录，再访问个人中心");
    $(location.href ="../../login/view/login.html");
}
$(".main_right_function_order_menu li").click(function(){
    $(this).parent().children("li").removeClass("currentmenu1");
    $(this).addClass("currentmenu1");
    let num = $(this).index();
    $(this).parent().parent().parent().children(".detailemessage").css("display","none");
    $(this).parent().parent().parent().children(".detailemessage").eq(num).css("display","block");
    /* $(this).addClass("currentmenu")*/
});
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
    let num = $(this).attr("name");
    /*先隐藏右侧的页面在显示*/
    let target = $(".main_right_function_order");
    target.css("display","none");
    /*找到第几个显示它*/
    target.eq(num).css("display","block");
});
/*选项卡切换*/
/*function changeStyle() {
    let template = document.getElementById("template");
    let index = template.selectedIndex;
    let templatevalue = template.options[index].value;
    let templatecss = document.getElementById("templatecss");
    templatecss.setAttribute("href","css/" + templatevalue + ".css");
    document.getElementsByTagName("form")[0].setAttribute("class",templatevalue);
}*/
/*修改头像*/
function preview(){
    //获取点击的文本框userimg
    var file =document.getElementById("bookimg");
    var imgUrl =window.URL.createObjectURL(file.files[0]);
    console.log("图片地址是"+imgUrl);
    $('#userimg img').attr('src',imgUrl); // 修改img标签src属性值
}
/*展示地址信息*/
function showaddress(data){
    var html='  <tr>\n' +
        '                            <td> <span>全部</span></td>\n' +
        '                            <td> <span>收货人姓名:</span></td>\n' +
        '                            <td> <span>收货人电话:</span></td>\n' +
        '                            <td><span>省:</span></td>\n' +
        '                            <td><span>市:</span></td>\n' +
        '                            <td><span>区:</span></td>\n' +
        '                            <td><span>详细信息:</span></td>\n' +
        '                        </tr>';
    //循环拼接得到的地址信息
    for(let i = 0;i< data.data.length;i++) {
        html += '    <tr>\n' +
            '                            <td> <input  type="checkbox" name="check" value="'+data.data[i].id+'"/></td>\n' +
            '                            <td> <input  type="text" readonly  value=' + data.data[i].userName + ' /></td>\n' +
            '                            <td> <input  type="text"  readonly value=' + data.data[i].userPhone + ' /></td>\n' +
            '                            <td> <input  type="text" readonly  value=' + data.data[i].province + ' /></td>\n' +
            '                            <td> <input  type="text"  readonly value=' + data.data[i].city + ' /></td>\n' +
            '                            <td> <input  type="text" readonly value=' + data.data[i].district + ' /></td>\n' +
            '                            <td> <input  type="text"  readonly value=' + data.data[i].address + ' /></td>\n' +
            '                     <td><input type="button" class="button delete_address" value="删除"  data-id=' + data.data[i].id + ' /></td>\n' +
            '                  <td><input type="button" class="button update_address" value="修改" data-type="0" /></td>\n' +
            '                        </tr>'
    }
    html+='    <tr>\n' +
        '                            <td><input type="button" class="button delete_all" value="批量删除" /></td>\n' +
        '                        </tr>';
    $("#alladdresstable").html(html);

    /*删除地址*/
    $("#alladdresstable .delete_address").click(function () {
        let title =$(this).attr("data-id");
        $.post({
            url: "/address/deleteuseraddressByid",
            data: {id: title},
            dataType: "json",
            success: function (data) {
                alert(data.message);
                window.location.href="personCenter.html";
            }
        })
    });
    /*批量删除地址*/
    $("#alladdresstable .delete_all").click(function () {

        let check = new Array();
        $("#alladdresstable tr td input[type=checkbox]:checked").each(function(){
            console.log("地址是"+$(this).val())
            check.push($(this).val());
        });


        $.post({
            url: "/address/deletecheckeduseraddress",
            data: JSON.stringify(check),
            contentType:"application/json",
            dataType: "json",
            success: function (data) {
                alert(data.message);
                window.location.href="personCenter.html"
            }
        })
    });
    /*修改用户的地址信息*/
    $("#alladdresstable .update_address").click(function () {
        console.log("sdjflkjasodfk")
        var flag = $(this).attr("data-type");
        console.log("flage是"+flag)
        if(flag==0){
            $(this).parents("tr").children("td").children("input[type='text']").removeAttr("readonly");
            $(this).attr("data-type",1);
        }else {
            console.log("flage是"+flag)
            var fd = new FormData();
            fd.append("userName", $(this).parents("tr").children("td").children("input").eq(1).val());
            fd.append("userPhone", $(this).parents("tr").children("td").children("input").eq(2).val());
            fd.append("province", $(this).parents("tr").children("td").children("input").eq(3).val());
            fd.append("city", $(this).parents("tr").children("td").children("input").eq(4).val());
            fd.append("district", $(this).parents("tr").children("td").children("input").eq(5).val());
            fd.append("address", $(this).parents("tr").children("td").children("input").eq(6).val());
            fd.append("id", $(this).parents("tr").children("td").children("input").eq(7).attr("data-id"));
            $.post({
                url: "/address/updateuseraddress",
                data: fd,
                dataType: "json",
                processData: false,
                contentType: false,
                success: function (data) {
                    alert(data.message)
                }
            })
        }


    })
}
/*展示订单信息*/
function showorderform(data) {
    var title =  '<tr style="width: 800px">\n' +
        '                            <td><span>订单号</span></td>\n' +
        '                            <td><span>商品描述</span></td>\n' +
        '                            <td><span>订单金额</span></td>\n' +
        '                            <td><span>订单状态</span></td>\n' +
        '                            <td><span>支付平台</span></td>\n' +
        '                            <td><span>配送方式</span></td>\n' +
        '                        </tr>';
    var htmlall =title;
    noorderflag = false;
    orderedflag = false;
    flag = false;
    var noorder =title;
    var ordered=title;
    let detaildata ;

    for(let i = 0;i < data.length;i++){
        flag = true;
        var button = '<td><input  type="button" class="button delitalbutton payorder"  value="支付"/></td>\n'
        var orderstates ='<td><p>未支付</p></td>'
        var deliveryWay = '<td><p>自提</p></td>\n'
        if(data.deliveryWay===0){
            deliveryWay = '<td><p>配送</p></td>\n'
        }
        //已支付拼接
        //未支付拼接
        console.log("sdf"+data[i].orderStatus)
        if(data[i].orderStatus == 1){
            console.log("已支付状态"+data[i].orderStatus)
            orderedflag = true;
            button = '<td><input  type="button" class="button delitalbutton look"  value="查看详情" data-toggle="modal" data-target="#myModal" /></td>'
            orderstates ='<td><p>已支付</p></td>'
            ordered +=' <tr>\n' +
                '                            <td><p>'+data[i].orderId+'</p></td>\n' +
                '                            <td><p>夏日果切套餐</p></td>\n' +
                '                            <!--已支付判断，赋class ordered-->\n' +
                '                            <td><p>'+data[i].orderMoney+'</p></td>\n' +
                orderstates+
                '                            <td><p>支付宝</p></td>\n' +
                deliveryWay+
                button+
                '                        </tr>\n'


        }
        else{
            console.log("未支付状态")
            noorderflag = true;
            noorder +=' <tr>\n' +
                '                            <td><p>'+data[i].orderId+'</p></td>\n' +
                '                            <td><p>夏日果切套餐</p></td>\n' +
                '                            <!--已支付判断，赋class ordered-->\n' +
                '                            <td><p>'+data[i].orderMoney+'</p></td>\n' +
                orderstates+
                '                            <td><p>支付宝</p></td>\n' +
                deliveryWay+
                button+
                '                        </tr>\n'
        }


        htmlall +=' <tr>\n' +
            '                            <td><p>'+data[i].orderId+'</p></td>\n' +
            '                            <td><p>夏日果切套餐</p></td>\n' +
            '                            <!--已支付判断，赋class ordered-->\n' +
            '                            <td><p>'+data[i].orderMoney+'</p></td>\n' +
            orderstates+
            '                            <td><p>支付宝</p></td>\n' +
            deliveryWay+
            '                            <td hidden class="detailData" data-type="'+i+'"><p>'+data[i].orderMoney+'</p></td>\n' +
            button+
            '                        </tr>\n'
    }
    if(flag===true){
        $('#allordermessage').html(htmlall);
    }else {
        $('#allordermessage').html("没查到任何订单信息");
    }
    if(noorderflag===true){
        $('#noorderform').html(noorder);
    }else {
        $('#noorderform').html("没查到任何订单信息");
    }
    if(orderedflag===true){
        $('#orderedform').html(ordered);
    }else {
        $('#orderedform').html("没查到任何订单信息")
    }

    $('.payorder').click(function () {
        var list = $(this).parent("td").parent("tr").children(".detailData").attr("data-type");
        window.location.href='/order/view/orderUnpaid.html?orderId='+data[list].orderId;
    });
    $(".look").click(function () {
        console.log("sldifjoi")
        var list = $(this).parent("td").parent("tr").children(".detailData").attr("data-type")
        detaildata = data[list].detailedCommodityForms
        
        }

    )

    //模态框控制
    $('#myModal').modal("hide");
    $('#myModal').on('show.bs.modal', function (event) {

        var goodtable =' <tr>\n' +
            '                                <td>商品名称</td>\n' +
            '                                <td>商品数量</td>\n' +
            '                                <td>商品价格</td>\n' +
            '                            </tr> ';

        $.each(detaildata,function (index,content) {
            goodtable+= '  <tr>\n' +
                '                                <td>'+content.composeGoods[0].composeGoodName+'</td>\n' +
                '                                <td>'+content.goodId+'</td>\n' +
                '                                <td>'+content.commodityMoney+'</td>\n' +
 '                            </tr>'
        })
        $("#goodstable").html(goodtable)
        console.log("模态框显示之钱")

    })
}
/*展示已支付订单信息*/


function init() {
    //查找用户的个人信息
    $.post({
        url:"/user/finduserbyid",
        data:{id:userId},
        async:false,
        dataType:"json",
        success:function (data) {
            if (data.code === 0) {
                $('#id').val(data.data[0].id);
                $('#userimg img').attr("src",data.data[0].userImg);
                $('#userbigimg').attr("src",data.data[0].userImg);
                console.log("用户的头像是"+data.data[0].userImg);
                $('#userId').val(data.data[0].userId);
                console.log("id是"+data.data[0].userId);
                $('#userName').val(data.data[0].userName);
                console.log(data.data[0].userName);
                $('#isVip').val(data.data[0].isVip);
                console.log(data.data[0].isVip);
                $('#userAge').val(data.data[0].userAge);
                console.log(data.data[0].userAge);
                $('#userType').val(data.data[0].userType);
                /*$('#updateTime').val(data.data[0].updateTime);*/

            }

            /*先隐藏右侧的页面在显示*/
            $('#bookimg').change(preview);
            /*点击提交修改用户信息信息*/
            $('#user_info_form .button').click(function () {
                let fd = new FormData();
                fd.append("id", $('#id').val());
                console.log("id是何打开发"+$('#userId').val())
                fd.append("userName", $('#userName').val());
                fd.append("userId", $('#userId').val());
                fd.append("usrType", $('#userType').val());
                fd.append("isVip", $('#isVip').val());
                fd.append("userSex", $('#userSex').val());
                fd.append("userAge", $('#userAge').val());
                fd.append("multipartFile", $('#user_info_form input[type="file"]')[0].files[0]);
                $.post({
                    url:"/user/updateUserInfo",
                    data:fd,
                    dataType:"json",
                    processData: false,
                    contentType: false,
                    success:function (data) {
                        alert(data.message);
                        window.location.href="personCenter.html"
                    }
                })
            });
        }
    });
    //查找用户的地址信息
    $.post({
        url:"/address/selectalladdress",
        data:{userId:userId},
        async:false,
        dataType:"json",
        success:function (data) {
            showaddress(data)

        }
    })

    //查中用户的订单信息
    $.post({
        url:"/order/FindAllorderFormById",
        data:{userId:userId},
        async:false,
        dataType:"json",
        success:function (data) {
            console.log(data)
            if(data.code == 1){
                console.log("查询失败！");
                alert("没有订单信息！");
            }else{
                showorderform(data.data);
            }


        }
    })
}
init();


/*查找用户的地址信息*/
$('#addressManage').click(function () {
    var num =$(this).attr("name");
    /*只读*/
    /* $('#addressManage input[type="text"]').attr("readonly","readonly")*/
    /*先隐藏右侧的页面在显示*/
    let target = $(".main_right_function_order");
    target.css("display","none");
    /*找到第几个显示它*/
    target.eq(num).css("display","block");
});

/*点击新建收货用户信息*/
$('#addAddressFrom .button').click(function () {
    $.post({
        url:"/address/insertuseraddress?userId="+userId,
        data:$('#addAddressFrom').serialize(),
        dataType:"json",
        success:function (data) {
            alert(data.message);
            window.location.href="personCenter.html";
        }
    })
});

/*点击按钮查找用户信息*/
$('#userInfoManage').click(function () {
    let num =$(this).attr("name");
    let target = $(".main_right_function_order");
    target.css("display","none");
    /*找到第几个显示它*/
    target.eq(num).css("display","block");
});


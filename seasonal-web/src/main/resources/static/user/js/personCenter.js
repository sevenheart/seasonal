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
    let file =document.getElementById("bookimg");
    let imgUrl =window.URL.createObjectURL(file.files[0]);
    $('#userimg img').attr('src',imgUrl); // 修改img标签src属性值
}
/*展示地址信息*/
function showaddress(data){
    let html='  <tr>\n' +
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
        let flag = $(this).attr("data-type");
        if(Number(flag)===0){
            $(this).parents("tr").children("td").children("input[type='text']").removeAttr("readonly");
            $(this).attr("data-type",1);
        }else {
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
    console.log(data)
    let title =  '<tr style="width: 800px">\n' +
        '                            <td><span>订单号</span></td>\n' +
        '                            <td><span>商品描述</span></td>\n' +
        '                            <td><span>订单金额</span></td>\n' +
        '                            <td><span>订单状态</span></td>\n' +
        '                            <td><span>支付平台</span></td>\n' +
        '                            <td><span>配送方式</span></td>\n' +
        '                        </tr>';
    let htmlall =title;
    noorderflag = false;
    orderedflag = false;
    flag = false;
    let noorder =title;
    let ordered=title;
    //点击查看信息每个订单的信息存储
    let orderlist;
    //点击查看信息每个账号的存储
    let detaildata ;
    //需要传递的评论信息的存储。
    let mongocomment;

    for(let i = 0;i < data.length;i++){
        flag = true;
        let button = '<td><input  type="button" class="button delitalbutton payorder"  value="支付"/></td>\n';
        let orderstates ='<td><p>未支付</p></td>';
        let deliveryWay = '<td><p>自提</p></td>\n';
        if(data[i].deliveryWay===0){
            deliveryWay = '<td><p>配送</p></td>\n';
        }
        //已支付拼接
        //未支付拼接
        if(Number(data[i].orderStatus) === 1){
            orderedflag = true;
            button = '<td><input  type="button" class="button delitalbutton look"  value="查看详情" data-toggle="modal" data-target="#myModal" /></td>';
            orderstates ='<td><p>已支付</p></td>';
            ordered +=' <tr>\n' +
                '                            <td><p>'+data[i].orderId+'</p></td>\n' +
                '                            <td><p>'+data[i].detailedCommodityForms[0].composeGoods[0].composeGoodName+'</p></td>\n' +
                '                            <!--已支付判断，赋class ordered-->\n' +
                '                            <td><p>'+data[i].orderMoney+'</p></td>\n' +
                orderstates+
                '                            <td><p>支付宝</p></td>\n' +
                '                            <td hidden class="detailData" data-type="'+i+'"></td>\n' +
                deliveryWay+
                button+
                '                        </tr>\n';
        }
        else{
            noorderflag = true;
            noorder +=' <tr>\n' +
                '                            <td><p>'+data[i].orderId+'</p></td>\n' +
                '                            <td><p>'+data[i].detailedCommodityForms[0].composeGoods[0].composeGoodName+'</p></td>\n' +
                '                            <!--已支付判断，赋class ordered-->\n' +
                '                            <td><p>'+data[i].orderMoney+'</p></td>\n' +
                orderstates+
                '                            <td><p>支付宝</p></td>\n' +
                '                            <td hidden class="detailData" data-type="'+i+'"></td>\n' +

                deliveryWay+
                button+
                '                        </tr>\n'
        }
        htmlall +=' <tr>\n' +
            '                            <td><p>'+data[i].orderId+'</p></td>\n' +
            '                            <td><p>'+data[i].detailedCommodityForms[0].composeGoods[0].composeGoodName+'</p></td>\n' +
            '                            <!--已支付判断，赋class ordered-->\n' +
            '                            <td><p>'+data[i].orderMoney+'</p></td>\n' +
            orderstates+
            '                            <td><p>支付宝</p></td>\n' +
            deliveryWay+
            '                            <td hidden class="detailData" data-type="'+i+'"></td>\n' +

            button+
            '                        </tr>\n'
        //这里顺便拼接评论页面：
        showcommetstates(data[i].detailedCommodityForms,i);
    }//评论完成展示commenttablecommented
    $("#commenttable").html(commenttablecommented);
    //评论未完成
    $("#nocommenttable").html(commenttablenocomment);

    //评论未完成展示
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
        let list = $(this).parent("td").parent("tr").children(".detailData").attr("data-type");
        window.location.href='/order/view/orderUnpaid.html?orderId='+data[list].orderId;
    });
    $(".look").click(function () {
        let list = $(this).parent("td").parent("tr").children(".detailData").attr("data-type");
        orderlist = data[list];
        detaildata =data[list].detailedCommodityForms;
        }

    );
    //评论列表中点击评论按钮，记录需要保存到数据库中的值
    $('.commentclick').click(function () {
        let outindex = $(this).attr("data-big");
        let inindex = $(this).attr("data-little");
        let time=getNowDateFormat();
        //商品id
        //用户头像昵称id
        //评论内容
        //创建时间

        console.log("商品id是"+$(this).attr("data-big"));
        //存储需要保存的评论信息
        mongocomment ={"comment_goods_id":data[outindex].detailedCommodityForms[inindex].goodId,
            "comment_user_id":"001", "comment_user_name":"陆旭",
            "comment_user_img":"baidu.com",
            "orderId":data[outindex].orderId,
            "comment_content":"","comment_create_time":time}
    })
    //模态框控制
    $('#myModal').modal("hide");
    $('#myModal').on('show.bs.modal', function (event) {

        let goodtable =' <tr>\n' +
            '                                <td>商品名称</td>\n' +
            '                                <td>商品数量</td>\n' +
            '                                <td>商品价格</td>\n' +
            '                            </tr> ';

        $.each(detaildata,function (index,content) {
            goodtable+= '  <tr>\n' +
                '                                <td>'+content.composeGoods[0].composeGoodName+'</td>\n' +
                '                                <td>'+content.goodCount+'</td>\n' +
                '                                <td>'+content.commodityMoney+'</td>\n' +
 '              </tr>';

        });
        if(Number(orderlist.deliveryWay)===0){
            goodtable+=  '  <tr >\n' +
                '                     <td colspan="3">取货账号是：'+orderlist.getAccount+'</td>\n' +
                '               </tr>'+
                '  <tr >\n' +
                '                     <td colspan="3">取货密码是：'+orderlist.getPassword+'</td>\n' +
                ' </tr>';
        }else {
            goodtable+=  '  <tr >\n' +
                '                     <td colspan="3">配送地址是：'+orderlist.deliveryAddress+'</td>\n' +
                '               </tr>';
        }


        $("#goodstable").html(goodtable)

    })
    //评论模态框commentmodal
    $('#commentmodal').modal("hide")
    $('#commentmodal').on('show.bs.modal', function (event){

    })
    /*点击评论按钮后存储评论信息*/
    $('#modal-confirm').click(function () {
        let contents = $('#content').val()
        mongocomment.comment_content = contents;
        if(contents===null||contents==""){
            alert("不能输入空字符串！");
        }else {
            console.log("点击了确定评论按钮");
            $.post({
                url: "/upsertcomment",
                data: mongocomment,
                dataType: "json",
                success: function (data) {
                    alert(data.message);
                    $('#commentmodal').modal("hide")
                }
            })
        }


    })
}



/*展示商品评论状态在showorderform中调用
* data是详细商品的信息
*
* */
let commenttablecommented='<tr>' +
    '                                <td>商品图片</td>\n' +
    '                                <td>商品名称</td>\n' +
    '                                <td>商品数量</td>\n' +
    '                                <td>商品价格</td>\n' +
    '                                <td></td>\n' +
    '</tr>';
let commenttablenocomment='<tr>' +
    '                                <td>商品图片</td>\n' +
    '                                <td>商品名称</td>\n' +
    '                                <td>商品数量</td>\n' +
    '                                <td>商品价格</td>\n' +
    '                                <td></td>\n' +
    '</tr>';
let commentbutton ;

function showcommetstates(data,j) {
    $.each(data,function (index,content) {
        if(Number(content.iscomment)===0){
            commentbutton  = '<td><input  type="button" class="button commentclick " data-big="'+j+'" data-little='+index+' value="评论"  data-toggle="modal" data-target="#commentmodal"  /></td>';
            commenttablenocomment +=' <tr>\n' +
                '                            <td><img  src='+content.composeGoods[0].composeGoodIcon+' /></td>\n' +
                '                            <td><p>'+content.composeGoods[0].composeGoodName+'</p></td>\n' +
                '                            <td><p>'+content.goodCount+'</p></td>\n' +
                '                            <td><p>'+content.commodityMoney+'</p></td>\n' +
                commentbutton+
                '                        </tr>\n';

        }else {
            commentbutton = '<td><input  type="button" class="button"  value="查看评论" /></td>';
            commenttablecommented+=' <tr>\n' +
                '                            <td><img  src='+content.composeGoods[0].composeGoodIcon+' /></td>\n' +
                '                            <td><p>'+content.composeGoods[0].composeGoodName+'</p></td>\n' +
                '                            <td><p>'+content.goodCount+'</p></td>\n' +
                '                            <td><p>'+content.commodityMoney+'</p></td>\n' +
                commentbutton+
                '                        </tr>\n';
        }




    })
}
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
                console.log("id是何打开发"+$('#userId').val());
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
    });

    //查中用户的订单信息
    //评论情况信息
    $.post({
        url:"/order/FindAllorderFormById",
        data:{userId:userId},
        async:false,
        dataType:"json",
        success:function (data) {
            console.log(data);
            if(Number(data.code) === 1){
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
    let num =$(this).attr("name");
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

/*获取当前时间，为存储到mongodb备用*/
//获取当前时间
function getNowDateFormat(){
    var nowDate = new Date();
    var year = nowDate.getFullYear();
    var month = filterNum(nowDate.getMonth()+1);
    var day = filterNum(nowDate.getDate());
    var hours = filterNum(nowDate.getHours());
    var min = filterNum(nowDate.getMinutes());
    var seconds = filterNum(nowDate.getSeconds());
    return year+"-"+month+"-"+day+" "+hours+":"+min+":"+seconds;
}
function filterNum(num){
    if(num < 10){
        return "0"+num;
    }else{
        return num;
    }
}
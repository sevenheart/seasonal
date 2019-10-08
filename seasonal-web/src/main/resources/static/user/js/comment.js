//进入本页按照用户id查找为评论的商品信息
$.post({
    url: "/FindNoCommentGoods",
    data: {"userId": userId},
    dataType: "json",
    success: function (data) {
        console.log(data);
        showcommetstates(data);
    }
});
//需要向后台传递的评论信息
let mongocomment;

var commentArray = new Array();

const $comments_body =  $('.orders-box .orders-body');


//评论模态框commentmodal
$('#commentmodal').modal("hidden");
$('#commentmodal').on('show.bs.modal', function (event) {
});

//展示未评论的商品信息
function showcommetstates(data) {
    let test = ' ';
    let commetsCount = 0;
    if (data.code === 200) {
        $.each(data.data, function (index, content) {
            commetsCount++;
            test += '  <div class="order-item clearfix">\n' +
                '                            <div class="order-img">\n' +
                '                                <a data-toggle="modal" data-target="#commentmodal"  data-index="' + index + '" href="" class="link"\n' +
                '                                   target="_blank">\n' +
                '                                    <div ><img src=' + content.composeGoods[0].composeGoodIcon + '\n' +
                '                                              class="image"></div></a>\n' +
                '                            </div>\n' +
                '\n' +
                '                            <div class="order-info info-box">\n' +
                '                                <a data-toggle="modal" data-target="#commentmodal" href="" class="link"\n' +
                '                                   target="_blank" data-toggle="modal" data-target="#commentmodal">\n' +
                '                                    <p class="order-title" >' + content.composeGoods[0].composeGoodName + '</p></a>\n' +
                '\n' +
                '                                <p class="info">商品数量：' + content.goodCount + '</p>\n' +
                '\n' +
                '\n' +
                '                            </div>\n' +
                '\n' +
                '                            <div class="order-price">\n' +
                '                                总价：' + content.commodityMoney + '\n' +
                '                            </div>\n' +
                '\n' +
                '                            <div class="order-status">\n' +
                '                                待评论\n' +
                '                            </div>\n' +
                '\n' +
                '                            <div class="order-btn"></div>\n' +
                '                        </div>' +
                '<div class="order-btn" >\n' +
                '                <a data-toggle="modal" data-target="#commentmodal" data-index="' + index + '" class=\n' +
                '                "link show-deal commentclick" target="_blank" >评价</a>\n' +
                '                </div>'

            if(commetsCount % 5 === 0){
                commentArray.push(test);
                test = '';
            }
        });
        if(commetsCount % 5 === 0){
            commentArray.push(test);
            test = '';
        }
        // 调用分页插件回调函数，显示全部订单
        $("#Pagination").pagination(commetsCount, {
            callback: showAllComments,
        });
    } else {
        test += '<div><p class="no-order-text">没有未评论的信息</p></div>'
        $comments_body.html(test);
    }


    //评论按钮点击事件
    $('.commentclick').click(function () {
        let outindex = Number($(this).attr("data-index"));
        console.log(data.data[outindex])
        let time = getNowDateFormat();
        //商品id
        //用户头像昵称id
        //评论内容
        //创建时间

        //存储需要保存的评论信息
        mongocomment = {
            "comment_goods_id": data.data[outindex].goodId,
            "comment_user_id": userId, "comment_user_name": userName,
            "comment_user_img": userImg,
            "orderId": data.data[outindex].orderId,
            "comment_content": "", "comment_create_time": time
        }

    })
    /*点模态框的确定按钮后存储评论信息*/
    $('#modal-confirm').click(function () {
        let contents = $('#content').val()
        mongocomment.comment_content = contents;
        if (contents === null || contents == "") {
            alert("不能输入空字符串！");
        } else {
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


//创建时间的方法：
/*获取当前时间，为存储到mongodb备用*/

//获取当前时间
function getNowDateFormat() {
    var nowDate = new Date();
    var year = nowDate.getFullYear();
    var month = filterNum(nowDate.getMonth() + 1);
    var day = filterNum(nowDate.getDate());
    var hours = filterNum(nowDate.getHours());
    var min = filterNum(nowDate.getMinutes());
    var seconds = filterNum(nowDate.getSeconds());
    return year + "-" + month + "-" + day + " " + hours + ":" + min + ":" + seconds;
}

function filterNum(num) {
    if (num < 10) {
        return "0" + num;
    } else {
        return num;
    }
}

// 根据页码显示相应的页数
function showAllComments(current_page){
    console.log('页数:'+current_page);
    $comments_body.html(commentArray[current_page]);
}


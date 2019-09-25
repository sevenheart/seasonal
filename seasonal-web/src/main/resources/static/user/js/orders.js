//点击重新加载数据选项卡效果
$(".orders-box .orders-ul li").click(function () {
    console.log("点击了")
    $(this).parent("ul").children("li").removeClass("active");
    $(this).addClass("active");
    //在orders-body下追加div即可
    let html = ' <div class="order-item clearfix">\n' +
        '                            <div class="order-img">\n' +
        '                                <a href="http://maoyan.com/order/detail/21282407199/" class="link"\n' +
        '                                   target="_blank">\n' +
        '                                    <div><img src=\n' +
        '                                                      "//p0.meituan.net/movie/648bbced128324a4b4ccf7db6c564a251744344.jpg@112w_112h_1e_1c"\n' +
        '                                              class="image"></div></a>\n' +
        '                            </div>\n' +
        '\n' +
        '                            <div class="order-info info-box">\n' +
        '                                <a href="http://maoyan.com/order/detail/21282407199/" class="link"\n' +
        '                                   target="_blank">\n' +
        '                                    <p class="order-title" >三分果盒：夏日酷爽等</p></a>\n' +
        '\n' +
        '                                <p class="info">商品数量：2个</p>\n' +
        '\n' +
        '\n' +
        '                            </div>\n' +
        '\n' +
        '                            <div class="order-price">\n' +
        '                                总价：¥73.8\n' +
        '                            </div>\n' +
        '\n' +
        '                            <div class="order-status">\n' +
        '                                已支付\n' +
        '                            </div>\n' +
        '\n' +
        '                            <div class="order-btn"></div>\n' +
        '                        </div>';

    $(".orders-box .orders-body").html(html);
})
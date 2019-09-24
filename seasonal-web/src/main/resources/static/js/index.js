//自动登录检测
function checklocalStorage() {
    var storage = window.localStorage;//获取登录信息
    var identifier = storage['identifier'];
    var credential = storage["credential"];
    var check = storage['check'];
    console.log("storage->>" + identifier + ", " + credential + ", " + check);
    if (identifier !== "" && credential !== "" && check === "true") {
        $.ajax({ //修改登录信息，重新保存localStorage
            url: "/login",
            type: "post",
            dataType: "json",
            data: {"identifier": identifier, "credential": credential},
            async: false,
            success: function (data) {
                savelocalStorage(data, check);//保存localStorage
            },
            error: function (data) {
                alert("自动登录失败");
            }
        })
    }
}

//localStorage保存，自动登录
function savelocalStorage(data, check) {
    var storage = window.localStorage;
    if (check === true) {
        storage["identifier"] = data.identifier;
        storage["credential"] = data.credential;
        storage["check"] = "true";
    } else {
        storage["identifier"] = data.identifier;
        storage["check"] = "false";
    }
}


$(document).ready(function () {
    let length,
        currentIndex = 0,
        interval,
        hasStarted = false, //是否已经开始轮播
        t = 3000; //轮播时间间隔
    length = $('.slider-panel').length;

    //将除了第一张图片隐藏
    $('.slider-panel:not(:first)').hide();
    //将第一个slider-item设为激活状态
    $('.slider-item:first').addClass('slider-item-selected');
    //隐藏向前、向后翻按钮
    $('.slider-page').hide();

    //鼠标上悬时显示向前、向后翻按钮,停止滑动，鼠标离开时隐藏向前、向后翻按钮，开始滑动
    $('.slider-panel, .slider-pre, .slider-next').hover(function () {
        stop();
        $('.slider-page').show();
    }, function () {
        $('.slider-page').hide();
        start();
    });

    $('.slider-item').hover(function () {
        stop();
        let preIndex = $(".slider-item").filter(".slider-item-selected").index();
        currentIndex = $(this).index();
        play(preIndex, currentIndex);
    }, function () {
        start();
    });
    const $slider = $('.slider-pre');
    $slider.unbind('click');
    $slider.bind('click', function () {
        pre();
    });
    const $sliderNext = $('.slider-next');
    $sliderNext.unbind('click');
    $sliderNext.bind('click', function () {
        next();
    });

    /**
     * 向前翻页
     */
    function pre() {
        let preIndex = currentIndex;
        currentIndex = (--currentIndex + length) % length;
        play(preIndex, currentIndex);
    }

    /**
     * 向后翻页
     */
    function next() {
        let preIndex = currentIndex;
        currentIndex = ++currentIndex % length;
        play(preIndex, currentIndex);
    }

    /**
     * 从preIndex页翻到currentIndex页
     * preIndex 整数，翻页的起始页
     * currentIndex 整数，翻到的那页
     */
    function play(preIndex, currentIndex) {
        $('.slider-panel').eq(preIndex).fadeOut(500)
            .parent().children().eq(currentIndex).fadeIn(1000);
        const $slider = $('.slider-item');
        $slider.removeClass('slider-item-selected');
        $slider.eq(currentIndex).addClass('slider-item-selected');
    }

    /**
     * 开始轮播
     */
    function start() {
        if (!hasStarted) {
            hasStarted = true;
            interval = setInterval(next, t);
        }
    }

    /**
     * 停止轮播
     */
    function stop() {
        clearInterval(interval);
        hasStarted = false;
    }

    //开始轮播
    start();
});
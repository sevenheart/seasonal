let userId;
let userName;
let login_html;
let userImg;
//页面自动加载，判断是否自动登录，并完成自动登录

//初始化地图
var callbackUrl = '&callback=onLoad';//网页初始化地图服务回调函数
var drivingUrl = '&plugin=AMap.Driving'; //引入路线规划服务
var geocoderUrl = '&plugin=AMap.Geocoder'; //引入地理编码服务
var url = 'https://webapi.amap.com/maps?v=1.4.15&key=f9d2a4291a8c1899397625dc9bc8646e' + callbackUrl + drivingUrl + geocoderUrl;
var jsapi = document.createElement('script');
jsapi.charset = 'utf-8';
jsapi.src = url;
document.head.appendChild(jsapi);

let driving;
let geocoder;
let personAddress;
let map;
let markerOptions;

window.onLoad = function () {
    map = new AMap.Map('container', {});
    //构造路线导航类
    // 开启路线规划的路径显示
    driving = new AMap.Driving({
        map: map
    });
    //地理编码
    geocoder = new AMap.Geocoder({
        city: "", // 城市默认：“全国”
    });
    personLoction();
};

$.ajax({
    url: "/getsessionUserId",
    type: "post",
    dataType: "json",
    async: false,
    success: function (data) {
        console.log(data);
        if (data.code === 200) {
            userId = data.data[0].userId;
            userName = data.data[0].userName;
            userImg = data.data[0].userImg;
            login_html = '<li class="login">\n' +
                '                    <img alt="" src="https://seasonal-1300148510.cos.ap-shanghai.myqcloud.com/img/index/login_icon.jpg">\n' +
                '                    <span class="login-span">用户名：</span>\n' +
                '                    <a class="already-login">' + userName + '</a>\n' +
                '                </li>\n' +
                '                <li class="registration">\n' +
                '                    <a href="#" class="cancellation">退出账号</a>\n' +
                '                </li>';
            $(".login_bar").children("ul").html(login_html);
        } else {
            login_html = ' <li class="login">\n' +
                '                    <img alt="" src="https://seasonal-1300148510.cos.ap-shanghai.myqcloud.com/img/index/login_icon.jpg">\n' +
                '                    <a href="../../login/view/login.html" class="not-login">请登录</a>\n' +
                '                </li>\n' +
                '                <li class="registration">\n' +
                '                    <img alt=""\n' +
                '                         src="https://seasonal-1300148510.cos.ap-shanghai.myqcloud.com/img/index/register_icon.jpg"\n' +
                '                         >\n' +
                '                    <a href="../../login/view/registration.html">免费注册</a>\n' +
                '                </li>';
            $(".login_bar").children("ul").html(login_html);
        }
    },
    error: function (data) {
        alert("获取自动登录信息失败！")
    }
});


$(document).on('click', '.cancellation', function () {
    $.ajax({
        url: "/cancellation",
        type: "post",
        dataType: "text",
        success: function (data) {
            var storage = window.localStorage;
            storage.clear();
            window.location.reload();
        }
    })
});


// 个人定位
function personLoction() {
        AMap.plugin('AMap.Geolocation', function () {
            var geolocation = new AMap.Geolocation({
                enableHighAccuracy: true,//是否使用高精度定位，默认:true
                timeout: 10000,          //超过10秒后停止定位，默认：5s
                buttonPosition: 'RB',    //定位按钮的停靠位置
                buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                zoomToAccuracy: true,   //定位成功后是否自动调整地图视野到定位点
            });
            map.addControl(geolocation);
            geolocation.getCurrentPosition(function (status, result) {
                if (status === 'complete') {
                    onComplete(result);
                } else {
                    onError(result);
                }
            });
        });

    //解析定位结果
    function onComplete(data) {
        console.log('定位成功');
        console.log("地址: "+data.formattedAddress);
        personAddress = data;
        markerOptions = new AMap.Marker({//自定义定位点样式，同Marker的Options
            position: data.position,
            offset: new AMap.Pixel(-18, -36),
            content: '<img src="https://a.amap.com/jsapi_demos/static/resource/img/user.png" style="width:36px;height:36px" alt=""/>',
            title: '您在这'
        });
        if("undefined" != typeof getMerchantAddress) {
            getMerchantAddress();
        }
    }

    //解析定位错误信息
    function onError(data) {
        alert('定位失败，请刷新重试');
        console.log('失败原因排查信息:' + data.message);
    }
}
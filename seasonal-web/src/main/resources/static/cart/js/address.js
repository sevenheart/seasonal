//初始化地图
var callbackUrl = '&callback=onLoad';//网页初始化地图服务回调函数
var drivingUrl = '&plugin=AMap.Driving'; //引入路线规划服务
var geocoderUrl = '&plugin=AMap.Geocoder'; //引入地理编码服务
var url = 'https://webapi.amap.com/maps?v=1.4.15&key=f9d2a4291a8c1899397625dc9bc8646e' + callbackUrl + drivingUrl + geocoderUrl;
var jsapi = document.createElement('script');
jsapi.charset = 'utf-8';
jsapi.src = url;
document.head.appendChild(jsapi);
var map;
var driving;
var geocoder;
var markers = new Array();
var addressNum = 0;
var markerOptions;
var personAddress;

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
            if (status == 'complete') {
                onComplete(result)
            } else {
                onError(result)
            }
        });
    });

    //解析定位结果
    function onComplete(data) {
        console.log('定位成功')
        //console.log('定位结果：' + data.position);
        //console.log(data)
        //console.log("地址: "+data.formattedAddress)
        personAddress = data
        markerOptions = new AMap.Marker({//自定义定位点样式，同Marker的Options
            position: data.position,
            offset: new AMap.Pixel(-18, -36),
            content: '<img src="https://a.amap.com/jsapi_demos/static/resource/img/user.png" style="width:36px;height:36px"/>',
            title: '您在这'
        })
        if (addressAndDistance.length == 0) {
            getMerchantAddress()
        }
    }

    //解析定位错误信息
    function onError(data) {
        console.log('定位失败')
        console.log('失败原因排查信息:' + data.message);
    }
}


var addressAndDistance = new Array()

// 从数据库获取地址进行路线规划，并且计算距离
function getMerchantAddress() {
    $.ajax({
        url: '/getAllMerchantAddress',
        type: 'post',
        dataType: 'json',
        async: false,
        success: function (data) {
            $.each(data, function (i, value) {
                console.log('success:'+ value.address)
                //根据起终点名称规划驾车导航路线
                driving.search([
                    {keyword: personAddress.formattedAddress, city: personAddress.city},
                    {keyword: value.address, city: value.city}//获取详细地址和市
                ], function (status, result) {
                    if (status === 'complete') {
                        console.log('绘制路线完成')
                        console.log(value.address+'距离为:' + result.routes[0].distance)
                        var mAddress = {
                            'addressData': value,
                            'distance': result.routes[0].distance
                        }
                        addressAndDistance.push(mAddress)
                    } else {
                        console.log('获取数据失败：' + result)
                    }
                });
            })
        }
    })
}

// 正向地理编码
function getGeoCode(data) {
    geocoder.getLocation(data.addressData.address, function (status, result) {
        if (status === 'complete' && result.geocodes.length) {
            var lnglat = result.geocodes[0].location
            console.log('坐标为:'+lnglat)
            if (addressNum < 5) {
                var marker = new AMap.Marker({
                    position: lnglat,
                    icon: new AMap.Icon({
                        image: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-' + ++addressNum + '.png',
                        imageSize: new AMap.Size(26, 36)
                    }),
                    title: '地址:' + data.addressData.address + ',距您:' + Number(data.distance * 0.001).toFixed(2) + '公里', // 点标签
                    offset: new AMap.Pixel(-20, -30), // 位置偏移
                })
                showWindow(marker, data)
                markers.push(marker)
                map.add(markers);
                map.setFitView(personAddress.location);
            }
        } else {
            console.log('根据地址查询位置失败');
        }
    });
}


//实例化信息窗体
function showWindow(marker, data) {
    //鼠标点击marker弹出自定义的信息窗体
    AMap.event.addListener(marker, 'click', function () {
        infoWindow.open(map, marker.getPosition());
    });

    var title = data.addressData.merchantName + '<span style="font-size:11px;color:#F00;">距离:' + Number(data.distance * 0.001).toFixed(2) + '公里</span>',
        content = [];
    content.push("<img src='http://tpc.googlesyndication.com/simgad/5843493769827749134'>地址：" + data.addressData.city + data.addressData.address);
    content.push("电话：" + data.addressData.merchantPhone);
    var infoWindow = new AMap.InfoWindow({
        isCustom: true,  //使用自定义窗体
        content: createInfoWindow(title, content.join("<br/>")),
        offset: new AMap.Pixel(16, -45)
    });

    //构建自定义信息窗体
    function createInfoWindow(title, content) {
        var info = document.createElement("div");
        info.className = "custom-info input-card content-window-card";

        //可以通过下面的方式修改自定义窗体的宽高
        //info.style.width = "400px";
        // 定义顶部标题
        var top = document.createElement("div");
        var titleD = document.createElement("div");
        var closeX = document.createElement("img");
        top.className = "info-top";
        titleD.innerHTML = title;
        closeX.src = "https://webapi.amap.com/images/close2.gif";
        closeX.onclick = closeInfoWindow;

        top.appendChild(titleD);
        top.appendChild(closeX);
        info.appendChild(top);

        // 定义中部内容
        var middle = document.createElement("div");
        middle.className = "info-middle";
        middle.style.backgroundColor = 'white';
        middle.innerHTML = content;
        info.appendChild(middle);

        // 定义底部内容
        var bottom = document.createElement("div");
        bottom.className = "info-bottom";
        bottom.style.position = 'relative';
        bottom.style.top = '0px';
        bottom.style.margin = '0 auto';
        var sharp = document.createElement("img");
        sharp.src = "https://webapi.amap.com/images/sharp.png";
        bottom.appendChild(sharp);
        info.appendChild(bottom);
        return info;
    }

    //关闭信息窗体
    function closeInfoWindow() {
        map.clearInfoWindow();
    }

}

// 规划路线
function planningRoute(city, address) {
    var planDistance = 0.0
    $.each(addressAndDistance, function (i, value) {
        driving.search([
            {keyword: value.addressData.address, city: value.addressData.city},//获取详细地址和市
            {keyword: address, city: city}
        ], function (status, result) {
            if (status === 'complete') {
                //console.log('绘制路线完成')
                //console.log(address+'距离为:' + result.routes[0].distance * 0.001 + '公里')
                if (planDistance === 0.0 || planDistance > result.routes[0].distance * 0.001) {
                    planDistance = result.routes[0].distance * 0.001
                }
                //console.log('当前最近的距离为:'+planDistance)
                delivery_money = parseInt(planDistance);
                order_money += delivery_money;
                $("#allot_price").text("配送费：￥" + delivery_money);
                $("#order_money").text(order_money);
            } else {
                console.log('获取数据失败：' + result)
            }
        });
    })
}

/*
// 计算距离
function calDistance(city, address) {
    var sellerPosition
    var dis
    geocoder.getLocation(address, function(status, result) {
        if(status === 'complete'){
            var nowPosition = result.geocodes[0].location
            $.each(markers, function (i, value) {
                console.log('marker:'+value.getPosition())
                if(dis === 0.0 || dis > Math.round(value.getPosition().distance(nowPosition))) {
                    dis = Math.round(value.getPosition().distance(nowPosition))
                    sellerPosition = value.getPosition()
                }
            })
            console.log('最短距离为:'+dis)
            planningRoute(sellerPosition)
        }else{
            console.log('找不到地址')
        }
    })

}*/

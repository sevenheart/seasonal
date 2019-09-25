var markers = new Array();
var addressNum = 0;
var addressAndDistance = new Array();

// 初始化路线距离
var planDistance = 0.0;
var planMLocation;
let deliveryAddress;

// ajax请求从数据库获取地址进行路线规划，并且计算距离
function getMerchantAddress() {
    $.ajax({
        url: '/getAllMerchantAddress',
        type: 'post',
        dataType: 'json',
        async: false,
        success: function (data) {
            if(data.code === 200) {
                $.each(data.data, function (i, value) {
                    // 直接计算两边距离
                    geocoder.getLocation(value.address, function (status, result) {
                        if (status === 'complete' && result.geocodes.length) {
                            let mLnglat = result.geocodes[0].location;
                            let pLnglat = personAddress.position;
                            let distance = pLnglat.distance(mLnglat);
                            // 将获取得到的地址和路线规划的距离整合
                            let mAddress = {
                                'addressData': value,
                                'lnglat': mLnglat,
                                'pickupDistance': result.routes[0].distance
                            };
                            // 存入全局变量中
                            addressAndDistance.push(mAddress);
                            console.log(value.address +'distance:'+ Number(distance * 0.001).toFixed(2));
                        }
                    });
                    /*// 根据起终点名称规划驾车导航路线
                    driving.search([
                        {keyword: personAddress.formattedAddress, city: personAddress.city},
                        {keyword: value.address, city: value.city}//获取详细地址和市
                    ], function (status, result) {
                        // 判断高德地图接口是否路线规划成功
                        if (status === 'complete') {
                            // 将获取得到的地址和路线规划的距离整合
                            let mAddress = {
                                'addressData': value,
                                'distance': result.routes[0].distance
                            };
                            // 存入全局变量中
                            addressAndDistance.push(mAddress);
                        } else {
                            alert('获取地址失败，请刷新重试');
                        }
                    });*/
                });
            }else if(data.code === 100){
                // 若获取错误，则弹出提示
                alert(data.message + ',请刷新页面重试');
            }
        }
    });
}

// 正向地理编码
function getGeoCode(data) {
    geocoder.getLocation(data.addressData.address, function (status, result) {
        if (status === 'complete' && result.geocodes.length) {
            let lnglat = result.geocodes[0].location;
            if (addressNum < 5) {
                var marker = new AMap.Marker({
                    position: lnglat,
                    icon: new AMap.Icon({
                        image: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-' + ++addressNum + '.png',
                        imageSize: new AMap.Size(26, 36)
                    }),
                    title: '地址:' + data.addressData.address + ',距您:' + Number(data.distance * 0.001).toFixed(2) + '公里', // 点标签
                    offset: new AMap.Pixel(-20, -30), // 位置偏移
                });
                // 设置点的点击事件
                showWindow(marker, data);
                // 将点存入点列表的全局变量中
                markers.push(marker);
                // 将所有点放入到地图中
                map.add(markers);
                // 以用户的点为中
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

    let title = data.addressData.merchantName + '<span style="font-size:11px;color:#F00;">距离:' + Number(data.distance * 0.001).toFixed(2) + '公里</span>',
        content = [];
    content.push("<img src='http://tpc.googlesyndication.com/simgad/5843493769827749134' alt=''>地址：" + data.addressData.city + data.addressData.address);
    content.push("电话：" + data.addressData.merchantPhone);
    let infoWindow = new AMap.InfoWindow({
        isCustom: true,  //使用自定义窗体
        content: createInfoWindow(title, content.join("<br/>")),
        offset: new AMap.Pixel(16, -45)
    });

    //构建自定义信息窗体
    function createInfoWindow(title, content) {
        let info = document.createElement("div");
        info.className = "custom-info input-card content-window-card";

        //可以通过下面的方式修改自定义窗体的宽高
        //info.style.width = "400px";
        // 定义顶部标题
        let top = document.createElement("div");
        let titleD = document.createElement("div");
        let closeX = document.createElement("img");
        top.className = "info-top";
        titleD.innerHTML = title;
        closeX.src = "https://webapi.amap.com/images/close2.gif";
        closeX.onclick = closeInfoWindow;

        top.appendChild(titleD);
        top.appendChild(closeX);
        info.appendChild(top);

        // 定义中部内容
        let middle = document.createElement("div");
        middle.className = "info-middle";
        middle.style.backgroundColor = 'white';
        middle.innerHTML = content;
        info.appendChild(middle);

        // 定义底部内容
        let bottom = document.createElement("div");
        bottom.className = "info-bottom";
        bottom.style.position = 'relative';
        bottom.style.top = '0px';
        bottom.style.margin = '0 auto';
        let sharp = document.createElement("img");
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
    // 遍历商家地址列表，根据用户提供的地址进行路线规划
    driving.search([
        {keyword: address, city: city},//获取详细地址和市
        {keyword: deliveryAddress.address, city: deliveryAddress.city}
    ], function (status, result) {
        if (status === 'complete') {
            console.log('绘制路线完成')
            //console.log(address+'距离为:' + result.routes[0].distance * 0.001 + '公里')
            if (planDistance === 0.0 || planDistance > result.routes[0].distance * 0.001) {
                planDistance = result.routes[0].distance * 0.001;
                planMLocation = {
                    'city': city,
                    'address': address
                };
            }
            console.log('当前最近的距离为:'+planDistance);
        } else {
            console.log('获取数据失败：' + result);
        }
    });
}

/*// 计算距离
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

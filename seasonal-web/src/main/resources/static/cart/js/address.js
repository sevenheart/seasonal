var markers = new Array();
var addressNum = 0;
var addressAndDistance = new Array();

// 初始化路线距离
var planDistance = 0.0;
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
                    // 直接计算两点距离
                    geocoder.getLocation(value.address, function (status, result) {
                        if (status === 'complete' && result.geocodes.length) {
                            let mLnglat = result.geocodes[0].location;
                            let pLnglat = personAddress.position;
                            let distance = pLnglat.distance(mLnglat);
                            // 将获取得到的地址和路线规划的距离整合
                            let mAddress = {
                                'addressData': value,
                                'lnglat': mLnglat,
                                'pickupDistance': distance
                            };
                            // 存入全局变量中
                            addressAndDistance.push(mAddress);
                            //console.log(addressAndDistance);
                            //console.log(value.address +'distance:'+ Number(mAddress.pickupDistance * 0.001).toFixed(2));
                        }
                    });
                });
            }else if(data.code === 100){
                // 若获取错误，则弹出提示
                alert(data.message + ',请刷新页面重试');
            }
        }
    });
}

// 封装成点，放入到点列表中
function pushMarkers(value) {
    //console.log('value:'+JSON.stringify(value));
    if(addressNum < 5) {
        //console.log('position:'+value.lnglat);
        let marker = new AMap.Marker({
            position: value.lnglat,
            icon: new AMap.Icon({
                image: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-' + ++addressNum + '.png',
                imageSize: new AMap.Size(26, 36)
            }),
            title: '地址:' + value.addressData.address + ',距您:' + Number(value.pickupDistance * 0.001).toFixed(2) + '公里', // 点标签
            offset: new AMap.Pixel(-20, -10), // 位置偏移
        });
        // 设置点的点击事件
        showWindow(marker, value);
        //console.log(marker.getPosition());
        // 将点存入点列表的全局变量中
        markers.push(marker);
    }
}

// 正向地理编码
function getGeoCode(city, address) {
    geocoder.getLocation(address, function (status, result) {
        if (status === 'complete') {
            let lnglat = result.geocodes[0].location;
            $.each(addressAndDistance, function (i, value) {
                console.log('vlnglat:'+value.lnglat)
                var calDistance = Math.round(lnglat.distance(value.lnglat));
                console.log('calDistance:'+calDistance)
                if(planDistance === 0 || planDistance > calDistance) {
                    planDistance = calDistance;
                    console.log('planDistance:'+planDistance)
                    deliveryAddress = {
                        'city': value.addressData.city,
                        'address': value.addressData.address,
                    };
                    console.log('in deliveryAddress:'+deliveryAddress)
                }
            });
        }
    });
}


//实例化信息窗体
function showWindow(marker, data) {
    //鼠标点击marker弹出自定义的信息窗体
    AMap.event.addListener(marker, 'click', function () {
        infoWindow.open(map, marker.getPosition());
    });

    let title = data.addressData.merchantName + '<span style="font-size:11px;color:#F00;">距离:' + Number(data.pickupDistance * 0.001).toFixed(2) + '公里</span>',
        content = [];
    content.push("<img src='http://tpc.googlesyndication.com/simgad/5843493769827749134' alt=''>地址：" + data.addressData.city + data.addressData.address);
    content.push("电话：" + data.addressData.merchantPhone);
    let infoWindow = new AMap.InfoWindow({
        isCustom: true,  //使用自定义窗体
        content: createInfoWindow(title, content.join("<br/>")),
        offset: new AMap.Pixel(16, -35)
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
        {keyword: deliveryAddress.address, city: deliveryAddress.city},//获取详细地址和市
        {keyword: address, city: city}
    ], function (status, result) {
        if (status === 'complete') {
            console.log('绘制路线完成')
        } else {
            console.log('获取数据失败：' + result);
        }
    });
}

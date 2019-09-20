package com.seasonal.service;

import com.seasonal.pojo.OrderInfoForm;

public interface AliPayService {

    /**
     * 支付成功后要做的操作
     * 1.插入用户支付成功后的订单信息
     * 2.修改订单的状态为已支付
     * @param orderInfoForm 要插入的支付信息
     * @return
     */
    boolean paySuccess(OrderInfoForm orderInfoForm);
}

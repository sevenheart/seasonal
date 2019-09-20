package com.seasonal.service;

import com.seasonal.pojo.DetailedCommodityForm;
import com.seasonal.pojo.OrderForm;

import java.util.List;

public interface OrderFormService {
    /**
     * 订单插入 插入订单的同时插入订单下属的订单商品表
     * @param orderForm 订单表数据
     * @param detailedCommodityForms 订单商品表数据
     * @return 0失败 1成功
     */
    int insertOrderForm(OrderForm orderForm, List<DetailedCommodityForm> detailedCommodityForms);
}

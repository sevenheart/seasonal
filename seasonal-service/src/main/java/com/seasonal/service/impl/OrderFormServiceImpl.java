package com.seasonal.service.impl;

import com.seasonal.mapper.CartFormMapper;
import com.seasonal.mapper.DetailedCommodityFormMapper;
import com.seasonal.mapper.OrderFormMapper;
import com.seasonal.pojo.DetailedCommodityForm;
import com.seasonal.pojo.OrderForm;
import com.seasonal.service.OrderFormService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class OrderFormServiceImpl implements OrderFormService {

    private final OrderFormMapper orderFormMapper;
    private final DetailedCommodityFormMapper detailedCommodityFormMapper;
    private final CartFormMapper cartFormMapper;

    @Autowired
    public OrderFormServiceImpl(CartFormMapper cartFormMapper, OrderFormMapper orderFormMapper, DetailedCommodityFormMapper detailedCommodityFormMapper) {
        this.cartFormMapper = cartFormMapper;
        this.orderFormMapper = orderFormMapper;
        this.detailedCommodityFormMapper = detailedCommodityFormMapper;
    }

    @Override
    @Transactional
    public int insertOrderForm(OrderForm orderForm, List<DetailedCommodityForm> detailedCommodityForms) {
        orderFormMapper.insertOrderForm(orderForm);
        for (DetailedCommodityForm detailed : detailedCommodityForms) {
            cartFormMapper.deleteGoodsOfCart(orderForm.getOrderUserId(), detailed.getGoodId());
            detailedCommodityFormMapper.insertDetailCommodityForm(detailed);
        }
        return 1;
    }

    @Override
    public OrderForm findOrderFormByOrderId(String orderId) {
        return orderFormMapper.findOrderFormByOrderId(orderId);
    }

    @Override
    public OrderForm findOrderPassword(String orderId, String userId) {
        return orderFormMapper.findOrderPassword(orderId, userId);
    }

    @Override
    public List<OrderForm> findAllOrderFormByUserId(String userId) {
        return orderFormMapper.findOrderFormByUserId(userId);
    }
}

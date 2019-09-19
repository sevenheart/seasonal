package com.seasonal.service.impl;

import com.seasonal.mapper.DetailedCommodityFormMapper;
import com.seasonal.mapper.OrderFormMapper;
import com.seasonal.mapper.OrderInfoFormMapper;
import com.seasonal.pojo.DetailedCommodityForm;
import com.seasonal.pojo.OrderForm;
import com.seasonal.service.OrderFormService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class OrderFormServiceImpl implements OrderFormService {

    private final OrderInfoFormMapper orderInfoFormMapper;
    private final OrderFormMapper orderFormMapper;
    private final DetailedCommodityFormMapper detailedCommodityFormMapper;

    @Autowired
    public OrderFormServiceImpl(OrderInfoFormMapper orderInfoFormMapper, OrderFormMapper orderFormMapper, DetailedCommodityFormMapper detailedCommodityFormMapper) {
        this.orderInfoFormMapper = orderInfoFormMapper;
        this.orderFormMapper = orderFormMapper;
        this.detailedCommodityFormMapper = detailedCommodityFormMapper;
    }

    @Override
    @Transactional
    public int insertOrderForm(OrderForm orderForm, List<DetailedCommodityForm> detailedCommodityForms) {
        orderFormMapper.insertOrderForm(orderForm);
        for (DetailedCommodityForm detailed : detailedCommodityForms) {
            detailedCommodityFormMapper.insertDetailCommodityForm(detailed);
        }
        return 0;
    }
}

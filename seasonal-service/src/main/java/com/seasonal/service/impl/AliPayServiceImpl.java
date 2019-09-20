package com.seasonal.service.impl;

import com.seasonal.mapper.OrderFormMapper;
import com.seasonal.mapper.OrderInfoFormMapper;
import com.seasonal.pojo.OrderInfoForm;
import com.seasonal.service.AliPayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AliPayServiceImpl implements AliPayService {

    private final OrderInfoFormMapper orderInfoFormMapper;
    private final OrderFormMapper orderFormMapper;
    @Autowired
    public AliPayServiceImpl(OrderInfoFormMapper orderInfoFormMapper,OrderFormMapper orderFormMapper){
        this.orderInfoFormMapper = orderInfoFormMapper;
        this.orderFormMapper = orderFormMapper;
    }


    /**
     * 支付成功后要进行的一次事务
     * 1.插入订单信息到order_form'
     * 2.插入支付信息到order_info_form
     * 3.插入详细的订单信息到order_form
     * @param orderInfoForm 要插入的支付信息
     * @return
     */
    @Override
    public boolean paySuccess(OrderInfoForm orderInfoForm) {
        //1.插入支付信息到支付信息表中
        int insert = orderInfoFormMapper.insertOrderInfo(orderInfoForm);
       /* //2.修改订单信息为已支付

        int update = orderFormMapper.updateOrderState(orderInfoForm.getUserOrderId());*/
       //2.插入订单信息(需要订单信息)
        //int orderform = orderFormMapper.insertOrderForm();
        //3.插入订单的详细信息。（需要详细信息list）


        if (insert>0){
            return true;
        }
        return false;
    }
}

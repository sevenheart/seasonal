package com.seasonal.mapper;

import com.seasonal.pojo.OrderForm;
import com.seasonal.pojo.OrderInfoForm;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 订单表的操作
 */
@Repository
public interface OrderFormMapper {
        /**
         * 根据订单id修改订单的支付状态,改为已支付
         * @param orderId
         * @return
         */
        int updateOrderState(String orderId);

        /**
         * 插入订单信息
         * @param orderForm
         * @return
         */
        int insertOrderForm(OrderForm orderForm);

        /**
         * 通过用户id去查询用户的所有订单
         * @return
         */
        List<OrderForm> findOrderFormByUserId(String userId);


}

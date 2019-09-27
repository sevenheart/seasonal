package com.seasonal.controller;

import com.seasonal.annotation.Intercept;
import com.seasonal.pojo.OrderForm;
import com.seasonal.service.CartFormService;
import com.seasonal.service.OrderFormService;
import com.seasonal.vo.ResultData;
import com.seasonal.vo.ResultUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import java.util.List;

@Controller
@RequestMapping(value = "order")
public class OrderFormController {
    private final CartFormService cartFormService;
    private final OrderFormService orderFormService;

    @Autowired
    public OrderFormController(CartFormService cartFormService, OrderFormService orderFormService) {
        this.cartFormService = cartFormService;
        this.orderFormService = orderFormService;
    }

    @RequestMapping(value = "FindOrderFormById")
    @ResponseBody
    @Intercept
    public Object findOrderFormById(String orderId) {
        System.out.println("支付");
        return ResultUtil.success(orderFormService.findOrderFormByOrderId(orderId));
    }

    @RequestMapping(value = "FindOrderPassword")
    @ResponseBody
    public Object findOrderPassword(String orderId, String userId) {

        OrderForm orderForm = orderFormService.findOrderPassword(orderId, userId);
        if (orderForm.getOrderStatus() == 1) {
            return ResultUtil.success(orderForm);
        } else {
            return ResultUtil.fail("订单支付未成功！");
        }
    }

    @RequestMapping("FindAllorderFormById")
    @ResponseBody
    public Object findAllOrderFormByUserId(String userId){
        List<OrderForm> orderForms = orderFormService.findAllOrderFormByUserId(userId);
        if(orderForms != null && orderForms.size() > 0 ){
            System.out.println("结果是");
            for (OrderForm x:orderForms) {
                System.out.println(x.toString());
            }
            //查找成功
            return ResultUtil.success(orderForms);
        }else {
            //查找失败
            return ResultUtil.fail(100, "不存在记录或查找失败！");
        }
    }

}

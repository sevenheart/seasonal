package com.seasonal.controller;

import com.seasonal.service.CartFormService;
import com.seasonal.service.OrderFormService;
import com.seasonal.vo.ResultUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

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
    public Object findOrderFormById(String orderId) {
        return ResultUtil.success(orderFormService.findOrderFormByOrderId(orderId));
    }
}

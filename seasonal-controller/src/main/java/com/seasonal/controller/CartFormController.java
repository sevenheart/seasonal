package com.seasonal.controller;

import com.seasonal.service.CartFormService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller
public class CartFormController {

    private final CartFormService cartFormService;

    @Autowired
    public CartFormController(CartFormService cartFormService) {
        this.cartFormService = cartFormService;
    }

    @RequestMapping(value = "showCartList")
    @ResponseBody
    public Object findCartFormById(String userId){
        return cartFormService.findCartFormById(userId);
    }
}

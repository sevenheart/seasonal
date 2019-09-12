package com.seasonal.controller;

import com.seasonal.service.CartFormService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Controller
public class CartFormController {

    private final CartFormService cartFormService;

    @Autowired
    public CartFormController(CartFormService cartFormService) {
        this.cartFormService = cartFormService;
    }


}

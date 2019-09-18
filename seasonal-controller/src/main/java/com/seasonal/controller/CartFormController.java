package com.seasonal.controller;

import com.seasonal.pojo.CartForm;
import com.seasonal.service.CartFormService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;


@Controller
public class CartFormController {

    private final CartFormService cartFormService;

    @Autowired
    public CartFormController(CartFormService cartFormService) {
        this.cartFormService = cartFormService;
    }

    @RequestMapping(value = "showCartList")
    @ResponseBody
    public List<CartForm> findCartFormById(String userId){
        return cartFormService.findCartFormById(userId);
    }

    @RequestMapping(value = "addCart")
    @ResponseBody
    public int addGoodsToCart(String userId, String goodId, Integer goodCount){
        return cartFormService.addGoodsToCart(userId, goodId, goodCount);
    }

    @RequestMapping(value = "updateGoodCount")
    @ResponseBody
    public int updateGoodsCount(String userId, String goodId, Integer goodCount){
        return cartFormService.updateGoodsCount(userId, goodId, goodCount);
    }

    /*@RequestMapping(value = "deleteGood")
    @ResponseBody
    public int deleteGoodsOfCart(@RequestBody List<String> goodDataList){
        String userId = goodDataList.get(0);
        goodDataList.remove(0);
        return cartFormService.deleteGoodsOfCart(userId, goodDataList);
    }*/
}

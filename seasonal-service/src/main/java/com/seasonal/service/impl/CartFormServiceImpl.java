package com.seasonal.service.impl;

import com.seasonal.mapper.CartFormMapper;
import com.seasonal.pojo.CartForm;
import com.seasonal.service.CartFormService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class CartFormServiceImpl implements CartFormService {

    private final CartFormMapper cartFormMapper;

    @Autowired
    public CartFormServiceImpl(CartFormMapper cartFormMapper) {
        this.cartFormMapper = cartFormMapper;
    }

    @Override
    public List<CartForm> findCartFormById(String userId) {
        return cartFormMapper.findCartFormById(userId);
    }

    @Override
    public int addGoodsToCart(String userId, String goodId, Integer goodCount) {
        CartForm cartForm = cartFormMapper.findGoodById(userId, goodId);
        int row = 0;
        if(null != cartForm){
            row = cartFormMapper.updateGoodsCount(userId, goodId, cartForm.getGoodCount() + goodCount);
        } else{
            row = cartFormMapper.addGoodsToCart(userId, goodId, goodCount);
        }
        return row;
    }

    @Override
    public int updateGoodsCount(String userId, String goodId, Integer goodCount) {
        return cartFormMapper.updateGoodsCount(userId, goodId, goodCount);
    }

    @Override
    public int deleteGoodsOfCart(String userId,String GoodId) {
        return cartFormMapper.deleteGoodsOfCart(userId, GoodId);
    }

}

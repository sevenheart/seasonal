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
}

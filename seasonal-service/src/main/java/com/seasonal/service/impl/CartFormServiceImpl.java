package com.seasonal.service.impl;

import com.seasonal.mapper.CartFormMapper;
import com.seasonal.service.CartFormService;
import net.sf.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class CartFormServiceImpl implements CartFormService {

    private final CartFormMapper cartFormMapper;

    @Autowired
    public CartFormServiceImpl(CartFormMapper cartFormMapper) {
        this.cartFormMapper = cartFormMapper;
    }

    @Override
    public Object findCartFormById(String userId) {
        JSONArray jsonArray = JSONArray.fromObject(cartFormMapper.findCartFormById(userId));
        return jsonArray;
    }
}

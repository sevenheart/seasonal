package com.seasonal.service;

import com.seasonal.pojo.CartForm;

import java.util.List;

public interface CartFormService {

    /**
     * 根据用户id查找其购物车清单
     * @param userId
     * @return
     */
    List<CartForm> findCartFormById(String userId);

}

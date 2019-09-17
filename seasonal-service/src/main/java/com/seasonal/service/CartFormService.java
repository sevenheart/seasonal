package com.seasonal.service;

public interface CartFormService {

    /**
     * 根据用户id查找其购物车清单
     * @param userId
     * @return
     */
    Object findCartFormById(String userId);

}

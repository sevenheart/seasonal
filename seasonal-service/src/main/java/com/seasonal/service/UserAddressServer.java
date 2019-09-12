package com.seasonal.service;

import com.seasonal.pojo.UserAddress;

/**
 * 用户地址管理
 * author:陆旭
 */
public interface UserAddressServer {
    /**
     * 根据地址信息插入地址
     * @param userAddress
     * @return
     */
    int insertUserAddress(UserAddress userAddress);
}

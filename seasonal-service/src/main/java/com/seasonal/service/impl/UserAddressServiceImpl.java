package com.seasonal.service.impl;

import com.seasonal.mapper.UserAddressMapper;
import com.seasonal.pojo.UserAddress;
import com.seasonal.service.UserAddressServer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 管理地址
 * author：陆旭
 */
@Service
public class UserAddressServiceImpl implements UserAddressServer {

    private final UserAddressMapper userAdressMapper;
    @Autowired
    public UserAddressServiceImpl(UserAddressMapper userAdressMapper) {
        this.userAdressMapper = userAdressMapper;
    }
    @Override
    public int insertUserAddress(UserAddress userAddress) {
        return userAdressMapper.insertUserAddress(userAddress);
    }
}

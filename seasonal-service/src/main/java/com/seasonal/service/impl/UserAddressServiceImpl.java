package com.seasonal.service.impl;

import com.seasonal.mapper.UserAddressMapper;
import com.seasonal.pojo.UserAddress;
import com.seasonal.service.UserAddressServer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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

    @Override
    public List<UserAddress> findAllUserAdreess(String userId) {
        return userAdressMapper.findAllUserAddress(userId);
    }

    @Override
    public int delteUserAddressById(Long id) {

        return userAdressMapper.delteUserAddressById(id);
    }

    @Override
    public int updateUserAddressById(UserAddress userAddress) {
        return userAdressMapper.updateUserAddressById(userAddress);
    }
}

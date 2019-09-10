package com.seasonal.service.impl;

import com.seasonal.mapper.UserInfoMapper;
import com.seasonal.pojo.User;
import com.seasonal.service.UserInfoServer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UerInfoServerImpl implements UserInfoServer {


    private final UserInfoMapper userInfoMapper;
    @Autowired
    public UerInfoServerImpl(UserInfoMapper userInfoMapper) {
        this.userInfoMapper = userInfoMapper;
    }


    @Override
    public List<User> findUserById(Integer id) {
        return null;
    }
}

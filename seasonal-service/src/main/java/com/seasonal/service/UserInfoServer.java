package com.seasonal.service;

import com.seasonal.pojo.User;

import java.util.List;

public interface UserInfoServer {
    List<User> findUserById(Integer id);
}

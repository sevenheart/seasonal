package com.seasonal.service;

import com.seasonal.pojo.User;

import java.util.List;

public interface UserInfoServer {
    /**
     * 用户信息查找根据id
     * @param id
     * @return
     */
    List<User> findUserById(String id);
    /**
     * 修改用户信息
     */
    int updateUserInfo(User user);
}

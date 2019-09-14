package com.seasonal.service;

import com.seasonal.pojo.UserAddress;

import java.util.List;

/**
 * 用户地址管理
 * author:陆旭
 */
public interface UserAddressServer {
    /**
     * 根据地址信息插入地址
     *
     * @param userAddress
     * @return
     */
    int insertUserAddress(UserAddress userAddress);

    /**
     * 根据用户id查找用户保存的所有address信息
     * @param userId
     * @return
     */
    List<UserAddress> findAllUserAdreess(String userId);

    /**
     * 根据id删除用户的地址信息
     * @param id
     * @return
     */
    int delteUserAddressById(Long id);

    /**
     * 根据id信息删除用户的地址信息
     * @param userAddress
     * @return
     */
    int updateUserAddressById(UserAddress userAddress);

}
package com.seasonal.mapper;

import com.seasonal.pojo.UserAddress;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserAddressMapper {
    /**
     * 插入用户地址信息
     * @param userAddress
     * @return
     */
    int insertUserAddress(UserAddress userAddress);

    /**
     * 根据用户的id查找所有用户的地址信息
     * @param userId
     * @return
     */
    List<UserAddress> findAllUserAddress(String userId);

    /**
     * 根据地址id删除地址信息
     * @param id
     * @return
     */
    int delteUserAddressById(Long id);

    /**
     * 根据地址信息修改地址信息
     * @param userAddress
     * @return
     */
    int updateUserAddressById(UserAddress userAddress);
}

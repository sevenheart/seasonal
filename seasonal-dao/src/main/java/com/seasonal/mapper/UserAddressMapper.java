package com.seasonal.mapper;

import com.seasonal.pojo.UserAddress;
import org.springframework.stereotype.Repository;

@Repository
public interface UserAddressMapper {
    int insertUserAddress(UserAddress userAddress);
}

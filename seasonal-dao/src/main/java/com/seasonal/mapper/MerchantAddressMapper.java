package com.seasonal.mapper;

import com.seasonal.pojo.MerchantAddress;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MerchantAddressMapper {

    /**
     * 返回所有商家的地址信息
     * @return
     */
    List<MerchantAddress> findAllMerchantAddress();
}

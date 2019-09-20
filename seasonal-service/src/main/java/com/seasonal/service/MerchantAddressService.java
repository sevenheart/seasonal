package com.seasonal.service;


import com.seasonal.pojo.MerchantAddress;

import java.util.List;

public interface MerchantAddressService {

    /**
     * 返回所有商家的地址信息
     * @return
     */
    List<MerchantAddress> findAllMerchantAddress();
}

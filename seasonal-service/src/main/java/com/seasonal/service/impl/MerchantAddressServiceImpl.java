package com.seasonal.service.impl;

import com.seasonal.mapper.MerchantAddressMapper;
import com.seasonal.pojo.MerchantAddress;
import com.seasonal.service.MerchantAddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MerchantAddressServiceImpl implements MerchantAddressService {

    private final MerchantAddressMapper merchantAddressMapper;

    @Autowired
    public MerchantAddressServiceImpl(MerchantAddressMapper merchantAddressMapper) {
        this.merchantAddressMapper = merchantAddressMapper;
    }

    @Override
    public List<MerchantAddress> findAllMerchantAddress() {
        return merchantAddressMapper.findAllMerchantAddress();
    }
}

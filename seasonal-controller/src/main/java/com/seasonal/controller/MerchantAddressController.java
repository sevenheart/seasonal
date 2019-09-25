package com.seasonal.controller;

import com.seasonal.pojo.MerchantAddress;
import com.seasonal.service.MerchantAddressService;
import com.seasonal.vo.ResultUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class MerchantAddressController {

    private final MerchantAddressService merchantAddressService;

    @Autowired
    public MerchantAddressController(MerchantAddressService merchantAddressService) {
        this.merchantAddressService = merchantAddressService;
    }

    // List<MerchantAddress>
    @RequestMapping(value = "getAllMerchantAddress")
    @ResponseBody
    public Object findAllMerchantAddress(){
        List<MerchantAddress> merchantAddressList = merchantAddressService.findAllMerchantAddress();
        if(merchantAddressList != null && merchantAddressList.size() > 0){
            return ResultUtil.success(merchantAddressList);
        } else {
            return ResultUtil.fail("未获取到地址");
        }
    }
}

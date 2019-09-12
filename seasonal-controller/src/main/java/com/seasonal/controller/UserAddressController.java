package com.seasonal.controller;

import com.seasonal.pojo.UserAddress;
import com.seasonal.service.UserAddressServer;
import com.seasonal.service.UserInfoServer;
import com.seasonal.vo.ResultData;
import com.seasonal.vo.ResultEnum;
import com.seasonal.vo.ResultUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
/**
 * 用户地址管理
 * author:陆旭
 */
@Controller
@RequestMapping("address")
public class UserAddressController {
    private final UserAddressServer userAddressServer;
    @Autowired
    public UserAddressController(UserAddressServer userAddressServer) {
        this.userAddressServer = userAddressServer;
    }

    /**
     * 用户地址添加
     * @param userAddress
     * @return
     */
    @RequestMapping("insertuseraddress")
    @ResponseBody
    public ResultData insertUserAddress(UserAddress userAddress){
        System.out.println("地址信息是"+userAddress.getAddress());
        int flag = userAddressServer.insertUserAddress(userAddress);
        if(flag>0){
            return ResultUtil.success(0,"插入地址信息成功");
        }
        return ResultUtil.fail(1,"插入地址信息失败");
    }

    /**
     * 用户所有地址信息查找
     * @return
     */
    @RequestMapping("selectalladdress")
    @ResponseBody
    public ResultData findAllAddress(){

        return ResultUtil.success(ResultEnum.SUCCESS);
    }
}

package com.seasonal.controller;

import com.seasonal.annotation.Intercept;
import com.seasonal.pojo.UserAddress;
import com.seasonal.service.UserAddressServer;
import com.seasonal.vo.ResultData;
import com.seasonal.vo.ResultEnum;
import com.seasonal.vo.ResultUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

/**
 * 用户地址管理
 * author:陆旭
 */
@Controller
@RequestMapping("/address")
public class UserAddressController {
    private final UserAddressServer userAddressServer;

    @Autowired
    public UserAddressController(UserAddressServer userAddressServer) {
        this.userAddressServer = userAddressServer;
    }

    /**
     * 用户地址添加
     *
     * @param userAddress
     * @return
     */
    @RequestMapping(value = "InsertUserAddress")
    @ResponseBody
    public ResultData insertUserAddress(@RequestBody UserAddress userAddress) {
        userAddress.setCreateTime(new Date(System.currentTimeMillis()));
        userAddress.setUpdateTime(new Date(System.currentTimeMillis()));
        int flag = userAddressServer.insertUserAddress(userAddress);
        if (flag > 0) {
            return ResultUtil.success(0, "插入地址信息成功");
        }
        return ResultUtil.fail(1, "插入地址信息失败");
    }

    /**
     * 用户所有地址信息查找
     *
     * @return
     */
    @RequestMapping(value = "selectalladdress")
    @ResponseBody
    public ResultData findAllAddress(String userId) {
        List<UserAddress> userAddressesList = userAddressServer.findAllUserAdreess(userId);
        //判断查中用户信息是否成功
        //返回ResultDate
        if (userAddressesList.size() > 0 && userAddressesList != null) {
            ResultData resultData;
            resultData = ResultUtil.success(0, "查找信息成功");
            resultData.setData(userAddressesList);
            return resultData;
        }
        return ResultUtil.fail(1, "查询用户地址失败");
    }

    @RequestMapping(value = "deleteuseraddressByid")
    @ResponseBody
    public ResultData deleteUserAddress(Long id) {
        int flag = userAddressServer.delteUserAddressById(id);
        if (flag <= 0) {
            return ResultUtil.fail(1, "删除失败");
        }
        return ResultUtil.success(0, "删除成功");

    }

    @RequestMapping("updateuseraddress")
    @ResponseBody
    public ResultData updateUserAddress(@RequestBody UserAddress userAddress) {

        userAddress.setUpdateTime(new Date(System.currentTimeMillis()));
        int flag = userAddressServer.updateUserAddressById(userAddress);
        if (flag <= 0) {
            return ResultUtil.fail(1, "修改信息失败");
        }
        return ResultUtil.success(0, "修改信息成功");
    }

    @RequestMapping("deletecheckeduseraddress")
    @ResponseBody
    public ResultData deleteCheckedUserAddressById(@RequestBody List<Integer> check) {
        if (check == null) {
            System.out.println("没接收到checkbox得值");
        } else {

            //判断是否有删除失败的
            boolean flag = true;
            int failDelete = 0;
            for (int i = 0; i < check.size(); i++) {
                //删除返回值
                int num = userAddressServer.delteUserAddressById((long) check.get(i));
                if (num <= 0) {
                    flag = false;
                } else {
                    failDelete++;
                }
            }
            if (!flag) {
                return ResultUtil.fail(1, "共有" + check.size() + "条数据，有" + failDelete + "条数据删除失败");

            }
        }
        return ResultUtil.success(ResultEnum.SUCCESS);
    }
}

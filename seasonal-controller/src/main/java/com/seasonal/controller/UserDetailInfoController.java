package com.seasonal.controller;

import com.seasonal.pojo.User;
import com.seasonal.service.UserInfoServer;
import com.seasonal.vo.ResultData;
import com.seasonal.vo.ResultUtil;
import jdk.internal.dynalink.linker.LinkerServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller("user")
public class UserDetailInfoController {
    private final UserInfoServer userInfoServer;
    @Autowired
    public UserDetailInfoController(UserInfoServer userInfoServer) {
        this.userInfoServer = userInfoServer;
    }

    /**
     * 根据用户id查找用户
     *   code：0查询成功
     *   code：1查询失败
     * @param id
     * @return
     */
    @RequestMapping("finduserbyid")
    public ResultData findUserById(Integer id) {
        List<User> userList = userInfoServer.findUserById(id);
        if(userList==null||userList.size()==0){
            return  ResultUtil.fail(2,"未查到该用户");
        }
        //创建返回对象result
        ResultData resultData = ResultUtil.success(0,"查询成功");
        resultData.setData(userList);
        return resultData;
    }
}

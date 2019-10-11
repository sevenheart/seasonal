package com.seasonal.controller;

import com.seasonal.annotation.Intercept;
import com.seasonal.pojo.User;
import com.seasonal.service.UserInfoServer;
import com.seasonal.tencent.TencentUploadUtil;
import com.seasonal.vo.ResultData;
import com.seasonal.vo.ResultUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Controller
@RequestMapping("user")
public class UserDetailInfoController {

    private final UserInfoServer userInfoServer;

    @Autowired
    public UserDetailInfoController(UserInfoServer userInfoServer) {
        this.userInfoServer = userInfoServer;
    }

    /**
     * 根据用户id查找用户
     * code：0查询成功
     * code：1查询失败
     *
     * @param id
     * @return
     */
    @RequestMapping("finduserbyid")
    @ResponseBody
    @Intercept
    public ResultData findUserById(String id) {
        List<User> userList = userInfoServer.findUserById(id);
        //System.out.println("id" + id);
        //System.out.println("userList" + userList);
        if (userList == null || userList.size() == 0) {
            return ResultUtil.fail(2, "未查到该用户");
        }
        //创建返回对象result
        ResultData resultData = ResultUtil.success(0, "查询成功");
        resultData.setData(userList);
        return resultData;
    }

    @RequestMapping("updateUserInfo")
    @ResponseBody
    public ResultData updateUserInfoById(User user,@RequestParam( value="oldlocation") String oldlocation, @RequestParam(value = "multipartFile", required = false) MultipartFile multipartFile) throws IOException {
        //获取上传的文件
        String oldName;
        String newName;
        if (null != multipartFile) {
            if(oldlocation!=null){
                //删除云的图片
                String[] name = oldlocation.split("/");
                //名字还是原来的
                newName =  name[name.length-1];
                TencentUploadUtil.deleteFile("img/user/"+newName);
            }else{

                //获取上传的文件的文件名
                oldName = multipartFile.getOriginalFilename();
                //通过UUID随机生成一个新的文件名
                newName = UUID.randomUUID() + oldName.substring(oldName.lastIndexOf("."));
            }

            File file = new File("E:\\" + newName);
            //将图片进行存储
            multipartFile.transferTo(file);
            //这里将图片上传到云然后保存地址
            TencentUploadUtil.uploadFile("img/user/" + newName + "", file);
            file.delete();
            user.setUserImg(TencentUploadUtil.imgUrl + "/img/user/" + newName);

        }
        //修改操作的返回值，小于等于0
        int flag = userInfoServer.updateUserInfo(user);
        if (flag <= 0) {

            //修改信息失败
            return ResultUtil.fail(1, "修改信息失败");
        }
        return ResultUtil.success(0, "修改成功");
    }

}

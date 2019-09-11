package com.seasonal.mapper;

import com.seasonal.pojo.LoginFrom;
import javafx.scene.input.DataFormat;
import org.springframework.stereotype.Repository;
import java.util.Date;

@Repository
public interface LoginFromMapper {
    /**
     * 根据用户登录方式，登录账号，登录密码三方验证
     *
     * @param loginFrom 保存用户此次登陆信息
     * @return 查询到返回true
     */
    LoginFrom findLoginByLoginFrom(LoginFrom loginFrom);

    /**
     * 根据用户登录凭证查询
     *
     * @param loginFrom
     * @return
     */
    LoginFrom findLoginByIdentifier(LoginFrom loginFrom);

    /**
     * 插入账号信息
     *
     * @param loginFrom
     * @return
     */
    int insertLoginFrom(LoginFrom loginFrom);

    /**
     *注册手机号查重
     *
     * @param identifier
     * @return
     */
    LoginFrom findRegistrationPhone(String identifier);

    /**
     * 登录验证
     *
     * @param identifier
     * @param credential
     * @return
     */
    LoginFrom findLogin(String identifier, String credential);

    /**
     * 登录信息修改
     * @param identifier
     * @param currentTime
     * @param loginIp
     * @return
     */
    LoginFrom updateMessage(String identifier, Date currentTime, String loginIp);

    /**
     * 用户注册
     * @return
     */
    int insertUser();

}

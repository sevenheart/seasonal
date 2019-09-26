package com.seasonal.mapper;

import com.seasonal.pojo.LoginFrom;
import org.springframework.stereotype.Repository;
import java.sql.Date;

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
     *注册手机号查重
     *
     * @param identifier
     * @return
     */
    LoginFrom findRegistrationPhone(String identifier);

    /**
     * 登录信息修改
     * @param identifier
     * @param currentTime
     * @param loginIp
     * @return
     */
    int updateMessage(String identifier, Date currentTime, String loginIp);

    /**
     * 注册添加用户信息
     * @param userId
     * @param identityType
     * @param credential
     * @param identifier
     * @param loginIp
     * @param currentTime
     * @return
     */
    int insertUserMessage(String userId, String identityType, String credential, String identifier, String loginIp, Date currentTime);
}

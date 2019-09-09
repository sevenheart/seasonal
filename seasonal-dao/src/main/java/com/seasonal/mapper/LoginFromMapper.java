package com.seasonal.mapper;

import com.seasonal.pojo.LoginFrom;
import org.springframework.stereotype.Repository;

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


}

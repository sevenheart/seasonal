package com.seasonal.service;

public interface LoginService {
    /**
     * 用户注册手机号码查重
     * @param identifier
     * @return
     */
    Object findRegistrationPhone(String identifier);

    /**
     * 用户注册信息添加
     *
     * @return
     */
    int insertUser();
    /**
     * 登录验证
     * @param identifier
     * @param credential
     * @return
     */
    Object findLogin(String identifier, String credential);

    /**
     * 登录存储信息
     *
     * @param identifier
     * @return
     */
    Object updateMessage(String identifier);
}

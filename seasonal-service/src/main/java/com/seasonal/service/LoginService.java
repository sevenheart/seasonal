package com.seasonal.service;

import java.util.List;

public interface LoginService {
    /**
     * 用户注册手机号码查重
     * @param identifier
     * @return
     */
    Object findRegistrationPhone(String identifier);

    /**
     * 登录验证
     * @param identifier
     * @param credential
     * @return
     */
    Object findLogin(String identifier, String credential);

    /**
     * 登录信息修改
     *
     * @param identifier
     * @return
     */
    String updateMessage(String identifier);
}

package com.seasonal.service;

import com.seasonal.pojo.LoginFrom;

import java.util.List;

public interface LoginService {
    /**
     * 用户注册手机号码查重
     * @param identifier
     * @return
     */
    LoginFrom findRegistrationPhone(String identifier);

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
    int updateMessage(String identifier);

    /**
     * 获取当前IP地址
     * @return
     */
    String getIpNow();

    /**
     * 发送短信验证码
     * @param identifier
     * @return
     */
    String sendShortMessage(String identifier);

    /**
     * 用户注册信息添加
     * @param identifier
     * @param credential
     * @return
     */
    String insertUserMessage(String identifier,String credential);

    boolean setCookie(String identifier,String credential,String check);

//    Object getCookie();
}

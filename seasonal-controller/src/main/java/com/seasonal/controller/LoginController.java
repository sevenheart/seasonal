package com.seasonal.controller;


import com.seasonal.pojo.LoginFrom;
import com.seasonal.service.LoginService;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.net.InetAddress;
import java.util.*;

@Controller
@Component
public class LoginController {

    private final LoginService loginService;

    @Autowired
    public LoginController(LoginService loginService) {
        this.loginService = loginService;
    }


    @RequestMapping(value = "registrationPhone")
    @ResponseBody
    public Object registrationPhone(String identifier) {
        return loginService.findRegistrationPhone(identifier);
    }

    @RequestMapping(value = "login")
    @ResponseBody
    public Object userMessage(String identifier, String credential, HttpSession session) {
        LoginFrom loginFrom = (LoginFrom) loginService.findLogin(identifier, credential);
        if (credential != null && loginFrom != null) {
            System.out.println(loginFrom);
            session.setAttribute("userId", loginFrom.getUserId());
        }
        System.out.println("session->userId:" + session.getAttribute("userId"));
        return loginService.findLogin(identifier, credential);
    }

    @RequestMapping(value = "loginIp")
    @ResponseBody
    public void updateMessage(String identifier) {
        int num = loginService.updateMessage(identifier);
    }

    @RequestMapping(value = "getIpNow")
    @ResponseBody
    public String getIpNow() {
        return loginService.getIpNow();
    }

    @RequestMapping(value = "shortMessageSend")
    @ResponseBody
    public boolean shortMessageSend(String identifier, HttpSession session) {
        boolean flag = false;
        String code = loginService.sendShortMessage(identifier);
        if (code != null || code == ""){
            session.setAttribute("code",code);
            final Timer timer=new Timer();
            timer.schedule(new TimerTask() {
                @Override
                public void run() {
                    session.removeAttribute("code");
                    System.out.println("code删除成功");
                    timer.cancel();
                }
            },5*60*1000);
            flag = true;
        }
        return flag;
    }

    @RequestMapping(value = "registrationInsert")
    @ResponseBody
    public String registrationInsert(String identifier,String credential, String verifyCode, HttpSession session){
        String code = (String)session.getAttribute("code");
        System.out.println("Controller->verifyCode:"+verifyCode);
        System.out.println("Controller->code:"+code);
        if (code == null || code == ""){
            System.out.println("验证码已过期，请重新发送");
            return "false";
        } else if (code.equals(verifyCode)) {
            String userId = loginService.insertUserMessage(identifier, credential);
            if (userId != null){
                System.out.println("注册成功");
                session.setAttribute("userId",userId);
            }
            return "true";
        } else {
            System.out.println("验证码错误，请重新输入");
            return "error";
        }
    }

    @RequestMapping(value = "smsLogin")
    @ResponseBody
    public String smsLogin(String identifier, String smsVerifyCode, HttpSession session){
        String code = (String)session.getAttribute("code");
        if (code == null || code == ""){
            System.out.println("验证码已过期，请重新发送");
            return "false";
        } else if (code == smsVerifyCode) {
            LoginFrom loginFrom = loginService.findRegistrationPhone(identifier);
            String userId = loginFrom.getUserId();
            if (userId != null){
                System.out.println("登录成功");
                session.setAttribute("userId",userId);
            }
            return "true";
        } else {
            System.out.println("验证码错误，请重新输入");
            return "error";
        }
    }

    @RequestMapping(value = "getsessionUserId")
    @ResponseBody
    public Object getsessionUserId(HttpSession session) {
        String userId = (String)session.getAttribute("userId");
        System.out.println(userId);
        if (userId != null){
            System.out.println("userId != null");
            return userId;
        } else{
            System.out.println("userId = null");
            return null;
        }
    }

    @RequestMapping(value = "setCookie")
    @ResponseBody
    public void setCookie(String identifier,String credential,String check){
        boolean flag = loginService.setCookie(identifier, credential, check);
    }

    @RequestMapping(value = "cancellation")
    @ResponseBody
    public void cancellation(HttpSession session) {
        session.invalidate();
    }

}

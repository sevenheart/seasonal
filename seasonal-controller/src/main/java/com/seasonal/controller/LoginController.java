package com.seasonal.controller;


import com.seasonal.annotation.Intercept;
import com.seasonal.pojo.LoginFrom;
import com.seasonal.service.LoginService;
import com.seasonal.vo.ResultUtil;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.Console;
import java.io.IOException;
import java.net.InetAddress;
import java.sql.Date;
import java.text.SimpleDateFormat;
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
        LoginFrom loginFrom = loginService.findRegistrationPhone(identifier);
        System.out.println(loginFrom);
        if (loginFrom == null){
            System.out.println("空");
            return null;
        } else{
            return loginFrom;
        }
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
    public String shortMessageSend(String identifier, HttpSession session) {
        //获取当前时间
        java.sql.Date currentTime = new Date(System.currentTimeMillis());
        SimpleDateFormat sdFormatter = new SimpleDateFormat("HH-mm-ss");
        long nowTime = Integer.parseInt(sdFormatter.format(currentTime).replace("-",""));
        if (session.getAttribute("nowTimeCode") == null){
            //String code = loginService.sendShortMessage(identifier);
            String code = "1234";
            if (code != null || code == "") {
                System.out.println("code:" + code);
                session.setAttribute("code", code);
                session.setAttribute("nowTimeCode",nowTime);
                final Timer timer = new Timer();
                timer.schedule(new TimerTask() {
                    @Override
                    public void run() {
                        session.removeAttribute("code");
                        System.out.println("code删除成功");
                        session.removeAttribute("nowTimeCode");
                        System.out.println("nowTimeCode删除成功");
                        timer.cancel();
                    }
                }, 5 * 60 * 1000);
                return "true";
            }
        } else {
            long lastTime = (long) session.getAttribute("nowTimeCode");
            if (lastTime != 0){
                System.out.println("nowTime:" + nowTime + ",lastTime:" + lastTime);
                int D_value = (int) (nowTime - lastTime);
                if (D_value >= 60){
                    //String code = loginService.sendShortMessage(identifier);
                    String code = "1234";
                    if (code != null || code == "") {
                        System.out.println("code:" + code);
                        session.setAttribute("code", code);
                        session.setAttribute("nowTimeCode",nowTime);
                        final Timer timer = new Timer();
                        timer.schedule(new TimerTask() {
                            @Override
                            public void run() {
                                session.removeAttribute("code");
                                System.out.println("code删除成功");
                                session.removeAttribute("nowTimeCode");
                                System.out.println("nowTimeCode删除成功");
                                timer.cancel();
                            }
                        }, 5 * 60 * 1000);
                        return "true";
                    }
                } else {
                    String time = String.valueOf(60 - D_value);
                    System.out.println(time);
                    return time;
                }
            }
        }
        return "false";
    }

    @RequestMapping(value = "registrationInsert")
    @ResponseBody
    public String registrationInsert(String identifier, String credential, String verifyCode, HttpSession session) {
        String code = (String) session.getAttribute("code");
        System.out.println("Controller->verifyCode:" + verifyCode);
        System.out.println("Controller->code:" + code);
        if (code == null || code == "") {
            System.out.println("验证码已过期，请重新发送");
            return "False";
        } else if (code.equals(verifyCode)) {
            String userId = loginService.insertUserMessage(identifier, credential);
            if (userId != null) {
                System.out.println("注册成功");
                session.setAttribute("userId", userId);
            }
            return "True";
        } else {
            System.out.println("验证码错误，请重新输入");
            return "error";
        }
    }

    @RequestMapping(value = "smsLogin")
    @ResponseBody
    public String smsLogin(String identifier, String smsVerifyCode, HttpSession session) {
        String code = (String) session.getAttribute("code");
        if (code == null || code == "") {
            return "false";
        } else if (code.equals(smsVerifyCode)) {
            LoginFrom loginFrom = loginService.findRegistrationPhone(identifier);
            String userId = loginFrom.getUserId();
            if (userId != null) {
                System.out.println("登录成功");
                session.setAttribute("userId", userId);
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
        String userId = (String) session.getAttribute("userId");

        if (userId != null) {
            return ResultUtil.success(userId);
        } else {
            return ResultUtil.fail("获取失败");
        }
    }

    //退出账号登录，删除session
    @RequestMapping(value = "cancellation")
    @ResponseBody
    public void cancellation(HttpSession session) {
        session.invalidate();
    }

    @RequestMapping(value = "isLogin")
    public String isLogin() {
        return "redirect:/index.html";
    }
}

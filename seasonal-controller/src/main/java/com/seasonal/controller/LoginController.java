package com.seasonal.controller;

import com.seasonal.pojo.LoginFrom;
import com.seasonal.pojo.User;
import com.seasonal.service.LoginService;
import com.seasonal.service.UserInfoServer;
import com.seasonal.service.sender.RegisterCodeSender;
import com.seasonal.service.sender.UserActionLogSender;
import com.seasonal.vo.ResultUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import javax.servlet.http.HttpSession;
import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
@Component
public class LoginController {

    private final LoginService loginService;
    private final UserInfoServer userInfoServer;
    private final RegisterCodeSender registerCodeSender;
    private final UserActionLogSender userActionLogSender;

    @Autowired
    public LoginController(LoginService loginService, UserInfoServer userInfoServer, RegisterCodeSender registerCodeSender, UserActionLogSender userActionLogSender) {
        this.loginService = loginService;
        this.userInfoServer = userInfoServer;
        this.userActionLogSender = userActionLogSender;
        this.registerCodeSender = registerCodeSender;
    }

    //查找账号
    @RequestMapping(value = "registrationPhone")
    @ResponseBody
    public Object registrationPhone(String identifier) {//验证账号是否已存在
        LoginFrom loginFrom = loginService.findRegistrationPhone(identifier);
        System.out.println(loginFrom);
        if (loginFrom == null) {
            return ResultUtil.fail("该账号可用");
        } else {
            return ResultUtil.success(loginFrom);
        }
    }

    //登录，根据手机号和密码核对数据库
    @RequestMapping(value = "login")
    @ResponseBody
    public Object userMessage(String identifier, String credential, HttpSession session) {
        LoginFrom loginFrom = loginService.findRegistrationPhone(identifier);
        if (loginFrom != null){
            if (credential.equals(loginFrom.getCredential())){
                session.setAttribute("userId", loginFrom.getUserId());
                userActionLogSender.sendMessageForCode(loginFrom);
                return ResultUtil.success(loginFrom);
            } else {
                return ResultUtil.fail(100,"密码错误");
            }
        } else {
            return ResultUtil.fail(500,"账号不存在");
        }
    }

    //登录成功修改用户登录信息
    @RequestMapping(value = "loginIp")
    @ResponseBody
    public void updateMessage(String identifier) {
        int num = loginService.updateMessage(identifier);
    }

    //获取用户当前IP地址
    @RequestMapping(value = "getIpNow")
    @ResponseBody
    public String getIpNow() {
        return loginService.getIpNow();
    }

    //发送短信验证码
    @RequestMapping(value = "shortMessageSend")
    @ResponseBody
    public Object shortMessageSend(String identifier, HttpSession session) {
        System.out.println("shortMessageSend:" + identifier);
        //初始化可获取验证码的倒计时
        String time = "0";
        //获取当前时间
        java.sql.Date currentTime = new Date(System.currentTimeMillis());
        SimpleDateFormat sdFormatter = new SimpleDateFormat("HH-mm-ss");
        long nowTime = Integer.parseInt(sdFormatter.format(currentTime).replace("-", ""));
        if (session.getAttribute("nowTimeCode") == null) {//判断上次获取验证码时间是否为空，若不为空，获取lastTime
            //String code = loginService.sendShortMessage(identifier);//发送验证码
            String code = "1234";
            if (code != null || code == "") {//判断验证码是否发送成功，并返回值到后台
                System.out.println("code:" + code);
                session.setAttribute("code", code);//发送验证码后，保存到session
                session.setAttribute("identifier",identifier);//获取验证码的手机号，用于匹配验证码
                session.setAttribute("nowTimeCode", nowTime);//获取验证码时间保存到session
                final Timer timer = new Timer();
                timer.schedule(new TimerTask() {//设置session的保存时间
                    @Override
                    public void run() {
                        //5分钟后清空
                        session.setAttribute("code", null);
                        session.setAttribute("identifier", null);
                        session.setAttribute("nowTimeCode", null);
                        timer.cancel();
                    }
                },  60 * 1000);
                return ResultUtil.success(200, "发送成功");//发送成功的返回值
            }
        } else {
            System.out.println("类型异常：" + session.getAttribute("nowTimeCode"));
            long lastTime = (long) session.getAttribute("nowTimeCode");//获取上一次获取验证码的时间
            System.out.println("nowTime:" + nowTime + ",lastTime:" + lastTime);
            int D_value = (int) (nowTime - lastTime);//两次获取时间相比较,大于60s，则可以重新获取验证码
            if (D_value >= 60) {
                //String code = loginService.sendShortMessage(identifier);//发送验证码
                String code = "1234";
                if (code != null || code == "") {//判断验证码是否发送成功，并返回值到后台
                    System.out.println("code:" + code);
                    session.setAttribute("code", code);//发送验证码后，保存到session
                    session.setAttribute("identifier",identifier);//获取验证码的手机号，用于匹配验证码
                    session.setAttribute("nowTimeCode", nowTime);//获取验证码时间保存到session
                    final Timer timer = new Timer();
                    timer.schedule(new TimerTask() {//设置session保存时间
                        @Override
                        public void run() {
                            //5分钟后清空
                            session.setAttribute("code", null);
                            session.setAttribute("identifier", null);
                            session.setAttribute("nowTimeCode", null);
                            timer.cancel();
                        }
                    }, 60 * 1000);
                    return ResultUtil.success(200, "发送成功");//发送成功的返回值
                }
            } else {
                time = String.valueOf(60 - D_value);
            }
        }
        return ResultUtil.fail(100, time);//发送验证码失败的返回值
    }

    //注册账号数据添加验证
    @RequestMapping(value = "registrationInsert")
    @ResponseBody
    public Object registrationInsert(String identifier, String credential, String verifyCode, HttpSession session) {//存储用户注册信息
        String code = (String) session.getAttribute("code");//获取验证码session
//        System.out.println("Controller->verifyCode:" + verifyCode);
//        System.out.println("Controller->code:" + code);
        if (code == null || code == "") {//如果验证码的session不存在，则是验证码已过期，
            System.out.println("验证码已过期，请重新发送");
            return ResultUtil.fail(404,"验证码已过期，请重新发送");
        } else if (code.equals(verifyCode)) {//判断输入验证码是否正确
            String userId = loginService.insertUserMessage(identifier, credential);
            if (userId != null) {
                System.out.println("注册成功");
                session.setAttribute("userId", userId);
            }
            LoginFrom loginFrom = loginService.findRegistrationPhone(identifier);
            registerCodeSender.sendMessageForCode(loginFrom);
            return ResultUtil.success(200,"注册成功");
        } else {
            System.out.println("验证码错误，请重新输入");
            return ResultUtil.fail(100,"验证码错误，请重新输入");
        }
    }

    //验证码核对
    @RequestMapping(value = "smsLogin")
    @ResponseBody
    public Object smsLogin(String identifier, String smsVerifyCode, HttpSession session) {
        String code = (String) session.getAttribute("code");
        String phone = (String) session.getAttribute("identifier");
        System.out.println("phone=" + phone + ",identifier:" + identifier);
        if (code == null || code == "") {
            return ResultUtil.fail(404,"验证码已过期，请重新发送");
        } else if (code.equals(smsVerifyCode)) {
            if (!phone.equals(identifier)){
                return ResultUtil.fail(405,"请不要修改手机号");
            } else {
                LoginFrom loginFrom = loginService.findRegistrationPhone(identifier);
                String userId = loginFrom.getUserId();
                if (userId != null) {
                    System.out.println("登录成功");
                    session.setAttribute("userId", userId);
                }
                return ResultUtil.success(200,"注册成功");
            }
        } else {
            System.out.println("验证码错误，请重新输入");
            return ResultUtil.fail(100,"验证码错误，请重新输入");
        }
    }

    //登录保持
    @RequestMapping(value = "getsessionUserId")
    @ResponseBody
    public Object getsessionUserId(HttpSession session) {
        String userId = (String) session.getAttribute("userId");
        List<User> user = userInfoServer.findUserById(userId);
        if (userId != null) {
            return ResultUtil.success(user);
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

    //表单跳转
    @RequestMapping(value = "isLogin")
    public String isLogin() {
        return "redirect:index.html";
    }
}

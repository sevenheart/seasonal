package com.seasonal.controller;


import com.seasonal.service.LoginService;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.net.InetAddress;

@Controller
public class LoginController {

    private final LoginService loginService;

    @Autowired
    public LoginController(LoginService loginService) {
        this.loginService = loginService;
    }


    @RequestMapping(value = "registrationPhone")
    @ResponseBody
    public Object userPhone(String identifier) {
        JSONObject jsonObject = JSONObject.fromObject(loginService.findRegistrationPhone(identifier));
        return loginService.findRegistrationPhone(identifier);
    }

//    @RequestMapping(value = "registration")
//    @ResponseBody
//    public Object registration(String userName, String phone, String password) {
//        JSONObject jsonObject = JSONObject.fromObject(loginService.insertUser(userName,phone,password));
//        return loginService.insertUser();
//    }

    @RequestMapping(value = "login")
    @ResponseBody
    public Object userMessage(String identifier, String credential) {
        JSONObject jsonObject = JSONObject.fromObject(loginService.findLogin(identifier, credential));
        return loginService.findLogin(identifier, credential);
    }

    @RequestMapping(value = "Login")
    @ResponseBody
    public Object insertMessage(String userName,String password) {
        JSONObject jsonObject = JSONObject.fromObject(loginService.updateMessage(userName));
        return "index.html";
    }

}

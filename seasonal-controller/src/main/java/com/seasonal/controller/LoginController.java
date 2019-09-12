package com.seasonal.controller;


import com.seasonal.service.LoginService;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.net.InetAddress;
import java.util.List;

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
        return loginService.findRegistrationPhone(identifier);
    }

    @RequestMapping(value = "login")
    @ResponseBody
    public Object userMessage(String identifier, String credential) {
        return loginService.findLogin(identifier, credential);
    }

    @RequestMapping(value = "loginIp")
    @ResponseBody
    public String updateMessage(String identifier) {
        System.out.println("Controller:" +identifier);
        return loginService.updateMessage(identifier);
    }

}

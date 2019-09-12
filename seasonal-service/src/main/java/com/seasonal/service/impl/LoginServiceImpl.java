package com.seasonal.service.impl;

import com.seasonal.ip.GetIp;
import com.seasonal.mapper.LoginFromMapper;
import com.seasonal.redis.RedisUtil;
import com.seasonal.service.LoginService;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParsePosition;
import java.text.SimpleDateFormat;
import java.util.Date;

@Service
public class LoginServiceImpl implements LoginService {

    private final LoginFromMapper loginFrom;
    private final RedisUtil redisUtil;
    private final GetIp getIp;

    @Autowired
    public LoginServiceImpl(LoginFromMapper loginFrom, RedisUtil redisUtil, GetIp getIp) {
        this.loginFrom = loginFrom;
        this.redisUtil = redisUtil;
        this.getIp = getIp;
    }


    @Override
    public Object findRegistrationPhone(String identifier) {
        redisUtil.setHash();
        if (redisUtil.get("registration") == loginFrom.findRegistrationPhone(identifier)) {
            return redisUtil.get("registration");
        }
        JSONObject jsonObject = JSONObject.fromObject(loginFrom.findRegistrationPhone(identifier));
        redisUtil.set("registration", jsonObject.toString());
        return loginFrom.findRegistrationPhone(identifier);
    }

    @Override
    public int insertUser() {
        JSONObject jsonObject = JSONObject.fromObject(loginFrom.insertUser());
        redisUtil.set("registration", jsonObject.toString());
        return 0;
    }

    @Override
    public Object findLogin(String identifier, String credential) {
        redisUtil.setHash();
        if (redisUtil.get("login") == loginFrom.findLogin(identifier, credential)) {
            return redisUtil.get("login");
        }
        JSONObject jsonObject = JSONObject.fromObject(loginFrom.findLogin(identifier, credential));
        redisUtil.set("login", jsonObject.toString());
        return loginFrom.findLogin(identifier, credential);
    }

    @Override
    public Object updateMessage(String identifier) {
        //获取当前ip地址
        String loginIp = getIp.publicip();
        System.out.println(loginIp);
        //获取当前时间
        Date date = new Date();
        SimpleDateFormat dateFormat= new SimpleDateFormat("yyyy-MM-dd :hh:mm:ss");
        String datastr = dateFormat.format(date);
        ParsePosition pos = new ParsePosition(8);
        Date currentTime = dateFormat.parse(datastr,pos);

        redisUtil.setHash();
        JSONObject jsonObject2 = JSONObject.fromObject(loginFrom.updateMessage(identifier, currentTime, loginIp));
        redisUtil.set("login", jsonObject2.toString());
        return loginFrom.updateMessage(identifier, currentTime, loginIp);
    }
}

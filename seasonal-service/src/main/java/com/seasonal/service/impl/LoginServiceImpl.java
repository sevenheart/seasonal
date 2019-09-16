package com.seasonal.service.impl;

import com.seasonal.ip.GetIp;
import com.seasonal.mapper.LoginFromMapper;
import com.seasonal.pojo.LoginFrom;
import com.seasonal.redis.RedisUtil;
import com.seasonal.service.LoginService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;
import net.sf.json.processors.JsonValueProcessor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

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
        return loginFrom.findRegistrationPhone(identifier);
    }

    @Override
    public Object findLogin(String identifier, String credential) {
        //Json对sql.data的转换器
        JsonConfig config = new JsonConfig();
        config.registerJsonValueProcessor(java.sql.Date.class, new JsonValueProcessor() {
            private SimpleDateFormat sd = new SimpleDateFormat("yyyy-MM-dd");
            @Override
            public Object processArrayValue(Object arg0, JsonConfig arg1) {
                return null;
            }
            @Override
            public Object processObjectValue(String arg0, Object arg1, JsonConfig arg2) {
                return arg1 == null ? "" : sd.format(arg1);
            }
        });

        redisUtil.setHash();
        if (redisUtil.get("findLogin") == loginFrom.findLogin(identifier, credential)) {
            return redisUtil.get("findLogin");
        }
        JSONArray jsonArray = JSONArray.fromObject(loginFrom.findLogin(identifier, credential),config);
        redisUtil.set("findLogin", jsonArray.toString());
        return loginFrom.findLogin(identifier, credential);
    }

    @Override
    public int updateMessage(String identifier) {
        //获取当前ip地址
        GetIp getIp = new GetIp();
        String loginIpNow = getIp.publicip();
        //获取当前时间
        Date currentTime = new Date(System.currentTimeMillis());
        System.out.println(currentTime);

        List<String> list = new ArrayList<String>();
        list.add(loginIpNow);

        int num = loginFrom.updateMessage(identifier, currentTime, loginIpNow);


        System.out.println("num:" + num);
        return num;

    }

    @Override
    public String getIpNow() {
        //获取当前ip地址
        String loginIpNow = getIp.publicip();
        System.out.println(loginIpNow);
        return loginIpNow;
    }
}

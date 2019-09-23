package com.seasonal.service.impl;

import com.aliyuncs.dysmsapi.model.v20170525.SendSmsResponse;
import com.aliyuncs.exceptions.ClientException;
import com.seasonal.cookie.MyCookie;
import com.seasonal.ip.GetIp;
import com.seasonal.mapper.LoginFromMapper;
import com.seasonal.pojo.LoginFrom;
import com.seasonal.redis.RedisUtil;
import com.seasonal.service.LoginService;
import com.seasonal.verification.ShortMessageVerification;
import net.sf.json.JSONArray;
import net.sf.json.JsonConfig;
import net.sf.json.processors.JsonValueProcessor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.Cookie;
import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class LoginServiceImpl implements LoginService {

    private final LoginFromMapper loginFrom;
    private final RedisUtil redisUtil;
    private final GetIp getIp;
    private final ShortMessageVerification shortMessageVerification;
    private final MyCookie myCookie;

    @Autowired
    public LoginServiceImpl(LoginFromMapper loginFrom, RedisUtil redisUtil, GetIp getIp, ShortMessageVerification shortMessageVerification, MyCookie myCookie) {
        this.loginFrom = loginFrom;
        this.redisUtil = redisUtil;
        this.getIp = getIp;
        this.shortMessageVerification = shortMessageVerification;
        this.myCookie = myCookie;
    }


    @Override
    public LoginFrom findRegistrationPhone(String identifier) {
        System.out.println("serviceimpl:"+identifier);
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

        List<String> list = new ArrayList<String>();
        list.add(loginIpNow);

        int num = loginFrom.updateMessage(identifier, currentTime, loginIpNow);
        return num;
    }

    @Override
    public String getIpNow() {
        //获取当前ip地址
        String loginIpNow = getIp.publicip();
        System.out.println("现在的IP地址是：" + loginIpNow);
        return loginIpNow;
    }

    @Override
    public String sendShortMessage(String identifier) {

        //生成一个验证码
        shortMessageVerification.setNewcode();
        //获取
        String code = Integer.toString(shortMessageVerification.getNewcode());
        System.out.println("发送的验证码为：" + code);

        SendSmsResponse sendSmsResponse = null;

        //发短信
        try {
            sendSmsResponse = shortMessageVerification.sendSms(identifier, code);
        } catch (ClientException e) {
            e.printStackTrace();
        }
        System.out.println("短信接口返回的数据----------------");
        System.out.println("Code=" + sendSmsResponse.getCode());
        System.out.println("Message=" + sendSmsResponse.getMessage());
        System.out.println("RequestId=" + sendSmsResponse.getRequestId());
        System.out.println("BizId=" + sendSmsResponse.getBizId());
        return code;
    }

    @Override
    public String insertUserMessage(String identifier, String credential) {
        //当前时间
        Date currentTime = new Date(System.currentTimeMillis());
        SimpleDateFormat sdFormatter = new SimpleDateFormat("yyyy-MM-dd-HH-mm");
        String retStrFormatNowDate = sdFormatter.format(currentTime).replace("-","").substring(2);

        String userId = retStrFormatNowDate + UUID.randomUUID().toString().replace("-","").substring(27);
        System.out.println(userId);

        String identityType = "Phone";

        //获取当前ip地址
        String loginIp = getIp.publicip();
        int num = loginFrom.insertUserMessage(userId, identityType, credential, identifier, loginIp, currentTime);
        if (num > 0){
            return userId;
        }
        return null;
    }

    @Override
    public boolean setCookie(String identifier, String credential, String check) {
        myCookie.saveCookie(identifier, credential, check);
        System.out.println();
        return false;
    }


}

package com.seasonal.service.impl;

import com.aliyuncs.dysmsapi.model.v20170525.SendSmsResponse;
import com.aliyuncs.exceptions.ClientException;
import com.seasonal.ip.GetIp;
import com.seasonal.mapper.LoginFromMapper;
import com.seasonal.mapper.UserInfoMapper;
import com.seasonal.pojo.LoginFrom;
import com.seasonal.redis.RedisUtil;
import com.seasonal.service.LoginService;
import com.seasonal.verification.ShortMessageVerification;
import net.sf.json.JSONArray;
import net.sf.json.JsonConfig;
import net.sf.json.processors.JsonValueProcessor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class LoginServiceImpl implements LoginService {

    private final LoginFromMapper loginFrom;
    private final UserInfoMapper userInfoMapper;
    private final RedisUtil redisUtil;
    private final GetIp getIp;
    private final ShortMessageVerification shortMessageVerification;

    @Autowired
    public LoginServiceImpl(LoginFromMapper loginFrom,UserInfoMapper userInfoMapper, RedisUtil redisUtil, GetIp getIp, ShortMessageVerification shortMessageVerification) {
        this.loginFrom = loginFrom;
        this.userInfoMapper = userInfoMapper;
        this.redisUtil = redisUtil;
        this.getIp = getIp;
        this.shortMessageVerification = shortMessageVerification;
    }

    //根据手机号码查找数据
    @Override
    public LoginFrom findRegistrationPhone(String identifier) {
        return loginFrom.findRegistrationPhone(identifier);
    }


    //登录成功后的信息修改
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

    //获取当前IP地址
    @Override
    public String getIpNow() {
        //获取当前ip地址
        String loginIpNow = getIp.publicip();
        return loginIpNow;
    }

    //生成短信验证码
    @Override
    public String sendShortMessage(String identifier) {
        //生成一个验证码
        shortMessageVerification.setNewcode();
        //获取
        String code = Integer.toString(shortMessageVerification.getNewcode());
//        System.out.println("发送的验证码为：" + code);

        SendSmsResponse sendSmsResponse = null;

        //发短信
        try {
            sendSmsResponse = shortMessageVerification.sendSms(identifier, code);
        } catch (ClientException e) {
            e.printStackTrace();
        }
//        System.out.println("短信接口返回的数据----------------");
//        System.out.println("Code=" + sendSmsResponse.getCode());
//        System.out.println("Message=" + sendSmsResponse.getMessage());
//        System.out.println("RequestId=" + sendSmsResponse.getRequestId());
//        System.out.println("BizId=" + sendSmsResponse.getBizId());
        return code;
    }

    //用户注册信息添加
    @Override
    public String insertUserMessage(String identifier, String credential) {
        //当前时间
        Date currentTime = new Date(System.currentTimeMillis());
        SimpleDateFormat sdFormatter = new SimpleDateFormat("yyyy-MM-dd-HH-mm");
        String retStrFormatNowDate = sdFormatter.format(currentTime).replace("-","").substring(2);
        //生成用户ID
        String userId = retStrFormatNowDate + UUID.randomUUID().toString().replace("-","").substring(27);
        //生成用户昵称
        String userName = UUID.randomUUID().toString().replace("-","").substring(24);
        //用户注册方式
        String identityType = "Phone";
        //获取当前ip地址
        String loginIp = getIp.publicip();
        int num = loginFrom.insertUserMessage(userId, identityType, credential, identifier, loginIp, currentTime);
        int userNum = userInfoMapper.insertUserMessage(userId,userName,currentTime);
        if (num > 0 && userNum > 0){
            return userId;
        }
        return null;
    }
}

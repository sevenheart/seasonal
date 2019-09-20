package com.seasonal.cookie;

import org.springframework.stereotype.Service;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Service
public class MyCookie {
    static HttpServletRequest request;
    static HttpServletResponse response;
    public void saveCookie(String identifier, String credential, String check){
        Cookie identifier_cookie = new Cookie("identifier",identifier);
        Cookie credential_cookie = new Cookie("credential",credential);
        Cookie check_cookie = new Cookie("check",check);
        //设置cookie持久化时间
        identifier_cookie.setMaxAge(7*24*60*60);
        credential_cookie.setMaxAge(7*24*60*60);
        check_cookie.setMaxAge(7*24*60*60);
        //设置cookie的携带路径，作用到整个项目
        identifier_cookie.setPath(request.getContextPath());
        credential_cookie.setPath(request.getContextPath());
        check_cookie.setPath(request.getContextPath());
        //发送到客户端
        response.addCookie(identifier_cookie);
        response.addCookie(identifier_cookie);
        response.addCookie(identifier_cookie);
        System.out.println();
    }
}

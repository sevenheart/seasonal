package com.seasonal.filter;

import com.aliyuncs.utils.StringUtils;
import com.seasonal.annotation.Intercept;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@Component
@Repository
public class LoginInterceptor implements HandlerInterceptor {

    /** 配置登录页面url,如果没登录且没有配置自定义的跳转，那么跳到这里 */
    public static final String LOGIN_PAGE_URL = "login/view/login.html";

    /** 回调url参数的key */
    public static final String CALL_BACK_URL = "callBackUrl";


    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        //你请求的目标必须是方法
        HttpSession session = request.getSession();
        if (handler instanceof HandlerMethod) {
            HandlerMethod handlerMethod = (HandlerMethod) handler;
            Object object = handlerMethod.getMethodAnnotation(Intercept.class);
            Intercept intercept = handlerMethod.getMethod().getAnnotation(Intercept.class);
            if (object == null) {//没有这个注解
                return true;
            } else if (intercept != null) {//有注解
                // 先获取当前请求的请求参数
                String query = StringUtils.isNotEmpty(request.getQueryString()) ? ("?" + request.getQueryString()) : "";
                // 先获取当前请求的请求完整url
                String callBackUrl = request.getRequestURL().toString() + query;

                Object obj = session.getAttribute("userId");
                if (obj == null) {//没有登录
                    System.out.println("false");
                    if (StringUtils.isNotEmpty(intercept.returnUrl())) {
                        // 自定义的跳转地址不为null那么去做重定向跳转
                        response.sendRedirect(intercept.returnUrl());
                    } else {
                        // 没有配置自定义的跳转,根据我们的业务应该会跳到登录页面
                        // 最终重定向的url，这里加了参数是为了登录成功后回跳会这个原来请求的地址，这个要登录功能配合才行
                        System.out.println("自定义跳转");
                        //String finallyUrl = LOGIN_PAGE_URL + "?" + CALL_BACK_URL + "=" + callBackUrl;
                        //System.out.println(finallyUrl);
                        // 开始做重定向操作
                        response.sendRedirect("isLogin");
                    }
                    return false;
                } else { //登录了
                    return true;
                }
            }
        }
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {

    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {

    }
}

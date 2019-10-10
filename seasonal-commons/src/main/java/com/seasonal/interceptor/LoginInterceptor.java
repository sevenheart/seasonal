package com.seasonal.interceptor;

import com.seasonal.annotation.Intercept;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

@Component
@Repository
public class LoginInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
//你请求的目标必须是方法
        HttpSession session = request.getSession();
        //拦截的是方法
        if (handler instanceof HandlerMethod) {
            //获取拦截方法的路径
            HandlerMethod handlerMethod = (HandlerMethod) handler;
            //获取拦截方法的注解
            Object intercept = handlerMethod.getMethodAnnotation(Intercept.class);
            if (intercept == null) {//没有这个注解
                return true;
            } else {//有注解
                Object obj = session.getAttribute("userId");
                if (obj == null) {//没有登录
                    redirect(request, response);
                    return false;
                } else { //登录了
                    return true;
                }
            }
        } else {
            Object obj = session.getAttribute("userId");
            if (obj == null) {//没有登录
                redirect(request, response);
                return false;
            } else { //登录了
                return true;
            }
        }
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {

    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {

    }

    //对于请求是ajax请求重定向问题的处理方法
    public void redirect(HttpServletRequest request, HttpServletResponse response) throws IOException {
        //获取当前请求的路径
        String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath();
        //如果request.getHeader("X-Requested-With") 返回的是"XMLHttpRequest"说明就是ajax请求，需要特殊处理 否则直接重定向就可以了
        if ("XMLHttpRequest".equals(request.getHeader("X-Requested-With"))) {
            //告诉ajax我是重定向
            response.setHeader("REDIRECT", "REDIRECT");
            //告诉ajax我重定向的路径CONTENTPATH
            response.setHeader("contentpath", basePath + "/login/view/login.html");
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
        } else {
            response.sendRedirect(basePath + "/login/view/login.html");
        }
    }
}

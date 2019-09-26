package com.seasonal.filter;

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
            HandlerMethod handlerMethod = (HandlerMethod) handler;
            System.out.println("handler:" + handlerMethod);
            Object intercept = handlerMethod.getMethodAnnotation(Intercept.class);
            System.out.println("注解：" + intercept);
            if (intercept == null) {//没有这个注解
                System.out.println("没有注解");
                return true;
            } else{//有注解
                Object obj = session.getAttribute("userId");
                if (obj == null) {//没有登录
                    System.out.println("未登录");
                    redirect(request, response);
                    return false;
                } else { //登录了
                    System.out.println("已登录");
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

    //对于请求是ajax请求重定向问题的处理方法
    public void redirect(HttpServletRequest request, HttpServletResponse response) throws IOException {
        //获取当前请求的路径
        String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath();
        //如果request.getHeader("X-Requested-With") 返回的是"XMLHttpRequest"说明就是ajax请求，需要特殊处理 否则直接重定向就可以了
        if ("XMLHttpRequest".equals(request.getHeader("X-Requested-With"))) {
            //告诉ajax我是重定向
            response.setHeader("REDIRECT", "REDIRECT");
            System.out.println("REDIRECT：" + response.getHeader("REDIRECT"));
            //告诉ajax我重定向的路径CONTENTPATH
            System.out.println("true：" + basePath + "/login/view/login.html");
            response.setHeader("contentpath", basePath + "/login/view/login.html");
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
        } else {
            System.out.println("false：" + basePath + "/login/view/login.html");
            response.sendRedirect(basePath + "/login/view/login.html");
        }
    }
}

package com.seasonal.config;

import com.seasonal.dataconverter.DateConverter;
import com.seasonal.filter.LoginInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.format.FormatterRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfigurer implements WebMvcConfigurer {

    public LoginInterceptor loginInterceptor;

    @Autowired
    public WebConfigurer(LoginInterceptor loginInterceptor) {
        this.loginInterceptor = loginInterceptor;
    }

    //配置日期转换器
    @Override
    public void addFormatters(FormatterRegistry registry) {
        registry.addConverter(new DateConverter());
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        //拦截 除了 excludePathList方法中页面的 其他请求
        //registry.addInterceptor(loginInterceptor).addPathPatterns("/**").excludePathPatterns();
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {

    }

//    public List<String> excludePathList() {
//        List<String> listUrls = new ArrayList<String>();
//
//        listUrls.add("/login");      //登录页
//        listUrls.add("/login.html");      //登录页
//        listUrls.add("/register");   // 注册页
//
//        //网站静态资源
//        listUrls.add("/css/**");
//        listUrls.add("/js/**");
//        listUrls.add("/fonts/**");
//        listUrls.add("/images/**");
//        return listUrls;
//    }
}

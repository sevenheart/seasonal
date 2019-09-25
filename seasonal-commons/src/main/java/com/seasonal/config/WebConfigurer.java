package com.seasonal.config;

import com.seasonal.dataconverter.DateConverter;
import com.seasonal.filter.LoginInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.format.FormatterRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.ArrayList;
import java.util.List;

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
        registry.addInterceptor(new LoginInterceptor()).addPathPatterns("/**");
        //registry.addInterceptor(new LoginInterceptor()).addPathPatterns("/**").excludePathPatterns(excludePathList());
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {

    }

//    public List<String> excludePathList() {
//        List<String> listUrls = new ArrayList<String>();
//        //网站静态资源
//        listUrls.add("../../../../seasonal-web/src/main/resources/static");
//        return listUrls;
//    }
}

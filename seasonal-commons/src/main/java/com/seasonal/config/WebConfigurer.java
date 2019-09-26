package com.seasonal.config;

import com.seasonal.dataconverter.DateConverter;
import com.seasonal.filter.LoginInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.format.FormatterRegistry;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import java.util.Arrays;
import java.util.List;

@Configuration
public class WebConfigurer implements WebMvcConfigurer {
    private static List<String> EXCLUDE_PATH = Arrays.asList("/activity/**","/bootstrap/**","/cart/**","/comment/**","/jquery/**","/main/**","/order/**","/user/**","/login/**","/js/**","/css/**","/index.html");

    //由于在拦截器中注解无效，需要提前注入bean
    @Bean
    public LoginInterceptor getLoginIntereptor() {
        return new LoginInterceptor();
    }

    //配置日期转换器
    @Override
    public void addFormatters(FormatterRegistry registry) {
        registry.addConverter(new DateConverter());
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        //拦截 除了 excludePathList方法中页面的 其他请求
        registry.addInterceptor(new LoginInterceptor()).addPathPatterns("/**");//.excludePathPatterns(EXCLUDE_PATH);
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {

    }
}

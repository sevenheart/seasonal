package com.seasonal.config;

import org.springframework.boot.web.server.ConfigurableWebServerFactory;
import org.springframework.boot.web.server.ErrorPage;
import org.springframework.boot.web.server.WebServerFactoryCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;

@Configuration
public class ErrorCustomlizer {

    /**
     * 拦截网络请求错误！都跳转到首页
     * @return
     */
/*    @Bean
    public WebServerFactoryCustomizer<ConfigurableWebServerFactory>  webServerFactoryCustomizer(){
        return (container -> {
            ErrorPage error401Page = new ErrorPage(HttpStatus.UNAUTHORIZED, "/index.html");
            ErrorPage error404Page = new ErrorPage(HttpStatus.NOT_FOUND, "/index.html");
            ErrorPage error500Page = new ErrorPage(HttpStatus.INTERNAL_SERVER_ERROR, "/index.html");
            container.addErrorPages(error401Page, error404Page, error500Page);
        });
    }*/

}

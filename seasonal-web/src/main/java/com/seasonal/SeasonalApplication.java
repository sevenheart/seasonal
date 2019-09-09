package com.seasonal;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;

@SpringBootApplication
@MapperScan(basePackages = "com.seasonal.mapper")
@ServletComponentScan
public class SeasonalApplication {
    public static void main(String[] args) {
        SpringApplication.run(SeasonalApplication.class, args);
    }

}

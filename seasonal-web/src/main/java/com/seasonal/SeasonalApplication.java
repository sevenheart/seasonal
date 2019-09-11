package com.seasonal;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
<<<<<<< HEAD
import org.springframework.boot.web.servlet.ServletComponentScan;

@SpringBootApplication
@MapperScan(basePackages = "com.seasonal.mapper")
@ServletComponentScan
=======
import org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration;
import org.springframework.boot.web.servlet.ServletComponentScan;


@MapperScan(basePackages = "com.seasonal.mapper")
@ServletComponentScan
@SpringBootApplication(exclude = MongoAutoConfiguration.class)
>>>>>>> 505e4b3610889e049814d844c8490d97d4e49dfe
public class SeasonalApplication {
    public static void main(String[] args) {
        SpringApplication.run(SeasonalApplication.class, args);
    }

}

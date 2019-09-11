package com.seasonal.aspect;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class LogAspect {

    private final Logger LOGGER = LoggerFactory.getLogger(LogAspect.class);

    @Pointcut("execution(* com.seasonal.controller.*.*(..))")
    public void log(){

    }

    @Before("log()")
    public void beforeLog(JoinPoint joinPoint){
        LOGGER.debug("********打印请求开始********");
        LOGGER.debug("REQUEST: " + joinPoint.getSignature().getName());
        LOGGER.debug("********打印请求结束********");
    }

    @AfterThrowing("log()")
    public void exceptionLog(JoinPoint joinPoint){
        LOGGER.debug("********打印异常开始********");
        LOGGER.debug("EXCEPTION: " + joinPoint.getSignature().getName());
        LOGGER.debug("********打印异常结束********");
    }

    @AfterReturning("log()")
    public void resultLog(JoinPoint joinPoint){
        LOGGER.debug("********打印结果开始********");
        LOGGER.debug("RESULT: " + joinPoint.getSignature().getName());
        LOGGER.debug("********打印结果结束********");
    }

}

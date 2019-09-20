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

    /**
     * 打印请求日志
     * @param joinPoint
     */
    @Before("log()")
    public void requestLog(JoinPoint joinPoint){
        LOGGER.debug("********打印请求开始********");
        LOGGER.debug("REQUEST: " + joinPoint.getSignature().getName());
        LOGGER.debug("********打印请求结束********");
    }

    /**
     * 打印异常日志
     * @param joinPoint
     */
    @AfterThrowing("log()")
    public void exceptionLog(JoinPoint joinPoint){
        LOGGER.error("********打印异常开始********");
        LOGGER.error("EXCEPTION: " + joinPoint.getSignature().getName());
        LOGGER.error("********打印异常结束********");
    }

    /**
     * 打印结果日志
     * @param object
     */
    @AfterReturning(returning = "object", pointcut = "log()")
    public void resultLog(Object object){
        LOGGER.debug("********打印结果开始********");
        LOGGER.debug("RESULT: " + object);
        LOGGER.debug("********打印结果结束********");
    }

}

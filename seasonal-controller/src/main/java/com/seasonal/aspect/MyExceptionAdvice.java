package com.seasonal.aspect;

import com.seasonal.vo.ResultData;
import com.seasonal.vo.ResultEnum;
import com.seasonal.vo.ResultUtil;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

/**
 * 全局异常捕获处理
 */
@ControllerAdvice
public class MyExceptionAdvice {


    @ExceptionHandler(value = Exception.class)
    @ResponseBody
    public ResultData defaultException(HttpServletRequest request, Exception e){
        e.printStackTrace();
        return  new ResultData(ResultEnum.EXCEPTION.getCode(),ResultEnum.EXCEPTION.getMsg());
    }


}

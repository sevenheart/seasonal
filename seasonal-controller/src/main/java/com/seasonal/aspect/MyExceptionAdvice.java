package com.seasonal.aspect;

import com.seasonal.exception.MyException;
import com.seasonal.vo.ResultData;
import com.seasonal.vo.ResultEnum;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

/**
 * 全局异常捕获处理
 */

@ControllerAdvice
public class MyExceptionAdvice {

 /*
/**
     * 最大的异常Exception捕获
     * @param request
     * @param e
     * @return
     *//*

    @ExceptionHandler(value = Exception.class)
    @ResponseBody
    public ResultData defaultException(HttpServletRequest request, Exception e){
        e.printStackTrace();
        return  new ResultData(ResultEnum.EXCEPTION.getCode(),ResultEnum.EXCEPTION.getMsg());
    }

    */
/**
     * 自定义异常的捕获
     *
     * @param request
     * @param e
     * @return
     *//*

    public ResultData MyException(HttpServletRequest request, MyException e){
        e.printStackTrace();
        Integer code = e.getCode();
        String message = e.getMessage();
        if(code == null){
            code=ResultEnum.EXCEPTION.getCode();
        }
        if(message == null){
            message=ResultEnum.EXCEPTION.getMsg();
        }
        return new ResultData(code,message);
    }
*/


}

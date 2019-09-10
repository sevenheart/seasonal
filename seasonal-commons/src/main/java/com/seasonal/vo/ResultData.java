package com.seasonal.vo;


import java.io.Serializable;

/**
 * 所有的返回数据类
 */

public class ResultData implements Serializable {
    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    /**
     * 响应的状态码：自己指定
     * 0：成功响应
     * 1: 用户名或密码错误
     * 2：响应...错误
     * 3:没有数据
     * 4:删除失败
     *
     */
    private Integer code;
    /**
     * 响应描述信息：
     * success
     * failed
     * username not exist
     * .....
     */
    private String message;

    /**
     * 响应的数据
     */
    private Object data;


    public ResultData(Integer code, String msg, Object data) {
        this.code = code;
        this.message = msg;
        this.data = data;
    }

    public ResultData(Integer code, String msg) {
        this.code = code;
        this.message = msg;
    }
}

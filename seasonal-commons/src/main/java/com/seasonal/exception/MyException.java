package com.seasonal.exception;
import lombok.Data;

@Data
public class MyException extends RuntimeException {

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    private Integer code;

        public MyException(String msg){

            super(msg);

    }



    public MyException(Integer code,String msg){
        super(msg);
        this.code=code;

    }

}

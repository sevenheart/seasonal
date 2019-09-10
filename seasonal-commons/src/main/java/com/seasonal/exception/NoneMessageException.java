package com.seasonal.exception;

public class NoneMessageException extends RuntimeException {


    public NoneMessageException() {
    }

    public NoneMessageException(String message) {
        super(message);
    }
}

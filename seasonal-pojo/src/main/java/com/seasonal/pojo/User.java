package com.seasonal.pojo;

import lombok.Data;

import java.util.Date;

@Data
public class User {
    private Long id;
    private String userId;
    private String userName;
    private String userImg;
    private Byte isVip;
    private Byte userAge;
    private Byte userSex;
    private String userType;
    private Date createTime;
    private Date updateTime;


}

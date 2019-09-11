package com.seasonal.pojo;

import lombok.Data;

import java.sql.Date;



@Data
public class LoginFrom {
    private Long id;
    private String userId;
    private String identityType;
    private String credential;
    private String identifier;
    private String loginIp;
    private Date createTime;
    private Date updateTime;
    private Integer type;


}

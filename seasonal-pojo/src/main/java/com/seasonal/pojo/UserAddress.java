package com.seasonal.pojo;

import lombok.Data;

import java.util.Date;

@Data
public class UserAddress {
    private Long id;
    private String userId;
    private String province;
    private String city;
    private String district;
    private String address;
    private String userPhone;
    private String userName;
    private Date createTime;
    private Date updateTime;
}

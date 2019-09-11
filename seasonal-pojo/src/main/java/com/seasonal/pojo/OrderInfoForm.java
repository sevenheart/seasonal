package com.seasonal.pojo;

import lombok.Data;


import java.sql.Date;


@Data
public class OrderInfoForm {
    private Long id;
    private String orderId;
    private String payPlatform;
    private Date createTime;
    private Date updateTime;


}

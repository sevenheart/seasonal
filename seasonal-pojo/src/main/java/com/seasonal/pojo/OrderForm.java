package com.seasonal.pojo;

import lombok.Data;

import java.math.BigDecimal;

import java.sql.Date;


@Data
public class OrderForm {
    private Long id;
    private String orderId;
    private String orderUserId;
    private Byte orderStatus;
    private BigDecimal orderMoney;
    private String payPlatform;
    private Byte deliveryWay;
    private Date deliveryTime;
    private BigDecimal deliveryMoney;
    private Date createTime;
    private Date updateTime;


}

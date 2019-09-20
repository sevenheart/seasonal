package com.seasonal.pojo;

import lombok.Data;

import java.math.BigDecimal;

import java.sql.Date;
import java.util.List;

@Data
public class OrderForm {
    private Long id;
    private String orderId;
    private String orderUserId;
    private Integer orderStatus;
    private BigDecimal orderMoney;
    private String deliveryAddress;
    private String payPlatform;
    private Integer deliveryWay;
    private Date deliveryTime;
    private BigDecimal deliveryMoney;
    private Integer goodId;
    private String getPassword;
    private String getAccount;
    private Date createTime;
    private Date updateTime;

    private List<DetailedCommodityForm> detailedCommodityForms;
}

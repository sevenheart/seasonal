package com.seasonal.pojo;

import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;

@Data
public class DeliveryForm {
    private Long id;
    private Byte deliveryWay;
    private Byte deliveryTime;
    private BigDecimal deliveryMoney;
    private Date createTime;
    private Date updateTime;


}

package com.seasonal.pojo;

import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;

@Data
public class DetailedCommodityForm {
    private Long id;
    private String goodId;
    private Integer goodCount;
    private BigDecimal commodityMoney;
    private String orderId;
    private Integer goodType;
    private Date createTime;
    private Date updateTime;

}

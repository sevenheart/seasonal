package com.seasonal.pojo;

import lombok.Data;

import java.math.BigDecimal;
import java.sql.Date;


@Data
public class SecKillGood {
    private Long id;
    private String secKillGoodName;
    private String secKillGoodSales;
    private BigDecimal secKillGoodOriginalPrice;
    private BigDecimal secKillGoodPrice;
    private String secKillGoodIcon;
    private Integer secKillGoodStatus;
    private Integer secKillGoodWeight;
    private Date createTime;
    private Date updateTime;
}

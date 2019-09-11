package com.seasonal.pojo;

import lombok.Data;

import java.math.BigDecimal;
import java.sql.Date;


@Data
public class Good {
    private Long id;
    private String goodId;
    private String goodName;
    private Byte goodStatus;
    private Byte goodSeason;
    private BigDecimal goodPrice;
    private Date createTime;
    private Date updateTime;


}

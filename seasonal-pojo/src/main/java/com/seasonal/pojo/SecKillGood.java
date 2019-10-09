package com.seasonal.pojo;

import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;
import java.sql.Date;
import java.util.List;


@Data
public class SecKillGood implements Serializable {
    private Long id;
    private Long goodId;
    private BigDecimal seckillPrice;
    private String seckillTime;
    private Integer seckillCount;
    private ComposeGood composeGood;
    private Date createTime;
    private Date updateTime;
}

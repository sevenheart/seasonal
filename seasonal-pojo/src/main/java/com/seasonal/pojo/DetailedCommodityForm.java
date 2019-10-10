package com.seasonal.pojo;

import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Data
public class DetailedCommodityForm implements Serializable {
    private Long id;
    private String goodId;
    private Integer goodCount;
    private BigDecimal commodityMoney;
    private String orderId;
    private String userId;
    private Integer iscomment;
    private String commentId;
    private Integer goodType;
    private Date createTime;
    private Date updateTime;

    private List<ComposeGood> composeGoods;

}

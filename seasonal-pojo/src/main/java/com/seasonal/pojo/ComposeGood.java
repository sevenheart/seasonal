package com.seasonal.pojo;

import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class ComposeGood {
    private Long id;

    private String composeGoodName;
    private Integer composeGoodPrice;
    private String composeGoodDescribe;
    private Integer composeGoodType;
    private Integer composeGoodStatus;
    private String composeGoodIcon;
    private Integer composeGoodWeight;
    private Integer commentNumber;
    private Integer skillType;
    private SecKillGood secKillGood;
    private List<ComposeGoodImg>  composeGoodImgs;
    private Classify classify;
//    private Date createTime;
//    private Date updateTime;


}

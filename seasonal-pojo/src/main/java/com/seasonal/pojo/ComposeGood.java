package com.seasonal.pojo;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
public class ComposeGood implements Serializable {
    private Long id;
    private String composeGoodName;
    private Integer composeGoodPrice;
    private String composeGoodDescribe;
    private Integer composeGoodType;
    private Integer composeGoodStatus;
    private String composeGoodIcon;
    private Integer composeGoodWeight;
    private Integer commentNumber;
    private Integer composeGoodSales;


    private List<ComposeGoodImg>  composeGoodImgs;
    private Classify classify;
//    private Date createTime;
//    private Date updateTime;


}

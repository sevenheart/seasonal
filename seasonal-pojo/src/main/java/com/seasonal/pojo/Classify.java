package com.seasonal.pojo;

import lombok.Data;

import java.util.List;

@Data
public class Classify {
    private Long id;
    private Long generalitiesId;
    private String classifyName;
    private List<ComposeGood> composeGood;
    private Generalities generalities;
//    private Date createTime;
//    private Date updateTime;

}

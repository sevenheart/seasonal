package com.seasonal.pojo;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
public class Generalities implements Serializable {
    private Long id;

    private String generalitiesName;
    private String generalitiesImg;
    private String generalitiesIcon;

    private List<Classify> classify;

//    private Date createTime;
//    private Date updateTime;


}

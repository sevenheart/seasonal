package com.seasonal.pojo;

import lombok.Data;

import java.sql.Date;

@Data
public class ComposeGoodCollection {
    private long id;
    private String userId;
    private long goodId;
    private Date collectionTime;
    private ComposeGood composeGood;
}

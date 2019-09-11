package com.seasonal.pojo;

import lombok.Data;

import java.sql.Date;


@Data
public class SecKillRedis {
    private Long id;
    private Date secKillTime;
    private String secKillKey;
    private Date createTime;
    private Date updateTime;
}

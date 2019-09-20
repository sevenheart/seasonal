package com.seasonal.pojo;

import lombok.Data;

import java.math.BigDecimal;
import java.sql.Date;


@Data
public class MerchantAddress {
    private Long id;
    private String userId;
    private String province;
    private String city;
    private String district;
    private String address;
    private String merchantPhone;
    private String merchantName;
//    private Date createTime;
//    private Date updateTime;
}

package com.seasonal.pojo;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class CartForm {

    private Long id;
    private String userId;
    private String goodId;
    private String goodName;
    private int goodCount;
    private BigDecimal goodPrice;
}

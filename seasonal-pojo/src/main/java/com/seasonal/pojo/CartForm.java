package com.seasonal.pojo;

import lombok.Data;

@Data
public class CartForm {
    private String userId;
    private String goodId;
    private ComposeGood composeGood;
    private Integer goodCount;
}

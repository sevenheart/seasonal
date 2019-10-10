package com.seasonal.pojo;

import lombok.Data;

import java.io.Serializable;

@Data
public class SeckillOrder implements Serializable {
    private OrderForm orderForm;
    private DetailedCommodityForm detailedCommodityForml;
}

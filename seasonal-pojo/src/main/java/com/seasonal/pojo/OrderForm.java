package com.seasonal.pojo;

import lombok.Data;

import java.math.BigDecimal;
<<<<<<< HEAD
import java.util.Date;
=======
import java.sql.Date;

>>>>>>> 505e4b3610889e049814d844c8490d97d4e49dfe

@Data
public class OrderForm {
    private Long id;
    private String orderId;
    private String orderUserId;
    private Byte orderStatus;
    private BigDecimal orderMoney;
    private String payPlatform;
    private Date createTime;
    private Date updateTime;


}

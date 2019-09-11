package com.seasonal.pojo;

import lombok.Data;

import java.math.BigDecimal;
<<<<<<< HEAD
import java.util.Date;
=======
import java.sql.Date;

>>>>>>> 505e4b3610889e049814d844c8490d97d4e49dfe

@Data
public class Good {
    private Long id;
    private String goodId;
    private String goodName;
    private Byte goodStatus;
    private Byte goodSeason;
    private BigDecimal goodPrice;
    private Date createTime;
    private Date updateTime;


}

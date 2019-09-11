package com.seasonal.pojo;

import lombok.Data;

<<<<<<< HEAD
import java.util.Date;
=======
import java.sql.Date;

>>>>>>> 505e4b3610889e049814d844c8490d97d4e49dfe

@Data
public class UserAddress {
    private Long id;
    private String userId;
    private String province;
    private String city;
    private String district;
    private String address;
    private String userPhone;
    private String userName;
    private Date createTime;
    private Date updateTime;
}

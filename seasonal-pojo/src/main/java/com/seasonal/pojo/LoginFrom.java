package com.seasonal.pojo;

import lombok.Data;

<<<<<<< HEAD
import java.util.Date;
=======
import java.sql.Date;

>>>>>>> 505e4b3610889e049814d844c8490d97d4e49dfe

@Data
public class LoginFrom {
    private Long id;
    private String userId;
    private String identityType;
    private String credential;
    private String identifier;
    private String loginIp;
    private Date createTime;
    private Date updateTime;
    private Integer type;


}

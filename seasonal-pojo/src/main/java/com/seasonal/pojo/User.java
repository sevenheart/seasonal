package com.seasonal.pojo;

import lombok.Data;

<<<<<<< HEAD
import java.util.Date;
=======
import java.sql.Date;

>>>>>>> 505e4b3610889e049814d844c8490d97d4e49dfe

@Data
public class User {
    private Long id;
    private String userId;
    private String userName;
<<<<<<< HEAD
=======
    private String userImg;
>>>>>>> 505e4b3610889e049814d844c8490d97d4e49dfe
    private Byte isVip;
    private Byte userAge;
    private Byte userSex;
    private String userType;
    private Date createTime;
    private Date updateTime;


}

package com.seasonal.mapper;

import com.seasonal.pojo.User;
import org.hibernate.validator.constraints.URL;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface UserInfoMapper {

    List<User> findUserById (Integer id);
}

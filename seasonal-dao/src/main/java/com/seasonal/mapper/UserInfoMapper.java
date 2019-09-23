package com.seasonal.mapper;

import com.seasonal.pojo.User;
import org.hibernate.validator.constraints.URL;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;
@Repository
public interface UserInfoMapper {
    /**
     * 根据用户id查用户
     * @param id
     * @return
     */

    List<User> findUserById (String id);

    /**
     * 修改用户信息
     * @param user
     * @return
     */
    int updateUserInfo(User user);

    int insertUserMessage(String userId, String userName, Date currentTime);

}

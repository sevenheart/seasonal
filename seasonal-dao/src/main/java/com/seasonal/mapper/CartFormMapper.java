package com.seasonal.mapper;

import com.seasonal.pojo.CartForm;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartFormMapper {

    /**
     * 根据用户id查找其购物车清单
     * @param userId
     * @return
     */
    List<CartForm> findCartFormById(String userId);
}

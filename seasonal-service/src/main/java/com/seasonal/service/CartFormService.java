package com.seasonal.service;

import com.seasonal.pojo.CartForm;

import java.util.List;

public interface CartFormService {

    /**
     * 根据用户id查找其购物车清单
     * @param userId
     * @return
     */
    List<CartForm> findCartFormById(String userId);

    /**
     * 加入购物车
     * @param userId
     * @param goodId
     * @return
     */
    int addGoodsToCart(String userId, String goodId, Integer goodCount);

    /**
     * 更改购物车中某商品的购买数量
     * @param userId
     * @param goodId
     * @param goodCount
     * @return
     */
    int updateGoodsCount(String userId, String goodId, Integer goodCount);

    /**
     * 从购物车中移除商品
     * @param userId
     * @param goodIdList
     * @return
     */
    int deleteGoodsOfCart(String userId, List<String> goodIdList);
}

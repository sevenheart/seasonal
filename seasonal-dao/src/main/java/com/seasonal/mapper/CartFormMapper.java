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
     * 根据用户id和商品id查找购物车中是否已有该商品
     * @param userId
     * @param goodId
     * @return
     */
    CartForm findGoodById(String userId, String goodId);

    /**
     * 从购物车中移除商品
     * @param userId
     * @param goodId
     * @return
     */
    int deleteGoodsOfCart(String userId, String goodId);
}

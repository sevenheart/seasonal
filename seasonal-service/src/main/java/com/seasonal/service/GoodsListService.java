package com.seasonal.service;

import com.seasonal.pojo.ComposeGood;

import com.seasonal.pojo.ComposeGoodCollection;
import com.seasonal.pojo.SecKillRedis;

import java.sql.Time;
import java.util.List;

public interface GoodsListService {
    /**
     * 根据小类id查询所有商品
     * @param id 小类id
     * @return 查询到的商品
     */
    List<ComposeGood> showGoodsList(Long id, String orderName, int currPage, String likeName);

    /**
     * 根据时间获取秒杀key
     * @param secKillTime 小时数
     * @return key
     */
    SecKillRedis findSecKillKeyByTime(String secKillTime);

    /**
     * 查找用户是否已收藏
     * @param userId
     * @param goodId
     * @return
     */
    ComposeGoodCollection selectCollection(String userId,String goodId);

    /**
     * 根据用户Id和商品Id添加收藏
     * @param userId
     * @param goodId
     * @return
     */
    int goodCollection(String userId,String goodId);

    /**
     * 根据用户id查询所有收藏商品的详细信息
     * @param userId
     * @return
     */
    List<ComposeGoodCollection> selectAllCollectionById(String userId);
}

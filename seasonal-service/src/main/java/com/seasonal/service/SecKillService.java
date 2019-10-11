package com.seasonal.service;

import com.seasonal.pojo.SecKillGood;

import java.util.List;

public interface SecKillService {
    /**
     * 查询所有秒杀商品信息
     * @param time 秒杀时间
     * @return 商品列表
     */
    List<SecKillGood> findAllSecKillGood(String time);

    /**
     * 根据商品的id查询当前秒杀的价格
     * @param id 商品id
     * @return 结果集
     */
    SecKillGood findPriceById(Long id);

    /**
     * 根据商品id 自减商品数量
     *
     * @param id 商品id
     * @return 受影响行数
     */
    int updateSeckillGoodCount(Long id);
}

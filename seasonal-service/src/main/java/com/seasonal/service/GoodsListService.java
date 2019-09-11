package com.seasonal.service;

import com.seasonal.pojo.ComposeGood;
<<<<<<< HEAD

=======
import com.seasonal.pojo.SecKillRedis;

import java.sql.Time;
>>>>>>> 505e4b3610889e049814d844c8490d97d4e49dfe
import java.util.List;

public interface GoodsListService {
    /**
     * 根据小类id查询所有商品
     * @param id 小类id
     * @return 查询到的商品
     */
    List<ComposeGood> showGoodsList(Long id, String orderName, int currPage, String likeName);
<<<<<<< HEAD
=======

    /**
     * 根据时间获取秒杀key
     * @param secKillTime 小时数
     * @return key
     */
    SecKillRedis findSecKillKeyByTime(String secKillTime);
>>>>>>> 505e4b3610889e049814d844c8490d97d4e49dfe
}

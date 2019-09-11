package com.seasonal.mapper;

import com.seasonal.pojo.SecKillRedis;
import org.springframework.stereotype.Repository;

import java.sql.Time;

@Repository
public interface SecKillRedisMapper {
    /**
     * 根据data获取下一个时间段秒杀商品的key
     * @param secKillTime 小时数
     * @return
     */
    SecKillRedis findSecKillKeyByDate(String secKillTime);
}

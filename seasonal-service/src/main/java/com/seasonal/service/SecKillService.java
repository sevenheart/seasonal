package com.seasonal.service;

import com.seasonal.mapper.SecKillGoodMapper;
import com.seasonal.pojo.SecKillGood;

import java.util.List;

public interface SecKillService {
    /**
     * 查询所有秒杀商品信息
     * @param time 秒杀时间
     * @return 商品列表
     */
    List<SecKillGood> findAllSecKillGood(String time);
}

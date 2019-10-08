package com.seasonal.mapper;

import com.seasonal.pojo.SecKillGood;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SecKillGoodMapper {
    /**
     * 查询所有秒杀商品信息
     *
     * @param time 秒杀时间
     * @return 商品列表
     */
    List<SecKillGood> findAllSecKillGood(String time);

    /**
     * 根据id查询商品秒杀价格
     *
     * @param id 商品id
     * @return 秒杀价格
     */
    Integer findSkillGoodById(Long id);
}

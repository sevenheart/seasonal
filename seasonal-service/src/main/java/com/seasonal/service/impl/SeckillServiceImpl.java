package com.seasonal.service.impl;

import com.seasonal.mapper.SecKillGoodMapper;
import com.seasonal.pojo.SecKillGood;
import com.seasonal.service.SecKillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SeckillServiceImpl implements SecKillService {

    private final SecKillGoodMapper secKillGoodMapper;

    @Autowired
    public SeckillServiceImpl(SecKillGoodMapper secKillGoodMapper) {
        this.secKillGoodMapper = secKillGoodMapper;
    }

    @Override
    public List<SecKillGood> findAllSecKillGood(String time) {
        return secKillGoodMapper.findAllSecKillGood(time);
    }

    @Override
    public SecKillGood findPriceById(Long id) {
        return secKillGoodMapper.findSkillGoodById(id);
    }
}

package com.seasonal.service.impl;

import com.seasonal.mapper.ComposeGoodMapper;
import com.seasonal.mapper.DetailedCommodityFormMapper;
import com.seasonal.pojo.ComposeGood;
import com.seasonal.pojo.DetailedCommodityForm;
import com.seasonal.service.DetailGoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DetailGoodServiceImpl implements DetailGoodService {


    private final ComposeGoodMapper composeGoodMapper;
    private final DetailedCommodityFormMapper detailedCommodityFormMapper;
    @Autowired
    public DetailGoodServiceImpl(ComposeGoodMapper composeGoodMapper,DetailedCommodityFormMapper detailedCommodityFormMapper) {
        this.composeGoodMapper = composeGoodMapper;
        this.detailedCommodityFormMapper = detailedCommodityFormMapper;
    }

    @Override
    public ComposeGood findComposeGoodById(Long id) {
        return composeGoodMapper.findComposeGoodByID(id);
    }

    @Override
    public List<DetailedCommodityForm> findNoCommentGoodsByUserId(String userId) {
        return detailedCommodityFormMapper.findNoCommentGoodsByUserId(userId) ;
    }
}

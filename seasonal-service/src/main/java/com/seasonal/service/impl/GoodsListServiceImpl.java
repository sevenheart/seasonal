package com.seasonal.service.impl;

import com.seasonal.mapper.ComposeGoodCollectionMapper;
import com.seasonal.mapper.ComposeGoodMapper;
import com.seasonal.page.PageInfoResult;
import com.seasonal.pojo.ComposeGood;
import com.seasonal.mapper.SecKillRedisMapper;
import com.seasonal.pojo.ComposeGoodCollection;
import com.seasonal.pojo.SecKillRedis;
import com.seasonal.service.GoodsListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;

@Service
public class GoodsListServiceImpl implements GoodsListService {

    private final ComposeGoodMapper composeGoodMapper;
    private final SecKillRedisMapper secKillRedisMapper;
    private final ComposeGoodCollectionMapper composeGoodCollectionMapper;

    @Autowired
    public GoodsListServiceImpl(ComposeGoodMapper composeGoodMapper, SecKillRedisMapper secKillRedisMapper, ComposeGoodCollectionMapper composeGoodCollectionMapper) {
        this.composeGoodMapper = composeGoodMapper;
        this.secKillRedisMapper = secKillRedisMapper;
        this.composeGoodCollectionMapper = composeGoodCollectionMapper;
    }


    @Override
    public List<ComposeGood> showGoodsList(Long id, String orderName, int currPage, String likeName) {
        PageInfoResult pageInfoResult = new PageInfoResult();
        pageInfoResult.setOrderName(orderName);
        pageInfoResult.setCurrPage(currPage);
        pageInfoResult.setKeyPage((currPage - 1) * pageInfoResult.getPageSize());
        return composeGoodMapper.findAllComposeGoodByClassifyIdForPage(id, pageInfoResult,likeName);
    }

    @Override
    public SecKillRedis findSecKillKeyByTime(String secKillTime) {
        return secKillRedisMapper.findSecKillKeyByDate(secKillTime);
    }

    @Override
    public ComposeGoodCollection selectCollection(String userId, String goodId) {
        ComposeGoodCollection composeGoodCollection = composeGoodCollectionMapper.selectCollection(userId,goodId);
        return composeGoodCollection;
    }

    /**
     * 用户收藏信息保存
     * @param userId
     * @param goodId
     * @return
     */
    @Override
    public int goodCollection(String userId, String goodId) {
        //获取当前时间
        Date currentTime = new Date(System.currentTimeMillis());
        int num = composeGoodCollectionMapper.goodCollection(userId,goodId,currentTime);
        return num;
    }

    @Override
    public List<ComposeGoodCollection> selectAllCollectionById(String userId) {
        return composeGoodCollectionMapper.selectAllCollectionById(userId);
    }
}

package com.seasonal.service.impl;

import com.seasonal.mapper.ComposeGoodMapper;
<<<<<<< HEAD
import com.seasonal.page.PageInfoResult;
import com.seasonal.pojo.ComposeGood;
=======
import com.seasonal.mapper.SecKillRedisMapper;
import com.seasonal.page.PageInfoResult;
import com.seasonal.pojo.ComposeGood;
import com.seasonal.pojo.SecKillRedis;
>>>>>>> 505e4b3610889e049814d844c8490d97d4e49dfe
import com.seasonal.service.GoodsListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

<<<<<<< HEAD
=======
import java.sql.Time;
>>>>>>> 505e4b3610889e049814d844c8490d97d4e49dfe
import java.util.List;

@Service
public class GoodsListServiceImpl implements GoodsListService {

    private final ComposeGoodMapper composeGoodMapper;
<<<<<<< HEAD

    @Autowired
    public GoodsListServiceImpl(ComposeGoodMapper composeGoodMapper) {
        this.composeGoodMapper = composeGoodMapper;
=======
    private final SecKillRedisMapper secKillRedisMapper;

    @Autowired
    public GoodsListServiceImpl(ComposeGoodMapper composeGoodMapper, SecKillRedisMapper secKillRedisMapper) {
        this.composeGoodMapper = composeGoodMapper;
        this.secKillRedisMapper = secKillRedisMapper;
>>>>>>> 505e4b3610889e049814d844c8490d97d4e49dfe
    }


    @Override
    public List<ComposeGood> showGoodsList(Long id, String orderName, int currPage, String likeName) {

        PageInfoResult pageInfoResult = new PageInfoResult();
        pageInfoResult.setOrderName(orderName);
        pageInfoResult.setCurrPage(currPage);
        pageInfoResult.setKeyPage((currPage - 1) * pageInfoResult.getPageSize());
<<<<<<< HEAD
        System.out.println(orderName);
        return composeGoodMapper.findAllComposeGoodByClassifyIdForPage(id, pageInfoResult,likeName);
=======
        return composeGoodMapper.findAllComposeGoodByClassifyIdForPage(id, pageInfoResult, likeName);
    }

    @Override
    public SecKillRedis findSecKillKeyByTime(String secKillTime) {
        return secKillRedisMapper.findSecKillKeyByDate(secKillTime);
>>>>>>> 505e4b3610889e049814d844c8490d97d4e49dfe
    }
}

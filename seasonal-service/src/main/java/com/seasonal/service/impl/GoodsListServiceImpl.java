package com.seasonal.service.impl;

import com.seasonal.mapper.ComposeGoodMapper;
import com.seasonal.page.PageInfoResult;
import com.seasonal.pojo.ComposeGood;
import com.seasonal.service.GoodsListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GoodsListServiceImpl implements GoodsListService {

    private final ComposeGoodMapper composeGoodMapper;

    @Autowired
    public GoodsListServiceImpl(ComposeGoodMapper composeGoodMapper) {
        this.composeGoodMapper = composeGoodMapper;
    }


    @Override
    public List<ComposeGood> showGoodsList(Long id, String orderName, int currPage, String likeName) {

        PageInfoResult pageInfoResult = new PageInfoResult();
        pageInfoResult.setOrderName(orderName);
        pageInfoResult.setCurrPage(currPage);
        pageInfoResult.setKeyPage((currPage - 1) * pageInfoResult.getPageSize());
        return composeGoodMapper.findAllComposeGoodByClassifyIdForPage(id, pageInfoResult,likeName);
    }
}

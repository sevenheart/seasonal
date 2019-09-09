package com.seasonal.service;

import com.seasonal.pojo.ComposeGood;

import java.util.List;

public interface GoodsListService {
    /**
     * 根据小类id查询所有商品
     * @param id 小类id
     * @return 查询到的商品
     */
    List<ComposeGood> showGoodsList(Long id, String orderName, int currPage, String likeName);
}

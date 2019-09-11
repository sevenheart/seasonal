package com.seasonal.service;

import com.seasonal.pojo.ComposeGood;

public interface DetailGoodService {
    /**
     * 根据ComposeGood的id查询 商品详细信息
     * @param id id
     * @return 商品详细信息
     */
    ComposeGood findComposeGoodById(Long id);
}

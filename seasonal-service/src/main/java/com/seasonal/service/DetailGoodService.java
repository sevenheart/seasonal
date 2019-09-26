package com.seasonal.service;

import com.seasonal.pojo.ComposeGood;
import com.seasonal.pojo.DetailedCommodityForm;

import java.util.List;

public interface DetailGoodService {
    /**
     * 根据ComposeGood的id查询 商品详细信息
     * @param id id
     * @return 商品详细信息
     */
    ComposeGood findComposeGoodById(Long id);


    /**
     * 根据用户id查未评论的详细商品信息
     * @param userId
     * @return
     */
    List<DetailedCommodityForm>findNoCommentGoodsByUserId(String userId);
}

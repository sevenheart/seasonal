package com.seasonal.mapper;

import com.seasonal.page.PageInfoResult;
import com.seasonal.pojo.ComposeGood;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ComposeGoodMapper {
    /**
     * 根据ComposeGood中的参数动态查询
     *
     * @param composeGood
     * @return 所有符合查询结果数据
     */
    List<ComposeGood> findComposeGoodByComposeGood(ComposeGood composeGood);

    /**
     * 根据小分类id查询所有符合的商品
     *
     * @param classifyId 小分类id
     * @return 商品列表
     */
    List<ComposeGood> findMainComposeGoodByClassifyId(Long classifyId);

    /**
     * 根据小类id 和分页排序信息查询
     *
     * @param classifyId     id
     * @param pageInfoResult 分页类信息
     * @return
     */
    List<ComposeGood> findAllComposeGoodByClassifyIdForPage(Long classifyId, PageInfoResult pageInfoResult, String likeName);
}

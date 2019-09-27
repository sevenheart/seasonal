package com.seasonal.mapper;

import com.seasonal.page.PageInfoResult;
import com.seasonal.pojo.ComposeGood;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ComposeGoodMapper {

    /**
     * 根据小类id 和分页排序信息查询 和模糊查找
     *
     * @param classifyId     id
     * @param pageInfoResult 分页类信息
     * @param likeName       模糊查找
     * @return composeGood类对象
     */
    List<ComposeGood> findAllComposeGoodByClassifyIdForPage(Long classifyId, PageInfoResult pageInfoResult, String likeName);

    /**
     * 根据id查询商品详细信息
     *
     * @param id id
     * @return 商品详细信息
     */
    ComposeGood findComposeGoodByID(Long id);

    List<ComposeGood> findMainComposeGoodByClassifyId(Long classifyId);

    /**
     * g根据销量返回商品信息
     * @return
     */
    List<ComposeGood> findUpGoodsByNumber();

    /**
     * 修改商品的评论数量
     * @return
     */
    int addCommentNumber(String goodId);
}

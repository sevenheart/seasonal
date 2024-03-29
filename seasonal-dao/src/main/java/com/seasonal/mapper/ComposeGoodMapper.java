package com.seasonal.mapper;

import com.seasonal.page.PageInfoResult;
import com.seasonal.pojo.ComposeGood;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ComposeGoodMapper {

    ComposeGood eSfindComposeGoodByID(Integer id);

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
     * 查询所有的商品信息然后放到es中。
     * @return
     */
    List<ComposeGood> findAllComposeGood();


    /**
     * 根据id查询商品详细信息
     *
     * @param id id
     * @return 商品详细信息
     */
    ComposeGood findComposeGoodByID(Long id);

    List<ComposeGood> findMainComposeGoodByClassifyId(Long classifyId);

    /**
     * 根据销量返回商品信息
     * @return
     */
    List<ComposeGood> findUpGoodsByNumber();

    /**
     * 修改商品的评论数量
     * @return
     */
    int addCommentNumber(String goodId);


    /**
     * 根据商品id改变商品的是否处在秒杀状态
     * @param id 商品id
     * @return 修改个数
     */
    int updateGoodSkillType(Long id,Integer skillType);
}

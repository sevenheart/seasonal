package com.seasonal.mapper;

import com.seasonal.pojo.DetailedCommodityForm;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 订单的详细信息表mapper
 */
@Repository
public interface DetailedCommodityFormMapper {
    /**
     * 根据订单id查找订单的详细信息
     * @param orderId
     * @return
     */
    List<DetailedCommodityForm> findDetailFormBy(String orderId);

    /**
     * 数据库中插入详细的订单信息
     */
    int insertDetailCommodityForm(DetailedCommodityForm detailedCommodityForm);

    /**
     * 根据订单id和商品id修改评论状态和评论id
     * @param goodId
     * @param orderId
     * @return
     */
    int updateCommentStates (String goodId,String orderId,String commentId);
    /*修改详细商品信息为已支付未评论\
    *根据订单id
    * */
    int updateCommentStatesToNocomment(String orderId);

    /**
     * 根据用户id查找未评论的订单中的详细信息以及商品详细信息
     * @param userId
     * @return
     */
    List<DetailedCommodityForm> findNoCommentGoodsByUserId(String userId);
}

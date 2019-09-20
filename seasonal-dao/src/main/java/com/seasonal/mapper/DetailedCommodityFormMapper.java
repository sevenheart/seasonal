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
}

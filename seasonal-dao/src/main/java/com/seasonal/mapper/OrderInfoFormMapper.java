package com.seasonal.mapper;
import com.seasonal.pojo.OrderInfoForm;
import org.springframework.stereotype.Repository;

/**
 * 支付信息表的mapper
 * 与业务不相干
 */
@Repository
public interface OrderInfoFormMapper {
    /**
     * 保存支付成功后的支付信息
     * @param orderInfoForm
     * @return
     */
    int insertOrderInfo(OrderInfoForm orderInfoForm);
}

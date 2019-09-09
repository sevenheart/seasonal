package com.seasonal.mapper;

import com.seasonal.pojo.Good;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GoodMapper {
    /**
     * 根据Good中的参数动态查询
     *
     * @param good
     * @return 所有符合查询结果数据
     */
    List<Good> findGoodById(Good good);
}

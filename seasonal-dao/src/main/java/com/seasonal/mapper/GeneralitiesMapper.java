package com.seasonal.mapper;

import com.seasonal.pojo.Generalities;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GeneralitiesMapper {
    /**
     * 查询所有种类的信息
     * @return
     */
     List<Generalities> findAllGeneralities();
}

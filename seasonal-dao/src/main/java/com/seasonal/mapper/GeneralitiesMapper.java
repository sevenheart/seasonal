package com.seasonal.mapper;

import com.seasonal.pojo.Generalities;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GeneralitiesMapper {
    /**
     * 查询所有种类的信息
     *
     * @return
     */
    List<Generalities> findAllGeneralities();

    /**
     * 根据小类id查询他属于哪个大类
     *
     * @param id 小类id
     * @return 大类对象
     */
    Generalities findGeneralitiesByClassifyId(Long id);
}

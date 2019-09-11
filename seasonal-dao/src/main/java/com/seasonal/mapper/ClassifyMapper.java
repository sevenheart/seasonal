package com.seasonal.mapper;

import com.seasonal.pojo.Classify;
import com.seasonal.pojo.ComposeGood;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClassifyMapper {
    /**
     * 根据大类的id查询小类的全部数据
     *
     * @param generalitiesId 大类id
     * @return 小类全部数据
     */
    List<Classify> findAllByGeneralitiesId(Long generalitiesId);

    /**
     * 根据小类查询所有商品
     *
     * @param id 小类id
     * @return 商品集合
     */
    List<ComposeGood> findComposeGoodById(Integer id);

    /**
     * 根据商品id 查询属于类别
     * @param id 商品 id
     * @return 小类对象
     */
    Classify findClassifyByComposeGoodById(Long id);

}

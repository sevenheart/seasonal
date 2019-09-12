package com.seasonal.mapper;

import com.seasonal.pojo.ComposeGoodImg;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ComposeGoodImgMapper {

    /**
     * 根据固有商品id 和 图片类型 查询图片对象
     * @param composeGoodId id
     * @param imgType 图片类型（0：icon，1：img）
     * @return 图片对象
     */

    List<ComposeGoodImg> findComposeGoodImgByComposeGoodIdAndType(Long composeGoodId);
}

package com.seasonal.mapper;

import com.seasonal.pojo.ComposeGood;
import com.seasonal.pojo.ComposeGoodCollection;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;
@Repository
public interface ComposeGoodCollectionMapper {
    /**
     * 查找用户是否已收藏
     * @param userId
     * @param goodId
     * @return
     */
    ComposeGoodCollection selectCollection(String userId, String goodId);

    /**
     * 根据用户Id和商品Id添加收藏
     * @param userId
     * @param goodId
     * @return
     */
    int goodCollection(String userId, String goodId, Date currentTime);

    /**
     * 根据用户id查询所有收藏商品的详细信息
     * @param userId
     * @return
     */
    List<ComposeGoodCollection> selectAllCollectionById(String userId);

    /**
     * 根据用户Id和商品Id删除收藏
     * @param userId
     * @param goodId
     * @return
     */
    int deleteGoodCollection(String userId, String goodId);
}

package com.seasonal.service;

import com.seasonal.pojo.ComposeGood;

import com.seasonal.pojo.ComposeGoodCollection;
import com.seasonal.pojo.ESComposeGood;
import com.seasonal.pojo.SecKillRedis;

import java.sql.Time;
import java.util.List;
import java.util.Map;

public interface GoodsListService {
    /**
     * 根据小类id查询所有商品
     *
     * @param id 小类id
     * @return 查询到的商品
     */
    List<ComposeGood> showGoodsList(Long id, String orderName, int currPage, String likeName);

    /**
     * 查所有es中的数据
     *
     * @return
     */
    Iterable<ESComposeGood> selectAllEsGoods();

    /*删除es中的所有数据*/
    boolean deleteEsAllData();

    /*es添加数据*/
    boolean addEsAllData();

    /**
     * ElasticSearch完成搜索以及商品列表展示
     *
     * @param id        商品类别搜索，默认导航栏搜索
     * @param orderName 排序类型三种
     * @param currPage  希望显示的页
     * @param likeName  模糊查询的内容
     * @return
     */
    Map<String, Object> esShowGoodsList(int id, String orderName, int currPage, String likeName);

    /**
     * 根据时间获取秒杀key
     *
     * @param secKillTime 小时数
     * @return key
     */
    SecKillRedis findSecKillKeyByTime(String secKillTime);

    /**
     * 查找用户是否已收藏
     *
     * @param userId
     * @param goodId
     * @return
     */
    ComposeGoodCollection selectCollection(String userId, String goodId);

    /**
     * 根据用户Id和商品Id添加收藏
     *
     * @param userId
     * @param goodId
     * @return
     */
    int goodCollection(String userId, String goodId);

    /**
     * 根据用户id查询所有收藏商品的详细信息
     *
     * @param userId
     * @return
     */
    List<ComposeGoodCollection> selectAllCollectionById(String userId);

    /**
     * 根据用户Id和商品Id添加收藏
     *
     * @param userId
     * @param goodId
     * @return
     */
    int deleteGoodCollection(String userId, String goodId);


    /**
     * 根据商品id改变商品的是否处在秒杀状态
     *
     * @param id 商品id
     * @return 修改个数
     */
    int updateGoodSkillType(Long id, Integer skillType);
}

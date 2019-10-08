package com.seasonal.service.impl;

import com.seasonal.mapper.ComposeGoodCollectionMapper;
import com.seasonal.mapper.ComposeGoodMapper;
import com.seasonal.page.PageInfoResult;
import com.seasonal.pojo.ComposeGood;
import com.seasonal.mapper.SecKillRedisMapper;
import com.seasonal.pojo.ComposeGoodCollection;
import com.seasonal.pojo.ESComposeGood;
import com.seasonal.pojo.SecKillRedis;
import com.seasonal.service.ESComposeGoodResitory;
import com.seasonal.service.GoodsListService;
import org.apache.ibatis.jdbc.Null;
import org.apache.lucene.util.packed.PackedLongValues;
import org.bouncycastle.util.Arrays;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.sort.FieldSortBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.elasticsearch.core.query.NativeSearchQueryBuilder;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class GoodsListServiceImpl implements GoodsListService {

    private final ComposeGoodMapper composeGoodMapper;
    private final SecKillRedisMapper secKillRedisMapper;
    private final ComposeGoodCollectionMapper composeGoodCollectionMapper;
    private final ESComposeGoodResitory esComposeGoodResitory;
    @Autowired
    public GoodsListServiceImpl(ComposeGoodMapper composeGoodMapper, SecKillRedisMapper secKillRedisMapper, ComposeGoodCollectionMapper composeGoodsCollectionMapper,ESComposeGoodResitory esComposeGoodResitory) {
        this.composeGoodMapper = composeGoodMapper;
        this.secKillRedisMapper = secKillRedisMapper;
        this.composeGoodCollectionMapper = composeGoodsCollectionMapper;
        this.esComposeGoodResitory = esComposeGoodResitory;
    }


    @Override
    public List<ComposeGood> showGoodsList(Long id, String orderName, int currPage, String likeName) {
        PageInfoResult pageInfoResult = new PageInfoResult();
        pageInfoResult.setOrderName(orderName);
        pageInfoResult.setCurrPage(currPage);
        pageInfoResult.setKeyPage((currPage - 1) * pageInfoResult.getPageSize());
        return composeGoodMapper.findAllComposeGoodByClassifyIdForPage(id, pageInfoResult,likeName);
    }

    @Override
    public Iterable<ESComposeGood> selectAllEsGoods() {
        Iterable<ESComposeGood> Iterablelist ;
        Iterablelist = esComposeGoodResitory.findAll();
        while (Iterablelist.iterator().hasNext()){

            System.out.println("es中的值是"+Iterablelist.iterator().next().toString());
        }

        return Iterablelist;
    }

    @Override
    public boolean deleteEsAllData() {
        esComposeGoodResitory.deleteAll();
        return false;
    }

    @Override
    public boolean addEsAllData() {
        System.out.println("es中没有值，开始插入值。。。。");
        List<ComposeGood> list = composeGoodMapper.findAllComposeGood();
        System.out.println(list.size());
        List<ESComposeGood> esComposeGoodList = new ArrayList<>();
        for(int i=0;i<list.size();i++){
            esComposeGoodList.add(new ESComposeGood(list.get(i).getId(),list.get(i).getComposeGoodName(),list.get(i).getComposeGoodPrice(),(long) list.get(i).getComposeGoodType(),list.get(i).getComposeGoodStatus(),list.get(i).getComposeGoodWeight(),list.get(i).getComposeGoodIcon(),list.get(i).getComposeGoodSales(),list.get(i).getCommentNumber(),list.get(i).getComposeGoodDescribe()));
            System.out.println(list.get(i).toString());
        }
        esComposeGoodResitory.saveAll(esComposeGoodList);
        return true;
    }

    @Override
    public Map<String,Object> esShowGoodsList(int id, String orderName, int currPage, String likeName) {
        // 构建查询条件
            NativeSearchQueryBuilder queryBuilder = new NativeSearchQueryBuilder();

            //不是按照分类查找的
            // 添加基本分词查询
            if(id==0) {
                //id等于0加入条件查询
                //输入了查询条件才加入
                if(likeName!="") {
                    //按条件查询
                    queryBuilder.withQuery(QueryBuilders.matchQuery("composeGoodName", likeName));
                }
                else{
                    //查找所有上架的商品
                   queryBuilder.withQuery(QueryBuilders.termQuery("composeGoodStatus",1));
                }
            }else{
                //不是通过搜索查询了
                //根据商品种类查
                queryBuilder.withQuery(QueryBuilders.termQuery("composeGoodType",id));
            }
        //添加排序条件
        queryBuilder.withSort(new FieldSortBuilder(orderName));
            System.out.println("传入的页数是"+currPage);
            if(currPage-1<0) currPage=1;
            // 设置分页属性：
            int page = currPage-1;
            int size = 8;
            queryBuilder.withPageable(PageRequest.of(page, size));
            // 搜索，获取结果
            Page<ESComposeGood> items = this.esComposeGoodResitory.search(queryBuilder.build());
            // 总条数
            long total = items.getTotalElements();
            System.out.println("总条数 = " + total);
            // 总页数
            System.out.println("总页数 = " + items.getTotalPages());
            // 当前页
            System.out.println("当前页：" + items.getNumber());
            // 每页大小
            System.out.println("每页大小：" + items.getSize());
            //如果输入的下一页页数大于总页数就返回最后一页数据
            if(currPage>items.getTotalPages()&&items.getTotalPages()!=0){
                System.out.println("输入的下一页 大于总页数返回最后一页");
                page=items.getTotalPages()-1;
                queryBuilder.withPageable(PageRequest.of(page, size));
                // 搜索，获取结果
                items = this.esComposeGoodResitory.search(queryBuilder.build());
                // 总条数
            }


            for (ESComposeGood item : items) {
                System.out.println(item);
            }
            Map<String,Object> map = new HashMap<>();
            map.put("allpage",items.getTotalPages());
            map.put("resultlist",items);
            map.put("currentpage",items.getNumber());
           // esComposeGoodResitory.deleteById((long)7);

            return map ;
    }

    @Override
    public SecKillRedis findSecKillKeyByTime(String secKillTime) {
        return secKillRedisMapper.findSecKillKeyByDate(secKillTime);
    }

    @Override
    public ComposeGoodCollection selectCollection(String userId, String goodId) {
        ComposeGoodCollection composeGoodCollection = composeGoodCollectionMapper.selectCollection(userId,goodId);
        return composeGoodCollection;
    }

    /**
     * 用户收藏信息保存
     * @param userId
     * @param goodId
     * @return
     */
    @Override
    public int goodCollection(String userId, String goodId) {
        //获取当前时间
        Date currentTime = new Date(System.currentTimeMillis());
        int num = composeGoodCollectionMapper.goodCollection(userId,goodId,currentTime);
        return num;
    }

    @Override
    public List<ComposeGoodCollection> selectAllCollectionById(String userId) {
        return composeGoodCollectionMapper.selectAllCollectionById(userId);
    }

    @Override
    public int deleteGoodCollection(String userId, String goodId) {
        int num = composeGoodCollectionMapper.deleteGoodCollection(userId,goodId);
        return num;
    }
}

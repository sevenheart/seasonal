package com.seasonal.controller;

import com.seasonal.annotation.Intercept;
import com.seasonal.pojo.ComposeGood;
import com.seasonal.pojo.ComposeGoodCollection;
import com.seasonal.service.DetailGoodService;
import com.seasonal.service.GoodsListService;
import com.seasonal.service.MainService;
import com.seasonal.pojo.SecKillRedis;
import com.seasonal.redis.RedisUtil;
import com.seasonal.vo.ResultUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.util.Calendar;
import java.util.List;

@Controller
public class MainGoodController {

    private final MainService mainService;

    private final GoodsListService goodsListService;

    private final RedisUtil redisUtil;

    private final DetailGoodService detailGoodService;

    @Autowired
    public MainGoodController(MainService mainService, GoodsListService goodsListService, RedisUtil redisUtil, DetailGoodService detailGoodService) {
        this.mainService = mainService;
        this.goodsListService = goodsListService;
        this.redisUtil = redisUtil;
        this.detailGoodService = detailGoodService;
    }

    @RequestMapping(value = "MainGoodsRefresh")
    @ResponseBody
    public Object showMainGood() {
        System.out.println(mainService.mainGoodsInitialize());
        return mainService.mainGoodsInitialize();
    }

    @RequestMapping(value = "ShowGoodsList")
    @ResponseBody
    public List<ComposeGood> showGoodsList(int id, String orderName, int currPage, String likeName) {
        likeName = "%" + likeName + "%";
        return goodsListService.showGoodsList((long) id, orderName, currPage, likeName);
    }

    @RequestMapping(value = "ShowSecKillGood")
    @ResponseBody
    public Object showSecKillGood(Boolean flag) {
        String key = secKillTimeKey(flag);
        if ("".equals(key)) {
            return ResultUtil.fail("当前时间段没有秒杀商品");
        } else {
            return secKillGoodsList(key);
        }
    }

    /**
     * 根据当前时间的小时数查询在数据库中加一小时对应的秒杀集合key
     *
     * @param flag 查询现在正在秒杀 true 和 即将秒杀 false
     * @return 集合的key
     */
    private String secKillTimeKey(Boolean flag) {
        String secKillTime = String.valueOf(Calendar.getInstance().get(Calendar.HOUR_OF_DAY));
        if (!flag) {
            secKillTime = String.valueOf((Integer.parseInt(secKillTime) + 1));
        }
        SecKillRedis secKillRedis = goodsListService.findSecKillKeyByTime(secKillTime);
        if (secKillRedis == null) {
            return "";
        }
        return secKillRedis.getSecKillKey();
    }

    /**
     * 根据Key获取Redis中的秒杀信息
     *
     * @param key 集合对应的key
     * @return 秒杀数据集合
     */
    private Object secKillGoodsList(String key) {
        redisUtil.setHash();
        if (redisUtil.get(key) != null) {
            return ResultUtil.success(redisUtil.get(key));
        }
        return ResultUtil.fail("Redis中没有秒杀商品");
    }

    @RequestMapping(value = "ShowDetailGood")
    @ResponseBody
    public Object showDetailGood(Long id) {
        System.out.println(id);
        return detailGoodService.findComposeGoodById(id);
    }

    /**
     * 根据用户id和商品id查找该商品是否已收藏
     * @param userId
     * @param goodId
     * @return
     */
    @RequestMapping(value = "selectCollection")
    @ResponseBody
    @Intercept
    public Object selectCollection(String userId,String goodId) {
        ComposeGoodCollection composeGoodCollection = goodsListService.selectCollection(userId,goodId);
        if (composeGoodCollection == null){
            return ResultUtil.success("可以收藏");
        } else {
            return ResultUtil.fail(100,"已经收藏过了");
        }
    }

    /**
     * 添加收藏
     * @param userId
     * @param goodId
     * @return
     */
    @RequestMapping(value = "GoodCollection")
    @ResponseBody
    public Object goodCollection(String userId,String goodId) {
        int num = goodsListService.goodCollection(userId,goodId);
        if (num > 0){
            return ResultUtil.success("收藏成功");
        } else {
            return ResultUtil.fail(100,"收藏失败");
        }
    }

    /**
     * 根据用户id和商品id查找该商品是否已收藏
     * @param userId
     * @return
     */
    @RequestMapping(value = "selectAllCollectionById")
    @ResponseBody
    @Intercept
    public Object selectAllCollectionById(String userId) {
        List<ComposeGoodCollection> composeGoodCollections = goodsListService.selectAllCollectionById(userId);
        composeGoodCollections.forEach(System.out::println);
        if (composeGoodCollections != null && composeGoodCollections.size() > 0){
            return ResultUtil.success(composeGoodCollections);
        } else {
            return ResultUtil.fail(100,"您还没有收藏哟！");
        }
    }

    /**
     * 删除收藏
     * @param userId
     * @param goodId
     * @return
     */
    @RequestMapping(value = "DeleteGoodCollection")
    @ResponseBody
    public Object deleteGoodCollection(String userId,String goodId) {
        int num = goodsListService.deleteGoodCollection(userId,goodId);
        if (num > 0){
            return ResultUtil.success("删除成功");
        } else {
            return ResultUtil.fail(100,"删除失败");
        }
    }

}

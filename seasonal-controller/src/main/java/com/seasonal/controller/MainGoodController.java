package com.seasonal.controller;

import com.seasonal.annotation.Intercept;
import com.seasonal.pojo.ComposeGood;
import com.seasonal.pojo.ComposeGoodCollection;
import com.seasonal.pojo.ESComposeGood;
import com.seasonal.service.DetailGoodService;
import com.seasonal.service.GoodsListService;
import com.seasonal.service.MainService;
import com.seasonal.pojo.SecKillRedis;
import com.seasonal.redis.RedisUtil;
import com.seasonal.sender.UserActionLogSender;
import com.seasonal.service.SecKillService;
import com.seasonal.vo.ResultData;
import com.seasonal.vo.ResultUtil;
import com.sun.org.apache.bcel.internal.generic.RETURN;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
public class MainGoodController {

    private final MainService mainService;
    private final GoodsListService goodsListService;
    private final DetailGoodService detailGoodService;
    private final SecKillService seckillService;
    private final UserActionLogSender userActionLogSender;
    private final RedisUtil redisUtil;

    @Autowired
    public MainGoodController(MainService mainService, GoodsListService goodsListService, SecKillService seckillService, RedisUtil redisUtil, DetailGoodService detailGoodService, UserActionLogSender userActionLogSender) {
        this.mainService = mainService;
        this.goodsListService = goodsListService;
        this.redisUtil = redisUtil;
        this.detailGoodService = detailGoodService;
        this.seckillService = seckillService;
        this.userActionLogSender = userActionLogSender;
    }

    @RequestMapping(value = "MainGoodsRefresh")
    @ResponseBody
    public Object showMainGood() {
        return mainService.mainGoodsInitialize();
    }
    /*删除es中所有数据*/
    @RequestMapping(value = "deleteesalldata")
    @ResponseBody
    public Object deletealldata() {
        goodsListService.deleteEsAllData();
       return null;
    }
    /*添加es中所有数据*/
    @RequestMapping(value = "Addesdata")
    @ResponseBody
    public Object addEsDate() {
        goodsListService.addEsAllData();
        return null;
    }
    /*查看es中所有数据*/
    @RequestMapping(value = "Seleteesdata")
    @ResponseBody
    public Object selctesdata() {
        goodsListService.selectAllEsGoods();
        return null;
    }

    @RequestMapping(value = "ShowGoodsList")
    @ResponseBody
    public List<ComposeGood> showGoodsList(int id, String orderName, int currPage, String likeName) {
        likeName = "%" + likeName + "%";
        return goodsListService.showGoodsList((long) id, orderName, currPage, likeName);
    }

    /**
     * ElasticSearch完成搜索以及商品列表展示
     * @param id   商品类别搜索，默认导航栏搜索
     * @param orderName 排序类型三种
     * @param currPage 希望显示的页
     * @param likeName  模糊查询的内容
     * @return
     */
    @RequestMapping(value = "ESShowGoodsList")
    @ResponseBody
    public Map<String,Object> esShowGoodsList(int id, String orderName, int currPage, String likeName){

        System.out.println(id+orderName+currPage+likeName);
        Map<String,Object> map = goodsListService.esShowGoodsList(id,orderName,currPage,likeName);
        return  map;
    }


    @RequestMapping(value = "ShowSecKillGood")
    @ResponseBody
    public Object showSecKillGood(Boolean flag) {
        String key = secKillkey(flag);

        if (flag) {
            if ("1".equals(key)) {
                return ResultUtil.fail(100, "当前时间段没有秒杀商品。");
            } else {
                return ResultUtil.success(seckillService.findAllSecKillGood(key));
            }
        } else {
            if ("0".equals(key)) {
                return ResultUtil.fail(101, "本日秒杀已经没有下一轮。");
            } else {
                return 0;
            }
        }
    }

    /**
     * 根据当前时间的小时数获取秒杀的商品时间
     *
     * @param flag true 获取即将秒杀 false 获取当前秒杀
     * @return 返回对应时间
     */
    private String secKillkey(boolean flag) {
        String[] time = {"00", "08", "12", "16", "20", "24"};
        int reTime = Integer.parseInt(String.valueOf(Calendar.getInstance().get(Calendar.HOUR_OF_DAY)));
        String newSeckHour = "";
        String seckHour = "";
        for (String indexTime : time) {
            newSeckHour = indexTime;
            if (Integer.parseInt(indexTime) > reTime) {
                break;
            }
            seckHour = indexTime;
        }
        Calendar calendar = Calendar.getInstance();
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

        if (!"24".equals(newSeckHour) && flag) {
            return dateFormat.format(calendar.getTime()) + " " + newSeckHour + ":00:00";
        } else if ("24".equals(newSeckHour) && flag) {
            return "1"; //即将开抢无商品
        } else if (!"00".equals(seckHour)) {
            return dateFormat.format(calendar.getTime()) + " " + seckHour + ":00:00";
        } else {
            return "0"; //当前抢购无商品
        }
    }

//    /**
//     * 根据Key获取Redis中的秒杀信息
//     *
//     * @param key 集合对应的key
//     * @return 秒杀数据集合
//     */
//    private Object secKillGoodsList(String key) {
//        redisUtil.setHash();
//        if (redisUtil.get(key) != null) {
//            return ResultUtil.success(redisUtil.get(key));
//        }
//        return ResultUtil.fail("Redis中没有秒杀商品");
//    }

    @RequestMapping(value = "ShowDetailGood")
    @ResponseBody
    public Object showDetailGood(Long id, String userId) {
        System.out.println(id);
        ComposeGood composeGood = detailGoodService.findComposeGoodById(id);
        Map<String, ComposeGood> browseRecord = new HashMap<>();
        browseRecord.put(userId, composeGood);
        userActionLogSender.sendBrowseForCode(browseRecord);
        return composeGood;
    }

    /**
     * 根据销量推送商品
     *
     * @return
     */
    @RequestMapping(value = "FindUpGoodsByNumber")
    @ResponseBody
    public ResultData findUpGoodsByNumber() {
        ResultData resultData = new ResultData();
        List<ComposeGood> list = detailGoodService.showGoodsBySales();
        list = list.subList(0, 3);
        if (list.size() > 0) {
            resultData.setCode(200);
            resultData.setData(list);
            resultData.setMessage("推荐商品成功！");
            return resultData;
        }
        return resultData;
    }


    /**
     * 根据用户id和商品id查找该商品是否已收藏
     *
     * @param userId
     * @param goodId
     * @return
     */
    @RequestMapping(value = "selectCollection")
    @ResponseBody
    public Object selectCollection(String userId, String goodId) {
        ComposeGoodCollection composeGoodCollection = goodsListService.selectCollection(userId, goodId);
        if (composeGoodCollection == null) {
            return ResultUtil.success("可以收藏");
        } else {
            return ResultUtil.fail(100, "已经收藏过了");
        }
    }

    /**
     * 添加收藏
     *
     * @param userId
     * @param goodId
     * @return
     */
    @RequestMapping(value = "GoodCollection")
    @ResponseBody
    public Object goodCollection(String userId, String goodId) {
        int num = goodsListService.goodCollection(userId, goodId);
        if (num > 0) {
            return ResultUtil.success("收藏成功");
        } else {
            return ResultUtil.fail(100, "收藏失败");
        }
    }

    /**
     * 根据用户id和商品id查找该商品是否已收藏
     *
     * @param userId
     * @return
     */
    @RequestMapping(value = "selectAllCollectionById")
    @ResponseBody
    @Intercept
    public Object selectAllCollectionById(String userId) {
        List<ComposeGoodCollection> composeGoodCollections = goodsListService.selectAllCollectionById(userId);
        if (composeGoodCollections != null && composeGoodCollections.size() > 0) {
            return ResultUtil.success(composeGoodCollections);
        } else {
            return ResultUtil.fail(100, "您还没有收藏哟！");
        }
    }

    /**
     * 删除收藏
     *
     * @param userId
     * @param goodId
     * @return
     */
    @RequestMapping(value = "DeleteGoodCollection")
    @ResponseBody
    public Object deleteGoodCollection(String userId, String goodId) {
        int num = goodsListService.deleteGoodCollection(userId, goodId);
        if (num > 0) {
            return ResultUtil.success("删除成功");
        } else {
            return ResultUtil.fail(100, "删除失败");
        }
    }

}

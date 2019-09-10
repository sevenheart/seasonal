package com.seasonal.controller;

import com.seasonal.pojo.ComposeGood;
import com.seasonal.pojo.SecKillGood;
import com.seasonal.redis.RedisUtil;
import com.seasonal.service.GoodsListService;
import com.seasonal.service.MainService;
import net.sf.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class MainGoodController {

    private final MainService mainService;
    private final GoodsListService goodsListService;
    private final RedisUtil redisUtil;

    @Autowired
    public MainGoodController(MainService mainService, GoodsListService goodsListService, RedisUtil redisUtil) {
        this.mainService = mainService;
        this.goodsListService = goodsListService;
        this.redisUtil = redisUtil;
    }

    @RequestMapping(value = "MainGoodsRefresh")
    @ResponseBody
    public Object showMainGood() {
        return mainService.mainGoodsInitialize();
    }

    @RequestMapping(value = "ShowGoodsList")
    @ResponseBody
    public List<ComposeGood> showGoodsList(int id, String orderName, int currPage, String likeName) {
        likeName = "%" + likeName + "%";
        return goodsListService.showGoodsList((long) id, orderName, currPage, likeName);
    }

    public Object secKillGoodsList(String key) {
        redisUtil.setHash();
        if (redisUtil.get(key) != null) {
            return redisUtil.get(key);
        }
        return "";
    }
}

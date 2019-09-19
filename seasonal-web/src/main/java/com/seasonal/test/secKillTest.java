package com.seasonal.test;

import com.seasonal.pojo.ComposeGood;
import com.seasonal.redis.RedisUtil;

import java.util.List;

public class secKillTest {
    public static void main(String[] args) {

    }

    static void addSecKillGood(List<ComposeGood> composeGoodList, String key) {
        RedisUtil redisUtil = new RedisUtil();
        redisUtil.setHash();
        redisUtil.set(key, composeGoodList);
    }
}

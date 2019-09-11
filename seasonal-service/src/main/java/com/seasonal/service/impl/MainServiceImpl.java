package com.seasonal.service.impl;

import com.seasonal.mapper.GeneralitiesMapper;
import com.seasonal.redis.RedisUtil;
import com.seasonal.service.MainService;
import net.sf.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MainServiceImpl implements MainService {

    private final GeneralitiesMapper mainGoodRefresh;
    private final RedisUtil redisUtil;

    @Autowired
    public MainServiceImpl(GeneralitiesMapper mainGoodRefresh, RedisUtil redisUtil) {
        this.mainGoodRefresh = mainGoodRefresh;
        this.redisUtil = redisUtil;
    }

    @Override
    public Object mainGoodsInitialize() {
        redisUtil.setHash();
        if (redisUtil.get("main") != null) {
            return redisUtil.get("main");
        }
        JSONArray jsonArray = JSONArray.fromObject(mainGoodRefresh.findAllGeneralities());
        redisUtil.set("main", jsonArray.toString());
<<<<<<< HEAD
        return mainGoodRefresh.findAllGeneralities();
=======
        return jsonArray;
>>>>>>> 505e4b3610889e049814d844c8490d97d4e49dfe
    }
}

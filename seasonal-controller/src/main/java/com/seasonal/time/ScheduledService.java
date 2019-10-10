package com.seasonal.time;

import com.seasonal.pojo.SecKillGood;
import com.seasonal.redis.RedisUtil;
import com.seasonal.service.GoodsListService;
import com.seasonal.service.SecKillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Iterator;
import java.util.List;

@Component
@Configuration
@EnableScheduling
public class ScheduledService {

    private final SecKillService secKillService;
    private final GoodsListService goodsListService;
    private final RedisUtil redisUtil;

    @Autowired
    public ScheduledService(SecKillService secKillService, GoodsListService goodsListService, RedisUtil redisUtil) {
        this.secKillService = secKillService;
        this.goodsListService = goodsListService;
        this.redisUtil = redisUtil;
    }


    @Scheduled(cron = "0 0 6,10,14,18,22 * * *")
    private void sckill() {
        int reTime = Integer.parseInt(String.valueOf(Calendar.getInstance().get(Calendar.HOUR_OF_DAY)));
        int newReTime;
        Calendar calendar = Calendar.getInstance();
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        String newTime = dateFormat.format(calendar.getTime()) + " " + reTime + ":00:00";
        if (reTime == 22) {
            newReTime = 18;
            String time = dateFormat.format(calendar.getTime()) + " " + newReTime + ":00:00";
            skillGoodDown(time);
        } else if (reTime != 6) {
            newReTime = reTime - 4;
            String time = dateFormat.format(calendar.getTime()) + " " + newReTime + ":00:00";
            skillGoodDown(time);
        }
        List<SecKillGood> secKillGoodsNew = secKillService.findAllSecKillGood(newTime);
        for (SecKillGood secKillGood : secKillGoodsNew) {
            Long id = secKillGood.getGoodId();
            goodsListService.updateGoodSkillType(id, 1);
            redisUtil.set(id.toString(), 100, (long) 4 * 60 * 60);
        }
    }

    /**
     * 根据传入的时间 更改其该时间秒杀的商品的商品秒杀状态
     *
     * @param time 时间
     */
    private void skillGoodDown(String time) {
        List<SecKillGood> secKillGoodsNew = secKillService.findAllSecKillGood(time);
        for (SecKillGood secKillGood : secKillGoodsNew) {
            Long id = secKillGood.getGoodId();
            goodsListService.updateGoodSkillType(id, 0);
        }
    }
}

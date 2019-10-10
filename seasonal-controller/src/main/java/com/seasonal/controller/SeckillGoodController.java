package com.seasonal.controller;

import com.seasonal.pojo.DetailedCommodityForm;
import com.seasonal.pojo.OrderForm;
import com.seasonal.pojo.SecKillGood;
import com.seasonal.pojo.SeckillOrder;
import com.seasonal.randompass.RandomAccountPassword;
import com.seasonal.redis.RedisUtil;
import com.seasonal.sender.SeckillSender;
import com.seasonal.service.SecKillService;
import com.seasonal.vo.ResultData;
import com.seasonal.vo.ResultUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.math.BigDecimal;
import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.Calendar;

@Controller
public class SeckillGoodController {

    private final SecKillService seckillService;
    private final RedisUtil redisUtil;
    private final SeckillSender seckillSender;

    public SeckillGoodController(SecKillService secKillService, RedisUtil redisUtil, SeckillSender seckillSender) {
        this.seckillService = secKillService;
        this.redisUtil = redisUtil;
        this.seckillSender = seckillSender;
    }


    @RequestMapping(value = "ShowSecKillGood")
    @ResponseBody
    public ResultData showSecKillGood(Boolean flag) {
        String key = secKillkey(flag);

        if (flag) {
            if ("1".equals(key)) {
                return ResultUtil.fail(101, "本日秒杀已经没有下一轮。");
            } else {
                return ResultUtil.success(seckillService.findAllSecKillGood(key));
            }
        } else {
            if ("0".equals(key)) {
                return ResultUtil.fail(100, "当前时间段没有秒杀商品。");
            } else {
                return ResultUtil.success(seckillService.findAllSecKillGood(key));
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
        String[] time = {"00", "06", "10", "14", "18", "22"};
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

        if (!"22".equals(newSeckHour) && flag) {
            return dateFormat.format(calendar.getTime()) + " " + newSeckHour + ":00:00";
        } else if ("22".equals(newSeckHour) && flag) {
            return "1"; //即将开抢无商品
        } else if (!"00".equals(seckHour)) {
            return dateFormat.format(calendar.getTime()) + " " + seckHour + ":00:00";
        } else {
            return "0"; //当前抢购无商品
        }
    }

    @RequestMapping(value = "seckillGood")
    @ResponseBody
    public ResultData seckillGood(@RequestBody OrderForm orderForm) {

        SecKillGood secKillGood = seckillService.findPriceById((long) orderForm.getGoodId());
        Integer num;
        synchronized (RedisUtil.class) {
            num = Integer.parseInt(String.valueOf(redisUtil.get(String.valueOf(orderForm.getGoodId()))));
            if (num != null && num > 0) {
                num--;
                redisUtil.set(String.valueOf(orderForm.getGoodId()), num);
            } else {
                return ResultUtil.fail(orderForm.getGoodId() + "商品数量不够");
            }
        }

        orderForm.setOrderStatus(0);
        orderForm.setOrderMoney(secKillGood.getSeckillPrice());
        orderForm.setDeliveryWay(0);
        orderForm.setDeliveryMoney(new BigDecimal(0));
        orderForm.setGetPassword(RandomAccountPassword.genRandomNum(6));
        orderForm.setGetAccount(RandomAccountPassword.genRandomNum(6));
        orderForm.setUpdateTime(new Date(System.currentTimeMillis()));
        orderForm.setCreateTime(new Date(System.currentTimeMillis()));

        DetailedCommodityForm detailedCommodityForm = new DetailedCommodityForm();
        detailedCommodityForm.setOrderId(orderForm.getOrderId());
        detailedCommodityForm.setGoodId(String.valueOf(orderForm.getGoodId()));
        detailedCommodityForm.setGoodCount(1);
        detailedCommodityForm.setUserId(orderForm.getOrderUserId());
        detailedCommodityForm.setCommodityMoney(secKillGood.getSeckillPrice());
        detailedCommodityForm.setCreateTime(new Date(System.currentTimeMillis()));
        detailedCommodityForm.setUpdateTime(new Date(System.currentTimeMillis()));


        SeckillOrder seckillOrder = new SeckillOrder();
        seckillOrder.setDetailedCommodityForml(detailedCommodityForm);
        seckillOrder.setOrderForm(orderForm);
        seckillSender.sendSeckillOrderForCode(seckillOrder);

        return ResultUtil.success(orderForm.getOrderId());
    }
}

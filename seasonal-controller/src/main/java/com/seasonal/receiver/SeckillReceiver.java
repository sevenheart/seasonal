package com.seasonal.receiver;

import com.seasonal.pojo.DetailedCommodityForm;
import com.seasonal.pojo.SeckillOrder;
import com.seasonal.service.OrderFormService;
import com.seasonal.service.SecKillService;
import com.seasonal.vo.ResultUtil;
import org.springframework.amqp.rabbit.annotation.RabbitHandler;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@RabbitListener(queues = "seckillQueue")
public class SeckillReceiver {

    private final OrderFormService orderFormService;

    private final SecKillService secKillService;

    public SeckillReceiver(OrderFormService orderFormService, SecKillService secKillService) {
        this.orderFormService = orderFormService;
        this.secKillService = secKillService;
    }


    @RabbitHandler
    public void seckillOrderMessage(SeckillOrder seckillOrder) {


        List<DetailedCommodityForm> detailedCommodityForms = new ArrayList<>();
        detailedCommodityForms.add(seckillOrder.getDetailedCommodityForml());

        /**
         * 执行事务与返回逻辑
         */
        if (orderFormService.insertOrderForm(seckillOrder.getOrderForm(), detailedCommodityForms) != 0) {
            System.out.println("插入秒杀订单成功");

        } else {
            System.out.println("插入秒杀订单失败");
        }

    }
}

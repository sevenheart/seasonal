package com.seasonal.sender;

import com.seasonal.pojo.SeckillOrder;
import com.seasonal.rabbit.RabbitMqEnum;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.connection.CorrelationData;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.UUID;

@Component
public class SeckillSender implements RabbitTemplate.ConfirmCallback, RabbitTemplate.ReturnCallback {


    private RabbitTemplate rabbitTemplate;

    @Autowired
    SeckillSender(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
        rabbitTemplate.setConfirmCallback(this);
        rabbitTemplate.setReturnCallback(this);
    }

    public void sendSeckillOrderForCode(SeckillOrder seckillOrder) {

        CorrelationData correlationData = new CorrelationData(UUID.randomUUID().toString());

        // 将包含有秒杀信息的pojo发送到 TOPIC_ORDER_EXCHANGE 队列
        this.rabbitTemplate.convertAndSend(RabbitMqEnum.Exchange.TOPIC_ORDER_EXCHANGE.getCode(),
                "good.seckill." + new Date(), seckillOrder, correlationData);
    }

    @Override
    public void confirm(CorrelationData correlationData, boolean b, String s) {

    }

    @Override
    public void returnedMessage(Message message, int i, String s, String s1, String s2) {

    }
}

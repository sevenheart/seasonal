package com.seasonal.sender;

import com.seasonal.pojo.ComposeGood;
import com.seasonal.pojo.LoginFrom;
import com.seasonal.rabbit.RabbitMqEnum;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.connection.CorrelationData;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.Map;
import java.util.UUID;

@Component
public class UserActionLogSender implements RabbitTemplate.ConfirmCallback, RabbitTemplate.ReturnCallback {

    private RabbitTemplate rabbitTemplate;

    @Autowired
    UserActionLogSender(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
        rabbitTemplate.setConfirmCallback(this);
        rabbitTemplate.setReturnCallback(this);
    }

    public void sendMessageForCode(String userId) {

        CorrelationData correlationData = new CorrelationData(UUID.randomUUID().toString());

        // 将电话号码，经directExchange交换机并发送到routing_key为messageCode的队列中
        this.rabbitTemplate.convertAndSend(RabbitMqEnum.Exchange.TOPIC_EXCHANGE.getCode(),
                "action.log." + new Date() , userId, correlationData);
    }

    public void sendBrowseForCode(Map<String, ComposeGood> browseRecord) {

        CorrelationData correlationData = new CorrelationData(UUID.randomUUID().toString());

        // 将电话号码，经directExchange交换机并发送到routing_key为messageCode的队列中
        this.rabbitTemplate.convertAndSend(RabbitMqEnum.Exchange.TOPIC_EXCHANGE.getCode(),
                "action.log." + new Date() , browseRecord, correlationData);
    }


    @Override
    public void confirm(CorrelationData correlationData, boolean ack, String cause) {
        /*try {
            Thread.sleep(10000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }*/


        //System.out.println("info----" + correlationData);
        //System.out.println("info----" + cause);
    }

    @Override
    public void returnedMessage(Message message, int replyCode, String replyText, String exchange, String routingKey) {
        System.out.println("info----233" + routingKey);
    }
}

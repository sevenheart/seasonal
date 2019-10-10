package com.seasonal.service.sender;

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
public class UpdateSqlSender implements RabbitTemplate.ConfirmCallback,RabbitTemplate.ReturnCallback{


    private RabbitTemplate rabbitTemplate;

    @Autowired
    UpdateSqlSender(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
        rabbitTemplate.setConfirmCallback(this);
        rabbitTemplate.setReturnCallback(this);
    }
    public void sendSql(Map<Integer,String> sql) {

        CorrelationData correlationData = new CorrelationData(UUID.randomUUID().toString());

        // 将sql语句，经directExchange交换机并发送到routing_key为mysqlbinroutkey的队列中
        this.rabbitTemplate.convertAndSend(RabbitMqEnum.Exchange.DIRECT_EXCHANGE.getCode(),
                RabbitMqEnum.QueueKey.MYSQLBINLOG_DIRECT.getCode() , sql, correlationData);
    }

    @Override
    public void confirm(CorrelationData correlationData, boolean ack, String cause) {


        System.out.println(ack);
    }

    @Override
    public void returnedMessage(Message message, int replyCode, String replyText, String exchange, String routingKey) {
        System.out.println("失败了，没到达队列");
        System.out.println("info----" + routingKey);
    }
}

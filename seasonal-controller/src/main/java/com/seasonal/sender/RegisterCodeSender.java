package com.seasonal.sender;

import com.seasonal.pojo.LoginFrom;
import com.seasonal.rabbit.RabbitMqEnum;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.connection.CorrelationData;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Slf4j
@Component
public class RegisterCodeSender implements RabbitTemplate.ConfirmCallback,RabbitTemplate.ReturnCallback {


    private RabbitTemplate rabbitTemplate;

    @Autowired
    RegisterCodeSender(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
        rabbitTemplate.setConfirmCallback(this);
        rabbitTemplate.setReturnCallback(this);
    }

    public void sendMessageForCode(LoginFrom loginFrom) {
        CorrelationData correlationData = new CorrelationData(UUID.randomUUID().toString());
        // 将电话号码，经directExchange交换机并发送到routing_key为messageCode的队列中
        this.rabbitTemplate.convertAndSend(RabbitMqEnum.Exchange.DIRECT_EXCHANGE.getCode(),
                RabbitMqEnum.QueueKey.MESSAGE_CODE_DIRECT.getCode(), loginFrom, correlationData);
    }

    @Override
    public void confirm(CorrelationData correlationData, boolean ack, String cause) {
        if (ack) {
            log.info("(start)生产者消息确认=========================");
            log.info("correlationData:[{}]", correlationData);
            log.info("ack:[{}]", ack);
            log.info("cause:[{}]", cause);
            log.info("(end)生产者消息确认=========================");
        } else {
            log.info("消息可能未到达rabbitmq服务器");
        }
    }

    @Override
    public void returnedMessage(Message message, int replyCode, String replyText, String exchange, String routingKey) {
    }
}

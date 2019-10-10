package com.seasonal.service.sender;

import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.connection.CorrelationData;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class SeckillSender implements RabbitTemplate.ConfirmCallback, RabbitTemplate.ReturnCallback {
    private RabbitTemplate rabbitTemplate;

    @Autowired
    SeckillSender(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
        rabbitTemplate.setConfirmCallback(this);
        rabbitTemplate.setReturnCallback(this);
    }


    @Override
    public void confirm(CorrelationData correlationData, boolean b, String s) {

    }

    @Override
    public void returnedMessage(Message message, int i, String s, String s1, String s2) {

    }
}

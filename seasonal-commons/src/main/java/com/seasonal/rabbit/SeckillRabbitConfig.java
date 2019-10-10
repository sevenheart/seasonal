package com.seasonal.rabbit;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SeckillRabbitConfig {


    @Bean
    public Queue SeckillQueue() {
        return new Queue(RabbitMqEnum.QueueName.SECKILL_QUEUE.getCode(), false);
    }

    @Bean
    public TopicExchange createKillTopicExchange() {
        return new TopicExchange(RabbitMqEnum.Exchange.TOPIC_ORDER_EXCHANGE.getCode());
    }

    @Bean
    public Binding bindingQueueWithDirectExchange() {
        return BindingBuilder.bind(SeckillQueue()).to(createKillTopicExchange())
                .with(RabbitMqEnum.QueueKey.GOOD_SECKILL_TOPIC.getCode());
    }

}

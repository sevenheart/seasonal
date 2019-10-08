package com.seasonal.rabbit;

import org.springframework.amqp.core.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MessageCodeRabbitConfig {
    /**
     * 发送短信验证码队列
     * 构建队列，名称，是否持久化
     * @return
     */
    @Bean
    public Queue registerMessageCodeQueue() {
        System.out.println("------registerMessageCodeQueue------");
        return new Queue(RabbitMqEnum.QueueName.REGISTER_MESSAGE_CODE_QUEUE.getCode(), false);
    }

    /**
     * 直连交换机(模式)
     * 用于实例间的任务分发
     * 是一种带路由功能的交换机，一个队列会和一个交换机绑定，除此之外再绑定一个routing_key
     */
    @Bean
    public DirectExchange createDirectExchange() {
        return new DirectExchange(RabbitMqEnum.Exchange.DIRECT_EXCHANGE.getCode());
    }

    /**
     * 队列和直接交换机绑定
     * 并指定绑定的routing_key
     * @return
     */
    @Bean
    public Binding bindingQueueWithDirectExchange() {
        return BindingBuilder.bind(registerMessageCodeQueue()).to(createDirectExchange())
                .with(RabbitMqEnum.QueueKey.MESSAGE_CODE_DIRECT.getCode());
    }

}

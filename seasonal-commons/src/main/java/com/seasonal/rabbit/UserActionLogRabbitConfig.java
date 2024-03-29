package com.seasonal.rabbit;

import org.springframework.amqp.core.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class UserActionLogRabbitConfig {

    /**
     * 用户行为日志记录
     * 构建队列，名称，是否持久化
     * @return
     */
    @Bean
    public Queue userActionQueue() {
        return new Queue(RabbitMqEnum.QueueName.USER_ACTIVE_LOG_QUEUE.getCode(), false);
    }

    /**
     * 主题交换机(模式)
     * 用于实例间的任务分发
     * 是一种带路由功能的交换机，一个队列会和一个交换机绑定，除此之外再绑定一个routing_key
     */
    @Bean
    public TopicExchange createTopicExchange() {
        return new TopicExchange(RabbitMqEnum.Exchange.TOPIC_EXCHANGE.getCode());
    }

    /**
     * 队列和主题交换机绑定
     * 并指定绑定的routing_key
     * @return
     */
    @Bean
    public Binding bindingQueueWithTopicExchange() {
        return BindingBuilder.bind(userActionQueue()).to(createTopicExchange())
                .with(RabbitMqEnum.QueueKey.USER_ACTIVE_LOGS_TOPIC.getCode());
    }


    /**
     * author:陆旭
     * time：10/9
     */
    /*在这完成用来监听binlog的rabbitquence配置*/



    /*创建队列*/
    /**
     * 接受binlog的队列
     * 构建队列，名称，是否持久化
     * @return
     */
    @Bean
    public Queue binlogSqlQuence() {
        return new Queue(RabbitMqEnum.QueueName.MYSQLBINLOG_QUERY.getCode(), false);
    }
    /**
     * binlog队列和直接交换机绑定
     * 并指定绑定的routing_key
     * @return
     *
     */

    /**
     * 主题交换机(模式)
     * 用于实例间的任务分发
     * 是一种带路由功能的交换机，一个队列会和一个交换机绑定，除此之外再绑定一个routing_key
     */
    @Bean
    public DirectExchange createdirectExchange() {
        return new DirectExchange(RabbitMqEnum.Exchange.DIRECT_EXCHANGE.getCode());
    }

    @Bean
    public Binding bindingBinlogQueueWithDirectExchange() {
        return BindingBuilder.bind(binlogSqlQuence()).to(createdirectExchange())
                .with(RabbitMqEnum.QueueKey.MYSQLBINLOG_DIRECT.getCode());
    }


}

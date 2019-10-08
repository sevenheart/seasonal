package com.seasonal.rabbit;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.connection.CachingConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.boot.autoconfigure.amqp.SimpleRabbitListenerContainerFactoryConfigurer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;
import org.springframework.core.env.Environment;

@Configuration
public class RabbitConfig {

    private static final Logger log = LoggerFactory.getLogger(RabbitConfig.class);

    @Autowired
    private Environment env;

    @Autowired
    private CachingConnectionFactory connectionFactory;

    @Autowired
    private SimpleRabbitListenerContainerFactoryConfigurer factoryConfigurer;

    @Bean
    @Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
    public RabbitTemplate rabbitTemplate(){
        //消息发送到 Broker 后触发回调，确认消息是否到达 Broker 服务器，也就是只确认是否正确到达 Exchange 中
        connectionFactory.setPublisherConfirms(true);
        //启动消息失败返回，比如路由不到队列时触发回调ReturnCallback
        connectionFactory.setPublisherReturns(true);

        RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
        // 如果exchange根据自身类型和消息routeKey无法找到一个符合条件的queue，那么会调用basic.return方法将消息返还给生产者。false：出现上述情形broker会直接将消息扔掉
        rabbitTemplate.setMandatory(true);

        return rabbitTemplate;
    }
}
package com.seasonal.receiver;

import com.seasonal.pojo.LoginFrom;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitHandler;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

/**
 * @RabbitListener注解中的bindings和queues参数不能同时指定，否则会报错。 1. @RabbitListener可在具体的消息处理方法上增加该注解
 * 2. @RabbitListener可以标注在类上面，当使用在类上面的时候，
 * 需要配合@RabbitHandler注解一起使用，@RabbitListener标注在类
 * 上面表示当有收到消息的时候，就交给带有@RabbitHandler的方法处理，
 * 具体找哪个方法处理，需要跟进MessageConverter转换后的java对象。
 */
@Component
@RabbitListener(queues = "registerMessageCodeQueue")
public class MessageCodeReceiver {

    private final Logger LOGGER = LoggerFactory.getLogger(MessageCodeReceiver.class);

    // , Channel channel, @Header(AmqpHeaders.DELIVERY_TAG) long tag
    @RabbitHandler
    public void welecomeMessage(LoginFrom loginFrom) {
//        try {
//            Thread.sleep(15000);
//        } catch (InterruptedException e) {
//            e.printStackTrace();
//        }
        LOGGER.info("注册 -info---" + loginFrom.getUserId());
        LOGGER.debug("注册 --debug--" + loginFrom.getUserId());
        LOGGER.error("注册 -error---" + loginFrom.getUserId());
    }

}

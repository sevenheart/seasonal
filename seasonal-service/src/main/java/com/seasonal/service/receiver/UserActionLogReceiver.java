package com.seasonal.service.receiver;

import com.seasonal.pojo.ComposeGood;
import com.seasonal.pojo.LoginFrom;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.annotation.RabbitHandler;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;
@Component
@RabbitListener(queues = "userActiveLogQueue")
public class UserActionLogReceiver {
    private final Logger LOGGER = LoggerFactory.getLogger(UserActionLogReceiver.class);

    // , Channel channel, @Header(AmqpHeaders.DELIVERY_TAG) long tag
    @RabbitHandler
    public void welecomeMessage(LoginFrom loginFrom, Message message) {

/*        try {
            Thread.sleep(10000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }*/

        System.out.println(message.getMessageProperties().getReceivedRoutingKey() + "---------");
        System.out.println("welecomeMessage +++++++++");
        LOGGER.info("sample -info---" + loginFrom.getUserId());
        LOGGER.debug("sample --debug--" + loginFrom.getUserId());
        LOGGER.error("sample -error---" + loginFrom.getUserId());

        System.out.println("欢迎" + loginFrom.getUserId());
    }

    @RabbitHandler
    public void browseMessage(ComposeGood composeGood, Message message) {

/*        try {
            Thread.sleep(10000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }*/

        System.out.println(message.getMessageProperties().getReceivedRoutingKey() + "---------");
        System.out.println("welecomeBrowse +++++++++");
        LOGGER.info("sample -info---" + composeGood.getComposeGoodName());
        LOGGER.debug("sample --debug--" + composeGood.getComposeGoodName());
        LOGGER.error("sample -error---" + composeGood.getComposeGoodName());

        System.out.println("浏览了" + composeGood.toString());
    }
}

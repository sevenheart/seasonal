package com.seasonal.receiver;

import com.seasonal.pojo.ComposeGood;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.annotation.RabbitHandler;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

import java.io.*;
import java.util.Map;

@Component
@RabbitListener(queues = "userActiveLogQueue")
public class UserActionLogReceiver {
    private final Logger LOGGER = LoggerFactory.getLogger(UserActionLogReceiver.class);

    // , Channel channel, @Header(AmqpHeaders.DELIVERY_TAG) long tag
    @RabbitHandler
    public void welecomeMessage(String userId, Message message) {
        LOGGER.info(message.getMessageProperties().getReceivedRoutingKey() + " -- 用户:" + userId + "登录成功");
    }

    @RabbitHandler
    public void browseMessage(Map<String, ComposeGood> browseRecord, Message message) {
        LOGGER.info(message.getMessageProperties().getReceivedRoutingKey() + " -- " + browseRecord.keySet() + "浏览了" + browseRecord.values().toString());
        browseFile(browseRecord);
    }

    private void browseFile(Map<String, ComposeGood> browseRecord){
        String pathName = "D:/myLogs/browseRecords/records.txt";
        File file = new File(pathName);
        if(!file.getParentFile().exists()){//文件是否存在
            //文件不存在时
            file.getParentFile().mkdirs();
        }
        if(!file.exists()){
            try {
                file.createNewFile();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        FileWriter writer = null;
        try {
            writer = new FileWriter(file, true);
            String browse = null;
            for (String key: browseRecord.keySet()) {
                ComposeGood composeGood = browseRecord.get(key);
                browse = key + "_" + composeGood.getId() + "_" + composeGood.getComposeGoodName() + "_" + composeGood.getComposeGoodPrice() + System.getProperty("line.separator");
            }
            writer.write(browse);
            writer.flush();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                writer.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}

package com.seasonal.listenbinlog;

import com.github.shyiko.mysql.binlog.BinaryLogClient;
import com.github.shyiko.mysql.binlog.event.Event;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class ListenerBinLog {
    BinaryLogClient client = new BinaryLogClient("localhost", 3306, "root", "123456");

    public  void main()  {
        /*监听*/
      /*  EventDeserializer eventDeserializer = new EventDeserializer();
        // skip EXT_WRITE_ROWS event data altogether
        eventDeserializer.setEventDataDeserializer(QUERY,
                new NullEventDataDeserializer());
        eventDeserializer.setCompatibilityMode(
                EventDeserializer.CompatibilityMode.DATE_AND_TIME_AS_LONG,
                EventDeserializer.CompatibilityMode.CHAR_AND_BINARY_AS_BYTE_ARRAY
        );
        client.setEventDeserializer(eventDeserializer);*/

        client.registerEventListener(new BinaryLogClient.EventListener() {

            @Override
            public void onEvent(Event event) {
                int type=0;//sql类型
                // "/sql=!BEGIN.*/"
                String data="";
                int update = (event.getData().toString()).indexOf("database='seasonal', sql='UPDATE");
                int delete = (event.getData().toString()).indexOf("database='seasonal', sql='DELETE");
                int insert = (event.getData().toString()).indexOf("database='seasonal', sql='INSERT");
                data = update > 0 ? (event.getData().toString()).substring(update):
                        delete > 0 ? (event.getData().toString()).substring(delete):
                                insert > 0 ? (event.getData().toString()).substring(insert):"";
                if(data!=""){
                    //在处理一次变成了sql语句
                    data = data.replace("database='seasonal', sql='","");
                    data = data.replaceAll("`","");
                    data = data.replace("'}","");
                    System.out.println(data);
                    type = update > 0 ? 2:
                            delete>0 ? 3 :
                                    insert>0 ? 1:0;
                    Map<Integer,String> map = new HashMap<>();
                    map.put(type,data);
                    //放入消费队列去消费即可。
                }
            }

        });

        try {
            client.connect();
        } catch (IOException e) {
            System.out.println("dsjfaskd");e.printStackTrace();
        }

    }
}

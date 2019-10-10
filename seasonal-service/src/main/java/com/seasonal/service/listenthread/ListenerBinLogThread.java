package com.seasonal.service.listenthread;

import com.github.shyiko.mysql.binlog.BinaryLogClient;
import com.github.shyiko.mysql.binlog.event.Event;
import com.seasonal.service.sender.UpdateSqlSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Component
public class ListenerBinLogThread extends Thread{
    private final UpdateSqlSender updateSqlSender;
    @Autowired
    public ListenerBinLogThread(UpdateSqlSender updateSqlSender){
        this.updateSqlSender =updateSqlSender;
    }
    public  int  database = 0;
    public  String longId ="";
    public void run(){
        System.out.println("B监听启动了");
        BinaryLogClient client = new BinaryLogClient("localhost", 3306, "root", "123456");
        client.registerEventListener(new BinaryLogClient.EventListener() {
            @Override
            public void onEvent(Event event) {
                //判断
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
                    //加入id
                    if(type==1 ){
                        if(!"".equals(longId)){
                            //拼接
                            data=longId+data;
                            //
                            longId="";
                        }else {
                            System.out.println("插入数据没有查到longid");
                        }
                    }
                    Map<Integer,String> map = new HashMap<>();
                    map.put(type,data);
                    //放入消费队列去消费即可。
                    updateSqlSender.sendSql(map);
                    System.out.println("放入了消息队列");
                }else {
                    //是不是seasonal数据库
                    if(database ==1){
                        //第一次过来的
                        if(event.getData().toString().indexOf("IntVarEventData{type=2, value=")>=0){
                            System.out.println("是插入插入id是"+event.getData().toString());
                            longId = event.getData().toString().replace("IntVarEventData{type=2, value=","");
                            longId = longId.replace("}","");
                        }else {
                            database = 0;
                        }

                    }
                    if(event.getData().toString().indexOf("database='seasonal', sql='BEGIN'}")>0){
                        database=1;
                    }else {
                        database = 0;
                    }
                }
            }

        });

        try {
            client.connect();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}

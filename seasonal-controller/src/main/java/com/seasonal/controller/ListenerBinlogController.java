package com.seasonal.controller;

import com.seasonal.service.listenthread.ListenerBinLogThread;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

@Component
public class ListenerBinlogController {
    private  final ListenerBinLogThread listenerBinLogThread;
    @Autowired
    public  ListenerBinlogController(ListenerBinLogThread listenerBinLogThread){
        this.listenerBinLogThread = listenerBinLogThread;
    }
    @Bean
    public void runListenBinLog(){
        listenerBinLogThread.start();
    }
}

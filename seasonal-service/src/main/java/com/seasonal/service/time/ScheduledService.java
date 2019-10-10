package com.seasonal.service.time;

import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@Configuration
@EnableScheduling
public class ScheduledService {
    @Scheduled(cron = "0 0 8,12,16,20 * * *")
    private void sckill(){
        System.out.println("A");
    }
}

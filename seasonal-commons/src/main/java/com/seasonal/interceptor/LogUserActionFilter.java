package com.seasonal.interceptor;

import ch.qos.logback.classic.Level;
import ch.qos.logback.classic.spi.ILoggingEvent;
import ch.qos.logback.core.filter.Filter;
import ch.qos.logback.core.spi.FilterReply;

public class LogUserActionFilter extends Filter<ILoggingEvent> {

    private String flag;

    public void setFlag(String flag) {
        this.flag = flag;
    }

    @Override
    public FilterReply decide(ILoggingEvent event) {
        if (event.getLevel() == Level.INFO) {
            if (event.getMessage().contains(flag)) {
                System.out.println("我过滤了");
                return FilterReply.ACCEPT;
            } else {
                System.out.println("我也他娘过滤了");
                return FilterReply.DENY;
            }

        }
        return FilterReply.DENY;
    }
}

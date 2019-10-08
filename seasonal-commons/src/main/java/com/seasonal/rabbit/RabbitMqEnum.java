package com.seasonal.rabbit;

/**
 * 队列、消息交换机，路由关键字公共枚举类
 */
public class RabbitMqEnum {
    /**
     * 定义队列名称
     **/
    public enum QueueName {
        REGISTER_MESSAGE_CODE_QUEUE("registerMessageCodeQueue", "注册欢迎短信队列"),
        USER_ACTIVE_LOG_QUEUE("userActiveLogQueue", "用户行为日志队列"),
        SECKILL_QUEUE("seckillQueue", "秒杀队列");

        private String code;
        private String name;

        QueueName(String code, String name) {
            this.code = code;
            this.name = name;
        }

        public String getCode() {
            return code;
        }

        public String getName() {
            return name;
        }

    }

    /**
     * 定义交换机
     **/
    public enum Exchange {
        DIRECT_EXCHANGE("directExchange", "直连交换机"),
        FANOUT_EXCHANGE("fanoutExchange", "扇形交换机"),
        TOPIC_EXCHANGE("topicExchange", "主题交换机"),
        TOPIC_ORDER_EXCHANGE("topicOrderExchange", "订单主题交换机"),
        HEADERS_EXCHANGE("headersExchange", "首部交换机");

        private String code;
        private String name;

        Exchange(String code, String name) {
            this.code = code;
            this.name = name;
        }

        public String getCode() {
            return code;
        }

        public String getName() {
            return name;
        }

    }

    /**
     * 定义routing_key
     **/
    public enum QueueKey {
        MESSAGE_CODE_DIRECT("messageCode", "注册欢迎短信队列"),
        USER_ACTIVE_LOGS_TOPIC("action.log.#", "用户行为日志"),
        GOOD_SECKILL_TOPIC("good.seckill.#", "商品秒杀");

        private String code;
        private String name;

        QueueKey(String code, String name) {
            this.code = code;
            this.name = name;
        }

        public String getCode() {
            return code;
        }

        public String getName() {
            return name;
        }
    }
}

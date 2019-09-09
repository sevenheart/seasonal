package com.seasonal.service;

public interface MainService {
    /**
     * 首页商品的初始化,当Redis中不存在main字段是添加到Redis中
     * @return 根据大类一对多查询小类一对多查询商品的集合
     */
    Object mainGoodsInitialize();
}

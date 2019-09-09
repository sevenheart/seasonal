package com.seasonal.page;

import lombok.Data;

import java.util.List;

@Data
public class PageInfoResult<T> {

    //总数据条数
    private long totalSize;
    //每页大小
    private int pageSize = 8;
    //当前第几页
    private int currPage = 1;
    //当前页的数据
    private List<T> dataList;
    //排序字段
    private String orderName;
    //SQL limit 起始条数
    private int keyPage;

}

package com.seasonal.service;

import com.seasonal.pojo.ESComposeGood;
import org.springframework.data.domain.Sort;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import java.util.List;

/*
* es操作respository
* */
public interface ESComposeGoodResitory extends ElasticsearchRepository<ESComposeGood,Long> {
    List<ESComposeGood> findByComposeGoodType(Integer type, Sort sort);
}

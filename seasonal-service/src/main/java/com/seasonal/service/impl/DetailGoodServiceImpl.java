package com.seasonal.service.impl;

import com.seasonal.mapper.ComposeGoodMapper;
import com.seasonal.pojo.ComposeGood;
import com.seasonal.service.DetailGoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DetailGoodServiceImpl implements DetailGoodService {

    private final ComposeGoodMapper composeGoodMapper;

    @Autowired
    public DetailGoodServiceImpl(ComposeGoodMapper composeGoodMapper) {
        this.composeGoodMapper = composeGoodMapper;
    }

    @Override
    public ComposeGood findComposeGoodById(Long id) {
        return composeGoodMapper.findComposeGoodByID(id);
    }
}

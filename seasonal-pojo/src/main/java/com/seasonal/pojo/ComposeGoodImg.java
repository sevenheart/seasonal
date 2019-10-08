package com.seasonal.pojo;

import lombok.Data;

import java.io.Serializable;

@Data
public class ComposeGoodImg implements Serializable {
    private Long id;
    private Long composeGoodId;
    private String composeGoodImg;
    private int imgType;
}

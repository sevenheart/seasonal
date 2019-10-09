package com.seasonal.pojo;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

/**
 * indexName索引名（数据库名称）, 必须为小写
 * type   文档类型（表名）, 必须为小写
 */
@Document(indexName = "seasonal",type = "escomposegood", shards = 4, replicas = 0)
public class ESComposeGood {
    @Id
    private Long id;
    @Field(type = FieldType.Text,analyzer = "ik_max_word")
    private String composeGoodName;
    @Field(type = FieldType.Integer)
    private Integer composeGoodPrice;
    @Field(type = FieldType.Long)
    private Long composeGoodType;
    @Field(type = FieldType.Integer)
    private Integer composeGoodStatus;
    @Field(type = FieldType.Integer)
    private Integer composeGoodWeight;
    @Field(type = FieldType.Keyword)
    private String composeGoodIcon;
    @Field(type = FieldType.Integer)
    private Integer composeGoodSales;

    @Override
    public String toString() {
        return "ESComposeGood{" +
                "id=" + id +
                ", composeGoodName='" + composeGoodName + '\'' +
                ", composeGoodPrice=" + composeGoodPrice +
                ", composeGoodType=" + composeGoodType +
                ", composeGoodStatus=" + composeGoodStatus +
                ", composeGoodWeight=" + composeGoodWeight +
                ", composeGoodIcon='" + composeGoodIcon + '\'' +
                ", composeGoodSales=" + composeGoodSales +
                ", commentNumber=" + commentNumber +
                ", composeGoodDescribe='" + composeGoodDescribe + '\'' +
                '}';
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getComposeGoodName() {
        return composeGoodName;
    }

    public void setComposeGoodName(String composeGoodName) {
        this.composeGoodName = composeGoodName;
    }

    public Integer getComposeGoodPrice() {
        return composeGoodPrice;
    }

    public void setComposeGoodPrice(Integer composeGoodPrice) {
        this.composeGoodPrice = composeGoodPrice;
    }

    public Long getComposeGoodType() {
        return composeGoodType;
    }

    public void setComposeGoodType(Long composeGoodType) {
        this.composeGoodType = composeGoodType;
    }

    public Integer getComposeGoodStatus() {
        return composeGoodStatus;
    }

    public void setComposeGoodStatus(Integer composeGoodStatus) {
        this.composeGoodStatus = composeGoodStatus;
    }

    public Integer getComposeGoodWeight() {
        return composeGoodWeight;
    }

    public void setComposeGoodWeight(Integer composeGoodWeight) {
        this.composeGoodWeight = composeGoodWeight;
    }

    public String getComposeGoodIcon() {
        return composeGoodIcon;
    }

    public void setComposeGoodIcon(String composeGoodIcon) {
        this.composeGoodIcon = composeGoodIcon;
    }

    public Integer getComposeGoodSales() {
        return composeGoodSales;
    }

    public void setComposeGoodSales(Integer composeGoodSales) {
        this.composeGoodSales = composeGoodSales;
    }

    public Integer getCommentNumber() {
        return commentNumber;
    }

    public void setCommentNumber(Integer commentNumber) {
        this.commentNumber = commentNumber;
    }

    public String getComposeGoodDescribe() {
        return composeGoodDescribe;
    }

    public void setComposeGoodDescribe(String composeGoodDescribe) {
        this.composeGoodDescribe = composeGoodDescribe;
    }

    @Field(type = FieldType.Integer)
    private Integer commentNumber;
    public ESComposeGood(){}
    public ESComposeGood(Long id, String composeGoodName, Integer composeGoodPrice, Long composeGoodType, Integer composeGoodStatus, Integer composeGoodWeight, String composeGoodIcon, Integer composeGoodSales, Integer commentNumber, String composeGoodDescribe) {
        this.id = id;
        this.composeGoodName = composeGoodName;
        this.composeGoodPrice = composeGoodPrice;
        this.composeGoodType = composeGoodType;
        this.composeGoodStatus = composeGoodStatus;
        this.composeGoodWeight = composeGoodWeight;
        this.composeGoodIcon = composeGoodIcon;
        this.composeGoodSales = composeGoodSales;
        this.commentNumber = commentNumber;
        this.composeGoodDescribe = composeGoodDescribe;
    }

    @Field(type = FieldType.Text)
    private String composeGoodDescribe;
   /* private Data createTime;
    private Data updateTime;*/
}

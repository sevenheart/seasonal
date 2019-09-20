package com.seasonal.pojo;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "bootComment")
public class Comment {

    private String id;
    private  String comment_id;
    private String comment_goods_id;
    private String comment_user_id;
    private String comment_user_name;
    private String comment_user_img;
    private String comment_content;
    private String comment_create_time;
    @DBRef
    private Responses comment_responses;
}

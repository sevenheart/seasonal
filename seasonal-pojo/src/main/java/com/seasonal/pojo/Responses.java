package com.seasonal.pojo;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
public class Responses {
    private String id;
    private String commentid;
    private String commentuserid;
    private String response_user_id;
    private String response_user_name;
    private String response_user_img;
    private String response_content;
    private String response_create_time;
}

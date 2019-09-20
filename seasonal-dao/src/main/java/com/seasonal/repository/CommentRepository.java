package com.seasonal.repository;


import com.seasonal.pojo.Comment;
import com.seasonal.pojo.Responses;
import net.sf.json.JSONObject;

import java.util.List;

public interface CommentRepository {
    /**
     * 查询所有评论根据商品id
     * @return
     */
    List<JSONObject>  findAllComments(String id);



    /**
     * 查询所有回复
     * @return
     */
    List<Responses> findAllResponses();

    /**
     * 插入一条评论
     * @param comment
     */
    int insertComment(Comment comment);

    /**
     * 添加一条一级评论的回复
     * @param
     * @param responses
     * @return
     */
    int addResponse( Responses responses);




}

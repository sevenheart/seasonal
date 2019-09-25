package com.seasonal.service;

import com.seasonal.pojo.Comment;
import com.seasonal.pojo.Responses;
import net.sf.json.JSONObject;

import java.util.List;

public interface CommentService {
    /**
     * 查询所有评论
     * @return
     */
    List<JSONObject>  findAllComments(String id);

    /**
     * 根据商品id查找它的评论信息
     * @param id
     * @return
     */
    List<JSONObject> findCommentsByGoodsId(String id);
    /**
     * 查询所有回复
     * @return
     */
    List<Responses> findAllResponses();

    /**
     * 插入一条评论
     * 修改数据库的
     * @param comment
     */
    int commentAndUpdate(Comment comment);

    /**
     * 添加一条一级评论的回复
     * @param
     * @param responses
     * @return
     */
    int addResponse( Responses responses);


}

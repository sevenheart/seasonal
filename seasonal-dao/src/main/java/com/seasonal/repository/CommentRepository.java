package com.seasonal.repository;


import com.seasonal.pojo.Comment;
import com.seasonal.pojo.Responses;
import net.sf.json.JSONObject;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface CommentRepository {
    /**
     * 查询所有评论根据商品id
     * @return
     */
   List<JSONObject>  findAllComments(String id,int begin,int limit);

    List<JSONObject> findAllOrderByTime(String id,int begin,int limit);
    /**
     * 根据id查中评论是个数
     * @param id
     * @return
     */
    List<Comment> findAllComments(String id);



    /**
     * 查询所有回复
     * @return
     */
    List<Responses> findAllResponses();

    /**
     * 插入一条评论
     * @param comment
     **/
    int insertComment(Comment comment);

    /**
     * 添加一条一级评论的回复
     * @param
     * @param responses
     * @return
     */
    int addResponse( Responses responses);



}

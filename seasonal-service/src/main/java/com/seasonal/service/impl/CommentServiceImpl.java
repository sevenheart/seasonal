package com.seasonal.service.impl;


import com.seasonal.mapper.CartFormMapper;
import com.seasonal.mapper.DetailedCommodityFormMapper;
import com.seasonal.mapper.OrderFormMapper;
import com.seasonal.pojo.Comment;
import com.seasonal.pojo.Responses;
import com.seasonal.repository.CommentRepository;
import com.seasonal.service.CommentService;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class CommentServiceImpl implements CommentService {
    private final DetailedCommodityFormMapper detailedCommodityFormMapper;
    @Autowired
    public CommentServiceImpl( DetailedCommodityFormMapper detailedCommodityFormMapper) {
        this.detailedCommodityFormMapper = detailedCommodityFormMapper;
    }
    @Autowired
    CommentRepository commentRepository;
/*    public CommentServiceImpl() {
        ApplicationContext ac = new ClassPathXmlApplicationContext("spring/spring-mongodb.xml");
        mongoTemplate = (MongoTemplate) ac.getBean("mongoTemplate");
   }*/
    @Override
    public List<JSONObject>  findAllComments(String id) {
        return commentRepository.findAllComments(id);
    }

    @Override
    public List<JSONObject> findCommentsByGoodsId(String id) {

        return null;
    }

    @Override
    public List<Responses> findAllResponses() {
        return commentRepository.findAllResponses();
    }
    /*
    * 1.插入comment
    * 2.修改数据库的评论信息
    * */
    @Override
    public int commentAndUpdate(Comment comment) {
        int update = detailedCommodityFormMapper.updateCommentStates(comment.getComment_goods_id(),comment.getOrderId(),comment.getComment_id());
        commentRepository.insertComment(comment);
        if (update>0){
            System.out.println("修改评论状态成功！！插入评论不知道成功没有！！");
        }
        return update;
    }



    @Override
    public int addResponse( Responses responses) {


        return commentRepository.addResponse(responses);
    }


}

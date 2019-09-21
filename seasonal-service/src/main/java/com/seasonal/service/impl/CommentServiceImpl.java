package com.seasonal.service.impl;


import com.seasonal.pojo.Comment;
import com.seasonal.pojo.Responses;
import com.seasonal.repository.CommentRepository;
import com.seasonal.service.CommentService;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class CommentServiceImpl implements CommentService {
    @Autowired
    CommentRepository commentRepository;
//    public CommentServiceImpl() {
//        ApplicationContext ac = new ClassPathXmlApplicationContext("spring/spring-mongodb.xml");
//        mongoTemplate = (MongoTemplate) ac.getBean("mongoTemplate");
//    }
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
    @Override
    public int insertComment(Comment comment) {
        return commentRepository.insertComment(comment);
    }



    @Override
    public int addResponse( Responses responses) {


        return commentRepository.addResponse(responses);
    }


}

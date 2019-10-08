package com.seasonal.repository.impl;


import com.mongodb.client.result.UpdateResult;
import com.seasonal.pojo.Comment;
import com.seasonal.pojo.Responses;
import com.seasonal.repository.CommentRepository;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class CommentRepositoryImpl implements CommentRepository {

    /**
     * 由springboot自动注入，默认配置会产生mongoTemplate这个bean
     */
    @Autowired
    MongoTemplate mongoTemplate;
    @Override
    public List<JSONObject> findAllComments(String id, int begin,int limit ) {
        Query query = new Query();
       // Criteria criteria = Criteria.where("comment_goods_id").is(id);
        query./*skip(begin).limit(limit).*/with(new Sort(new Sort.Order(Sort.Direction.DESC,"comment_create_time")));
        // query.addCriteria(criteria);
        //  List<Comment> comments = mongoTemplate.find(query,Comment.class);
        List<JSONObject> comments = mongoTemplate.find(query,JSONObject.class,"bootComment");
        for(JSONObject comment:comments) {
            System.out.println("到的是"+comment.toString());
        }
        return comments;
    }

    @Override
    public List<JSONObject> findAllOrderByTime(String id, int begin, int limit) {
        Query query = new Query();
        // Criteria criteria = Criteria.where("comment_goods_id").is(id);
        query.skip(begin).limit(limit).with(new Sort(new Sort.Order(Sort.Direction.DESC,"comment_create_time")));
        // query.addCriteria(criteria);
        //  List<Comment> comments = mongoTemplate.find(query,Comment.class);
        List<JSONObject> comments = mongoTemplate.find(query,JSONObject.class,"bootComment");
        for(JSONObject comment:comments) {
            System.out.println("到的是"+comment.toString());
        }
        return comments;
    }

    @Override
    public List<Comment> findAllComments(String id) {
        Query query = new Query();
        Criteria criteria = Criteria.where("comment_goods_id").is(id);
        query.addCriteria(criteria);
        return mongoTemplate.find(query,Comment.class);
    }


    @Override
    public List<Responses> findAllResponses() {
        Query query = new Query();
//        Criteria criteria = Criteria.where("responses").exists(false);
//        query.addCriteria(criteria);
        List<Responses> responses = mongoTemplate.find(query,Responses.class);
        for (Responses responses1:responses
                ) {
            System.out.println(responses1.toString());

        }
        return null;
    }

    @Override
    public int insertComment(Comment comment) {
        List<Comment> list = new ArrayList<Comment>();
        list.add(comment);
        mongoTemplate.insert(list,Comment.class);
        return 1;
    }

    @Override
    public int addResponse( Responses responses) {
        Query query = Query.query(Criteria.where("comment_id").is(responses.getCommentid()));
        Update update = new Update();
        update.addToSet("response",responses);
        UpdateResult result = mongoTemplate.upsert(query,update,Comment.class);
        return 1;
    }


}

package com.seasonal.controller;


import com.seasonal.pojo.Comment;
import com.seasonal.pojo.Responses;
import com.seasonal.service.CommentService;
import com.seasonal.vo.ResultData;
import com.seasonal.vo.ResultUtil;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Calendar;
import java.util.List;
import java.util.Random;
import java.util.UUID;

@Controller
public class CommentController {

    @Autowired
    CommentService commentService;

    Calendar calendar = Calendar.getInstance();

    /**
     * 插入评论信息根据商品id插入
     * @return
     */
    @RequestMapping("upsertcomment")
    @ResponseBody
    public ResultData upsertComment(Comment comment1){

        System.out.println("进入了存储方法");

        //生成一个随机的commentid
        //随机生成一个commentid
        String comment_id = UUID.randomUUID()+ String.valueOf((int)Math.random()*10+10000);
        System.out.println("生成的评论id是"+comment_id);
        comment1.setComment_id(comment_id);
        System.out.println(comment1.toString());
       // commentService.commentAndUpdate(comment1);
        return ResultUtil.success(200,"评论成功");
    }

    /**
     * 查找所有评论信息根据商品id
     * @return
     */
    @RequestMapping("findallbyid")
    @ResponseBody
    public ResultData findAllComments(String id){
        List<JSONObject>  commentslist = commentService.findAllComments(id);
        ResultData resultData = new ResultData();
        if (null == commentslist || commentslist.size() == 0){
            resultData.setCode(3);
            resultData.setMessage("查不到数据");

        }else {
            resultData.setCode(0);
            resultData.setData(commentslist);
            System.out.println("查到数据了");
        }
        return resultData;
    }



    /**
     * 增加回复根据评论id增加
     * @return
     */
    @RequestMapping("upsertresponse")
    @ResponseBody
    //传一个response，插入相应地方,完成回复功能，先插入然后再前端显示
    public String upsertResponse(Responses responses){
        String time = responses.getResponse_create_time();
        responses.toString();
        //Responses response = responses;
       // response.setId("02");
        // response.setResponse_user_img("http://tupiandizhi.com");
       /* response.setResponse_user_id("002");
        response.setResponse_user_name("2号用户");
        response.setCommentid("83d69b85-c59f-4783-b46c-7f94a5daf18799");
        response.setResponse_content("这是2号用户给1楼的评论");
        response.setResponse_create_time(time);*/
        //根据评论id继续评论,前端后端生成一个
       // commentService.addResponse(response);

        return "成功";
    }

}

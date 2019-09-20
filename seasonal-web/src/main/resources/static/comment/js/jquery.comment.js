(function($){
	function crateCommentInfo(obj){

		if(typeof(obj.comment_create_time) == "undefined" || obj.comment_create_time == ""){
			obj.comment_create_time = getNowDateFormat();
		}
		//用户名和头像以及时间获取
		
		var el = "<div class='comment-info'><header><img src='"+obj.comment_user_img+"'></header>" +
			"<div class='comment-right'><h3>"+obj.comment_user_name+"</h3>"
				+"<div class='comment-content-header'><span><i class='glyphicon glyphicon-time'></i>"+obj.comment_create_time+"</span>";

		//评论内容获取
		el = el+"</div><p class='content'>"+obj.comment_content+"</p><div class='comment-content-footer'><div class='row'><div class='col-md-10'></div>";

		//获取评论的id
		if(typeof(obj.comment_id) != "undefined" && obj.comment_id != ""){
			el =el+"<div class='col-md-2'><span hidden class='commentid' >"+obj.comment_id+"</span>";
		}
		//商品id获取
		if(typeof(obj.comment_goods_id) != "undefined" && obj.comment_goods_id != ""){
			el =el+"<span hidden class='commentgoodsid' >"+obj.comment_goods_id+"</span>";
		}
		//品论人id获取
		if(typeof(obj.comment_user_id) != "undefined" && obj.comment_user_id != ""){
			el = el + "<span hidden  class='commentuserid'>"+obj.comment_user_id+"</span>";
		}
		el = el + "<span class='reply-btn'>回复</span></div></div></div>" + "<div class='reply-list'>";
		if(obj.response != "" && obj.response.length > 0){
			var arr = obj.response;
			for(var j=0;j<arr.length;j++){
				var replyObj = arr[j];
				el = el+createReplyComment(replyObj);
			}
		}
		el = el+"</div></div></div>";
		return el;
	}
	
	//返回每个回复体内容
	function createReplyComment(response){
		var replyEl = "<div class='reply'><div><a href='javascript:void(0)' class='replyname'>"+"其他品论人人姓名是："+response.response_user_name+"</a>:<a href='javascript:void(0)'></a><span>"+response.response_content+"</span></div>"
						+ "<p><span>"+response.response_create_time+"</span><!-- <span class='reply-list-btn'>回复</span>--></p></div>";
		return replyEl;
	}

	//获取当前时间
	function getNowDateFormat(){
		var nowDate = new Date();
		var year = nowDate.getFullYear();
		var month = filterNum(nowDate.getMonth()+1);
		var day = filterNum(nowDate.getDate());
		var hours = filterNum(nowDate.getHours());
		var min = filterNum(nowDate.getMinutes());
		var seconds = filterNum(nowDate.getSeconds());
		return year+"-"+month+"-"+day+" "+hours+":"+min+":"+seconds;
	}
	function filterNum(num){
		if(num < 10){
			return "0"+num;
		}else{
			return num;
		}
	}
	//点击回复
	function replyClick(el){
		el.parent().parent().append("<div class='replybox'><textarea cols='80' rows='50' placeholder='来说几句吧......' class='mytextarea' ></textarea><span class='send'>发送</span></div>")
		.find(".send").click(function(){
			var content = $(this).prev().val();
			/*var commentid =*/
			if(content != ""){
				var parentEl = $(this).parent().parent().parent().parent();
				var obj = new Object();
				//评论人姓名：获取当前元素的姓名
				//商品评论评论人得id用来做通知。比对id确定是不是同一个用户在回复自己的评论
				//obj.commentuserid=
				//obj.response_user_id = el.parent().children(".commentuserid").html();
				//通过全局获取姓名和id
				//obj.response_user_name=el.parent().children(".commentuserid").html();
				obj.commentid=el.parent().children(".commentid").html();
				console.log("评论的id是"+obj.commentid);
			/*	if(el.parent().parent().hasClass("reply")){
					console.log("回复的回复1111");
					obj.beReplyName = el.parent().parent().find("a:first").text();
				}else{*/
					console.log("回复2222");
					obj.beReplyName=parentEl.find("h3").text();
				/*}*/
				obj.response_content=content;
				obj.response_create_time = getNowDateFormat();
				//先把回复插入数据库成功后再显示再前台

                //
				var replyString = createReplyComment(obj);
				$(".replybox").remove();
				parentEl.find(".reply-list").append(replyString)/*.find(".reply-list-btn:last").click(function(){alert("不能回复自己");})*/;
			}else{
				alert("空内容");
			}
		});
	}
	
	//添加comment一级评论信息
	$.fn.addCommentList=function(options){
		var defaults = {
			data:[],
			add:""
		}
		var option = $.extend(defaults, options);
		//加载数据
		if(option.data.length > 0){
			var dataList = option.data;
			var totalString = "";
			//遍历一级评论
			for(var i=0;i<dataList.length;i++){
				var obj = dataList[i];
				//每个以及品论创建一个评论card
				var objString = crateCommentInfo(obj);
				totalString = totalString+objString;
			}
			$(this).append(totalString).find(".reply-btn").click(function(){

				if($(this).parent().parent().find(".replybox").length > 0){
					$(".replybox").remove();
				}else{
					$(".replybox").remove();
					replyClick($(this));
				}
			});
			$(".reply-list-btn").click(function(){
				if($(this).parent().parent().find(".replybox").length > 0){
					$(".replybox").remove();
				}else{
					$(".replybox").remove();
					replyClick($(this));
				}
			})
		}
		
		//添加新数据
		if(option.add != ""){
			obj = option.add;
			var str = crateCommentInfo(obj);
			$(this).prepend(str).find(".reply-btn").click(function(){
				replyClick($(this));
			});
		}
	}
	
	
})(jQuery);
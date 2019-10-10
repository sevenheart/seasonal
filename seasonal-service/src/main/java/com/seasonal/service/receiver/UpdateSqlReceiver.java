package com.seasonal.service.receiver;
import com.seasonal.mapper.ComposeGoodMapper;
import com.seasonal.pojo.ComposeGood;
import com.seasonal.pojo.ESComposeGood;
import com.seasonal.service.ESComposeGoodResitory;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.annotation.RabbitHandler;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Iterator;
import java.util.Map;
import java.util.Set;

@Component
@RabbitListener(queues = "mysqlbinlog")
public class UpdateSqlReceiver {
    private final ESComposeGoodResitory esComposeGoodResitory;
    private final ComposeGoodMapper composeGoodMapper;
    @Autowired
    public  UpdateSqlReceiver(ESComposeGoodResitory esComposeGoodResitory,ComposeGoodMapper composeGoodMapper){
        this.esComposeGoodResitory=esComposeGoodResitory;
        this.composeGoodMapper = composeGoodMapper;
    }

    // ,从队列中消费传来的sql消息
    @RabbitHandler
    public void welecomeSql(Map<Integer,String> sql) {
       // System.out.println(message.getMessageProperties().getReceivedRoutingKey() + "-----routingkey是啥啊前便----");
        System.out.println("sql语句是" );
        Set<Integer> keySet = sql.keySet();
        Iterator<Integer> integerIterator = keySet.iterator();
        while (integerIterator.hasNext()){
           int maintype = integerIterator.next();
            System.out.println(maintype);
            String data =sql.get(maintype);
            System.out.println(data);
            //处理SQL语句,
            switch (maintype){
                case 1:
                    //字符串提取然后用switch赋值最后存储

                    esadd(data);
                    //
                    break;
                case 2:
                    //UPDATE compose_good SET compose_good_name='.' WHERE (id='100143')
                    //提取id
                    //只需要id然后删除然后查找，然后插入
                    esupdate(data);

                    break;
                case 3:
                    //提取id
                    //只需要id直接删除。
                    esdelete(data);
                    break;
            }
        }
    }



    /*es插入方法*/
    public  void esadd(String  sql){
        int id = 0;
        int endId = sql.indexOf("INSERT INTO compose_good");
        if(endId>0){
            id=Integer.parseInt(sql.substring(0,endId));
        }else {
            System.out.println("插入id没有截取成功");
        }

        int begin = sql.indexOf("(")+1;
        int end = sql.indexOf(")");
        String sqlbegin = sql.substring(begin,end);
        String[] sqlbeginarray = sqlbegin.split(", ");
        begin = sql.indexOf("VALUES (")+9;
        end = sql.length()-2;
        String sqlend = sql.substring(begin,end);
        String[] sqlendarray = sqlend.split("', '");
        ESComposeGood esComposeGood = new ESComposeGood();
        esComposeGood.setId((long)id);
        //插入方法
        for(int i = 0;i < sqlbeginarray.length ; i++ ){
            // 根据查中的字段写插入es的语句
            //定义对象然后保存对象
            switch (sqlbeginarray[i]){
                case "compose_good_name":
                    esComposeGood.setComposeGoodName(sqlendarray[i]);
                    break;
                case "compose_good_price":
                    esComposeGood.setComposeGoodPrice(Integer.parseInt(sqlendarray[i]));
                    break;
                case "compose_good_type":
                    esComposeGood.setComposeGoodType((long)(Integer.parseInt(sqlendarray[i])));
                    break;
                case "compose_good_status":
                    esComposeGood.setComposeGoodStatus(Integer.parseInt(sqlendarray[i]));
                    break;
                case "compose_good_weight":
                    esComposeGood.setComposeGoodWeight(Integer.parseInt(sqlendarray[i]));
                    break;
                case "compose_good_icon":
                    esComposeGood.setComposeGoodIcon(sqlendarray[i]);
                    break;
                case "compose_good_sales":
                    esComposeGood.setComposeGoodSales(Integer.parseInt(sqlendarray[i]));
                    break;
                case "comment_number":
                    esComposeGood.setCommentNumber(Integer.parseInt(sqlendarray[i]));
                    break;
                case "compose_good_describe":
                    esComposeGood.setComposeGoodDescribe(sqlendarray[i]);
                    break;
            }
        }
        //插入数据
        esComposeGoodResitory.save(esComposeGood);
        System.out.println("插入数据完成");
    }
    /*es修改方法*/
    public   void esupdate(String sql){
        //提取id
        int begin = sql.indexOf("WHERE (id='")+11;
        int end = sql.length()-2;
        Integer id = Integer.parseInt(sql.substring(begin,end));
        //通过id删除es数据
        esComposeGoodResitory.deleteById((long)id);
        //通过id查找mysql数据
        ComposeGood composeGood = composeGoodMapper.eSfindComposeGoodByID(id);
        System.out.println(composeGood.toString());
        //通过添加数据到es
        // 根据查中的字段写插入es的语句
        //定义对象然后保存对象
        ESComposeGood esComposeGood = new ESComposeGood((long)composeGood.getId(),
                composeGood.getComposeGoodName(),
                composeGood.getComposeGoodPrice(),
                (long)composeGood.getComposeGoodType(),
                composeGood.getComposeGoodStatus(),
                composeGood.getComposeGoodWeight(),
                composeGood.getComposeGoodIcon(),
                composeGood.getComposeGoodSales(),
                composeGood.getCommentNumber(),
                composeGood.getComposeGoodDescribe());
        //保存数据到es中
        esComposeGoodResitory.save(esComposeGood);
        System.out.println("修改数据完成");
    }

    /*es删除方法*/
    public  void esdelete(String sql){
        int begin = sql.indexOf("WHERE (id='")+11;
        int end = sql.length()-2;
        Integer id = Integer.parseInt(sql.substring(begin,end));
        //通过responsity删除根据id；
        esComposeGoodResitory.deleteById((long)id);
        System.out.println("es删除数据成功");
    }

}

import com.seasonal.SeasonalApplication;
import com.seasonal.mapper.ComposeGoodMapper;
import com.seasonal.pojo.ComposeGood;
import com.seasonal.pojo.ESComposeGood;
import com.seasonal.service.ESComposeGoodResitory;
import com.seasonal.service.GoodsListService;
import com.sun.xml.internal.fastinfoset.QualifiedName;
import net.sf.json.JSONObject;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.sort.FieldSortBuilder;
import org.elasticsearch.search.suggest.SortBy;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.elasticsearch.core.ElasticsearchTemplate;
import org.springframework.data.elasticsearch.core.query.NativeSearchQueryBuilder;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.*;

@RunWith(SpringRunner.class)
@SpringBootTest(classes= SeasonalApplication.class)
public class Test1 {
    @Autowired
    ElasticsearchTemplate elasticsearchTemplate;
    @Autowired
    private ComposeGoodMapper composeGoodMapper;
    @Autowired
    ESComposeGoodResitory esComposeGoodResitory;
    @Test
    public void  test1(){
        List<ComposeGood> list = composeGoodMapper.findAllComposeGood();
        System.out.println(list.size());
        List<ESComposeGood> esComposeGoodList = new ArrayList<>();
        for(int i=0;i<list.size();i++){
            esComposeGoodList.add(new ESComposeGood(list.get(i).getId(),list.get(i).getComposeGoodName(),list.get(i).getComposeGoodPrice(),(long) list.get(i).getComposeGoodType(),list.get(i).getComposeGoodStatus(),list.get(i).getComposeGoodWeight(),list.get(i).getComposeGoodIcon(),list.get(i).getComposeGoodSales(),list.get(i).getCommentNumber(),list.get(i).getComposeGoodDescribe()));
            System.out.println(list.get(i).toString());
        }
        esComposeGoodResitory.saveAll(esComposeGoodList);

    }
    @Test
    public void  createIndex(){
        elasticsearchTemplate.createIndex(ESComposeGood.class);
    }
    @Test
    public  void delete(){
        //esComposeGoodResitory.deleteById((long)17);
        esComposeGoodResitory.findAll();
    }
    @Test
    public void  deleteIndex(){
        elasticsearchTemplate.deleteIndex(ESComposeGood.class);
    }
   @Test
    public void search(){
       List<ESComposeGood> list = this.esComposeGoodResitory.findByComposeGoodType(1,Sort.by("id").ascending());

       //按照价格升序查询
       //Iterable<Item> list1 = this.itemRepository.findAll(Sort.by("price").ascending());
       //按照价格降序查询
       //Iterable<Item> list2 = this.itemRepository.findAll(Sort.by("price").descending());

       for (ESComposeGood item:list){
           System.out.println(item);
       }
   }
    /**
     * 分页查找
     */
    @Test
    public void searchByPage(){
        //不是按照分类查找的
        // 构建查询条件
        NativeSearchQueryBuilder queryBuilder = new NativeSearchQueryBuilder();
        // 添加基本分词查询
        queryBuilder.withQuery(QueryBuilders.matchQuery("composeGoodName", "三"));
        //精确查找
       // queryBuilder.withQuery(QueryBuilders.termQuery("composeGoodType",1));
        //添加排序条件
        queryBuilder.withSort(new FieldSortBuilder("id"));
        // 设置分页属性：
        int page = 0;
        int size = 8;
        int currentpage = 100;
        queryBuilder.withPageable(PageRequest.of(page, size));
        // 搜索，获取结果
        Page<ESComposeGood> items = this.esComposeGoodResitory.search(queryBuilder.build());
        // 总条数

        long total = items.getTotalElements();
        System.out.println("总条数 = " + total);
        // 总页数
        System.out.println("总页数 = " + items.getTotalPages());
        // 当前页
        System.out.println("当前页：" + items.getNumber());
        // 每页大小
        System.out.println("每页大小：" + items.getSize());
        //如果输入的下一页页数大于总页数就返回最后一页数据
        if(currentpage>items.getTotalPages()){
            System.out.println(items.getTotalPages());
            page=items.getTotalPages()-1;
            queryBuilder.withPageable(PageRequest.of(page, size));
            // 搜索，获取结果
            items = this.esComposeGoodResitory.search(queryBuilder.build());
            // 总条数
        }


        for (ESComposeGood item : items) {
            System.out.println(item);
        }
    }


    /**
     * 修改删除和增加
     */

/*    public void optic(Map<Integer,String> type){
        //根据integer判断要进行的操作
        //1 add  2 update 3 delete;
       int maintype = 1;


       Set<Integer> keySet = type.keySet();
       Iterator<Integer> integerIterator = keySet.iterator();
       while (integerIterator.hasNext()){
           maintype = integerIterator.next();
           System.out.println(maintype);
       }
       String data =type.get(maintype);
       //处理SQL语句,
       switch (maintype){
           case 1:
                //字符串提取然后用switch赋值最后存储

               //
               break;
           case 2:
               //UPDATE compose_good SET compose_good_name='.' WHERE (id='100143')
               //提取id
               //只需要id然后删除然后查找，然后插入
               //data.
               break;
           case 3:
               //提取id
               //只需要id直接删除。

               break;
       }
    }*/
}

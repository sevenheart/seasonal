package com.seasonal.controller;

import com.seasonal.json.JsonUtils;
import com.seasonal.pojo.CartForm;
import com.seasonal.pojo.DetailedCommodityForm;
import com.seasonal.pojo.OrderForm;
import com.seasonal.randompass.RandomAccountPassword;
import com.seasonal.service.CartFormService;
import com.seasonal.service.OrderFormService;
import com.seasonal.vo.ResultUtil;
import net.sf.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.math.BigDecimal;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;


@Controller
public class CartFormController {

    private final CartFormService cartFormService;

    private final OrderFormService orderFormService;

    @Autowired
    public CartFormController(CartFormService cartFormService, OrderFormService orderFormService) {
        this.cartFormService = cartFormService;
        this.orderFormService = orderFormService;
    }

    @RequestMapping(value = "showCartList")
    @ResponseBody
    public Object findCartFormById(String userId) {
        List<CartForm> cartFormList = cartFormService.findCartFormById(userId);
        if(cartFormList != null && cartFormList.size() > 0){
            return ResultUtil.success(cartFormList);
        }else{
            return ResultUtil.fail("没有找到商品");
        }
    }

    @RequestMapping(value = "addCart")
    @ResponseBody
    public Object addGoodsToCart(String userId, String goodId, Integer goodCount) {
        if(cartFormService.addGoodsToCart(userId, goodId, goodCount) > 0){
            return ResultUtil.success(200, "添加购物车成功");
        }else {
            return ResultUtil.fail(500, "添加购物车失败");
        }
    }

    @RequestMapping(value = "updateGoodCount")
    @ResponseBody
    public Object updateGoodsCount(String userId, String goodId, Integer goodCount) {
        if(cartFormService.updateGoodsCount(userId, goodId, goodCount) > 0){
            return ResultUtil.success(200, "修改商品数量成功");
        }else {
            return ResultUtil.fail(500, "修改商品数量失败");
        }
    }

    @RequestMapping(value = "deleteGood")
    @ResponseBody
    public Object deleteGoodsOfCart(@RequestBody Map<String, Object> goodDataList) {
        String userId = (String) goodDataList.get("userId");
        List<String> goodIdList = (List<String>) goodDataList.get("goodIdList");
        if(cartFormService.deleteGoodsOfCart(userId, goodIdList) > 0){
            return ResultUtil.success(200, "从购物车删除商品成功");
        }else {
            return ResultUtil.fail("从购物车删除商品失败");
        }
    }

    //String orderId, String userId, Double orderMoney, String[] goodIdArray, Double[] goodPriceArray, Integer[] goodCountArray
    @RequestMapping(value = "ProvideOrderForm")
    @ResponseBody
    public Object provideOrderForm(@RequestBody Map<String, Object> orderData) {

        /**
         * 订单与订单商品添加逻辑
         */
        OrderForm orderForm = new OrderForm();
        //订单id获取
        orderForm.setOrderId(orderData.get("orderId").toString());
        //订单配送状态 0自提 1配送
        orderForm.setDeliveryWay((Integer) orderData.get("deliveryWay"));
        //订单配送地址
        orderForm.setDeliveryAddress(orderData.get("deliveryAddress").toString());
        //配送费
        orderForm.setDeliveryMoney(new BigDecimal(orderData.get("deliveryMoney").toString()));
        //订单总金额
        orderForm.setOrderMoney(new BigDecimal(orderData.get("orderMoney").toString()));
        //订单用户id
        orderForm.setOrderUserId(orderData.get("userId").toString());
        //订单创建时间
        orderForm.setCreateTime(new Date(System.currentTimeMillis()));
        //订单更新时间
        orderForm.setUpdateTime(new Date(System.currentTimeMillis()));
        //订单配送金额
        orderForm.setDeliveryMoney(new BigDecimal(0));
        //订单状态 0未支付 1已支付
        orderForm.setOrderStatus(0);
        if(orderForm.getDeliveryWay() == 0){
            //订单自取账号
            orderForm.setGetAccount(RandomAccountPassword.genRandomNum(6));
            //订单自取密码
            orderForm.setGetPassword(RandomAccountPassword.genRandomNum(6));
        }
        //订单中商品的集合
        List<DetailedCommodityForm> detailedCommodityForms = new ArrayList<>(10);
        //单商品
        DetailedCommodityForm detailedCommodityForm;
        //将商品的 价格 id 数量 从json 中取出
        JSONArray jsonPrice = JSONArray.fromObject(orderData.get("goodPriceArray"));
        JSONArray jsonId = JSONArray.fromObject(orderData.get("goodIdArray"));
        JSONArray jsonCount = JSONArray.fromObject(orderData.get("goodCountArray"));
        ArrayList<BigDecimal> goodPriceArray = (ArrayList<BigDecimal>) JsonUtils.fromListJson(jsonPrice, BigDecimal.class);
        ArrayList<String> goodIdArray = (ArrayList<String>) JsonUtils.fromListJson(jsonId, String.class);
        ArrayList<Integer> goodCountArray = (ArrayList<Integer>) JsonUtils.fromListJson(jsonCount, Integer.class);

        for (int i = 0; i < goodIdArray.size(); i++) {
            if (goodIdArray.get(i) != null) {
                //创建一个商品
                detailedCommodityForm = new DetailedCommodityForm();
                //用户id存储在详细商品表中
                detailedCommodityForm.setUserId(orderForm.getOrderUserId());
                //商品创建时间
                detailedCommodityForm.setCreateTime(new Date(System.currentTimeMillis()));
                //商品修改时间
                detailedCommodityForm.setUpdateTime(new Date(System.currentTimeMillis()));
                //商品对应id
                detailedCommodityForm.setGoodId(goodIdArray.get(i));
                //商品总价格
                detailedCommodityForm.setCommodityMoney(new BigDecimal(String.valueOf(goodPriceArray.get(i))));
                //商品数量
                detailedCommodityForm.setGoodCount(goodCountArray.get(i));
                //订单id
                detailedCommodityForm.setOrderId(orderForm.getOrderId());
                //商品状态 0固有
                detailedCommodityForm.setGoodType(0);
                //将商品添加到集合
                detailedCommodityForms.add(detailedCommodityForm);
            }
        }

        /**
         * 执行事务与返回逻辑
         */
        if (orderFormService.insertOrderForm(orderForm, detailedCommodityForms) != 0) {
            return ResultUtil.success(200, "订单生成成功");
        }
        return ResultUtil.fail(500, "订单生成失败");
    }
}

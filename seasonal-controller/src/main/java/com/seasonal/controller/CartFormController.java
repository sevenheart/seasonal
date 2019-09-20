package com.seasonal.controller;

import com.seasonal.json.JsonUtils;
import com.seasonal.pojo.CartForm;
import com.seasonal.pojo.DetailedCommodityForm;
import com.seasonal.pojo.OrderForm;
import com.seasonal.service.CartFormService;
import com.seasonal.service.OrderFormService;
import com.seasonal.vo.ResultData;
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
    public List<CartForm> findCartFormById(String userId) {
        return cartFormService.findCartFormById(userId);
    }

    @RequestMapping(value = "addCart")
    @ResponseBody
    public int addGoodsToCart(String userId, String goodId, Integer goodCount) {
        return cartFormService.addGoodsToCart(userId, goodId, goodCount);
    }

    @RequestMapping(value = "updateGoodCount")
    @ResponseBody
    public int updateGoodsCount(String userId, String goodId, Integer goodCount) {
        return cartFormService.updateGoodsCount(userId, goodId, goodCount);
    }

    /*@RequestMapping(value = "deleteGood")
    @ResponseBody
    public int deleteGoodsOfCart(@RequestBody List<String> goodDataList){
        String userId = goodDataList.get(0);
        goodDataList.remove(0);
        return cartFormService.deleteGoodsOfCart(userId, goodDataList);
    }*/
    //String orderId, String userId, Double orderMoney, String[] goodIdArray, Double[] goodPriceArray, Integer[] goodCountArray
    @RequestMapping(value = "ProvideOrderForm")
    @ResponseBody
    public Object provideOrderForm(@RequestBody Map<String, Object> orderData) {
        OrderForm orderForm = new OrderForm();
        orderForm.setOrderId((String) orderData.get("orderId"));
        orderForm.setDeliveryWay(0);
        orderForm.setOrderMoney(new BigDecimal((Double) orderData.get("orderMoney")));
        orderForm.setOrderUserId((String) orderData.get("userId"));
        orderForm.setCreateTime(new Date(System.currentTimeMillis()));
        orderForm.setUpdateTime(new Date(System.currentTimeMillis()));
        orderForm.setDeliveryMoney(new BigDecimal(0));
        orderForm.setOrderStatus(0);

        List<DetailedCommodityForm> detailedCommodityForms = new ArrayList<>(10);
        DetailedCommodityForm detailedCommodityForm;

        JSONArray jsonPrice = JSONArray.fromObject(orderData.get("goodPriceArray"));
        JSONArray jsonId = JSONArray.fromObject(orderData.get("goodIdArray"));
        JSONArray jsonCount = JSONArray.fromObject(orderData.get("goodCountArray"));
        ArrayList<BigDecimal> goodPriceArray = (ArrayList<BigDecimal>) JsonUtils.fromListJson(jsonPrice, BigDecimal.class);
        ArrayList<String> goodIdArray = (ArrayList<String>) JsonUtils.fromListJson(jsonId, String.class);
        ArrayList<Integer> goodCountArray = (ArrayList<Integer>) JsonUtils.fromListJson(jsonCount, Integer.class);

        for (int i = 0; i < goodIdArray.size(); i++) {
            if (goodIdArray.get(i) != null) {
                detailedCommodityForm = new DetailedCommodityForm();
                detailedCommodityForm.setGoodId(goodIdArray.get(i));
                detailedCommodityForm.setCommodityMoney(new BigDecimal(String.valueOf(goodPriceArray.get(i))));
                detailedCommodityForm.setGoodCount(goodCountArray.get(i));
                detailedCommodityForms.add(detailedCommodityForm);
            }
        }
        if (orderFormService.insertOrderForm(orderForm, detailedCommodityForms) != 0) {
            return ResultUtil.success(200, "订单生成成功");
        }
        return ResultUtil.fail(500, "订单生成失败");
    }
}

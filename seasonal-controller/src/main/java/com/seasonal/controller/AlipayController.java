package com.seasonal.controller;

import com.alipay.api.AlipayApiException;
import com.alipay.api.AlipayClient;
import com.alipay.api.DefaultAlipayClient;
import com.alipay.api.internal.util.AlipaySignature;
import com.alipay.api.request.AlipayTradePagePayRequest;
import com.alipay.api.request.AlipayTradeQueryRequest;
import com.seasonal.alipay.AlipayConfig;
import com.seasonal.pojo.OrderInfoForm;
import com.seasonal.service.AliPayService;
import com.seasonal.vo.ResultData;
import com.seasonal.vo.ResultEnum;
import com.seasonal.vo.ResultUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

@Controller
public class AlipayController {

    private  final AliPayService orderInfoFormService;
    @Autowired
    public AlipayController(AliPayService orderInfoFormService){this.orderInfoFormService = orderInfoFormService;}

    //支付
    @RequestMapping ( value="PayMoney")
    public String pay(String WIDout_trade_no, String WIDtotal_amount, String WIDsubject, String WIDbody , Model model, HttpServletResponse response) throws UnsupportedEncodingException {
       //
      //  String WIDout_trade_no="" String WIDtotal_amount, String WIDsubject, String WIDbody ,
        if(WIDsubject == null){
            WIDsubject = WIDout_trade_no;
        }
        if(WIDbody == null){
            WIDbody="果酷网果切购买！";
        }
        //获得初始化的AlipayClient
        AlipayClient alipayClient = new DefaultAlipayClient(AlipayConfig.gatewayUrl, AlipayConfig.app_id, AlipayConfig.merchant_private_key, "json", AlipayConfig.charset, AlipayConfig.alipay_public_key, AlipayConfig.sign_type);

        //设置请求参数
        AlipayTradePagePayRequest alipayRequest = new AlipayTradePagePayRequest();
        alipayRequest.setReturnUrl(AlipayConfig.return_url);
        alipayRequest.setNotifyUrl(AlipayConfig.notify_url);

        //商户订单号，商户网站订单系统中唯一订单号，必填
        String out_trade_no = new String(WIDout_trade_no.getBytes("ISO-8859-1"), "UTF-8");
        //付款金额，必填
        String total_amount = new String(WIDtotal_amount.getBytes("ISO-8859-1"), "UTF-8");
        //订单名称，必填
        String subject = new String(WIDsubject.getBytes("ISO-8859-1"), "UTF-8");
        //商品描述，可空
        String body = new String(WIDbody.getBytes("ISO-8859-1"), "UTF-8");

        alipayRequest.setBizContent("{\"out_trade_no\":\"" + out_trade_no + "\","
                + "\"total_amount\":\"" + total_amount + "\","
                + "\"subject\":\"" + subject + "\","
                + "\"body\":\"" + body + "\","
                + "\"product_code\":\"FAST_INSTANT_TRADE_PAY\"}");

        //若想给BizContent增加其他可选请求参数，以增加自定义超时时间参数timeout_express来举例说明
        //alipayRequest.setBizContent("{\"out_trade_no\":\""+ out_trade_no +"\","
        //		+ "\"total_amount\":\""+ total_amount +"\","
        //		+ "\"subject\":\""+ subject +"\","
        //		+ "\"body\":\""+ body +"\","
        //		+ "\"timeout_express\":\"10m\","
        //		+ "\"product_code\":\"FAST_INSTANT_TRADE_PAY\"}");
        //请求参数可查阅【电脑网站支付的API文档-alipay.trade.page.pay-请求参数】章节

        //请求
        String result = null;
        try {
            result = alipayClient.pageExecute(alipayRequest).getBody();
        } catch (AlipayApiException e) {
            e.printStackTrace();
        }

        //输出


        model.addAttribute("user",result);
        System.out.println("bbb");
       /* try {
            response.sendRedirect("/alipay/pay.jsp");
        } catch (IOException e) {
            e.printStackTrace();
        }*/
        return "pay";
    }
    //交易查询
    @RequestMapping(value = "querypay")
    public String queryPay(String WIDTQout_trade_no,String WIDTQtrade_no) throws UnsupportedEncodingException, AlipayApiException {

        //获得初始化的AlipayClient
        AlipayClient alipayClient = new DefaultAlipayClient(AlipayConfig.gatewayUrl, AlipayConfig.app_id, AlipayConfig.merchant_private_key, "json", AlipayConfig.charset, AlipayConfig.alipay_public_key, AlipayConfig.sign_type);

        //设置请求参数
        AlipayTradeQueryRequest alipayRequest = new AlipayTradeQueryRequest();

        //商户订单号，商户网站订单系统中唯一订单号
        String out_trade_no = new String(WIDTQout_trade_no.getBytes("ISO-8859-1"),"UTF-8");
        //支付宝交易号
        String trade_no = new String(WIDTQtrade_no.getBytes("ISO-8859-1"),"UTF-8");
        //请二选一设置

        alipayRequest.setBizContent("{\"out_trade_no\":\""+ out_trade_no +"\","+"\"trade_no\":\""+ trade_no +"\"}");

        //请求
        String result = alipayClient.execute(alipayRequest).getBody();

        //输出
        System.out.println(result);

        return  "";
    }

    //没有ip不可用
    //异步通知：controller去完成业务逻辑
    @RequestMapping("notify_url")

    public String notifyUrl(String out_trade_no, String trade_no, String  trade_status, HttpServletRequest request) throws AlipayApiException, UnsupportedEncodingException {
        //获取支付宝POST过来反馈信息

        Map<String,String> params = new HashMap<String,String>();
        Map<String,String[]> requestParams = request.getParameterMap();
        for (Iterator<String> iter = requestParams.keySet().iterator(); iter.hasNext();) {
            String name = (String) iter.next();
            String[] values = (String[]) requestParams.get(name);
            String valueStr = "";
            for (int i = 0; i < values.length; i++) {
                valueStr = (i == values.length - 1) ? valueStr + values[i]
                        : valueStr + values[i] + ",";
            }
            //乱码解决，这段代码在出现乱码时使用
            valueStr = new String(valueStr.getBytes("ISO-8859-1"), "utf-8");
            params.put(name, valueStr);
        }

        boolean signVerified = AlipaySignature.rsaCheckV1(params, AlipayConfig.alipay_public_key, AlipayConfig.charset, AlipayConfig.sign_type); //调用SDK验证签名

        //——请在这里编写您的程序（以下代码仅作参考）——

	/* 实际验证过程建议商户务必添加以下校验：
	1、需要验证该通知数据中的out_trade_no是否为商户系统中创建的订单号，
	2、判断total_amount是否确实为该订单的实际金额（即商户订单创建时的金额），
	3、校验通知中的seller_id（或者seller_email) 是否为out_trade_no这笔单据的对应的操作方（有的时候，一个商户可能有多个seller_id/seller_email）
	4、验证app_id是否为该商户本身。
	*/

        if(signVerified) {//验证成功
            //商户订单号
            String out_trade_no1 = new String(out_trade_no.getBytes("ISO-8859-1"),"UTF-8");

            //支付宝交易号
            String trade_no1 = new String(trade_no.getBytes("ISO-8859-1"),"UTF-8");
           // String total_amount 金额
            //交易状态
           // String trade_status1 = new String(trade_status.getBytes("ISO-8859-1"),"UTF-8");

           /* if(trade_status.equals("TRADE_FINISHED")){
                //判断该笔订单是否在商户网站中已经做过处理
                //如果没有做过处理，根据订单号（out_trade_no）在商户网站的订单系统中查到该笔订单的详细，并执行商户的业务程序
                //如果有做过处理，不执行商户的业务程序

                //注意：
                //退款日期超过可退款期限后（如三个月可退款），支付宝系统发送该交易状态通知
            }else if (trade_status.equals("TRADE_SUCCESS")){
                //判断该笔订单是否在商户网站中已经做过处理
                //如果没有做过处理，根据订单号（out_trade_no）在商户网站的订单系统中查到该笔订单的详细，并执行商户的业务程序
                //如果有做过处理，不执行商户的业务程序

                //注意：
                //付款完成后，支付宝系统发送该交易状态通知
            }*/

            System.out.println("验证成功！！支付成功了");
            orderInfoSave(out_trade_no1,trade_no1);
            System.out.println("修改订单状态成功");
        }else {//验证失败
            System.out.println("验证失败！！支付失败了");

            //调试用，写文本函数记录程序运行情况是否正常
            //String sWord = AlipaySignature.getSignCheckContentV1(params);
            //AlipayConfig.logResult(sWord);
        }

        System.out.println("反正进来了");

        return  "redirect:/order/view/orderCome.html";
    }

    /**
     *1.存储支付信息涉及表order_info_form
     * 2.修改订单表的状态为已支付。
     * @param out_trade_no 系统的订单id
     * @param trade_no  交易成功的交易订单id

     */
    public ResultData orderInfoSave(String out_trade_no, String trade_no){

        OrderInfoForm orderInfoForm = new OrderInfoForm();
        //支付宝交易id
        orderInfoForm.setOrderId(trade_no);
        //支付平台
        orderInfoForm.setPayPlatform("支付宝");
        //订单id
        orderInfoForm.setUserOrderId(out_trade_no);
        //交易信息插入order_info_Form表
        //修改订单信息为已支付
        //两个步骤成功返回true，反之返回false
         boolean statue = orderInfoFormService.paySuccess(orderInfoForm);
            System.out.println("返回结果时"+statue);
         return ResultUtil.success(ResultEnum.SUCCESS);
    }





}

package com.seasonal.alipay;

import java.io.FileWriter;
import java.io.IOException;

/* *
 *类名：AlipayConfig
 *功能：基础配置类
 *详细：设置帐户有关信息及返回路径
 *修改日期：2017-04-05
 *说明：
 *以下代码只是为了方便商户测试而提供的样例代码，商户可以根据自己网站的需要，按照技术文档编写,并非一定要使用该代码。
 *该代码仅供学习和研究支付宝接口使用，只是提供一个参考。
 */

public class AlipayConfig {

//↓↓↓↓↓↓↓↓↓↓请在这里配置您的基本信息↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

    // 应用ID,您的APPID，收款账号既是您的APPID对应支付宝账号
    public static String app_id = "2016101100663369";

    // 商户私钥，您的PKCS8格式RSA2私钥
    public static String merchant_private_key ="MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC6xmu2EEUi3jauvMHnQ5oQKtDWExzJOEsKh0s7mq3xqcPMFKXeSX0q5TxEcqoODJevr99qxpQp0rvTyDIw0yi5mkTvrv4Z4onltKqdIYFwhbfDP8IhykIEP30s/Bnm5XNTLveZ90TfAig2GIlgaMoCnoSzzMjvdxcgjrjCeWd6qGuBlXkZBHmxc6j7JRQumuQqDbUicj7YMmhPBcGzzeDJSZdTFMwt5+JodjdUuEWg959EK+4egF56M/sje0XMrrsGOIUvzRpw80Bdf/o72JE8EQ4ZaqIsnckIMrbc+w8VQxYmoIS2pUooNISsAWc/nXxXBwBms/DcNqu3SnSVA+EDAgMBAAECggEAWYwaRi7kxsPdWceb+8H4knnEqG5/ZaX8rG6TTl9puCyZeDYKFFoNjcxcKcED8TpuW0gqCKpujOLBNNeN4MTMiLgDBxtSLpzjWmNVTYKr6YPix9TAwayUHC9IV5IC5SXrNd2VzpazyWviVZVMABIdkEXp/75WNCFX0D89K9hDGZXmI0+ffZjSMvlEzpbEAGr1vfxiBVMHr9zsiNWvX+d6s8oYm94xpxDJtuwUeXMOqj4EEVZvq0C36cmuhDhNsLkCKlx6Co74FAwX1xaeV9zVFcBYCbfERrw6KcPXiCsFKI1dauGsUwUFSdLj+ZXHx23ZhRGsWVNi4sbfqP4KVVMUCQKBgQDjx3mCFzUPwWVIa/CZfh9/Sv02Jx2vzsTZsYaYUXppXGgmxNp4GI7tAb5w2hwdbsFiqL7+LFhH1cnIVrpp6hzXhDTYGI09lPMw2ff4gu/ywionNdLqGonL77mS49VB5S5SNN9eLbYxh0Z0FdlyCPS4blzgoUZpSpyYE7Wd7XIlzwKBgQDR6mi5Kpf46Qd+kUcl+JZDTe74JwyG/wbhTindWPttwIxP7OsyTVU8rV2lNW8gFDD0Zt7e53CIr4f9tkjESCFAZtZlzPYTFI7m7AB6pHDge1cu5TlGMr7ATsrAMytINYs0ZJufMUf/kYWPO/lszLJrna6qveCaGlFGpqv1TVuSjQKBgGQ2IWYzkZux6T54hqzxCSh2tHo7sVrkrEReTyn6RtHN3uCXoMpPe6oYJ1H9E3t7e8dNGGI43koUa6chSPhKEJBc0Ob1vkYGnwuyCd+is7Bo7iS8EGQAcvlvKYTPicZo7v0p18/Wap7VthBigH0kJY5yt5f4PEMcmVJq8W9exOaPAoGBAJHhjt/IGw9Pmva5rbFUvdCOU5m/QXR7vWNMt8ltMmaGnrxY0OcHWUouzVqn9M9dWNwwtYhBXTKQkjieupk1623fSfY7Z3PBIMKYloikyREohmE/yfrf/zKUT1Ec/mJTW6eQl5odXITes+vj6SZUZ1ZkoeNky7csvPkVkYGLPi1tAoGBAN+38abLvnd7F0llYvtqzEJCsHp4Pjlc015qPPGDlcCSr/SDYlUwJuJQ8Xiib7KFrYjNS17QCvzLA9ICKXLHm1XfMDNkW5o/CbI0PJ/10pSetmV6qPGV2+3mBNrJQjuSjplyr2qeBEHI2kUHWS7a1AGKCwFJqQ5D5Fwj23YODorx";
    // 支付宝公钥,查看地址：https://openhome.alipay.com/platform/keyManage.htm 对应APPID下的支付宝公钥。
    public static String alipay_public_key = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA6aKKBemiKo7Y1XouiKF4UA2NwL9QIVnWLBVwWi41otVPq9GeuWoQt/EovAAlnRFQMen3I/4kD05OjLtRa3+aO0j07m7ta/FwWNlzWjo4Um4neQHefgo/jwDYJk/TXtpYcyHzLlmRz/vdQPY91OCeTaRdPJZ5FrMJ9F1yGWC9mvUdtt3GDW5omvICR9Deq0vuKF5iGb5nCJJO9Bhkw4Zm6aG5Q11PHa65gyNGQydumZP+8qjwbWy4tejaqMRT6QCwTyih81G1GWtAJK9tccaWTDui53bjtHd3pCNaobzcYVyd9eKne0kjyp/EO3eVHypSAjq5bO7BP5YodcvnzdpE0QIDAQAB";
    // 服务器异步通知页面路径  需http://格式的完整路径，不能加?id=123这类自定义参数，必须外网可以正常访问
    public static String notify_url = "http://localhost:8080/notify_url";

    // 页面跳转同步通知页面路径 需http://格式的完整路径，不能加?id=123这类自定义参数，必须外网可以正常访问
    public static String return_url = "https://127.0.0.1/notify_url";//alipay/retrun_url.jsp

    // 签名方式
    public static String sign_type = "RSA2";

    // 字符编码格式
    public static String charset = "utf-8";

    // 支付宝网关
    public static String gatewayUrl = "https://openapi.alipaydev.com/gateway.do";

    // 支付宝网关
    public static String log_path = "E:\\img\\";


//↑↑↑↑↑↑↑↑↑↑请在这里配置您的基本信息↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

    public static void logResult(String sWord) {
        FileWriter writer = null;
        try {
            writer = new FileWriter(log_path + "alipay_log_" + System.currentTimeMillis()+".txt");
            writer.write(sWord);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (writer != null) {
                try {
                    writer.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}


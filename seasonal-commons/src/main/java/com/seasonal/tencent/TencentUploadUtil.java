package com.seasonal.tencent;


import com.qcloud.cos.COSClient;
import com.qcloud.cos.ClientConfig;
import com.qcloud.cos.auth.BasicCOSCredentials;
import com.qcloud.cos.auth.COSCredentials;
import com.qcloud.cos.exception.CosClientException;
import com.qcloud.cos.exception.CosServiceException;
import com.qcloud.cos.model.*;
import com.qcloud.cos.region.Region;

import java.io.File;

/**
 * 腾讯云cos服务器上传工具类
 */
public class TencentUploadUtil {
    //腾讯云的SecretId
    private static String secretId = "AKIDmMiqkPnBIBqGRNnaqqb5KNBmBLFuYdfS";
    //腾讯云的SecretKey
    private static String secretKey = "kIbf3D7nDNErJWTAcpogIo9GBtQm070d";
    //腾讯云的region(bucket所在地区)
    private static String region = "ap-shanghai";

    public static String imgUrl = "https://seasonal-1300148510.cos.ap-shanghai.myqcloud.com";

    /**
     * 上传文件
     *
     * @param path 文件服务器下的根路径,即key,如: doc/picture.jpg
     * @param file
     * @return 成功返回文件路径, 失败返回null
     */
    public static String uploadFile(String path, File file) {
        // 1 初始化用户身份信息(secretId, secretKey)
        COSCredentials cred = new BasicCOSCredentials(secretId, secretKey);
        // 2 设置 bucket 区域
        ClientConfig clientConfig = new ClientConfig(new Region(region));
        // 3 生成 cos 客户端
        COSClient cosClient = new COSClient(cred, clientConfig);
        try {
            PutObjectRequest putObjectRequest = new PutObjectRequest("seasonal-1300148510", path, file);
            PutObjectResult putObjectResult = cosClient.putObject(putObjectRequest);
            String etag = putObjectResult.getETag();  // 获取文件的 etag
            return etag;
        } catch (CosServiceException e) {
            //失败，抛出 CosServiceException
            e.printStackTrace();
        } catch (CosClientException e) {
            //失败，抛出 CosClientException
            e.printStackTrace();
        } finally {
            // 关闭客户端
            cosClient.shutdown();
            return "";
        }
    }


    /**
     * 删除用户头像
     *
     * @param fileKey  img/user/。。.jpg
     */
    public static  void deleteFile(String fileKey){
        // 1 初始化用户身份信息(secretId, secretKey)
        COSCredentials cred = new BasicCOSCredentials(secretId, secretKey);
        // 2 设置 bucket 区域
        ClientConfig clientConfig = new ClientConfig(new Region(region));
        // 3 生成 cos 客户端
        COSClient cosClient = new COSClient(cred, clientConfig);
        try {
            // 指定对象所在的存储桶
            String bucketName = "seasonal-1300148510";
            // 指定对象在 COS 上的对象键
            String key = fileKey;
            cosClient.deleteObject(bucketName, key);
        } catch (CosServiceException serverException) {
            serverException.printStackTrace();
        } catch (CosClientException clientException) {
            clientException.printStackTrace();
        }finally {
            cosClient.shutdown();
        }

    }
}
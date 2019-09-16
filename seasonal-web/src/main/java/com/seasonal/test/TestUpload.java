package com.seasonal.test;

import com.seasonal.tencent.TencentUploadUtil;

import java.io.File;

public class TestUpload {
    public static void main(String[] args) {
        //1.创建文件
        File file = new File("E:\\640.png");
        //2.调用方法，传入要在服务器上保存的目录及文件名    和  文件
        TencentUploadUtil.uploadFile("img/a.png",file);
    }
}

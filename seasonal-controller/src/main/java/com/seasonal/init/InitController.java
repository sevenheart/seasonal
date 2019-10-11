package com.seasonal.init;

import com.seasonal.controller.SeckillGoodController;
import com.seasonal.pojo.OrderForm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.concurrent.CountDownLatch;

@Controller
public class InitController {

    private static final int THREAD_NUM = 500;
    private static int mobile = 0;
    @Autowired
    private SeckillGoodController seckillGoodController;

    @RequestMapping(value = "InitSeckillThread")
    public void generateMultiThread(Integer goodId) {
        System.out.println("初始化线程");
        // countDownLatch这个类使一个线程等待其他线程各自执行完毕后再执行。
        //通过一个计数器来实现的，计数器的初始值是线程的数量。每当一个线程执行完毕后，
        // 让计数器的值就-1，当计数器的值为0时，表示所有线程都执行完毕，
        // 然后在闭锁上等待的线程就可以恢复工作了。
        CountDownLatch countDownLatch = new CountDownLatch(1);
        for (int i = 0; i < THREAD_NUM; i++) {
            new Thread(new RunThread(countDownLatch, goodId)).start();
        }
        //启动多个线程  将count值减1
        countDownLatch.countDown();
    }

    private class RunThread implements Runnable {
        CountDownLatch countDownLatch;
        Integer goodId;

        public RunThread(CountDownLatch countDownLatch, Integer goodId) {
            this.countDownLatch = countDownLatch;
            this.goodId = goodId;
        }

        @Override
        public void run() {
            try {
                // 线程等待
                // 调用await()方法的线程会被挂起，它会等待直到count值为0才继续执行
                countDownLatch.await();
                System.out.println("========线程执行调用发送消息========");
                mobile = mobile + 1;
                OrderForm orderForm = new OrderForm();

                orderForm.setOrderUserId(String.valueOf(mobile));
                orderForm.setGoodId(goodId);
                orderForm.setOrderId(String.valueOf(mobile));

                seckillGoodController.seckillGood(orderForm);
            } catch (InterruptedException e) {
                System.out.println("========线程执行发生异常========");
                e.printStackTrace();
            }
        }
    }
}

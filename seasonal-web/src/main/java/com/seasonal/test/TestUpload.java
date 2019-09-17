package com.seasonal.test;

public class TestUpload {
    public static class ThreadPrinter implements Runnable {
        private String name;
        private Object prev;
        private Object self;

        private ThreadPrinter(String name, Object prev, Object self) {
            this.name = name;
            this.prev = prev;
            this.self = self;
        }

        @Override
        public void run() {
            int count = 10;
            while (count > 0) {
                synchronized (prev) {
                    synchronized (self) {
                        System.out.print(name);
                        count--;
                        self.notifyAll();
                    }
                    try {
                        prev.wait();
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
            }
        }
    }

    public static void main(String[] args) {
        Object a = new Object();
        Object b = new Object();
        Object c = new Object();
        ThreadPrinter pa = new ThreadPrinter("A", a, b);
        ThreadPrinter pb = new ThreadPrinter("B", b, c);
        ThreadPrinter pc = new ThreadPrinter("C", c, a);
        new Thread(pa).start();
        new Thread(pb).start();
        new Thread(pc).start();
    }
}
package com.seasonal.randompass;

import java.util.Random;

public class RandomAccountPassword {
    /**
     * 随机生成count位的字母加数字
     *
     * @param count 位数
     * @return 组合码
     */
    public static String genRandomNum(int count) {
        int maxNum = 36;
        int i;
        char[] str = {'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K',
                'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W',
                'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'};
        StringBuilder pwd = new StringBuilder();
        Random r = new Random();
        while (count > 0) {
            i = Math.abs(r.nextInt(maxNum));
            if (i >= 0 && i < str.length) {
                pwd.append(str[i]);
                count--;
            }
        }
        return pwd.toString();
    }

}

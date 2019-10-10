package com.seasonal;

import java.text.SimpleDateFormat;
import java.util.Calendar;

public class Main {
    private static String seckTime = "";

    public static void main(String[] args) {
        boolean flag = false;
        String[] time = {"08", "12", "18", "20"};
        int reTime = Integer.parseInt(String.valueOf(Calendar.getInstance().get(Calendar.HOUR_OF_DAY)));
        String newSeckHour = "";
        String seckHour = "";
        for (String indexTime : time) {
            newSeckHour = indexTime;
            if (Integer.parseInt(indexTime) > reTime) {
                break;
            }
            seckHour = indexTime;
        }
        Calendar calendar = Calendar.getInstance();
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        if (flag) {
            seckTime = dateFormat.format(calendar.getTime()) + " " + newSeckHour + ":00:00";
        } else {
            seckTime = dateFormat.format(calendar.getTime()) + " " + seckHour + ":00:00";
        }
        System.out.println(seckTime);
    }
}

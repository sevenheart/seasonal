package com.seasonal.json;


import net.sf.json.JSONArray;

import java.util.List;


/**
 *  * Json工具类，实现JSON与Java Bean的互相转换
 *  
 */
public class JsonUtils {
    public static <T> List<T> fromListJson(JSONArray str, Class<T> clazz) {
        return (List<T>) JSONArray.toCollection(str, clazz);
    }
}

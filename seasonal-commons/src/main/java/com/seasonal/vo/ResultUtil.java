package com.seasonal.vo;

/**
 * 生成ResultData的结果工具类
 *
 */
public class ResultUtil {
    /**
     * 成功且只传数据
     * 返回code为：200
     * 返回msg为：成功
     * @param data
     * @return
     */
    public static ResultData success(Object data){
        return new ResultData(ResultEnum.SUCCESS.getCode(),ResultEnum.SUCCESS.getMsg(),data);
    }

    /**
     * 成功只传递code和message
     * 返回code为：200
     * 返回msg为：成功
     * @param code
     * @param msg
     * @return
     */
    public static ResultData success(Integer code,String msg){
        if (null==msg) msg=ResultEnum.SUCCESS.getMsg();
        if (null==code) code=ResultEnum.SUCCESS.getCode();
        return new ResultData(code,msg);
    }

    /**
     * 成功只传递SUCCESS枚举类
     *  返回code为：200
     *   返回msg为：成功
     * @param resultEnum
     * @return
     */
    public static ResultData success(ResultEnum resultEnum){
        return success(resultEnum.getCode(),resultEnum.getMsg());
    }

    /**
     * 失败只传递message
     * 返回code：100
     * 返回message：失败
     * @param msg
     * @return
     */
    public static ResultData fail(String msg){
        if (null==msg) msg=ResultEnum.FAIL.getMsg();
        return new ResultData(ResultEnum.FAIL.getCode(),msg);
    }

    /**
     * 失败只传递code 和message
     *      * 返回code：100
     *      * 返回message：失败
     * @param code
     * @param msg
     * @return
     */
    public static ResultData fail(Integer code,String msg){
        if (null==msg) msg=ResultEnum.FAIL.getMsg();
        if (null==code) code=ResultEnum.FAIL.getCode();
        return new ResultData(code,msg);
    }

    /**
     * 失败只传递FailEnum
     *      * 返回code：100
     *      * 返回message：失败
     * @param resultEnum
     * @return
     */
    public static ResultData fail(ResultEnum resultEnum){
        return fail(resultEnum.getCode(),resultEnum.getMsg());
    }

}

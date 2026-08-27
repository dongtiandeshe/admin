/*
 * @Author: Duanyt
 * @Date: 2026-08-25 09:23:56
 * @LastEditTime: 2026-08-27 14:44:52
 * @LastEditors: Duanyt
 * @Description: 
 * 封装axios请求    
 * 要求1： 请求取消      使用场景类似于节流，如查询请求，重复点击搜索按钮，取消旧的请求，发送新的请求
 * 要求2： 防重复提交     使用场景类似于防抖，如修改、删除请求，点击保存按钮，发送旧的请求，限制新的请求
 * 要求3： 全局错误码映射   
 */


import { message } from "antd";
import axios, { type AxiosResponse, type InternalAxiosRequestConfig } from "axios";

interface ResponseData<T = unknown> {
  code: number;
  data: T;
  message: string;
}

interface CustomRequestConfig extends InternalAxiosRequestConfig {
  _pendingKey?: string; // 用来存请求唯一标识，方便删除
  _abortController?: AbortController;
}

// 全局错误码映射表（业务码 -> 用户友好提示）
const ERROR_CODE_MAP: Record<number, string> = {
  1001: '账户余额不足，请充值后再试',
  1002: '库存不足，请调整购买数量',
  1003: '订单已支付，无法重复操作',
  1004: '验证码已过期，请重新获取',
  1005: '没有操作权限，请联系管理员',
  // ... 可以根据后端文档继续补充
};
// 实现取消请求、防重操作
const pendingMap = new Map<string, AbortController>();

const getRequestKey = (config: CustomRequestConfig): string => {
  const method = config.method?.toLowerCase() ?? "get";
  const url = config.url ?? "";
  const params = config.params ?? {};
  const data = config.data ?? {};
  // 解决对象属性顺序不一致，导致key不一样
  const sortedParams = Object.keys(params).sort();
  const sortedData = Object.keys(data).sort();
  return `${method}:${url}:${JSON.stringify(sortedParams.reduce((acc, key) => ({ ...acc, [key]: params[key] }), {}))}:${JSON.stringify(sortedData.reduce((acc, key) => ({ ...acc, [key]: data[key] }), {}))}`;
};
// 全局axios默认值
// axios.defaults.headers.common['Authorization'] = 'bear '+ localStorage.getItem('token');

// 创建实例                                     // apifox本地mock
const ajax = axios.create({baseURL: import.meta.env.VITE_API_BASE_URL || '' , timeout: 10000})        //创建实例的时候设置默认值

// 创建实例后设置全局axios默认值     
// ajax.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


// 请求拦截器
ajax.interceptors.request.use(
  function (config: CustomRequestConfig) {
    const controller = new AbortController();
    const token = localStorage.getItem("token");
    const requestKey = getRequestKey(config);
    config._pendingKey = requestKey;

    // 在这里对请求进行拦截，怎么判断该请求是否与正在等待的请求是同一个人
    const previousController = pendingMap.get(requestKey);
    if (previousController) {
      // 在这进行判断、是否为get请求，get请求进行取消操作，非get请求拦截当前的请求
      if(config.method?.toLowerCase() === 'get'){
        previousController.abort();
        pendingMap.delete(requestKey);
      }else{
        return Promise.reject(new Error('操作正在处理中，请勿重复提交'));
      }
    }
    // 初始化每个请求
    config.signal = controller.signal;
    pendingMap.set(requestKey, controller);
    config._abortController = controller;

    if (token) {
      const headers = config.headers ?? {};
      const nextHeaders = {
        ...headers,
        Authorization: `Bearer ${token}`,
      };
      config.headers = nextHeaders as typeof headers;
    }

    return config;
  },
  function (error) {
    // 对错误请求做些处理
    return Promise.reject(error);
  },
);


// 响应拦截器
ajax.interceptors.response.use(
  function (response: AxiosResponse<ResponseData>): AxiosResponse<ResponseData> | Promise<AxiosResponse<ResponseData>> {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    const requestConfig = response.config as CustomRequestConfig;
    if (requestConfig._pendingKey && pendingMap.get(requestConfig?._pendingKey)===requestConfig._abortController) {
      pendingMap.delete(requestConfig._pendingKey);
    }

    switch (response.data.code) {
      case 401:
        localStorage.removeItem("token");
        window.location.href = "/login";
        return Promise.reject('登录失效');
      case 0:
        return response;
      default:{
        // 1. 优先查表，查不到就用后端返回的 message
        const customMsg = ERROR_CODE_MAP[response.data.code];
        const finalMsg = customMsg || response.data.message || '系统繁忙，请稍后重试';
        // 2. 弹窗提示
        message.error(finalMsg);
        
        // 3. 抛出错误（包含完整的 message，方便业务层捕获）
        return Promise.reject(new Error(finalMsg));
      }
    }
  },
  function (error) {
    if(axios.isCancel(error)){
      return Promise.reject(error);
    }
    const requestConfig = error.config as CustomRequestConfig | undefined;
    /**
     * 删除前的确认-高并发场景可能会出现以下bug
     * 请求A发出，map存入请求A的controller
     * 请求B发出，请求A还没有完成，执行取消逻辑，把请求B的controller存入map中
     * 请求A被取消了，进入了错误拦截器中（当前代码），但是map中目前保存的是B的controller，此时删除的是B的controller，所以要进行controller的判断
     */
    if (requestConfig?._pendingKey && pendingMap.get(requestConfig?._pendingKey)===requestConfig._abortController) {
      pendingMap.delete(requestConfig._pendingKey);
    }

    // 添加中文提示，用户友好
    if (error.code === "ECONNABORTED" || error.message.includes("timeout")) {
      message.error("网络请求超时，请检查网络环境");
    } else if (error.message.includes("Network Error")) {
      message.error("网络连接异常，请检查网络");
    } else {
      message.error("系统异常，请稍后重试");
    }
    return Promise.reject(error);
  },
);

export default ajax;
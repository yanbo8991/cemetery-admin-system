import axios from 'axios';

const request = axios.create({
    baseURL: 'http://101.43.20.178:8085', // 设置基础URL
});

// 请求拦截器
request.interceptors.request.use(
    config => {
        // 在发送请求之前做一些处理
        const token = localStorage.getItem('token'); // 尝试获取token
        if (token)  config.headers.Authorization = token; // 获取则插入请求头中
        return config;
    },
    error => {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

// 响应拦截器
request.interceptors.response.use(
    response => {
        // 对响应数据做一些处理
        let { data } = response;
        let { code, message } = data;
        if (code === 10000) return data.data; // 接口返回数据成功
        if (code === 10001) return Promise.reject(message); // 接口返回数据失败
    },
    error => {
        // 对响应错误做些什么
        return Promise.reject(error);
    }
);

export default request;

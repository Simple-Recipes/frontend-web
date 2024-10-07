import axios from 'axios';

const API_URL = 'http://localhost:8080'; // API的基础URL

// 创建axios实例
const apiClient = axios.create({
    baseURL: API_URL,
    headers: { 'Content-Type': 'application/json' },
});

// 添加请求拦截器来附加Token
apiClient.interceptors.request.use(
    (config) => {
        const userToken = localStorage.getItem('token'); // 用户令牌
        if (userToken) {
            config.headers['User-Token'] = userToken; // 使用用户令牌头部字段名称
            console.log("User Token added to request headers:", userToken);
        }
        
        //console.log("Axios request config:", config);
        return config;
    },
    (error) => {
        console.error("Error in request interceptor:", error);
        return Promise.reject(error);
    }
);

// 添加响应拦截器来记录响应数据
apiClient.interceptors.response.use(
    (response) => {
        //console.log("Axios response data:", response.data);
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiClient;

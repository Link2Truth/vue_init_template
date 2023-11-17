import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

const useTokenAuthorization = false
const instance: AxiosInstance = axios.create({
    baseURL: '/api',
    timeout: 3000,
})//创建axios实例
instance.interceptors.request.use(//实例中的请求拦截器
    (config: AxiosRequestConfig | any) => {
        //请求成功的拦截
        return config
    },
    (error: AxiosError) => {
        //请求失败的拦截
        return Promise.reject(error)
    }
)
instance.interceptors.response.use(//实例中的响应拦截器
    (response: AxiosResponse) => {
        //响应成功的拦截
        return response
    },
    (error: AxiosError) => {
        //响应失败的拦截
        return Promise.reject(error)
    }
)

// 创建请求拦截
instance.interceptors.request.use(
    (config: AxiosRequestConfig | any) => {
        // 如果开启 token 认证
        if (useTokenAuthorization) {
            config.headers["Authorization"] = localStorage.getItem("token"); // 请求头携带 token
        }
        // 设置请求头
        if (!config.headers["content-type"]) { // 如果没有设置请求头
            if (config.method === 'post') {
                config.headers["content-type"] = "application/x-www-form-urlencoded"; // post 请求
            } else {
                config.headers["content-type"] = "application/json"; // 默认类型
            }
        }
        return config;
    },
    (error: AxiosError) => {
        console.log(error);
        Promise.reject(error);
    }
);


// 创建响应拦截
instance.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error: AxiosError) => {
        let message = "";
        if (error && error.response) {
            switch (error.response.status) {
                case 401:
                    ElMessage.error("认证失败，无法访问系统资源");
                    break;
                case 403:
                    ElMessage.error("当前操作没有权限");
                    break;
                case 404:
                    ElMessage.error("访问资源不存在");
                    break;
                default:
                    ElMessage.error("系统未知错误，请反馈给管理员");
                    break;
            }
        }
        return Promise.reject(message);
    }
);

export default instance;

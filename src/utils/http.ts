// @/utils/http.js
import axios from 'axios'

// axios请求基础实例
const httpInstance = axios.create({
    baseURL: 'http://127.0.0.1:8080',
    timeout: 5000
})

// axios请求拦截器
httpInstance.interceptors.request.use(config => {
    return config
}, e => Promise.reject(e))

// axios响应拦截器
httpInstance.interceptors.response.use(res => res.data, e => {
    return Promise.reject(e)
})

export default httpInstance
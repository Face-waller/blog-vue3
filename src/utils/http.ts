/*配置axios*/

import { ElMessage } from 'element-plus'

import axios from 'axios'

import {store} from '../store/index'

// BaseUrl
const baseUrl:string =
    process.env.NODE_ENV === 'development' ?
    'http://localhost:3000/api' :
    'http://api.blogll.cn/api'


axios.defaults.baseURL = baseUrl
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8'; /*application/x-www-form-urlencoded*/
// 超时时间
axios.defaults.timeout = 6000;

// 请求时页面遮罩
function addSpin():void {
    // 加蒙版
    store.commit('showLoading')
}

function removeSpin():void {
    // 去蒙版
    store.commit('closeLoading')
}

//配置发送请求前的拦截器 可以设置token信息
axios.interceptors.request.use(
    config => {
        addSpin();
        return config
    }, error => {
        removeSpin();

        ElMessage.error(error.message)
        return Promise.reject(error)
    }
);

// 配置响应拦截器
axios.interceptors.response.use(
    res => {
        removeSpin();

        // 判断请求是否成功
        if (res.data.code === -1) {
            return Promise.reject(res);
        } else if (res.data && res.data.code !== 0 ) {
            return Promise.reject(res);
        }

        // 成功
        return Promise.resolve(res.data) // 这里直接返回data, 即接口返回的所有数据
    }, error => {
        removeSpin();

        // 判断请求错误类型
        if (error && error.response) {

            switch (error.response.status) {

                case 400:
                    error.message = '接口请求错误'
                    break
                case 401:
                    error.message = '接口未授权'
                    break
                case 403:
                    error.message = '接口拒绝访问'
                    break
                case 404:
                    error.message = '接口找不到'
                    break
                case 408:
                    error.message = '接口请求超时'
                    break
                case 500:
                    error.message = '服务器内部错误'
                    break
                case 501:
                    error.message = '接口服务未实现'
                    break
                case 502:
                    error.message = '网关错误'
                    break
                case 503:
                    error.message = '服务不可用'
                    break
                case 504:
                    error.message = '网关超时'
                    break
                case 505:
                    error.message = 'HTTP版本不受支持'
                    break
            }
        }
        if (error.code === 'ECONNABORTED') {
            ElMessage.error('接口访问超时')
        } else if (error.response.status !== 500) {
            ElMessage.error(error.message);
        }

        // 判断是否登录失效，按照实际项目的接口返回状态来判断
        return Promise.reject(error);
    }
)

export {axios,baseUrl}
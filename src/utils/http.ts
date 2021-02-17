/*
* 配置axios
* */

import axios from 'axios'

import {store} from '../store/index'

// BaseUrl
const baseUrl:string = 'http://api.blogll.cn';

// 后缀
const suffix:string = '/api'

axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? baseUrl + suffix : baseUrl + suffix;
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

        alert(error.message)
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

        alert(error.message)

        // 判断是否登录失效，按照实际项目的接口返回状态来判断
        return Promise.reject(error);
    }
)

export {axios,baseUrl}
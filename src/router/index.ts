import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router'

const history = createWebHashHistory()

const routes:RouteRecordRaw[] = [

]

// 在 Vue-router新版本中，需要使用createRouter来创建路
export default createRouter({
    // 指定路由的模式,此处使用的是hash模式
    history,
    // 路由地址
    routes: routes
})

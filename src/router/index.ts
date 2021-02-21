import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router'

const history = createWebHashHistory()

const routes:RouteRecordRaw[] = [
    {
        path:'/',
        component: () => import('../pages/Layout.vue'),
        redirect:"/index",
        children:[
            {path: '/index', name: 'index', component: ()=> import('../pages/other/Index.vue')},
            {path: '/log', name: 'log', component: ()=> import('../pages/other/Log.vue')},
            {path: '/about', name: 'about', component: ()=> import('../pages/other/About.vue')},
            {path: '/userAgreement', name: 'agreement', component: ()=> import('../pages/user/UserAgreement.vue')},
            {path: '/login', name: 'login', component: ()=> import('../pages/user/Login.vue')},
            {path: '/register', name: 'register', component: ()=> import('../pages/user/Register.vue')},
            {path: '/articleRead', name: 'articleRead', component: ()=> import('../pages/article/ArticleReadOfCkEditor.vue')},
            {path: '/fullTextSearch', name: 'fullTextSearch', component: ()=> import('../pages/article/FullTextSearchList.vue')},
            {path: '/myArticle', name: 'myArticle', component: ()=> import('../pages/article/MyArticleList.vue')},
            {path: '/typeArticle', name: 'typeArticle', component: ()=> import('../pages/article/TypeArticleList.vue')},
            {path: '/leaveMessage', name: 'leaveMessage', component: ()=> import('../pages/other/LeaveMessage.vue')},
            /* route("/articleWrite","articleWrite","/article/ArticleWriteOfCkEditor"), // thymeleaf 请求路径写死 ，写文章按钮
            route("/modifyArticle","modifyArticle","/article/ModifyArticleOfCkEditor"), // thymeleaf 请求路径写死 ，编辑文章按钮*/
        ]
    },
]

// 在 Vue-router新版本中，需要使用createRouter来创建路
export default createRouter({
    // 指定路由的模式,此处使用的是hash模式
    history,
    // 路由地址
    routes: routes,
    // 加载页面不在顶部问题
    scrollBehavior (to, from, savedPosition) {
        return { left: 0, top: 0}
    }
})


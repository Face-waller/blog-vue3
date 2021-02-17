import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router'

const history = createWebHashHistory()

// 路由懒加载
function route (path:string, name:string, filePath:string) {
    return {
        path:path,
        name:name,
        component: () => import('../pages' + filePath)
    }
}

const routes:RouteRecordRaw[] = [
    {
        path:'/',
        component: () => import('../pages/Layout.vue'),
        redirect:"/index",
        children:[
            route("/index", "index", "/other/Index.vue"),
            route("/log", "log", "/other/Log.vue"),
            route("/about", "about", "/other/About.vue"),
            route("/userAgreement", "agreement", "/user/UserAgreement.vue"),
            route("/login", "login", "/user/Login.vue"),
            route("/register", "register", "/user/Register.vue"),
            route("/articleRead","articleRead","/article/ArticleReadOfCkEditor.vue"),
            route("/fullTextSearch","fullTextSearch","/article/FullTextSearchList.vue"),
            route("/myArticle", "myArticle", "/article/MyArticleList.vue"),
            route("/typeArticle", "typeArticle", "/article/TypeArticleList.vue"),
            route("/leaveMessage", "leaveMessage", "/other/LeaveMessage.vue"),
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

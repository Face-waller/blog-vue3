<template>
    <div class="main" @click="interfaceClick">
        <!--头部-->
        <div class="fq-header">

            <!--正常header-->
            <div class="fq-header__normal" ref="normalDiv">
                <router-link :to="{ name:'index' }">
                    <a>
                        <img class="logo" src="../assets/res/img/newLogo.png" alt="">
                    </a>
                </router-link>

                <!--大屏显示-->
                <div class="header-menu--big">
                    <router-link :to="{ name:'index'}" :class="headerRadio === 1 ? 'active' : ''" @click.native.stop="headerRadio = 1">首页</router-link>
                    <router-link :to="{ name:'leaveMessage' }" :class="headerRadio === 2 ? 'active' : ''" @click.native.stop="headerRadio = 2">留言</router-link>
                    <router-link :to="{ name:'log', query: { page:1 } }" :class="headerRadio === 3 ? 'active' : ''" @click.native.stop="headerRadio = 3">日志</router-link>
                    <router-link :to="{ name:'about' }" :class="headerRadio === 4 ? 'active' : ''" @click.native.stop="headerRadio = 4">关于</router-link>
                </div>

                <!--小屏显示-->
                <!-- <div class="header-menu&#45;&#45;small">

                 </div>-->

                <a style="float: right;cursor: pointer" @click="drawer = true"><img src="../assets/images/head.png" alt=""></a>
            </div>

            <!--隐藏header-->
            <div class="fq-header__hidden">
                <router-link :to="{ name:'index' }">
                    <a>
                        <img class="logo" src="../assets/res/img/newLogo.png" alt="">
                    </a>
                </router-link>

                <!--大屏显示-->
                <div class="header-menu--big" v-if="isArticleReadPage">
                    <!--如果在文章页则显示文章标题-->
                    <div style="font-size: 24px;font-weight: 500;">{{childPageArticleTitle}}</div>
                </div>
                <div class="header-menu--big" v-else>
                    <!--其他页显示搜索框-->
                    <div class="input-group" style="width: 300px">
                        <input @keyup.enter="searchEnter" type="text" class="form-control" placeholder="输入关键词" v-model="searchValue"/>
                        <span class="input-group-addon" @click="searchIcoClick"><i class="glyphicon glyphicon-search"></i></span>
                    </div>
                </div>

                <!--小屏显示-->
                <div class="header-menu--small" v-if="isArticleReadPage">
                    <!--如果在文章页则显示文章标题-->
                    <strong>{{childPageArticleTitle}}</strong>
                </div>
                <div class="header-menu--small" v-else>
                    <!--其他页显示搜索框-->
                    <div class="input-group" style="width: 150px">
                        <input @keyup.enter="searchEnterSmall" type="text" class="form-control" placeholder="输入关键词" v-model="searchValue"/>
                        <span class="input-group-addon" @click="searchIcoClickSmall"><i class="glyphicon glyphicon-search"></i></span>
                    </div>
                </div>

                <a style="float: right;cursor: pointer" @click="drawer = true"><img src="../assets/images/head.png" alt=""></a>
            </div>

        </div>

        <!--显示折叠选项-->
        <div class="fold-container" @click.stop="foldClick">
            <div class="fold-menu">
                <router-link :to="{ name:'index'}" :class="headerRadio === 1 ? 'active' : ''" @click.native.stop="headerRadio = 1;foldMenuClick()">首页</router-link>
            </div>
            <div class="fold-item"></div>
            <div class="fold-menu">
                <router-link :to="{ name:'leaveMessage' }" :class="headerRadio === 2 ? 'active' : ''" @click.native.stop="headerRadio = 2;foldMenuClick()">留言</router-link>
            </div>
            <div class="fold-item"></div>
            <div class="fold-menu">
                <router-link :to="{ name:'log', query: { page:1 } }" :class="headerRadio === 3 ? 'active' : ''" @click.native.stop="headerRadio = 3;foldMenuClick()">日志</router-link>
            </div>
            <div class="fold-item"></div>
            <div class="fold-menu">
                <router-link :to="{ name:'about' }" :class="headerRadio === 4 ? 'active' : ''" @click.native.stop="headerRadio = 4;foldMenuClick()">关于</router-link>
            </div>
        </div>

        <!--占位-->
        <div style="height: var(--headerHeight)">

        </div>

        <!--中间内容主体-->
        <div id="main-content">
            <!--定义一个路由锚点，Layout的子组件内容将在这里展示-->
            <router-view @sendArticleTitle="getArticleTitle"></router-view>
        </div>

        <!--占位-->
        <div style="height: var(--footerHeight)">

        </div>

        <!--尾部-->
        <div class="fq-footer">
            <div class="fq-footer__content">
                <img src="../assets/images/BeiAn.png"><a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=41152802000101" style="display:inline-block;text-decoration:none;height:20px;line-height:20px;"><img src="" style="float:left;"/><p style="color: white;float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px;">豫公网安备 41152802000101号</p></a>
            </div>
        </div>

        <!--    侧边栏-->
        <el-drawer
            v-model="drawer"
            :direction="direction"
            :before-close="handleClose"
        >
            <div style="padding: 10%;">
                <h4 style="margin-top: -20px;padding-bottom: 30px; color: #122b40"><i class="el-icon-user"></i><i>  {{username}}</i></h4>
                <div v-if="isLogined">
                    <router-link :to="{name:'myArticle',query:{'page':1}}" @click.native='closeDrawer' style="color: #8c8c8c; font-size:large">我的文章</router-link>
                    <a href="http://api.blogll.cn/api/article/articleWriteDisplay" target="_blank"  @click="closeDrawer" style="color: #8c8c8c; font-size: large;display: block">写文章</a>
                    <p style="padding-bottom: 10px;"><a style="color: #8c8c8c; font-size: large; cursor: pointer" @click="logOut">登出</a></p>
                </div>
                <div v-else>
                    <router-link :to="{path:'/login'}" @click.native='closeDrawer' style="color: #8c8c8c; font-size:large">登录</router-link>
                </div>
            </div>
        </el-drawer>
    </div>
</template>

<script lang="ts">
import {axios} from '@/utils/http'

import {isStrNull} from "../utils/jsTools";

import router from '@/router/index'

import { ElNotification as message } from 'element-plus';

import {
    ref,
    reactive,
    computed,
    watch,
    inject,
    provide,
    toRefs,
    onMounted,
    nextTick,
} from 'vue'

const enum Direction {down='down', up='up', none=''}

export default {

    setup(props,context) {
        // 注入App里的reload方法
        const reload = inject('reload')

        const nextFn = inject('nextFn')

        const other = {
            // 文章阅读页面子组件的文字标题
            childPageArticleTitle: ref<string>(''),

            // 已登录
            isLogined: ref<boolean>(false),
            headerRadio: ref<number>(1),
            // 用户名
            username: ref<string>(''),

            // 判断登录
            isLogin():void {
                try {
                    axios.get("/user/verify").then(resp => {
                        // console.log(resp.data); // 返回的Response体
                        // console.log(resp.data.username);
                        this.isLogined.value = true;
                        this.username.value = resp.data.username;
                    }).catch(error => {
                        this.isLogined.value = false;
                        this.username.value = '';
                    });
                } catch (e) {
                    console.log(e);
                    this.isLogined.value = false;
                    this.username.value = '';
                }

            },

            // 登出
            logOut():void {
                this.closeDrawer();
                // 删除cookie
                this.clearAllCookie();
                reload();
            },

            clearAllCookie():void {
                var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
                if (keys) {
                    for (var i = keys.length; i--;) {
                        document.cookie = keys[i] + '=0;path=/;domain=blogll.cn;expires=' + new Date(0).toUTCString();//清除一级域名下的或指定的，例如 .blogll.com
                    }
                }
            },

            // drawer抽屉关闭
            closeDrawer():void {
                this.drawer.value = false
            },

            // drawer抽屉关闭前调用方法
            handleClose(done):void {
                done()
            },

            // 获取文章阅读页子组件的文章标题
            getArticleTitle(title):void {
                this.childPageArticleTitle.value = title;
            },

            interfaceClick():void {
                if (!scroll.isFoldContainerShrink) {
                    fold.foldShrink();
                }
            }
        }

        const search = {
            // 搜索值
            searchValue: ref<string>(''),
            // 搜索图标点击事件
            searchIcoClick():void {
                this.skipArticleList();
            },

            // 搜索按钮enter事件函数
            searchEnter():void {
                this.skipArticleList();
            },

            // 搜索图标点击事件 -- 小屏幕的输入框
            searchIcoClickSmall():void {
                const that = this
                // 刷新页面，以重置header
                nextFn(()=>{
                    that.skipArticleList();
                },()=>{
                    reload()
                })
            },

            // 跳转到搜索列表界面
            skipArticleList():void {
                if (this.searchValue == null) {
                    message.warning("提示~", "搜素内容为空");
                    return;
                }
                if (isStrNull(this.searchValue)) {
                    message.warning("提示~", "搜素内容为空");
                    return;
                }
                // 跳转 所有文章列表界面
                router.push({
                    name: "fullTextSearch",
                    query: {page: "1", searchValue: this.searchValue}
                });
            },
        }

        const scroll = {

            normalDiv: ref<HTMLElement | null>(null),

            // drawer抽屉
            drawer: ref<boolean>(false),
            // 抽屉弹出方向
            direction: ref<string>('ltr'),

            // 主体需要滚动的dom对象
            mainContent: ref<HTMLElement | null>(null),
            // 上次滚动方向
            lastRollDirection: ref<Direction>(Direction.none),
            // 上次的scrollTop值
            lastScrollTop: ref<number>(0),
            // 上移距离，若下移过，就重置为零
            totalUpDistance: ref<number>(0),
            // 下移距离，若上移过，就重置为零
            totalDownDistance: ref<number>(0),
            // 累计滚动距离达到阀值
            distanceThresholdValue: ref<number>(100),
            // 折叠项fold是否是缩小状态
            isFoldContainerShrink: ref<boolean>(true),



            // 滚动事件被函数
            scrollEventFun():void {
                // console.log('节流函数执行了！')
                // 初始化滚动方向
                this.lastRollDirection = this.lastRollDirection === Direction.none ? Direction.down : this.lastRollDirection;
                // 获取现在的scrollTop与上次移动时的scrollTop
                let distance = this.mainContent.scrollTop - this.lastScrollTop
                // 判断现在是上移还是下移
                if (distance > 0) {
                    // 现在是下移
                    if (this.lastRollDirection === Direction.down) {
                        // 之前是下移，累加下移距离
                        this.totalUpDistance = 0;
                        this.totalDownDistance += distance;
                    } else if (this.lastRollDirection === Direction.up) {
                        // 之前是上移，重置下移距离为零
                        this.totalUpDistance = 0;
                        this.totalDownDistance = distance;
                        // 重新赋值lastRollDirection
                        this.lastRollDirection = Direction.down;
                    }
                } else if (distance <= 0) {
                    // 现在是上移
                    if (this.lastRollDirection === Direction.down) {
                        // 之前是下移，重置下移距离为零
                        this.totalDownDistance = '';
                        this.totalUpDistance = distance;
                        // 重新赋值lastRollDirection
                        this.lastRollDirection = Direction.up
                    } else if (this.lastRollDirection === Direction.up) {
                        // 之前是上移，累加上移距离
                        this.totalDownDistance = 0;
                        this.totalUpDistance += distance;
                    }
                }
                distance = null;
                // 判断积累移动距离以更换header内容
                this.judgeTotalDistance(this.totalDownDistance, (document.getElementsByClassName('fq-header')[0].offsetHeight * -1));
                this.judgeTotalDistance(this.totalUpDistance, 0);
                // 重新赋值lastScrollTop
                this.lastScrollTop = this.mainContent.scrollTop;

            },

            // 节流函数
            throttleFunction(fn, delay) {
                let timer = null;
                let startTime = Date.now();
                return function () {
                    let currentTime = Date.now();
                    let remaining = delay - (currentTime - startTime);
                    clearTimeout(timer);
                    if (remaining <= 0) {
                        fn();
                        startTime = Date.now()
                    } else {
                        timer = setTimeout(fn, remaining);
                    }
                }
            },

            // 判断累计移动距离，更换header内容
            judgeTotalDistance(distance:number,num:number) {
                if (Math.abs(distance) >= this.distanceThresholdValue) {
                    //控制header的隐藏
                    this.normalDiv.style.setProperty( 'margin-top', num + 'px' );
                    //控制折叠菜单项的显示,因为此div是absolute状态，会一直显示，需要不让其显示
                    if (num === (document.getElementsByClassName('fq-header')[0].offsetHeight * -1)) {
                        document.body.style.setProperty('--foldDisplay','none')
                    } else if (num === 0) {
                        setTimeout(()=>{
                            document.body.style.setProperty('--foldDisplay','block')
                        },200)
                    }
                    // 重置累计移动距离
                    this.totalUpDistance = 0;
                    this.totalDownDistance = 0;
                }
            }
        }

        const fold = {
            // 折叠选项点击
            foldClick() {
                // 判断当前是否是缩小状态
                if (scroll.isFoldContainerShrink) {
                    this.foldExpand();
                } else {
                    this.foldExpand();
                }
            },

            // 折叠项的menu被点击
            foldMenuClick() {
                this.foldShrink()
            },

            // 折叠项展开
            foldExpand() {
                // 折叠项展开时，动画曲线先慢后快，加速
                document.body.style.setProperty('--transitionTiming','ease-in')

                document.body.style.setProperty('--foldHeight','500px');
                document.body.style.setProperty('--foldWidth','200px');
                document.body.style.setProperty('--foldTop','calc(var(--headerHeight) + 1.5vh)');
                document.body.style.setProperty('--foldBGC','#676A74');
                document.body.style.setProperty('--foldRadius','4px');
                document.body.style.setProperty('--foldShadow','0 0 10px #676A74');

                document.body.style.setProperty('--foldItemHeight','5px');
                document.body.style.setProperty('--foldItemBGC','white');

                document.body.style.setProperty('--foldMenuContentDisplay','inline');

                scroll.isFoldContainerShrink = false;
            },

            // 折叠箱收缩
            foldShrink() {
                // 折叠项收缩时，动画曲线先快后慢，减速
                document.body.style.setProperty('--transitionTiming','ease-out')

                document.body.style.setProperty('--foldHeight','25px');
                document.body.style.setProperty('--foldWidth','25px');
                document.body.style.setProperty('--foldTop','calc((var(--headerHeight) - 25px) / 2)');
                document.body.style.setProperty('--foldBGC','inherit');
                document.body.style.setProperty('--foldRadius','0px');
                document.body.style.setProperty('--foldShadow','none');

                document.body.style.setProperty('--foldItemHeight','2px');
                document.body.style.setProperty('--foldItemBGC','#676A74');

                document.body.style.setProperty('--foldMenuContentDisplay','none');

                scroll.isFoldContainerShrink = true;
            }
        }

        const isArticleReadPage = computed(()=>{
            return router.path === '/articleRead';
        })

        onMounted(()=>{
            debugger
            // 监听滚动事件
            scroll.mainContent = document.getElementById('main-content');
            scroll.mainContent.addEventListener('scroll', scroll.throttleFunction(scroll.scrollEventFun,400));

            // 判断登录
            other.isLogin();
        })

        return {
            ...other,
            ...search,
            ...scroll,
            ...fold,
            isArticleReadPage,
        }
    }
}
</script>

<style>
/*变量*/
:root {
    /*默认标题高度*/
    --headerHeight: 7vh;

    /*底部高度*/
    --footerHeight: 3vh;

    /*main-content的margin-top*/
    --main-content-marTop: 0.444vh;

    /*控制折叠菜单项的显示,因为此div是absolute状态，会一直显示，需要控制其显示与否*/
    /*fold容器的display*/
    --foldDisplay: block;

    /*fold容器的高度*/
    --foldHeight: 25px;

    /*fold容器的宽度*/
    --foldWidth: 25px;

    /*fold容器的top*/
    --foldTop: calc((var(--headerHeight) - 25px) / 2);

    /*fold容器的背景色*/
    --foldBGC: inherit;

    /*fold容器的圆角*/
    --foldRadius: 0px;

    /*fold容器的阴影*/
    --foldShadow: none;

    /*foldItem的高度*/
    --foldItemHeight: 2px;

    /*foldItem的背景色*/
    --foldItemBGC: #676A74;

    /*foldMenu的高度*/
    --foldMenu: 15px;

    /*foldMenu的内容--a标签的 display*/
    --foldMenuContentDisplay: none;

    /*动画持续时间*/
    --transitionDuration: 0.2s;

    /*动画速度曲线*/
    --transitionTiming: ease-out;

}

.main {
    width: 100%;
}
.fq-header {
    display: flex;
    flex-wrap: wrap;
    position: fixed;
    top: 0;
    width: 70%;
    padding: 0 15%;
    height: var(--headerHeight);
    box-shadow: 0 6px 6px -6px gray;
    overflow: hidden;
}
/*正常显示的header内容*/
.fq-header__normal {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: var(--headerHeight);
    transition: all var(--transitionDuration) var(--transitionTiming) 0s;
}
.header-menu--big {
    display: flex;
    align-items: center;
    height: var(--headerHeight);
    width: 60%;
}
.header-menu--big > a {
    height: var(--headerHeight);
    line-height: var(--headerHeight);
    margin: 0 30px;
    text-decoration: none;
    font-size: 15px;
    font-weight: 500;
    color: #676A74;
}
.header-menu--big > a.active {
    color: lightskyblue;
    border-bottom: 2px solid lightskyblue;
}

/*隐藏的header内容*/
.fq-header__hidden {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: var(--headerHeight);
    margin-top: 2px;
    transition: all var(--transitionDuration) var(--transitionTiming) 0s;
}

.fq-footer {
    height: var(--footerHeight);
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: lightgray;
}
.fq-footer__content {
    height: 3vh;
    line-height: var(--footerHeight);
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    align-items: center;
}

/*主体内容*/
#main-content {
    height: calc(100vh - var(--headerHeight) - var(--footerHeight) - var(--main-content-marTop));
    overflow: auto;
    margin-top: var(--main-content-marTop);
    padding: 0 15%;
}

/*logo*/
.logo {
    transform: scale(0.8);
}

/*小屏*/
@media screen and (max-width: 768px) {
    :root {
        --headerHeight:10vh
    }

    .header-menu--big {
        display: none;
    }

    /*折叠选项*/
    .fold-container {
        display: var(--foldDisplay);
        z-index: 2020;
        position: absolute;
        top: var(--foldTop);
        left: calc((100vw - var(--foldWidth)) / 2);
        justify-content: space-around;
        width: var(--foldWidth);
        height: var(--foldHeight);
        background-color: var(--foldBGC);
        border-radius: var(--foldRadius);
        box-shadow: var(--foldShadow);
        transition: all var(--transitionDuration) var(--transitionTiming) 0s;
    }
    .fold-container>div:nth-child(4){
        width: 85%;
    }
    .fold-item {
        height: var(--foldItemHeight);
        width: var(--foldWidth);
        background-color: var(--foldItemBGC);
        transition: all var(--transitionDuration) var(--transitionTiming) 0s;
    }
    .fold-menu {
        display: flex;
        justify-content: center;
        align-items: center;
        width: var(--foldWidth);
        height: calc(var(--foldHeight) * 0.25);
        transition: all var(--transitionDuration) var(--transitionTiming) 0s;
    }
    .fold-menu > a {
        display: var(--foldMenuContentDisplay);
        color: white;
        font-size: 16px;
    }
    .fold-menu > a.active {
        color: lightskyblue;
        border-bottom: 2px solid lightskyblue;
    }

}

/*大屏*/
@media screen and (min-width: 768px) {

    :root {
        --headerHeight:7vh
    }

    .header-menu--small {
        display: none;
    }

    .fold-container {
        display: none;
    }

}

</style>

<template>
    <div>1111111111111111111111111</div>
</template>

<script>

    export default {
        inject:['reload'],      // 注入App里的reload方法
        name:"index",
        data() {
            return {
                searchValue:'', // 搜索值
                errmsg:'',   // 错误提示
                comments:[{
                        'id':0,
                        'create_time':'',
                        'is_delete':false,
                        'detail':'',
                        'article_id':0,
                        'user_id':0
                    }], // 评论集
                articles:[{
                    'id':0,
                    'create_time':'',
                    'is_delete':false,
                    'title':'',
                    'descriptive':'',
                    'is_secrete':false,
                    'detail':'',
                    'type_id':0,
                    'user_id':0
                }], // 文章集
                artN_comerN:[{
                    'comer_name':'',
                    'art_name':''
                }], // 评论回复对应集

            }
        },
        computed: {

        },

        watch: {
            $route(to,from){
                this.reload();
            }
        },

        created() {

        },
        methods:{
            // 跳转到搜索列表界面
            skipArticleList() {
                if (this.searchValue == null){
                    this.open("提示~","搜素内容为空");
                    return;
                }
                if (this.isNull(this.searchValue)){
                    this.open("提示~","搜素内容为空");
                    return;
                }
                // 跳转 所有文章列表界面
                this.$router.push( {
                    name:"fullTextSearch",
                    query:{ page:"1", searchValue: this.searchValue }
                } );
            },
            // 搜索图标点击事件
            searchIcoClick() {
                this.skipArticleList();
            },
            // 搜索按钮enter事件函数
            searchEnter() {
                this.skipArticleList();
            },
            // 字符串是否为空
            isNull( str ){
                if ( str === "" ) return true;
                var regu = "^[ ]+$";
                var re = new RegExp(regu);
                return re.test(str);
            },
            // element
            open(title,msg) {
                this.$notify({
                    title: title,
                    message: msg,
                    type: 'warning'
                });
            },

            // 发送请求加载本组件数据
            loadData() {
                this.$http.get("/article/indexData").then(resp => {
                    // console.log(resp.data); // 返回的Response体
                    // console.log(resp.data.username);

                    this.comments = resp.data.comments;
                    this.articles = resp.data.articles;
                    this.artN_comerN = resp.data.artN_comerN;
                }).catch(error => {
                    this.open('加载失败','请稍后刷新重试');
                });
            },

            /**
             * 函数说明：获取字符串长度
             * 备注：字符串实际长度，中文2，英文1
             * @param:需要获得长度的字符串
             */
            getStrLength(str) {
              var realLength = 0, len = str.length, charCode = -1;
              for (var i = 0; i < len; i++) {
                  charCode = str.charCodeAt(i);
                  if (charCode >= 0 && charCode <= 128){
                      realLength += 1;
                  }else{
                      realLength += 2;
                  }
              }
              return realLength;
            },
            /**
             * js截取字符串，中英文都能用
             * @param str：需要截取的字符串
             * @param len: 需要截取的长度
             */
          cutstr(str, len) {
              var str_length = 0;
              var str_len = 0;
              var str_cut = '';
              str_len = str.length;
              for (var i = 0; i < str_len; i++) {
                  var a = str.charAt(i);
                  str_length++;
                  if (escape(a).length > 4) {
                      //中文字符的长度经编码之后大于4
                      str_length++;
                  }
                  str_cut = str_cut.concat(a);
                  if (str_length >= len) {
                      str_cut = str_cut.concat("...");
                      return str_cut;
                  }
              }
              //如果给定字符串小于指定长度，则返回源字符串；
              if (str_length < len) {
                  return str;
              }
          },
            /**
             * 获取json长度
             * @param jsonData
             * @returns {number}
             */
          getJsonLength(jsonData){

              var jsonLength = 0;

              for(var item in jsonData){

                  jsonLength++;

              }

              return jsonLength;

          },

        },
        mounted () {
            // 加载数据
            this.loadData();
            // 进入页面聚焦input框
            if ($(window).width() > 768) {
                this.$refs.searchInput.focus()
            }
        },
    }
</script>

<style>

/*侧边栏样式*/
.newstitle { line-height: 30px; border-bottom: #000 1px solid; }
/*.newstitle span { float: right; font-size: 18px }*/
/*.newstitle span a { color: #000; }*/
.newstitle b { background: #9fcdff; width: 118px; display: block; font-size: 14px; font-weight: normal; color: #FFF; text-align: center }
.newsli li { line-height: 30px; text-overflow: ellipsis; overflow: hidden; font-size: 15px}
.newsli a{color: #000}
.newsbox { width: 50%; background: #fff; margin-top: 20px }
.newsbox { width: 100% }
/*侧边栏样式end*/

/*文章列表*/
.bloglist { background: #FFF; overflow: hidden; padding: 20px; margin-bottom: 20px; }
.bloglist h2 { font-size: 18px; position: relative }
.bloglist h2:before { content: ""; width: 3px; height: 26px; position: absolute; left: -20px; top: 0; background: #333 }
.bloglist p { font-size: 13px; overflow: hidden; text-overflow: ellipsis; -webkit-box-orient: vertical; display: -webkit-box; -webkit-line-clamp: 3; line-height: 24px; height: 72px; margin: 10px 0 0 }
/*文章列表end*/

/*图片特效*/
.hovereffect {
  width: 750px;
  height: 100%;
  float: left;
  overflow: hidden;
  position: relative;
  text-align: center;
  cursor: default;
}
.hovereffect .overlay {
  position: absolute;
  overflow: hidden;
  opacity: 0;
  filter: alpha(opacity=0);
  width: 55%;
  height: 81%;
  left: 22%;
  top: 10%;
  border-radius: 80%;
  border: 2px solid #FFF;
  -webkit-transition: opacity 0.35s, -webkit-transform 0.35s;
  transition: opacity 0.35s, transform 0.35s;
  -webkit-transform: translate3d(50%,50%,0);
  transform: translate3d(50%,50%,0);
}
.hovereffect:hover .overlay {
  background-color: rgba(0,0,0,0.3);
}
.hovereffect img {
  display: block;
  position: relative;
  -webkit-transition: all 0.35s;
  transition: all 0.35s;
}
.hovereffect:hover img {
  filter: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg"><filter id="filter"><feComponentTransfer color-interpolation-filters="sRGB"><feFuncR type="linear" slope="1.4" /><feFuncG type="linear" slope="1.4" /><feFuncB type="linear" slope="1.4" /></feComponentTransfer></filter></svg>#filter');
  filter: brightness(1.4);
  -webkit-filter: brightness(1.4);
}
.hovereffect h2 {
  text-transform: uppercase;
  text-align: center;
  position: relative;
  font-size: 17px;
  padding: 10px;
  background-color: transparent;
  color: #FFF;
  padding: 1em 0;
  opacity: 0;
  filter: alpha(opacity=0);
  -webkit-transition: opacity 0.35s, -webkit-transform 0.35s;
  transition: opacity 0.35s, transform 0.35s;
  -webkit-transform: translate3d(-150%,-400%,0);
  transform: translate3d(-150%,-400%,0);
}
.hovereffect a, .hovereffect p {
  color: #FFF;
  padding: 1em 0;
  opacity: 0;
  filter: alpha(opacity=0);
  -webkit-transition: opacity 0.35s, -webkit-transform 0.35s;
  transition: opacity 0.35s, transform 0.35s;
  -webkit-transform: translate3d(-150%,-400%,0);
  transform: translate3d(-150%,-400%,0);
}
.hovereffect:hover a, .hovereffect:hover p, .hovereffect:hover h2, .hovereffect:hover .overlay {
  opacity: 1;
  filter: alpha(opacity=100);
  -webkit-transform: translate3d(0,0,0);
  transform: translate3d(0,0,0);
}
/*图片特效end*/

  @media screen and (max-width: 1380px){
    .sunPhoto {
      display: none;
    }
  }
</style>

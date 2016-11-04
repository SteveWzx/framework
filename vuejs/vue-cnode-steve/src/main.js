var Vue = require('vue');
var VueRouter = require('vue-router');
var VueResource = require('vue-resource');
// 过滤器
var filters = require('./filters');
//引入css重置文件,基本的样式文件
require('./assets/css/reset.css');
require('./assets/css/home.css');
// 引入px与rem的换算
require('./assets/js/equ.js');

//实例化vue模块
Vue.use(VueRouter);
Vue.use(VueResource);
// 实例化过滤器
// Vue.filter('getDateTime', filters.getDateTime);
console.log(filters);
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));

// 创建一个空组件
var app = Vue.extend({});

//实例化VueRouter
var router = new VueRouter({
  // 当hashbang的值为true时，所有的路径都会被格式化已#!开头，
  hashbang: true,
  history: false,
  saveScrollPosition: true,
  transitionOnLoad: true
});

// 路由表
router.map({
  '/':{
    //首页
    component: function (resolve) {
      require(['./views/loading.vue'],resolve)
    }
  },
  '/home':{
    //首页
    name : 'home',
    component: function (resolve) {
      require(['./views/loading.vue'],resolve)
    }
  },
  '/artlist':{
    //列表
    name : 'artlist',
    component: function (resolve) {
      require(['./views/artlist.vue'],resolve)
    }
  },
  '/artlist/article/:id':{
    //文章详情
    name : 'article',
    component: function (resolve) {
      require(['./views/article.vue'],resolve)
    }
  },
  '/search':{
    //搜索
    name : 'search',
    component: function (resolve) {
      require(['./views/search.vue'],resolve)
    }
  },
  '/login':{
    //登录注册
    name : 'login',
    component: function (resolve) {
      require(['./views/login.vue'],resolve)
    }
  },
  '/about':{
    //关于我们
    name : 'about',
    component: function (resolve) {
      require(['./views/about.vue'],resolve)
    }
  }
})


//默认/重定向到home页
// router.redirect({
//     '/':"/home"
// })
router.afterEach(function (transition) {
  console.log('成功浏览到: ' + transition.to.path)
})

router.start(app, "#app");

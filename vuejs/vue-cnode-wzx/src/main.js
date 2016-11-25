'use strict'

import Vue from 'vue';
import VueRouter from 'vue-router';
import filters from './filters';
import routerMap from './routers';
import FastClick from 'fastclick';

FastClick.attach(document.body);

//实例化Vue的filter
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));

$.ajaxSettings.crossDomain = true;

Vue.use(VueRouter);
let router = new VueRouter({
    hashbang: true,
    history: false,
    saveScrollPosition: true,
    transitionOnLoad: true
});
routerMap(router);

//登录中间验证，页面需要登录而没有登录的情况直接跳转登录
router.beforeEach((transition) => {
    //处理左侧滚动不影响右边
    $("html, body, #page").removeClass("scroll-hide");

    if (transition.to.auth) {
        if (localStorage.userId) {
            transition.next();
        } else {
            var redirect = encodeURIComponent(transition.to.path);
            transition.redirect('/login?redirect=' + redirect);
        }
    } else {
        transition.next();
    }
});

let app = Vue.extend({});
router.start(app, "#app");

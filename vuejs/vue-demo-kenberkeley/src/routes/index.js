import Vue from 'vue'
import VueRouter from 'vue-router'
<<<<<<< HEAD
import routesMap from './map/' // 路由映射

Vue.use(VueRouter)

const router = new VueRouter({
  // root: null,
  // hashbang: false,
  // history: true,
  // saveScrollPosition: true,
  // transitionOnLoad: true,
  suppressTransitionError: __PROD__ // 生产环境下不抛出异常
=======

import routesMap from './map/' // 路由映射

// 在这里访问不了根组件的 this.$root.userData，但服务照常无障碍访问
import userService from 'SERVICE/userService'

Vue.use(VueRouter)

const router = new VueRouter({
  hashbang: true,
  history: true,
  saveScrollPosition: true,
  suppressTransitionError: false // 开发环境下
  // suppressTransitionError: true // 生产环境下
>>>>>>> 4e52d160ad8dbf59b841ef1b50801ab74c341b0c
})

router.map(routesMap)

// ========================================
// 中间件
// ========================================
// 简单的路由跳转 Logger
router.beforeEach(({ to, from, abort, redirect, next }) => {
  console.info(`[RouteLogger] ${decodeURI(from.path)} => ${decodeURI(to.path)}`)
  next()
})

// 权限拦截
router.beforeEach(({ to, from, abort, redirect, next }) => {
<<<<<<< HEAD
  if (to.needToLogin && !router.app.userData) { // router 实例会暴露出根组件实例 app
    alert('需要登录后才能访问')
    console.info('[Auth:Failed] 用户未登录，中断跳转')
=======
  if (to.needToLogin && !userService.data) {
    alert('需要登录后才能访问')
    console.info('[Auth:Failed] 中断跳转')
>>>>>>> 4e52d160ad8dbf59b841ef1b50801ab74c341b0c
    return abort()
  }
  next()
})

<<<<<<< HEAD
/**
 * 在入口文件 src/app.js 中调用 router.start(App, '#app') 后，根组件实例就会暴露到 router.app
 * 在组件内部，可通过 this.$root 访问根组件；而在外部，则可通过以下方式访问到根组件：
 * 
 * import router from '<path to>/routes/'
 * 
 * const $root = router.app
 * console.log($root.userData) // 打印用户 session
 */
=======
>>>>>>> 4e52d160ad8dbf59b841ef1b50801ab74c341b0c
export default router

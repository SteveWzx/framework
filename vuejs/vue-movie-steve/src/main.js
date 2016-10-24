import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import routerMap from './router'

import './assets/frozen/css/frozen.css'
import './assets/app.scss'

Vue.use(VueRouter)
Vue.use(VueResource)

let router = new VueRouter()

routerMap(router)

let app = Vue.extend({})

router.start(app, "#app")



// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import goods from './components/goods/goods.vue'
import ratings from './components/ratings/ratings.vue'
import seller from  './components/seller/seller.vue'

import VueResource from 'vue-resource'

Vue.use(VueRouter)
Vue.use(VueResource)

let router = new VueRouter({
   mode:'history',
   linkExactActiveClass:'active',
   routes:[
     {
     	path:'/goods',
     	component:goods
     },
     {
     	path:'/ratings',
     	component:ratings
     },
     {
     	path:'/seller',
     	component:seller
     }
   ]
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

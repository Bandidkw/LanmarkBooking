import Vue from 'vue'
import App from './App.vue'
// import Vuex from 'vuex';
// import VueRouter from 'vue-router'

Vue.config.productionTip = false

// router setup
import routes from './router';

  // configure router
  const router = new VueRouter({
    routes, // short for routes: routes
    linkExactActiveClass: 'active'
  })

  Vue.use(VueRouter)
  Vue.use(Vuex)
  new Vue({
      router,
      render: (h) => h(App)}).$mount('#app')
   
      
/* eslint-disable prettier/prettier */
/*!

=========================================================
* Vue White Dashboard - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vue-white-dashboard
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/vue-white-dashboard/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import SocialSharing from 'vue-social-sharing'
import VueGitHubButtons from 'vue-github-buttons'

import VueAxios from "vue-axios"
import axios from "axios"

import StarRating from 'vue-star-rating'

import 'vue-github-buttons/dist/vue-github-buttons.css'
import '@/assets/scss/white-dashboard.scss'
import '@/assets/css/nucleo-icons.css'
import '@/assets/demo/demo.css'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import { User } from '@/functions/userservice';

import store from '@/stores';

import GlobalComponents from './globalComponents'
import GlobalDirectives from './globalDirectives'
import RTLPlugin from './RTLPlugin'
import Notify from '@/components/NotificationPlugin'
import i18n from './i18n'
import SideBar from '@/components/SidebarPlugin'


Vue.config.productionTip = false;

Vue.use(VueAxios, axios);

Vue.component('star-rating', StarRating);
// router setup
import routes from './router';

  // configure router
  const router = new VueRouter({
    routes, // short for routes: routes
    linkExactActiveClass: 'active'
  })
  
  Vue.use(VueRouter)
  Vue.use(SocialSharing)
  Vue.use(VueGitHubButtons, { useCache: true })
  Vue.use(GlobalComponents)
  Vue.use(GlobalDirectives)
  Vue.use(RTLPlugin)
  Vue.use(SideBar)
  Vue.use(Notify)
  Vue.use(BootstrapVue)
  Vue.use(IconsPlugin);
  Vue.use(Vuex)
  
  router.beforeResolve(async (to,from,next) => {

    if(to.meta.public){
      next();
    }else{

    const userservice = new User();
    await userservice.Me().then(user=>{
      
      if(to.name!=='Login' && !user){
        return next({name:'LandingPage'});
      }
      store.commit('setUser',user.data);


      if(

        !!to.meta.public //public go all
        || (user.status && user.data.approved) //user approved go all
        || (!!to.meta.firstlogin && !!user.status && !user.data.approved )  //user not approved go only first login
      
          ){
        next();
    }
        
      else{
          if(to.name==="Dashboard" && user.status && !user.data.approved){
            next({name:'CreateServiceSuccess'})
          }
          else{
      
            next({name:'LandingPage'});
          }
        }
     
      })

    }

                
                })

       
          new Vue({
                  router,
                  i18n,
                  store,
                  render: (h) => h(App)
                }).$mount('#app')
   
      
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Landingpage from './components/LandingPage.vue'
import LoginPage from './components/LoginPage.vue'
import Registerpage from './components/RegisterPage.vue'
// import Navbar from './components/Navbar/NavbarPage.vue'

Vue.config.productionTip = false

Vue.use(VueRouter)

const routes = [
  { path: '/landing', component: Landingpage},
  { path: '/login', component: LoginPage},
  { path: '/register', component: Registerpage},
]

const router = new VueRouter({
  routes,
  mode: 'history'
})
export default router;

new Vue({
  render: h => h(App),
  router
}).$mount('#app')

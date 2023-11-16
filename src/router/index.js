// router.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Homepage.vue';
import About from '@/views/Aboutpage.vue';
import DashBoard from '@/views/DashBoardPage.vue'
import PopularSection from '@/views/section/PopularSection.vue'
import DashBoardAdmin from '@/views/admin/DashBoardAdmin'
import ManageAdmin from '@/views/admin/manageadmin/ManageAdmin.vue'
// import  CreateAccount from '@/views/CreateAccount.vue'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component:DashBoard,
    },    
    {
      path: '/popular',
      name: 'popular',
      component:PopularSection,
    },
    {
      path:'/dashboardadmin',
      name:'dashboardadmin',
      component:DashBoardAdmin
    },
    {
      path:'/manageadmin',
      name:'manageadmin',
      component:ManageAdmin
    },
    // {
    //   path: '/createaccount',
    //   name: 'createaccount',
    //   component:CreateAccount,
    // }
  ],
});

export default router;

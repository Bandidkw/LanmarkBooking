// router.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Homepage.vue';
import About from '@/views/Aboutpage.vue';
import DashBoard from '@/views/DashBoardPage.vue'
import PopularSection from '@/views/section/PopularSection.vue'
import DashBoardAdmin from '@/views/admin/DashBoardAdmin'
import ManageAdmin from '@/views/admin/manageadmin/ManageAdmin.vue'
import AddAdmin from '@/views/admin/manageadmin/AddAdmin.vue'
import EditAdmin from '@/views/admin/manageadmin/EditAdmin.vue'
import  CreateAccount from '@/views/CreateAccount.vue'
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
    {
      path:'/addadmin',
      name:'addadmin',
      component:AddAdmin
    },
    {
      path:'/editadmin/:id',
      name:'editadmin',
      component:EditAdmin
    },
    {
      path: '/register',
      name: 'register',
      component:CreateAccount,
    }
  ],
});

export default router;

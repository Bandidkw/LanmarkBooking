// router.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Homepage.vue';
import About from './views/Aboutpage.vue';
import DashBoard from './views/DashBoardPage.vue'
import PopularSection from '@/views/section/PopularSection.vue'

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
      path: '/dahsboard',
      name: 'dahsboard',
      component:DashBoard,
    },
    {
      path: '/popular',
      name: 'popular',
      component:PopularSection,
    },
  ],
});

export default router;

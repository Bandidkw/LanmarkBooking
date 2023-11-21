// router.js
import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Homepage.vue";
import About from "@/views/Aboutpage.vue";
import DashBoard from "@/views/DashBoardPage.vue";
import PopularSection from "@/views/section/PopularSection.vue";
import DashBoardAdmin from "@/views/admin/DashBoardAdmin";
import ManageAdmin from "@/views/admin/manageadmin/ManageAdmin.vue";
import AddAdmin from "@/views/admin/manageadmin/AddAdmin.vue";
import EditAdmin from "@/views/admin/manageadmin/EditAdmin.vue";
import ManagePartner from "@/views/partner/managepartner/ManagePartner.vue";
import CreateAccount from "@/views/CreateAccount.vue";
import PageOne from "@/views/singlepage/Page_One.vue";
// --------------ManageRoom-------------------------
import RoomDetail from "@/views/admin/manageRoom/RoomDetail.vue";

import DashBoardPartner from '@/views/partner/DashBoardPartner.vue'

//------------------------ partner ----------------//


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/about",
      name: "about",
      component: About,
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: DashBoard,
    },
    {
      path: "/popular",
      name: "popular",
      component: PopularSection,
    },
    {
      path: "/dashboardadmin",
      name: "dashboardadmin",
      component: DashBoardAdmin,
    },
    {
      path: "/manageadmin",
      name: "manageadmin",
      component: ManageAdmin,
    },
    {
      path: "/addadmin",
      name: "addadmin",
      component: AddAdmin,
    },
    {
      path: "/editadmin/:id",
      name: "editadmin",
      component: EditAdmin,
    },
    // -----------------------ManegeRoom---------------------------
    {
      path: "/roomdetail",
      name: "roomdetail",
      component: RoomDetail,
    },
    // ---------------------------end--------------------------------
    {
      path: "/popular",
      name: "popular",
      component: PopularSection,
    },
    {
      path: "/hotel/:id",
      name: "hotel", // เพิ่ม name เพื่อให้สามารถใช้ router-link ไปยังนั้นได้
      component: PageOne,
      props: true,
    },
    {
      path: "/register",
      name: "register",
      component: CreateAccount,
    },
    {
      path: "/dashboardpartner",
      name: "dashboardpartner",
      component: DashBoardPartner ,
    },
    {
      path: "/managepartner",
      name: "managepartner",
      component:  ManagePartner,
    },
    {
      path: "/approvepartner",
      name: "approvepartner",
      component:  () => import('@/views/admin/ApprovePartner.vue') ,
    },
    {
      path: "/managemember",
      name: "managemember",
      component:  () => import('@/views/member/managemember/ManageMember.vue') ,
    },
    {
      path: "/managehotel",
      name: "managehotel",
      component:  () => import('@/views/partner/managehotel/ManageHotel.vue') ,
    },
    {
      path: "/addhotel",
      name: "addhotel",
      component:  () => import('@/views/partner/managehotel/AddHotel.vue') ,
    },
    {
      path:"/approveroom",
      name:"approveroom",
      component: () => import('@/views/admin/ApproveRoom.vue')
    },
    {
      path:"/roomadmin",
      name:"roomadmin",
      component: () => import('@/views/admin/manageRoom/RoomAdmin.vue')
    },
    {
      path:"/manageroom",
      name:"manageroom",
      component: () => import('@/views/partner/managehotel/ManageRoom.vue')
    },
    
  ],
});

export default router;

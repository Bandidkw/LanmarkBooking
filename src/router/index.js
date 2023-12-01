// router.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Homepage.vue';
import About from '@/views/Aboutpage.vue';
import DashBoard from '@/views/DashBoardPage.vue'
import PopularSection from '@/views/section/PopularSection.vue'
import DashBoardAdmin from '@/views/admin/DashBoardAdmin'
import ManageAdmin from '@/views/admin/manageadmin/ManageAdmin.vue'
import CreateAccount from "@/views/CreateAccount.vue";
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
      component: DashBoard,
    },
    {
      path: '/popular',
      name: 'popular',
      component: PopularSection,
    },
    {
      path: '/dashboardadmin',
      name: 'dashboardadmin',
      component: DashBoardAdmin
    },
    {
      path: '/manageadmin',
      name: 'manageadmin',
      component: ManageAdmin
    },
    {
      path: "/addadmin",
      name: "addadmin",
      component: () => import("@/views/admin/manageadmin/AddAdmin.vue"),
    },
    {
      path: "/editadmin/:id",
      name: "editadmin",
      component: () => import("@/views/admin/manageadmin/EditAdmin.vue"),
    },
    {
      path: "/editpartner",
      name: "editpartner",
      component: () => import("@/views/partner/managepartner/EditPartner.vue"),

    },
    {
      path: "/roomdetail",
      name: "roomdetail",
      component: () => import("@/views/admin/manageRoom/RoomDetail.vue"),

    },
    {
      path: "/popular",
      name: "popular",
      component: () => import("@/views/section/PopularSection.vue"),

    },
    {
      path: '/createaccount',
      name: 'createaccount',
      component: CreateAccount,
    },
    {
      path: "/hotel/:id",
      name: "hotel", // เพิ่ม name เพื่อให้สามารถใช้ router-link ไปยังนั้นได้
      component: () => import("@/views/singlepage/Page_One.vue"),
      props: true,
    },
    ,
    {
      path: "/register",
      name: "register",
      component: CreateAccount,
    },
    {
      path: "/dashboardpartner",
      name: "dashboardpartner",
      component: () => import("@/views/partner/DashBoardPartner.vue"),

    },
    {
      path: "/managepartner",
      name: "managepartner",
      component: () => import("@/views/partner/managepartner/ManagePartner.vue"),

    },
    {
      path: "/approvepartner",
      name: "approvepartner",
      component: () => import('@/views/admin/ApprovePartner.vue'),
    },
    {
      path: "/managemember",
      name: "managemember",
      component: () => import('@/views/member/managemember/ManageMember.vue'),
    },
    // {
    //   path: "/managehotel",
    //   name: "managehotel",
    //   component:  () => import('@/views/partner/managehotel/ManageHotel.vue') ,
    // },
    {
      path: "/addhotel",
      name: "addhotel",
      component: () => import('@/views/partner/managehotel/AddHotel.vue'),
    },
    {
      path: "/approveroom",
      name: "approveroom",
      component: () => import('@/views/admin/ApproveRoom.vue')
    },
    {
      path: "/roomadmin",
      name: "roomadmin",
      component: () => import('@/views/admin/manageRoom/RoomAdmin.vue')
    },
    {
      path: "/manageroom",
      name: "manageroom",
      component: () => import('@/views/partner/managehotel/ManageRoom.vue')
    },
    {
      path: "/managebooking",
      name: "managebooking",
      component: () => import('@/views/partner/managebooking/ApproveBooking.vue')
    },
    {
      path: "/bookingmember",
      name: "bookingmember",
      component: () => import('@/views/member/booking/BookingMember.vue')
    },
    {
      path: "/approvepayment",
      name: "approvepayment",
      component: () => import('@/views/partner/managebooking/ApprovePayment.vue')
    },
    ,
    {
      path: "/checkin-out",
      name: "checkin-out",
      component: () => import('@/views/member/booking/Checkinout.vue')
    },
    {
      path: "/addroomtype",
      name: "addroomtype",
      component: () => import('@/views/admin/manageRoom/AddRoomtype.vue')
    },
    ,
    {
      path: "/bookingall",
      name: "bookingall",
      component: () => import('@/views/admin/booking/allbooking.vue')
    },
    {
      path: "/editadminuser",
      name: "editadminuser",
      component: () => import('@/views/admin/manageadmin/EditAdminuser.vue')
    },
    {
      path: "/editmember",
      name: "editmember",
      component: () => import('@/views/member/managemember/EditMember.vue')
    },
    {
      path: "/contractmanage",
      name: "contractmanage",
      component: () => import('@/views/admin/ContractManage.vue')
    },
    {
      path: "/contractmembermanage",
      name: "contractmembermanage",
      component: () => import('@/views/member/ContractMemberManage.vue')
    },
    
    
  ],
});

export default router;

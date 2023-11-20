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
import CreateAccount from "@/views/CreateAccount.vue";
import PageOne from "@/views/singlepage/Page_One.vue";
// --------------ManageRoom-------------------------
import ManageAir from "@/views/admin/manageRoom/ManageAir.vue";
import ManageBed from "@/views/admin/manageRoom/ManageBed.vue";
import ManageShower from "@/views/admin/manageRoom/ManageShower.vue";
import ManageFer from "@/views/admin/manageRoom/ManageFer.vue";
import ManageFacilitie from "@/views/admin/manageRoom/ManageFacilitie.vue";
import ManageEntertain from "@/views/admin/manageRoom/ManageEntertain.vue";
import ManageRoomer from "@/views/admin/manageRoom/ManageRoomer.vue";
import ManageRoomstatus from "@/views/admin/manageRoom/ManageRoomstatus.vue";
import ManageRoomview from "@/views/admin/manageRoom/ManageRoomview.vue";
import ManageRoomtype from "@/views/admin/manageRoom/ManageRoomtype.vue";
import ManageSecurity from "@/views/admin/manageRoom/ManageSecurity.vue";

import HotelType from "@/views/admin/managehotel/HotelType.vue";
import Interesting from "@/views/admin/managehotel/Interesting.vue";
import Facility from "@/views/admin/managehotel/Facility.vue";
import Certificate from "@/views/admin/managehotel/Certificate.vue";
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
      path: "/manageair",
      name: "manageair",
      component: ManageAir,
    },
    {
      path: "/managebed",
      name: "managebed",
      component: ManageBed,
    },
    {
      path: "/manageshower",
      name: "manageshower",
      component: ManageShower,
    },
    {
      path: "/managefer",
      name: "manageferr",
      component: ManageFer,
    },
    {
      path: "/managefacilitie",
      name: "managefacilitie",
      component: ManageFacilitie,
    },
    {
      path: "/manageentertain",
      name: "manageentertain",
      component: ManageEntertain,
    },
    {
      path: "/manageroomer",
      name: "manageroomer",
      component: ManageRoomer,
    },
    {
      path: "/manageroomstatus",
      name: "manageroomstatus",
      component: ManageRoomstatus,
    },
    {
      path: "/manageroomview",
      name: "manageroomview",
      component: ManageRoomview,
    },
    {
      path: "/manageroomtype",
      name: "manageroomtype",
      component: ManageRoomtype,
    },
    {
      path: "/managesecurity",
      name: "managesecurity",
      component: ManageSecurity,
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
    ///////// MANAGE_HOTEL //////////
    {
      path: "/managehotel/type",
      name: "hoteltype",
      component: HotelType,
    },
    {
      path: "/managehotel/facilities",
      name: "facility",
      component: Facility,
    },
    {
      path: "/managehotel/interesting",
      name: "interest",
      component: Interesting,
    },
    {
      path: "/managehotel/certification",
      name: "certificate",
      component: Certificate,
    },

    {
      path: "/dashboardpartner",
      name: "dashboardpartner",
      component: DashBoardPartner ,
    },
    {
      path: "/managepartner",
      name: "managepartner",
      component:  () => import('@/views/partner/managepartner/ManagePartner.vue') ,
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
      path:"/reserveroom",
      name:"reserveroom",
      component: () => import('@/views/partner/managehotel/ReserveRoom.vue')
    }
  ],
});

export default router;

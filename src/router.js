import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";
import LandingPage from "@/pages/LandingPage.vue";
import Invitations from "@/pages/landingpage/Invitations.vue";
import CreateAccount from "@/pages/landingpage/CreateAccount.vue";
import Dashboard from "@/pages/Dashboard.vue";
import Icons from "@/pages/Icons.vue";
import Maps from "@/pages/Maps.vue";
import Notifications from "@/pages/Notifications.vue";
import UserProfile from "@/pages/UserProfile.vue";
import TableList from "@/pages/TableList.vue";
import Typography from "@/pages/Typography.vue";
import UpgradeToPRO from "@/pages/UpgradeToPRO.vue";
import Scheduler from "@/pages/Scheduler.vue";
import BookingManager from "@/pages/BookingManager.vue";
import BookingDetail from "@/pages/BookingDetail.vue";
import RoomManager from "@/pages/RoomManager.vue";
//import CreateRoom from "@/pages/CreateRoom.vue";
import HotelProfile from "@/pages/HotelProfile.vue";
import AddRoomFeature from "@/pages/AddRoomFeature.vue";
import UpdateRoomPicture from "@/pages/UpdateRoomPicture.vue";
import CreateRoomCompleted from "@/pages/CreateRoomCompleted.vue";
import UpdateRoom from "@/pages/UpdateRoom.vue";

const routes = [
  {
    path: "/",
    redirect: "dashboard",
    component: DashboardLayout,
    children: [
      
      {
        path: "scheduler",
        name: "Scheduler",
        meta:{public:false},
        component: Scheduler,
      },
      {
        path: "checkin",
        name: "Checkin",
        meta:{public:false},
        component: () => import("@/pages/Checkin.vue"),
      },
      {
        path:"checkin-otp",
        name: "CheckinOTP",
        component: () => import("@/pages/CheckinOTP.vue")
      },
      {
        path: "checkout",
        name: "Checkout",
        meta:{public:false},
        component: () => import("@/pages/Checkout.vue"),
      },
      {
        path:"calendar",
        name:"Calendar",
        meta:{public:false},
        component:() => import("@/pages/Calendar.vue")
      },
      {
        path:"bookingmanager",
        name: "BookingManager",
        meta:{public:false},
        component: BookingManager,
      },
      {
        path:"bookingdetail/:id",
        name: "BookingDetail",
        meta:{public:false},
        component: BookingDetail,
      },
      {
        path:"reject-booking/:id",
        name:"RejectBooking",
        meta:{public:false},
        component:()=> import("@/pages/RejectBooking.vue")
      },
      {
        path: "roommanager",
        name: "RoomManager",
        meta:{public:false},
        component: RoomManager,
      },
      // {
      //   path: "createroom",
      //   name: "CreateRoom",
      //   meta:{public:false},
      //   component: CreateRoom,
      // },
      {
        path: "addroomfeature/:hotelId",
        name: "AddRoomFeature",
        meta:{public:false},
        component: AddRoomFeature,
      },
      {
        path: "updateroompicture/:hotelId",
        name: "UpdateRoomPicture",
        meta:{public:false},
        component: UpdateRoomPicture,
      },
      {
        path:"createroomcompleted/:hotelId",
        name: "CreateRoomCompleted",
        meta:{public:false},
        component: CreateRoomCompleted,
      },
      {
        path:"updateroom/:hotelId",
        name: "UpdateRoom",
        meta:{public:false},
        component: UpdateRoom,
      },
      {
        path: "dashboard",
        name: "Dashboard",
        meta:{public:false},
        component: Dashboard,
      },
      {
        path: "icons",
        name: "Icons",
        meta:{public:false},
        component: Icons,
      },
      {
        path: "maps",
        name: "Maps",
        meta:{public:false},
        component: Maps,
      },
      {
        path: "hotelprofile",
        name: "HotelProfile",
        meta:{public:false},
        component: HotelProfile,
      },
      {
        path: "notifications",
        name: "Notifications",
        meta:{public:false},
        component: Notifications,
      },
      {
        path:"billing",
        name: "Billing",
        meta:{public:false},
        component:()=>import("@/pages/BillingView.vue")
      },
      {
        path:'payment/:id',
        name:"Payment",
        meta:{public:false},
        component: ()=>import("@/pages/PaymentDetail.vue")
      },
      {
        path: "user",
        name: "User Profile",
        meta:{public:false},
        component: UserProfile,
      },
      {
        path: "table",
        name: "Table List",
        meta:{public:false},
        component: TableList,
      },
      {
        path: "typography",
        name: "Typography",
        meta:{public:false},
        component: Typography,
      },
      {
        path: "upgradeToPro",
        name: "Upgrade to PRO",
        meta:{public:false},
        component: UpgradeToPRO,
      },
    ],
  },
  {
    path:"/landingpage",
    name:"LandingPage",
    redirect:'/landingpage/invitations',
    component:LandingPage,
    children:[
      {
        path:'login',
        name:'Login',
        meta:{public:true},
        component:()=> import('@/pages/landingpage/LoginPage.vue')
      },
      {
        path:'forgetpassword',
        name:'ForgetPassword',
        meta:{public:true},
        component:()=> import('@/pages/landingpage/ForgetPassword.vue')
      },
      {
        path:'invitations',
        name:"Invitations",
        meta:{public:true},
        component: Invitations,
      },
      {
        path:'userinfo',
        name:'UserInfo',
        meta:{public:true},
        component: () => import('@/pages/landingpage/UserInfo.vue')
      },
      {
    path:"createaccount",
    name:"CreateAccount",
    meta:{public:true},
    component:CreateAccount,
  },
  {
    path:'confirm-otp',
    name:'ConfirmOtp',
    meta:{public:true},
    component:()=>import('@/pages/landingpage/ConfirmOtp.vue')
  },
  {
    path:'firstlogin',
    name:'FirstLogin',
    meta:{public:true},
    component:()=>import('@/pages/landingpage/FirstLogin.vue')
  },
  {
    path:'create-service',
    name:'CreateService',
    component:()=>import('@/pages/landingpage/CreateService.vue'),
    redirect:'/landingpage/create-service/hotel-service',
    children:[
      {
        path:'hotel-service',
        name:'HotelService',
        meta:{firstlogin:true},
        component:()=>import('@/pages/landingpage/hotel/HotelService.vue')
      },
     
      
    ]
  },
  {
    path:'hotel-service-detail/:id',
    name:'HotelServiceDetail',
    meta:{firstlogin:true},
    component:()=>import('@/pages/landingpage/HotelServiceDetail.vue')
  },
  {
    path:'hotel-service-detail2/:id',
    name:'HotelServiceDetail2',
    meta:{firstlogin:true},
    component:()=>import('@/pages/landingpage/HotelServiceDetail2.vue')
  },
  {
    path:'service-map/:id',
    name:'ServiceMap',
    meta:{firstlogin:true},
    component:()=>import('@/pages/landingpage/ServiceMap.vue')
  },
  {
    path:'service-image/:id',
    name:'ServiceImage',
    meta:{firstlogin:true},
    component:()=>import('@/pages/landingpage/ServiceImage.vue')
  },
  {
    path:'create-service-success',
    name:'CreateServiceSuccess',
    meta:{firstlogin:true},
    component:()=>import('@/pages/landingpage/CreateServiceSuccess.vue')
  },
  {
    path:'hotel-service-update/:id',
    name:'HotelServiceUpdate',
    meta:{firstlogin:true},
    component:()=>import('@/pages/landingpage/HotelServiceUpdate.vue')
  }
    ]
  },
  
 
];



export default routes;

import Landingpage from "@/pages/Landingpage.vue";

const routes = [
  {
    path:"/landingpage",
    name:"Landingpage",
    redirect:'/landingpage/invitations',
    component:Landingpage,
  },
];

export default routes;

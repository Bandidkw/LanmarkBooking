// import { createRouter, createWebHistory } from "vue-router";

// let routes = [];
// routes = [
//   {
//     path: "/home",
//     name: "home",
//     component: () => import("../views/HomeView.vue"),
//   },
//   {
//     path: "/seller",
//     name: "seller",
//     component: () => import("../components/member/TableNewMember.vue"),
//   },
//   {
//     path: "/user",
//     name: "user",
//     component: () => import("../components/user/UserView.vue"),
//   },
//   {
//     path: "/admin",
//     name: "admin",
//     component: () => import("../components/Admin/add_admin.vue"),
//   },
// ];

// const router = createRouter({
//   history: createWebHistory(process.env.BASE_URL),
//   routes,
// });

// export default router;

import axios from "axios";

export class Admin {
  #token = localStorage.getItem("token");
  #baseUrl = process.env.VUE_APP_API;
  constructor() { }


  //admin RoomType
  async GetRoomType() {
    let data;
    const config = {
      method: "get",
      headers: {
        "auth-token": this.#token,
      },
      url: `${this.#baseUrl}room/type`,
    };

    await axios(config)
      .then((result) => {
        if (result) {
          data = result.data;
        }
      })
      .catch((error) => {
        data = error;
      });

    return data;
  }


}
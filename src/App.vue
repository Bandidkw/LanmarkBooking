<!-- App.vue -->
<template>
  <div class="container">
    <navbar class="nav-bar"></navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import Navbar from './components/NavbarMain.vue';

export default {
  components: {
    Navbar,

  },
  async beforeCreate() {

this.$store.commit("setLoading", true);
if (localStorage.getItem("token") !== null) {
  await axios
    .get(`${process.env.VUE_APP_API}signin/me/`, {
      headers: {
        token: `${localStorage.getItem("token")}`,
      },
    })
    .then(async (res) => {
      const decode = jwtDecode(localStorage.getItem("token"));
      console.log(decode);
      const data_login = {
        logedIn: true,
        name: res.data.data.name,
        roles: res.data.data.roles
      };
      console.log(data_login)
      this.$store.commit("setLogin", data_login)
      this.$store.commit("setLoading", false);
      if (this.$store.getters.roles === "admin") {
        console.log("admin")
      }
      if (this.$store.getters.roles === "partner") {
        console.log("partner")
      }
      if (this.$store.getters.roles === "member") {
        console.log("member")
      }
    })
    .catch((error) => {
      console.log(error)
    });
} else {
  localStorage.clear();
  console.log("test")
}
},
};
</script>

<style scoped>
.container{
  width: 100%;
  padding: 1rem 0;
  margin: 0;
  position: relative;
  z-index: 0;
}
.nav-bar{
  width: 100%;
  padding: 0 5rem;
  position: relative;
  z-index: 999;
}
</style>

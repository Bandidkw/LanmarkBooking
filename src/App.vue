<!-- App.vue -->
<template>
  <div class="body-container">
    <navbar class="nav-bar w-full sticky top-0 lrft-0 bg-white" v-if="$store.getters.roles === ''"></navbar>
    <NavbarMember v-if="$store.getters.roles === 'member'" />
    <NavbarPartner v-if="$store.getters.roles === 'partner'" />
    <NavbarAdmin v-if="$store.getters.roles === 'admin'" />
    <router-view></router-view>
        <!-- Popup Container -->
        <div class="popup-container " v-if="showPopup">
    <!-- Popup Content -->
    <div ref="popupContent" @animationend="onAnimationEnd" class="{ 'popup-content': true, 'fade-out': !showPopup } flex p-2 bg-white" style="flex-direction: column; align-items: center; border-radius: 1rem;">
        <img src="data:image/jpeg;base64,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" alt="Popup Image" class="popup-image" style="border-radius: 1rem;" />
        <Button label="Submit" style="justify-content: center;" @click="closePopup">ปิดโฆษณา</Button>
      </div>
  </div>
  </div>
</template>
<script>
import axios from "axios";
import jwtDecode from "jwt-decode";
import Navbar from './components/NavbarMain.vue';
import NavbarAdmin from './components/NavbarAdmin.vue'
import NavbarPartner from './components/NavbarPartner.vue'
import NavbarMember from './components/NavbarMember.vue'
export default {
  data() {
    return {
      showPopup: false,
    };
  },
  mounted() {
    const isFirstVisit = localStorage.getItem("firstVisit") === null;
  const popupClosed = localStorage.getItem("popupClosed") === "true";

  if (isFirstVisit && !popupClosed) {
    this.showPopup = true;
    localStorage.setItem("firstVisit", "true");
  }
},

  components: {
    Navbar,
    NavbarMember,
    NavbarPartner,
    NavbarAdmin
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
        this.$router.push("/dashboardadmin");
      }
      if (this.$store.getters.roles === "partner") {
        this.$router.push("/dashboardpartner");
      }
      if (this.$store.getters.roles === "member") {
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
methods: {
  onAnimationEnd(event) {
    if (event.animationName === 'fade-out') {
      this.showPopup = false;
      localStorage.setItem("popupClosed", "true");
    }
  },
  closePopup() {
    if (this.$refs.popupContent) {
      this.$refs.popupContent.classList.add('fade-out');
      setTimeout(() => {
        this.showPopup = false;
        localStorage.setItem("popupClosed", "true");
      }, 100);
    }
  },
},


};
</script>

<style scoped>
.body-container{
  display: flex;
  flex-direction: column;
  align-items: center;
  /* width: 100%; */
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
.popup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 1000;
}
@keyframes fade-out {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(100%);
  }
}
.popup-content {
  width: 250px;
  height: 250px;
  text-align: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  opacity: 1;
  transform: translateY(0);
  animation: fade-out 0.5s forwards;
  /* transition: opacity 0.5s, transform 0.5s; */
}
.popup-content.fade-out {
  opacity: 0;
  transform: translateY(100%);
  transition: opacity 0.5s, transform 0.5s;
}

.popup-image {
  width: 100%;
  height: auto;
  margin-bottom: 10px;
}
@media screen and (max-width:640px) {
  .nav-bar{
    width: 100%;
  }
}

@media screen and (max-width:414px) {
  .nav-bar{
    padding: 0 1rem;
  }
}
</style>
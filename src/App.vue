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
        <img src="https://assets.publishing.service.gov.uk/government/uploads/system/uploads/image_data/file/83916/s960_hotel_booking.jpg" alt="Popup Image" class="popup-image" style="border-radius: 1rem;" />
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

  if (isFirstVisit) {
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
  console.log('Animation end event:', event.animationName);
  if (event.animationName === 'fade-out') {
    this.showPopup = false;
  }
},
  closePopup() {
  console.log("Close popup clicked");
  if (this.$refs.popupContent) {
    this.$refs.popupContent.classList.add('fade-out');
    setTimeout(() => {
      console.log('Timeout triggered');
      this.showPopup = false;
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
  max-width: 100%;
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
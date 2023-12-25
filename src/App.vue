<!-- App.vue -->
<template>
  <div class="body-container">
    <navbar
      class="nav-bar w-full sticky top-0 lrft-0 bg-white"
      v-if="$store.getters.roles === ''"
    ></navbar>
    <NavbarMember v-if="$store.getters.roles === 'member'" />
    <NavbarPartner v-if="$store.getters.roles === 'partner'" />
    <NavbarAdmin v-if="$store.getters.roles === 'admin'" />
    <router-view></router-view>
    <!-- Popup Container -->
    <div class="popup-container" v-if="showPopup">
      <!-- Popup Content -->
      <div
        ref="popupContent"
        @animationend="onAnimationEnd"
        class="{ 'popup-content': true, 'fade-out': !showPopup } flex p-2 bg-white"
        style="
          flex-direction: column;
          align-items: center;
          border-radius: 1rem;
          width: 400px;
        "
      >
        <img
          src="https://quaysidehotel.co.uk/wp-content/uploads/2022/09/Reasons-to-a-room-direct-with-hotel-over-booking-via-third-party-travel-agency-1024x657.jpg"
          alt="Popup Image"
          class="popup-image"
          style="border-radius: 1rem"
        />
        <Button
          label="Submit"
          style="justify-content: center"
          @click="closePopup"
          >ปิดโฆษณา</Button
        >
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import jwtDecode from "jwt-decode";
import Navbar from "./components/NavbarMain.vue";
import NavbarAdmin from "./components/NavbarAdmin.vue";
import NavbarPartner from "./components/NavbarPartner.vue";
import NavbarMember from "./components/NavbarMember.vue";
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
    NavbarAdmin,
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
            roles: res.data.data.roles,
            ////
            id: decode._id,
          };
          console.log(data_login);
          this.$store.commit("setLogin", data_login);
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
          console.log(error);
        });
    } else {
      localStorage.clear();
      console.log("test");
    }
  },
  methods: {
    onAnimationEnd(event) {
      if (event.animationName === "fade-out") {
        this.showPopup = false;
        localStorage.setItem("popupClosed", "true");
      }
    },
    closePopup() {
      if (this.$refs.popupContent) {
        this.$refs.popupContent.classList.add("fade-out");
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
.body-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* width: 100%; */
  margin: 0;
  position: relative;
  z-index: 0;
}
.nav-bar {
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
@media screen and (max-width: 640px) {
  .nav-bar {
    width: 100%;
  }
}

@media screen and (max-width: 430px) {
  .nav-bar {
    padding: 0 1rem;
  }
}
@media screen and (max-width: 414px) {
  .nav-bar {
    padding: 0 1rem;
  }
}
</style>

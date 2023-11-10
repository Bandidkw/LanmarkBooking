<template>
  <div class="wrapper">
    <!-- <div class="wrapper" :class="{'nav-open': $sidebar.showSidebar}"> -->

    <side-bar :background-color="backgroundColor">
      <!-- <mobile-menu slot="content"></mobile-menu> -->

      <sidebar-link to="/dashboard">
        <i class="tim-icons icon-chart-pie-36"></i>

        <template v-if="!isRTL">
          <p>Dashboard</p>
        </template>

        <template v-else>
          <p>لوحة القيادة</p>
        </template>
      </sidebar-link>
      <!-- <sidebar-link to="/scheduler">
        <i class="tim-icons icon-calendar-60"></i>

        <template v-if="!isRTL">
          <p>Scheduler</p>
        </template>
        <template v-else>
          <p>Scheduler</p>
        </template>
      </sidebar-link> -->
      <sidebar-link to="/checkin">
        <i class="tim-icons icon-watch-time"></i>
        <template>
          <p>Check in and check out</p>
        </template>
      </sidebar-link>
      <sidebar-link to="/calendar">
        <i class="tim-icons icon-calendar-60"></i>
        <template>
          <p>Calendar</p>
        </template>
      </sidebar-link>

      <sidebar-link to="/bookingmanager">
        <i class="tim-icons icon-book-bookmark"></i>
        <template v-if="!isRTL">
          <p>Booking manager</p>
        </template>
        <template v-else>
          <p>Booking manager</p>
        </template>
      </sidebar-link>

      <sidebar-link to="/roommanager">
        <i class="tim-icons icon-settings"></i>
        <template v-if="!isRTL">
          <p>Room manager</p>
        </template>
        <template v-else>
          <p>Room manager</p>
        </template>
      </sidebar-link>

      <!-- <sidebar-link to="/createroom">
        <i class="tim-icons icon-pencil"></i>
        <template v-if="!isRTL">
          <p>Create room</p>
        </template>
        <template v-else>
          <p>Create room</p>
        </template>
      </sidebar-link> -->

      <sidebar-link to="/hotelprofile">
        <i class="tim-icons icon-istanbul"></i>
        <template v-if="!isRTL">
          <p>Hotel profile</p>
        </template>
        <template v-else>
          <p>Hotel profile</p>
        </template>
      </sidebar-link>
      <sidebar-link to="/billing">
        <i class="tim-icons icon-money-coins"></i>
        <template>
          <p>Billing</p>
        </template>
      </sidebar-link>

      <!-- <sidebar-link to="/user">
        <i class="tim-icons icon-badge"></i>

        <template v-if="!isRTL">
          <p>User Profile</p>
        </template>

        <template v-else>
          <p>ملف تعريفي للمستخدم</p>
        </template>
      </sidebar-link> -->

      <!-- <sidebar-link to="/icons">
        <i class="tim-icons icon-atom"></i>

        <template v-if="!isRTL">
          <p>Icons</p>
        </template>

        <template v-else>
          <p>الرموز</p>
        </template>
      </sidebar-link> -->
      

      <!-- <sidebar-link to="/maps">
        <i class="tim-icons icon-pin"></i>

        <template v-if="!isRTL">
          <p>Maps</p>
        </template>

        <template v-else>
          <p>خرائط</p>
        </template>
      </sidebar-link> -->
<!-- 
      <sidebar-link to="/notifications">
        <i class="tim-icons icon-bell-55"></i>

        <template v-if="!isRTL">
          <p>Notifications</p>
        </template>

        <template v-else>
          <p>إخطارات</p>
        </template>
      </sidebar-link>

      

      <sidebar-link to="/table">
        <i class="tim-icons icon-puzzle-10"></i>

        <template v-if="!isRTL">
          <p>Table List</p>
        </template>

        <template v-else>
          <p>قائمة الجدول</p>
        </template>
      </sidebar-link>

      <sidebar-link to="/typography">
        <i class="tim-icons icon-align-center"></i>

        <template v-if="!isRTL">
          <p>Typography</p>
        </template>

        <template v-else>
          <p>طباعة</p>
        </template>
      </sidebar-link> -->

    </side-bar>

    <sidebar-share :background-color.sync="backgroundColor"></sidebar-share>

    <div class="main-panel" :data="backgroundColor">
      <top-navbar></top-navbar>

      <dashboard-content @click.native="toggleSidebar"></dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>

<style lang="scss"></style>

<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./DashboardContent.vue";
import SidebarShare from "./SidebarSharePlugin.vue";
import MobileMenu from "./MobileMenu.vue";
import SideBar from "@/components/SidebarPlugin/SideBar.vue";
import SidebarLink from "@/components/SidebarPlugin/SidebarLink.vue";

export default {
  components: {
    TopNavbar,
    DashboardContent,
    ContentFooter,
    // eslint-disable-next-line vue/no-unused-components
    MobileMenu,
    SideBar,
    SidebarLink,
    SidebarShare,
  },
  data() {
    return {
      backgroundColor: "green",
    };
  },
  computed: {
    isRTL() {
      return this.$rtl.isRTL;
    },
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
  },
};
</script>

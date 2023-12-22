<!-- Navbar.vue -->
<template>
  <nav
    id="header"
    class="w-full z-30 top-10 py-1 bg-white border-b border-black-400"
    style="box-shadow: rgba(59, 131, 246, 0.377) 0 1px 10px 1px"
  >
    <div class="w-full flex items-center justify-between mt-0 px-6 py-2">
      <div>
        <router-link to="/">
          <img src="/logo/lanmark-logo-navbar.png" :width="200" alt="" />
        </router-link>
      </div>
      <div
        class="order-2 md:order-3 flex items-center justify-end mr-0 md:mr-4"
        id="nav-content"
        style="column-gap: 0.5rem"
      >
        <i
          @click="toggle"
          v-badge="notificationData.length"
          class="pi pi-bell p-overlay-badge"
          style="font-size: 1.5rem; cursor: pointer"
        />
        <!-- <div class="notification-box">
          <div>
            <i @click="toggle" class="bi bi-bell" />
          </div>
          <div>
            <span class="notification-count" style="font-size: 0.8rem">{{
              notificationData.length
            }}</span>
          </div>
        </div> -->
        <OverlayPanel ref="op">
          <div class="custom-confirm-popup overflow-y-scroll">
            <div
              v-for="(notification, index) in notificationData"
              :key="index"
              class="notification-item"
            >
              <h4>{{ notification.title }}</h4>
              <p>{{ notification.detail }}</p>
            </div>
          </div>
        </OverlayPanel>

        <div class="auth flex items-center w-full md:w-full">
          <div
            v-for="(menu, menuKey) in dropdowns"
            :key="menuKey"
            class="relative lg:inline-block text-left"
          >
            <button
              @click="toggleMenu(menuKey)"
              type="button"
              class="lg:inline-block lg:mt-0 hover:text-white px-2 py-2 rounded hover:bg-[#007bff] ml-2"
            >
              <span class="bi bi-person-fill text-2xl"></span>
              {{ namestore }} <i class="bi bi-caret-down-fill"></i>
            </button>
            <transition name="fade">
              <div
                v-if="isMenuOpen(menuKey)"
                @click.stop="closeDropdowns"
                class="menu-dropdown lg:inline-blockorigin-top-right absolute mt-2 w-40 bg-white border border-gray-300 py-2 rounded-lg shadow-lg z-10"
              >
                <router-link
                  v-for="item in menu"
                  :key="item.id"
                  :to="item.route"
                  class="w-full text-center block px-4 py-2 hover:text-white hover:bg-[#007bff]"
                >
                  {{ item.label }}
                </router-link>
                <button
                  @click="triggerDownload"
                  class="text-normal w-full block px-2 py-2 hover:text-white hover:bg-[#004e98]"
                >
                  ดาวน์โหลดสัญญา
                </button>
                <button
                  @click="logout"
                  class="w-full block px-4 py-2 hover:text-white hover:bg-[#dc3545]"
                >
                  ออกจากระบบ
                </button>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </nav>
  <div class="full-width-menubar">
    <Menubar :model="menu" class="center-nav" />
  </div>
</template>

<script>
import axios from "axios";
import { ref } from "vue";
// อย่าลืม import ตัวแปร bus จากไลบรารี mitt
import mitt from "mitt";

export default {
  components: {},
  created() {
    this.$bus.on("download-contract", this.downloadContract);
    this.loadNotifications();
  },
  data() {
    const mockupNotification = ref([]);
    const loadNotifications = async () => {
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_API}notification/`,
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        this.notificationData = response.data.data;
      } catch (error) {
        console.error("ข้อผิดพลาดในการดึงข้อมูลการแจ้งเตือน", error);
        return [];
      }
    };
    return {
      bus: mitt(),
      loadNotifications,
      notificationData: [],
      popupText: "Your notification message here",
      isMobileMenuOpen: false,
      isMenuOpenState: {
        items: false,
        ห้อง: false,
        จอง: false,
      },
      editDataModal: false,
      roomModal: false,
      namestore: `${this.$store.getters.name}`,
      // id: `${this.$store.getters.id}`,
      dropdowns: {
        items: [{ id: 1, label: "แก้ไขข้อมูล", route: "/editpartner" }],
      },
      navdropdowns: {
        ห้อง: [
          { id: 1, label: "เพิ่มห้อง", route: "/addhotel" },
          { id: 2, label: "จัดการห้อง", route: "/manageroom" },
        ],
        จอง: [
          { id: 1, label: "อนุมัติการจองห้อง", route: "/managebooking" },
          { id: 2, label: "อนุมัติการชำระเงิน", route: "/approvepayment" },
        ],
      },
      menu: [
        {
          label: "dashboard",
          icon: "pi pi-link",
          to: "/dashboardpartner",
        },
        {
          label: "ห้อง",
          icon: "bi bi-houses",
          items: [
            {
              label: "เพิ่มห้อง",
              icon: "bi bi-house-add",
              to: "/addhotel",
            },
            {
              label: "จัดการห้อง",
              icon: "bi bi-house-gear",
              to: "/manageroom",
            },
          ],
        },
        {
          label: "การจอง",
          icon: "bi bi-pencil-square",
          items: [
            {
              label: "อนุมัติการจองห้อง",
              icon: "pi pi-check-square",
              to: "/managebooking",
            },
          ],
        },
      ],
      mockupNotification,
      modalDownload: false,
    };
  },
  methods: {
    triggerDownload() {
      this.$bus.emit("contractContent", this.downloadPdf);
    },

    toggle(event) {
      this.$refs.op.toggle(event);
      this.loadNotifications();
    },
    logout() {
      localStorage.clear();
      this.$store.commit("setLoginDefault");
      this.$router.push("/");
    },
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
    },
    toggleMenu(menuKey) {
      // console.log("menuKey:", menuKey);
      this.isMenuOpenState = Object.fromEntries(
        Object.keys(this.isMenuOpenState).map((key) => [
          key,
          key === menuKey ? !this.isMenuOpenState[key] : false,
        ])
      );
      if (menuKey === "item" && this.isMenuOpenState.items) {
        this.editDataModal = true;
      } else {
        this.editDataModal = false;
      }
      // console.log("isMenuOpenState:", this.isMenuOpenState);
    },
    isMenuOpen(key) {
      return this.isMenuOpenState[key];
    },
    closeDropdowns() {
      this.isMobileMenuOpen = false;

      this.isMenuOpenState = Object.fromEntries(
        Object.keys(this.isMenuOpenState).map((key) => [key, false])
      );
    },
    mounted() {
      this.showNotification = true; // ทำให้ Notification ปรากฏทันทีเมื่อโหลดหน้าเว็บ
      this.op = this.$refs.op;
      // ... (เหตุการณ์อื่น ๆ)
    },
    toggleNotificationModal() {
      this.showNotificationModal = !this.showNotificationModal;
    },
  },
};
</script>

<style scoped>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";

.full-width-menubar {
  /* แนวตั้งกลางด้วย */
  width: 100%; /* ให้กว้างเต็มหน้าจอ */
}
.center-nav {
  display: flex;
  justify-content: center;
  align-items: center;
}
.center-nav[data-v-0dda9e98] {
  background-color: #fff;
  box-shadow: rgba(113, 165, 248, 0.226) 0 1px 10px 1px;
}
.notification-box {
  position: relative;
  width: 25px;
  cursor: pointer;
}

.notification-box span {
  color: #fff;
  position: absolute;
  bottom: 9px;
  left: 7px;
  border-radius: 50%;
  padding: 0.1rem;
  font-size: 0.8rem;
  background-color: black;
}
.custom-confirm-popup {
  width: 250px;
  height: 250px;
}

.notification-item {
  border: 1px solid #ddd;
  margin-bottom: 5px;
  border-radius: 8px;
  padding: 12px;
}

.notification-item h4 {
  margin-bottom: 8px;
}
</style>

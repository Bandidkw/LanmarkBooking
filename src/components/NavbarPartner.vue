<!-- Navbar.vue -->
<template>
  <nav id="header" class="w-full z-30 top-10 py-1 bg-white border-b border-black-400" style="box-shadow: rgba(59, 131, 246, 0.377) 0 1px 10px 1px">
    <Loading :loading="loading"/>
    <div class="w-full flex items-center justify-between mt-0 px-6 py-2" >
      <div>
        <router-link to="/">
          <img src="/logo/lanmark-logo-navbar.png" :width="200" alt="" />
        </router-link>
      </div>
      <div class="order-2 md:order-3 flex flex-wrap items-center justify-end mr-0 md:mr-4" id="nav-content">
        <div class="auth flex items-center w-full md:w-full" >
          <div v-for="(menu, menuKey) in dropdowns" :key="menuKey" class="relative lg:inline-block text-left">
            <button @click="toggleMenu(menuKey)" type="button"
              class="mt-4 lg:inline-block lg:mt-0 hover:text-white px-2 py-2 rounded hover:bg-[#007bff]">

              <span class="bi bi-person-fill text-2xl"></span> {{ namestore }} <i class="bi bi-caret-down-fill"></i>
            </button>
            <transition name="fade">
              <div v-if="isMenuOpen(menuKey)" @click.stop="closeDropdowns"
                class="menu-dropdown lg:inline-blockorigin-top-right absolute mt-2 w-40 bg-white border border-gray-300 py-2 rounded-lg shadow-lg z-10">
                <router-link v-for="item in menu" :key="item.id" :to="item.route"
                  class="w-full text-center block px-4 py-2 hover:text-white hover:bg-[#007bff]">
                  {{ item.label }}
                </router-link>
                <button @click="downloadContract" class="text-sm w-full block px-4 py-2 hover:text-white hover:bg-[#004e98]">ดาวน์โหลดสัญญา</button>    
                <button @click="logout" class="w-full block px-4 py-2 hover:text-white hover:bg-[#dc3545]">
                  ออกจากระบบ</button> 
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </nav>
  <div class="full-width-menubar">
    <Menubar :model="menu" class="center-nav"/>
  </div>
</template>
  
<script>

export default {
  components: {
  },
  data() {
    return {
      isMobileMenuOpen: false,
      isMenuOpenState: {
        items: false,
        ห้อง: false,
        จอง: false
      },
      editDataModal: false,
      roomModal: false,
      namestore: `${this.$store.getters.name}`,
      dropdowns: {
        items: [
          { id: 1, label: "แก้ไขข้อมูล", route: "/editpartner" },
        ],
      },
      navdropdowns: {
        ห้อง: [
          { id: 1, label: "เพิ่มห้อง", route: "/addhotel" },
          { id: 2, label: "จัดการห้อง", route: "/manageroom" },
        ],
        จอง: [
          { id: 1, label: "อนุมัติการจองห้อง", route: "/managebooking" },
          { id: 2, label: "อนุมัติการชำระเงิน", route: "/approvepayment" }

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
          icon: "pi pi-folder",
          items: [
            {
              label: "เพิ่มห้อง",
              icon:"pi pi-plus",
              to: "/addhotel",
            },
            {
              label: "จัดการห้อง",
              icon:"pi pi-pencil",
              to: "/manageroom",
            }
          ],
        },
        {
          label: "จอง",
          icon: "pi pi-send",
          items: [
            {
              label: "อนุมัติการจองห้อง",
              icon:"pi pi-check-square",
              to: "/managebooking",
            },
            {
              label: "อนุมัติการชำระเงิน",
              icon:"pi pi-dollar",
              to: "/approvepayment",
            }
          ],
        },
      ],
    };
  },
  methods: {
    downloadContract() {
      // สร้าง URL สำหรับไฟล์ PDF
      const pdfUrl = '/pdf/contract_partner.pdf';  // กำหนดเส้นของไฟล์ PDF

      // สร้าง Element <a> เพื่อทำการดาวน์โหลด
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.setAttribute('target', '_blank');
      link.click();
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
  }
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
.center-nav[data-v-0dda9e98]{
  background-color: #fff;
  box-shadow: rgba(113, 165, 248, 0.226)0 1px 10px 1px;
}
</style>
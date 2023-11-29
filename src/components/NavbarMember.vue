<!-- Navbar.vue -->
<template>
  <nav id="header" class="w-full z-30 top-10 py-1 bg-white border-b border-black-400">
      <div class="w-full flex items-center justify-between mt-0 px-6 py-2">
        <div>
          <router-link to="/">
            <img src="/logo/lanmark-logo-navbar.png" :width="200" alt="" />
          </router-link>
        </div> 
         <div class="order-2 md:order-3 flex flex-wrap items-center justify-end mr-0 md:mr-4" id="nav-content">
            <div class="auth flex items-center w-full md:w-full">
              <div v-for="(menu, menuKey) in dropdowns" :key="menuKey" class="relative lg:inline-block text-left">
              <button @click="toggleMenu(menuKey)" type="button" class="mt-4 lg:inline-block lg:mt-0 hover:text-white px-2 py-2 rounded hover:bg-[#007bff] mr-2 ">
              
               <span class="bi bi-person-fill"></span> {{namestore}} <i class="bi bi-caret-down-fill"></i>
              </button>
          <transition name="fade">
            <div v-if="isMenuOpen(menuKey)" @click.stop="closeDropdowns" class="menu-dropdown lg:inline-blockorigin-top-right absolute mt-2 w-40 bg-white border border-gray-300 py-2 rounded-lg shadow-lg z-10">
              <router-link v-for="item in menu" :key="item.id" :to="item.route" class="block px-4 py-2 hover:text-white hover:bg-[#007bff]">
                {{ item.label }}
              </router-link>
              <button  @click="logout" class="block px-4 py-2 hover:text-white hover:bg-[#dc3545]">
                  ออกจากระบบ
                </button>
            </div>
          </transition>
        </div>
            </div>
         </div>
      </div>
   </nav>
   <!--eslint-disable-next-line vue/no-multiple-template-root-->
  <nav
    id="header"
    class="w-full top-10  bg-white border-b border-black-400"
  >
    <div class="w-full flex items-center justify-center mt-0 px-5">
      <!--- ใช้ปุ่มเดียว-->
      <router-link v-for="(link, index) in menubars" :to="link.to" :key="index">
        <button
          type="button"
          class="mt-4 lg:inline-block lg:mt-0 hover:text-white px-2 py-3 rounded hover:bg-[#007bff] mr-2"
        >
          {{ link.label }}
        </button>
      </router-link>
    </div>
  </nav>

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
      },
      namestore:`${this.$store.getters.name}`,
      dropdowns:{
         items:[ 
          { id: 1, label: "แก้ไขข้อมูล", route: "/editmember" },
        ],
      },
      menubars: [{label:"เช็คอิน-เช็คเอาท์",to:"/checkin-out"},{ label: "ข้อมูลการจอง", to: "/bookingmember" }],
      
    };
  },
  methods : {
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

</style>
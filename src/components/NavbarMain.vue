<!-- Navbar.vue -->
<template>
  <nav
    class="nav-bar flex w-full"
    style="box-shadow: rgba(59, 131, 246, 0.712) 0 1px 10px 1px"
  >
    <router-link to="/" class="topweb-left flex">
      <img class="logo-main" src="/logo/lanmark-logo-navbar.png" alt="" />
      <img class="logo-mobile" src="/logo/lanmark-logo.png" alt="" />
    </router-link>
    <div class="search-box" v-if="isRegisterPage">
      <span class="p-input-icon-right">
        <InputText
          ref="searchInput"
          v-model="searchTerm"
          placeholder="ค้นหา"
          class="search-box-input"
          @keyup.enter="searchHotels"
          @keydown="handleKeydown"
          tabindex="0"
        />
        <i
          @click="searchHotels"
          class="pi pi-search pr-2 cursor-pointer pl-2 active:bg-blue-700 search-icon"
          style="
            font-size: 0.8rem;
            justify-content: center;
            margin: 0;
            display: flex;
            align-items: center;
            background-color: #3b82f6;
            height: 2rem;
            width: 2rem;
            border-radius: 50%;
            top: 8px;
            right: 8px;
            color: #fff;
          "
        />
      </span>
    </div>
    <LoginUser />
  </nav>
</template>

<script>
import LoginUser from "./LoginUser.vue";
export default {
  data() {
    return {
      searchTerm: "",
    };
  },
  methods: {
    searchHotels() {
      this.$bus.emit("search-hotels", this.searchTerm);
    },
    handleKeydown(event) {
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        // หาก Control key (Windows) หรือ Command key (Mac) + 'k' ถูกกด ให้โฟกัสที่ Input
        this.focusInput();
      }
    },
    focusInput() {
      this.$refs.searchInput.$el.focus();
    },
  },
  components: {
    LoginUser,
  },
  computed: {
    isRegisterPage() {
      // สมมติว่า "/register" เป็นเส้นทางสำหรับหน้าลงทะเบียน
      return this.$route.path === "/register" ? false : true;
    },
  },
};
</script>

<!---------------------------- style -------------------------------->

<style lang="scss" scope>
.search-box-input {
  border-radius: 2rem;
}

.search-box-input:focus {
  border: #3b82f6 1px solid;
}

.nav-bar {
  width: 100%;
  height: 80px;
  align-items: center;
  justify-content: space-between;
}

.topweb-left img {
  width: 178px;
  height: 3rem;
}

.topweb-right {
  display: flex;
  align-items: center;
  column-gap: 1rem;
}

.topweb-right p {
  margin: 0;
}
.search-icon:hover {
  background: #fff;
  box-shadow: 0px 1px 8px 1px #3b82f6;
  color: #000;
}
@media screen and (max-width: 1536px) {
  .logo-mobile {
    display: none;
  }
}
@media screen and (max-width: 1280px) {
  .topweb-left{
    width: 178px;
    height: 48px;
  }
  .logo-mobile {
    display: none;
  }
}
/* เมื่อขนาดหน้าจอมากกว่าหรือเท่ากับ 1024px */
@media screen and (min-width: 1024px) {
  .logo-main {
    display: block;
  }
  .logo-mobile {
    display: none;
  }
}
@media screen and (max-width: 820px) {
  .logo-mobile {
    display: none;
  }
}
/* เมื่อขนาดหน้าจอมากกว่าหรือเท่ากับ 768px */
@media screen and (min-width: 768px) {
  // .search-box {
  //   display: none;
  // }
}

@media screen and (max-width: 640px) {
  .logo-mobile {
    display: none;
  }
  // .search-box {
  //   display: none;
  // }
}
/* เมื่อขนาดหน้าจอไม่เกิน 414px */
@media screen and (max-width: 430px) {
  .topweb-left{
    width: 50px;
  }
  .search-box {
    width: 30%;
  }
  .logo-mobile {
    display: block;
  }
  .logo-main {
    display: none;
  }
  .search-box-input {
    width: 100%;
  }
  .nav-bar {
    padding: 0 0.5rem;
    display: flex;
  }
}
@media screen and (max-width: 414px) {
  .search-box {
    width: 30%;
  }
  .logo-mobile {
    display: block;
  }
  .logo-main {
    display: none;
  }
  .search-box-input {
    width: 100%;
  }
  .nav-bar {
    padding: 0 1rem;
    display: flex;
  }
}
</style>

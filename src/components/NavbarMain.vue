<!-- Navbar.vue -->
<template>
  <nav
    class="nav-bar"
    style="box-shadow: rgba(59, 131, 246, 0.712) 0 1px 10px 1px"
  >
    <router-link to="/" class="topweb-left">
      <img src="/logo/lanmark-logo-navbar.png" alt="" />
    </router-link>
    <div class="search-box" @keyup.enter="searchHotels">
      <span class="p-input-icon-right">
        <InputText
          v-model="searchTerm"
          placeholder="ค้นหา"
          class="search-box-input"
        />
        <i
          @click="searchHotels"
          class="pi pi-search pr-2 cursor-pointer pl-2 mb-4 active:bg-blue-700 log-icon"
          style="
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
  },
  components: {
    LoginUser,
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
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.topweb-left img {
  width: 100%;
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

.log-icon:hover {
  background: #fff;
  box-shadow: 0px 1px 8px 1px #3b82f6;
  color: #000;
}

@media screen and (max-width: 820px) {
  .search-box {
    display: none;
  }
}
@media screen and (max-width: 768px) {
  .search-box {
    display: none;
  }
}
@media screen and (max-width: 640px) {
  .search-box {
    display: none;
  }
}

@media screen and (max-width: 414px) {
  .nav-bar {
    padding: 0 1rem;
    display: flex;
    gap: 5rem;
  }
}
</style>

<!-- Navbar.vue -->
<template>
  <nav class="nav-bar" style="box-shadow: rgba(59, 131, 246, 0.712) 0 3px 0 0">
    <router-link to="/" class="topweb-left">
      <img src="/logo/lanmark-logo-navbar.png" alt="" />
    </router-link>

    <div class="search-box">
      <span class="p-input-icon-right">
        <InputText placeholder="Search" class="search-box-input" />
        <i class="pi pi-search pr-2 cursor-pointer pl-2 mb-4" />
      </span>
    </div>
    <LoginUser />
  </nav>
</template>

<script>
import LoginUser from "./LoginUser.vue"
export default {
  data() {
    return {
    };
  },
  methods: {
  },
  components: {
    LoginUser,
  },
};
</script>

<!---------------------------- style -------------------------------->

<style lang="scss" scope>
//@import '@/assets/scss/custom/_navbar.scss';

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

@media screen and (max-width:768px) {
  .search-box {
    display: none;
  }
}
@media screen and (max-width:640px) {
  .search-box {
    display: none;
  }
}

@media screen and (max-width:414px) {
  .nav-bar {
    padding: 0 1rem;
  }
}
</style>

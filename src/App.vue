<!-- App.vue -->
<template>
  <div class="container">
    <navbar class="nav-bar"></navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from './components/NavbarMain.vue';
<<<<<<< HEAD
// import FilterPopup from './FilterPopup.vue';

=======
>>>>>>> f1052dd6fd1db679f313d0e76e7c3781d5d82d52
export default {
  components: {
    Navbar,
  },

};
</script>

<style scoped>
.container{
  width: 100%;
  padding: 1rem 0;
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
</style>

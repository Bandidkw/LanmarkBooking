<!-- App.vue -->
<template>
  <div class="container">
    <navbar class="nav-bar"></navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from './components/NavbarMain.vue';

export default {
  components: {
    Navbar,
  },
};
</script>

<style scoped>
.container{
  position: relative;
  z-index: 0;
}
.nav-bar{
  position: relative;
  z-index: 999;
}
</style>

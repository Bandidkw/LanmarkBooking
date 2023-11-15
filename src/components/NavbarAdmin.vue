<!-- Navbar.vue -->
<template>
  <nav class="nav-bar">
    <router-link to="/" class="topweb-left">
      <img src="/logo/lanmark-logo-navbar.png" alt="">
    </router-link>
      
    <div class="topweb-right">
      <div>
          <Menubar :model="menuModel" />
      </div>
    </div>
  </nav>
</template>

<script>

import Menubar from 'primevue/menubar';

export default {
components: {
  Menubar,
},
data() {
  return {
    menuModel: [
      {
        label: `${this.$store.getters.name}`,
        items: [
          { label: 'แก้ไขข้อมูล'},
          { label: 'ออกจากระบบ' },
        ],
      },
    ],
  };
},
};

</script>
<!-- Navbar.vue -->
<template>
    <nav class="nav-bar">
      <router-link to="/" class="topweb-left">
        <img src="/logo/lanmark-logo-navbar.png" alt="">
      </router-link>
        
      <div class="topweb-right">
        <div>
          <div class="dropdown">
            <button class="dropbtn" ></button>
            <div class="dropdown-content">
              <a href="#">Link 1</a>
              <a href="#">Link 2</a>
              <a href="#">Link 3</a>
            </div>

          </div>
            
            <Menubar :model="menuModel" />
            <a href="" @click="logout()"></a>
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
            { label: 'ออกจากระบบ'},
          ],
        },
      ],
    };
  },
  methods : {
    logout() {
      this.$confirm.require({
      message: "ต้องการออกจากระบบนี้?",
      header: "ออกจากระบบ",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "ออกจากระบบ",
      acceptClass: "p-button-danger",
      acceptIcon: "pi pi-fw pi-power-off",
      rejectLabel: "ยกเลิก",
      accept: async () => {
          localStorage.clear();
          this.$store.commit("setLoginDefault");
            // this.$router.push("/login");
        },
      });
    },
  }
};

</script>
  
  
    
  
  <!---------------------------- style -------------------------------->
  
  <style>
  .dropbtn {
    background-color: #4CAF50;
    color: white;
    padding: 16px;
    font-size: 16px;
    border: none;
    cursor: pointer;
  }
  
  .dropdown {
    position: relative;
    display: inline-block;
  }
  
  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
  }
  
  .dropdown-content a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
  }
  
  .dropdown-content a:hover {background-color: #f1f1f1}
  
  .dropdown:hover .dropdown-content {
    display: block;
  }
  
  .dropdown:hover .dropbtn {
    background-color: #3e8e41;
  }
  </style>
<template>
  <div class="main-container">
    <div class="navbar">
      <router-link to="/landing">NBA BOOKING</router-link>
      <div class="menu-bar">
        <!-- <ul> -->
          <!-- <li><router-link to="/">Home</router-link></li> -->
          <!-- <li><router-link to="/login">Login</router-link></li> -->
          <!-- <li><router-link to="/register">Register</router-link></li>
        </ul> -->
        <button @click="login('/login')">เข้าสู่ระบบ</button>
        </div>
    </div>
  <div class="content">
      <router-view />
  </div>
  </div>
  </template>
<script>
export default {
  name: "App",
  methods:{
    // ---------- สร้างฟังก์ชั่นล็อกอินเพื่อเรียกใช้ ----------//
    // Login(){
    //         this.$router.push('/login');
    //         // this.count++;
    //     },
    //-------------------------------//
    data(){
      return{
        landingCount:0,
        loginCount:0
    }
  },
    login(route){
      this.$router.push(route);
      if(route === '/login'){
        this.loginCount++;
      }
      else if (route === '/landing'){
        this.loginCount++;
      }
    }
  },


  // data(){
  //   return {
  //     count: 0
  //   };
  // },
  // methods: {
  //   Login() {
  //     this.$router.push('/login');
  //     this.count++;
  //   }
  // }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
  list-style-type: none;
}
.main-container{
  background-image: url(./components/Landingpage/img/bg-img.jpg);
  background-size: cover;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.navbar{
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5rem;
  width: 100%;
  height: 70px;
  background-color: rgba(0,0,0,0.3);
  backdrop-filter: blur(1px);
}
.navbar a{
  color: #fff;
  text-decoration: none;
}
.menu-bar{
  display: flex;
  align-items: center;
}
.menu-bar ul{
  margin: 0;
  align-items: center;
  display: flex;
}
.menu-bar ul li{
  margin: 0 0.5rem;
  text-decoration: none;
}
.menu-bar ul li a{
  color: #fff;
  text-decoration: none;
}
.menu-bar button{
  margin: 0 1rem;
  border-radius: 15px;
  width: 6rem;
  height: 2.2rem;
  color: #fff;
  background-color: #f15bb5;
  border: none;
  font-size: 1rem;
  transition: 0.4s;
}
.menu-bar button:hover{
  transform: scale(1.2);
}
.content{
  padding: 5rem;
}

</style>

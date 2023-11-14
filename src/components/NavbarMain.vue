<!-- Navbar.vue -->
<template>
  <nav class="nav-bar">
    <router-link to="/" class="topweb-left">
      <img src="/logo/lanmark-logo-navbar.png" alt="">
    </router-link>
    <div class="topweb-right">
      <p>ให้เช่าที่พักกับ Lanmark</p>
    <!-- <router-link to="/">Home</router-link>
        <router-link to="/about">About</router-link>
          <router-link to="/contact">Contact</router-link> -->
      <div class="login-box" @click="showPopup">
        <i class="bi bi-list"></i>
        <button type="button" class="log-icon"><i class="bi bi-person-fill"></i></button>

        <div v-if="isPopupVisible" class="login-popup">

          <!-- popup ที่แสดง -->
          <div class="popup-content" @click.stop>

            <!-- ปุ่มปิด popup -->
            <div class="top-pop">
              <h1>เข้าสู่ระบบ</h1>
              <i class="bi bi-x close-btn" @click="hidePopup"></i>
            </div>
            <!--  -->

            <!-- เนื้อหาเข้าสู่ระบบ -->
            <!-- ในที่นี้คุณอาจใส่ฟอร์มเข้าสู่ระบบหรือเนื้อหาที่เกี่ยวข้อง -->
            <form @submit.prevent="login" class="form-control">

              <!-- Input เบอร์โทรศัพท์ -->
              <label for="telephone" class="text-form">เบอร์โทรศัพท์</label>
              <input class="input-form" type="tel" id="telephone" v-model="telephone" required @input="validateInput">

              <p v-if="showValidationError" class="error-message">กรุณากรอกเลขโทรศัพท์ที่ถูกต้อง</p>

              <!-- Input รหัสผ่าน -->
              <label for="password" class="text-form">รหัสผ่าน</label>
              <input class="input-form" :type="showPassword ? 'text' : 'password'" id="password" v-model="password"
                required>

              <div class="button-con">
                <div class="show-pass">

                  <!-- แสดง/ซ่อน รหัสผ่าน -->
                  <input type="checkbox" id="showPassword" v-model="password">
                  <label for="showPassword">แสดงรหัสผ่าน</label>
                </div>

                <!-- ปุ่มเข้าสู่ระบบ -->
                <button type="submit" @click="login" :disabled="showValidationError">เข้าสู่ระบบ</button>
              </div>
            </form>
            <!-- ... -->
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
//import axios from 'axios';

export default {
  data() {
    return {
      isPopupVisible: false,
      telephone: '',
      password: '',
      showPassword: false,
      showValidationError: false
    };
  },
  methods: {

    showPopup() {
      this.isPopupVisible = true;
    },
    hidePopup() {
      this.isPopupVisible = false;
      this.telephone = '';
      this.password = '';
    },
    async login() { 
      if(this.telephone===null || this.telephone==='' || this.password===null || this.password===''){
          console.log("fail")
      }
      else{
        await this.SignIn(this.telephone,this.password).then(async (result)=>{
          console.log(result)
        })
    }
      // this.$router.push('/views/DashboardPage')
      // this.isPopupVisible = false;
    },
    validateInput() {
      this.showValidationError = !/^[0-9]+$/.test(this.telephone)
    },
    async SignIn(telephone,password){
        let user;
        const initdata = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          url:'http://localhost:4444/v2/nba-hotel/signin',
          body: JSON.stringify({telephone,password}),
          credentials: "include",
        };
        await fetch("http://localhost:4444/v2/nba-hotel/signin", initdata)
          .then((response) => response.json())
          .then((result) => user = result)
          .catch((err) => user = err);
          this.user = user;
      
          return user;
    }
  
  }
};
</script>


  

<!---------------------------- style -------------------------------->
<style>
.nav-bar {
  width: 100%;
  height: 70px;
  padding: 0 5rem;
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

.login-box {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.5rem;
  width: 5rem;
  height: 3rem;
  /* padding: 0.5rem; */
  background-color: #c7c7c7;
  border-radius: 25px;
}

.login-box .log-icon:active {
  background-color: #00bbf9;
  box-shadow: 0 3px #666;
  transform: translateY(1px);
}

.login-box button {
  cursor: pointer;
  /* background-color: #000; */
  width: 2.5rem;
  height: 2.5rem;
  border: none;
  border-radius: 50%;
  padding: 0.2rem;
}

.login-box i {
  color: #000;
  font-size: 1.5rem;
}

/*------------------------------- LoginPopup ----------------------------*/

.top-pop {
  display: flex;
  justify-content: space-between;
}

.top-pop h1 {
  font-size: 2rem;
}

.login-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
}

.popup-content {
  cursor: default;
  width: 30%;
  height: 25rem;
  background-color: #fff;
  padding: 1rem 3rem;
  border-radius: 8px;
  z-index: 9999;
}

.popup-content i {
  display: flex;
  justify-content: flex-end;
}

.form-control {
  cursor: default;
  text-align: left;
  display: flex;
  flex-direction: column;
  padding-top: 1.5rem;
  row-gap: 0.5rem;
}

.text-form {
  cursor: default;
  font-size: 1.1rem;
}

.input-form {
  font-weight: 400;
  width: 100%;
  height: 2rem;
  padding: 1rem;
}

.button-con {
  row-gap: 1rem;
  display: flex;
  flex-direction: column;
}

.button-con input[type="checkbox"] {
  margin-right: 5px;
}

.button-con button {
  border-radius: 1rem;
  width: 5rem;
}

.close-btn {
  cursor: pointer;
}

.show-pass {
  display: flex;
  align-items: center;
}

.show-pass input,
label {
  cursor: pointer;
}</style>
  
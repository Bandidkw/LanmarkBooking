<!-- Navbar.vue -->
<template>
  <nav class="nav-bar" style="box-shadow: rgba(0, 0, 0, 0.08) 0 1px 1px">
    <router-link to="/" class="topweb-left">
      <img src="/logo/lanmark-logo-navbar.png" alt="" />
    </router-link>

    <div>
      <span class="p-input-icon-right">
        <i class="pi pi-search" />
        <InputText placeholder="Search" class="search-box" />
      </span>
    </div>

    <div class="topweb-right">
      <p>ให้เช่าที่พักกับ Lanmark</p>
      <div class="login-box" @click="showPopup">
        <i class="bi bi-list"></i>
        <button type="button" class="log-icon">
          <i class="bi bi-person-fill"></i>
        </button>

        <div v-if="isPopupVisible" class="Modal-content">
          <!-- popup ที่แสดง -->
          <div class="popup-content" @click.stop>
            <!-- ปุ่มปิด popup -->
            <div class="top-pop">
              <h1>เข้าสู่ระบบ</h1>
              <Button @click="hidePopup" icon="pi pi-times" severity="secondary" text />
            </div>
            <!--  -->

            <!-- เนื้อหาเข้าสู่ระบบ -->
            <!-- ในที่นี้คุณอาจใส่ฟอร์มเข้าสู่ระบบหรือเนื้อหาที่เกี่ยวข้อง -->
            <form @submit.prevent="login" class="form-control">
              <!-- Input เบอร์โทรศัพท์ -->
              <label for="telephone" class="text-form">เบอร์โทรศัพท์</label>
              <input class="input-form" type="tel" id="telephone" v-model="telephone" required @input="validateInput" />

              <p v-if="showValidationError" class="error-message">
                กรุณากรอกเลขโทรศัพท์ที่ถูกต้อง
              </p>

              <!-- Input รหัสผ่าน -->
              <label for="password" class="text-form">รหัสผ่าน</label>
              <input class="input-form" :type="showPassword ? 'text' : 'password'" id="password" v-model="password"
                required />

              <div class="button-con">
                <div class="show-pass">
                  <!-- แสดง/ซ่อน รหัสผ่าน -->
                  <input type="checkbox" id="showPassword" v-model="showPassword" />
                  <label for="showPassword">แสดงรหัสผ่าน</label>
                </div>

                <!-- ปุ่มเข้าสู่ระบบ -->
                <button type="submit" :disabled="showValidationError" class="text-white bg-blue-700 hover:bg-blue-800">
                  เข้าสู่ระบบ
                </button>
              </div>
              <span>ยังไม่มีบัญชี ผู้ใช้งาน
                <a href="#" style="color: blue; text-decoration: underline" @click="registerPage">สร้างบัญชี</a></span>
            </form>
            <!-- ... -->
          </div>
        </div>
        <CreateAccount v-show="RegisterVisible" @close="hideRegisterPopup" />
      </div>
    </div>
  </nav>
</template>

<script>
import axios from "axios";
import CreateAccount from "@/views/CreateAccount.vue";

export default {
  data() {
    return {
      isPopupVisible: false,
      telephone: "",
      password: "",
      showPassword: false,
      showValidationError: false,

      RegisterVisible: false,
    };
  },
  methods: {
    showPopup() {
      this.isPopupVisible = true;
    },
    hidePopup() {
      this.isPopupVisible = false;
      this.telephone = "";
      this.password = "";
    },
    showRegisterPopup() {
      this.isPopupVisible = false;
      this.RegisterVisible = true;
    },
    hideRegisterPopup() {
      this.isPopupVisible = false;
      this.RegisterVisible = false;
    },
    async login() {
      if (
        this.telephone === null ||
        this.telephone === "" ||
        this.password === null ||
        this.password === ""
      ) {
        console.log("fail");
      } else {
        try {
          const res = await axios.post(`${process.env.VUE_APP_API}signin/`, {
            telephone: this.telephone,
            password: this.password,
          });
          if (res.data) {
            // เมื่อเข้าสู่ระบบสำเร็จ
            // console.log(res.data.token)

            //รอสักครู่แล้วค่อยเปลี่ยนหน้า
            setTimeout(() => {
              localStorage.setItem("token", res.data.token);
              window.location.assign("/");
              console.log(res.data);
            }, 1500); // 1500 มิลลิวินาที (1.5 วินาที)
          } else {
            return console.log("faill");
          }
        } catch (error) {
          console.log(error);
        }
        // this.$router.push('/views/DashboardPage')
        // this.isPopupVisible = false;
      }
    },
    validateInput() {
      this.showValidationError = !/^[0-9]+$/.test(this.telephone);
    },
    registerPage() {
      this.isPopupVisible = false;
      this.$router.push("/register");
    },
  },
  components: {
    CreateAccount,
  },
};
</script>

<!---------------------------- style -------------------------------->

<style lang="scss">
//@import '@/assets/scss/custom/_navbar.scss';

.search-box {
  border-radius: 2rem;
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
  align-items: center;
  justify-content: space-between;

}

.top-pop h1 {
  font-size: 1.5rem;
}

.Modal-content {
  cursor: default;
  width: 25%;
  max-width: 600px;
  background-color: rgb(255, 255, 255);
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 50%);
  padding: 1rem 2rem;
  z-index: 9999;
}

.Modal-content input {
  border: solid 1px purple;
  border-radius: 8px;
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

.error-message {
  color: red;
  font-size: 10px;
}

.show-pass input,
label {
  cursor: pointer;
}
</style>

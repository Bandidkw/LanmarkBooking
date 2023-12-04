<template>
  <div>
    <Toast />
    <div class="topweb-right">
      <p>ให้เช่าที่พักกับ Lanmark</p>
      <div class="login-box" @click="showPopup">
        <i class="bi bi-list"></i>
        <button type="button" class="log-icon">
          <i class="bi bi-person-fill icon-log"></i>
        </button>
      </div>
    </div>

    <Dialog
      v-model:visible="LoginModal"
      @onHide="resetForm"
      maximizable
      modal
      header=" เข้าสู่ระบบ"
      :style="{ width: '20rem' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
      <form @submit.prevent="login" class="form-control">
        <label for="telephone">เบอร์โทรศัพท์</label>
        <InputText
          id="telephone"
          v-model="telephone"
          aria-describedby="telephone-help"
          @input="validateInput"
          required
        />
        <p v-if="showValidationError" class="error-message">
          กรุณากรอกเลขโทรศัพท์ที่ถูกต้อง
        </p>

        <label for="password">รหัสผ่าน</label>
        <InputText
          aria-describedby="password-help"
          :type="showPassword ? 'text' : 'password'"
          id="password"
          v-model="password"
          required
        />

        <div class="flex items-center">
          <input type="checkbox" id="showPassword" v-model="showPassword" />
          <label for="showPassword">แสดงรหัสผ่าน</label>
        </div>

        <Button
          label="เข้าสู่ระบบ"
          icon="pi pi-sign-in"
          :loading="loading"
          severity="help"
          rounded
          type="submit"
        />

        <span class="flex justify-content-center"
          >ยังไม่มีบัญชี ผู้ใช้งาน
          <a
            href="#"
            style="color: blue; text-decoration: underline"
            @click="registerPage"
            >สร้างบัญชี</a
          ></span
        >
      </form>
    </Dialog>
  </div>
</template>
<script>
import axios from "axios";
import { useToast } from "primevue/usetoast";
import { ref } from "vue";
export default {
  data() {
    const loading = ref(false);
    const toast = useToast();
    const showSuccess = () => {
      toast.add({
        severity: "success",
        summary: "ล็อคอินสำเร็จ",
        detail: "ยินดีต้อนรับ",
        life: 3000,
      });
    };
    const showError = () => {
      toast.add({
        severity: "error",
        summary: "ล็อคอินไม่สำเร็จ",
        detail: "ข้อมูลผิดพลาด หรือ ยังไม่ได้ลงทะเบียน",
        life: 3000,
      });
    };
    return {
      telephone: "",
      password: "",
      showPassword: false,
      showValidationError: false,
      LoginModal: false,
      RegisterVisible: false,
      showSuccess,
      showError,
      loading,
    };
  },
  methods: {
    showPopup() {
      this.LoginModal = true;
    },

    async login() {
      this.loading = true;
      if (
        this.telephone === null ||
        this.telephone === "" ||
        this.password === null ||
        this.password === ""
      ) {
        console.log("fail");
        this.loading = false;
      } else {
        try {
          const res = await axios.post(`${process.env.VUE_APP_API}signin/`, {
            telephone: this.telephone,
            password: this.password,
          });
          if (res.data) {
            this.showSuccess();
            setTimeout(() => {
              localStorage.setItem("token", res.data.token);
              window.location.assign("/");
              console.log(res.data);
            }, 1500);
          } else {
            this.showError();
            this.loading = false;
            return console.log("faill");
          }
        } catch (error) {
          console.log(error);
          this.loading = false;
          this.showError();
        }
      }
    },
    validateInput() {
      this.showValidationError = !/^[0-9]+$/.test(this.telephone);
    },

    registerPage() {
      this.LoginModal = false;
      this.$router.push("/register");
    },
    resetForm() {
      this.telephone = "";
      this.password = "";
      this.showValidationError = false;
    },
  },
  watch: {
    LoginModal(newValue) {
      if (!newValue) {
        this.resetForm();
      }
    },
  },
  components: {},
};
</script>
<style scope>
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

.icon-log {
  border-radius: 50%;
}

.login-box .log-icon:active {
  background-color: #3b82f6;
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

.form-control {
  cursor: default;
  text-align: left;
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
}
.log-icon {
  transition: all 0.2s ease-in-out;
}
.log-icon:hover {
  background: #fff;
  box-shadow: 0px 2px 10px 5px #3b82f6;
  color: #000;
}
.button-con input[type="checkbox"] {
  margin-right: 5px;
}

.error-message {
  color: red;
  font-size: 10px;
}

.show-pass input,
label {
  cursor: pointer;
}

/* .p-button.p-button-help, .p-buttonset.p-button-help > .p-button, .p-splitbutton.p-button-help > .p-button {
    color: #ffffff;
    background: #3b82f6;
    border: 1px solid #3b82f6;
} */
@media screen and (max-width: 640px) {
  .topweb-right p {
    display: none;
  }
}
</style>

<template>
  <div>
    <Toast />
    <div class="topweb-right">
      <p>ให้เช่าที่พักกับ Lanmark</p>
      <div class="login-box" @click="LoginModal = true">
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
      :breakpoints="{ '1199px': '40vw', '575px': '90vw' }"
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
          rounded
          type="submit"
          class="hover:bg-blue-700"
          style="background-color: #3b82f6"
        />
        <Button
          class="gap-2"
          label="Google Login"
          outlined
          rounded
          style="color: #3b82f6"
          @click="performGoogleSignIn"
        >
          <template #icon>
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google Icon"
              style="width: 16px; height: 16px"
            />
          </template>
        </Button>
        <!-- <GoogleSigninButton
          :clientId="gAuthOptions.clientId"
          :scope="gAuthOptions.scope"
          :prompt="gAuthOptions.prompt"
          :fetchBasicProfile="gAuthOptions.fetch_basic_profile"
          @success="onGoogleSignInSuccess"
          @error="onGoogleSignInError"
        /> -->

        <span class="flex justify-content-center"
          >ยังไม่มีบัญชี ผู้ใช้งาน
          <a
            href="#"
            style="color: blue; text-decoration: underline"
            @click="registerPage"
            >สร้างบัญชี</a
          >
        </span>
      </form>
    </Dialog>
  </div>
</template>

<script>
import axios from "axios";
import { useToast } from "primevue/usetoast";
import { ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
// import { GoogleSigninButton } from "vue-google-signin-button";
import { gapi } from "gapi-script"; // Import gapi directly

export default {
  components: {
    // GoogleSigninButton,
  },
  setup() {
    const telephone = ref("");
    const password = ref("");
    const showPassword = ref(false);
    const showValidationError = ref(false);
    const LoginModal = ref(false);
    const RegisterVisible = ref(false);
    const loading = ref(false);
    const test = ref(window.location.hostname);
    const router = useRouter();

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

    const login = async () => {
      loading.value = true;

      if (!telephone.value || !password.value) {
        console.log("fail");
        loading.value = false;
      } else {
        try {
          const getip = await axios
            .get(`https://api64.ipify.org/?format=json`)
            .catch((error) => {
              console.log(error);
              return false;
            });
          let ip = "";
          if (getip.status === 200) {
            ip = getip.data.ip;
          } else {
            ip = "ไม่มี";
          }

          const res = await axios.post(
            `${process.env.VUE_APP_API}signin/`,
            {
              telephone: telephone.value,
              password: password.value,
            },
            {
              headers: {
                ipadress: ip,
              },
            }
          );

          if (res.data.status === true) {
            showSuccess();
            resetForm();
            setTimeout(() => {
              localStorage.setItem("token", res.data.token);
              window.location.assign("/");
              console.log(res.data);
            }, 1500);
          } else {
            resetForm();
            toast.add({
              severity: "error",
              summary: "ล็อคอินไม่สำเร็จ",
              detail: res.data.message,
              life: 3000,
            });
            loading.value = false;
            return console.log("faill");
          }
        } catch (error) {
          console.log(error);
          loading.value = false;
          showError();
        }
      }
    };

    const validateInput = () => {
      showValidationError.value = !/^[0-9]+$/.test(telephone.value);
    };

    const registerPage = () => {
      LoginModal.value = false;
      router.push("/register");
    };
    const resetForm = () => {
      telephone.value = "";
      password.value = "";
      showValidationError.value = false;
    };
    const performGoogleSignIn = async () => {
      try {
        const gAuth = gapi.auth2.getAuthInstance();

        gAuth.signIn().then(async (user) => {
          const profile = user.getBasicProfile();

          const userId = profile.getId();
          const userEmail = profile.getEmail();
          const userName = profile.getName() || "Unknown";

          console.log("User ID:", userId);
          console.log("User Email:", userEmail);
          console.log("User Name:", userName);
        });
      } catch (error) {
        console.error("Google login failed:", error);
      }
    };

    watchEffect(() => {
      if (!LoginModal.value) {
        resetForm();
      }
    });

    return {
      telephone,
      password,
      showPassword,
      showValidationError,
      LoginModal,
      RegisterVisible,
      loading,
      test,
      showSuccess,
      showError,
      login,
      validateInput,
      router,
      registerPage,
      performGoogleSignIn,
    };
  },
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

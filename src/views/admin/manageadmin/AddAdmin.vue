<template>
  <div class="grid px-24 py-4 mt-3">
    <div class="col-12 lg:col-12">
      <center class="text-xl">เพิ่มข้อมูล admin</center>
      <form class="w-full">
        <div class="flex flex-wrap -mx-3 mb-0 sm:mb-3 w-full">
          <div class="w-full md:w-1/2 px-3 mb-3 sm:mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-first-name"
            >
              ชื่อ :
            </label>
            <InputText
              class="appearance-none block w-full text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              placeholder="กรุณากรอกชื่อ"
              v-model="name"
            />
          </div>
          <div class="w-full md:w-1/2 px-3 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-first-name"
            >
              เบอร์โทรศัพท์ :
            </label>
            <InputText
              class="appearance-none block w-full text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="tel"
              id="grid-first-name"
              @input="validateInput"
              placeholder="กรุณากรอกเบอร์โทรศัพท์"
              v-model="telephone"
            />
            <p v-if="showValidationError" style="font-size: 12px; color: red">
              *กรุณากรอกเลขโทรศัพท์ที่ถูกต้อง (8-10 ตัว)
            </p>
          </div>
          <div class="w-full px-3">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-password"
            >
              Password :
            </label>
            <InputText
              class="appearance-none block w-full text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-password"
              type="password"
              placeholder="กรุณากรอกรหัสผ่าน"
              v-model="password"
            />
          </div>
        </div>
        <div class="md:flex md:items-center justify-content-end px-5">
          <Button
            @click="addadmin"
            class="addAdmin_btn px-4 py-2.5 bg-blue-500 delay-1000 text-white text-center hover:bg-blue-700 border-none cursor-pointer"
            type="button"
            label=" เพิ่มข้อมูล"
            severity="help"
            rounded
            icon="pi pi-user-plus"
            :loading="loading"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import { ref } from "vue";

export default {
  name: "AddAdmin",
  data() {
    const loading = ref(false);
    return {
      telephone: "",
      password: "",
      name: "",
      loading,
      showValidationError: false,
    };
  },
  methods: {
    async addadmin() {
      this.loading = true;
      if (
        this.telephone === null ||
        this.telephone === "" ||
        this.password === null ||
        this.password === "" ||
        this.name === ""
      ) {
        this.loading = false;
        await Swal.fire({
          icon: "error",
          title: "กรุณากรอกข้อมูลให้ครบ",
          text: "กรุณากรอกข้อมูลให้ครบ",
        });
      } else {
        try {
          const res = await axios.post(
            `${process.env.VUE_APP_API}signup/admin`,
            {
              telephone: this.telephone,
              password: this.password,
              name: this.name,
              roles: "admin",
              level: "1",
            },
            {
              headers: {
                token: localStorage.getItem("token"),
              },
            }
          );
          if (res.data) {
            this.loading = false;
            Swal.fire({
              icon: "success",
              title: "บันทึกสำเร็จ",
              text: "ข้อมูลถูกบันทึกเรียบร้อย",
            });
            this.$router.push("/manageadmin");
          } else {
            this.loading = false;
            await Swal.fire({
              icon: "error",
              title: "เกิดข้อผิดพลาด",
              text: "ไม่สามารถลบข้อมูลได้",
            });
          }
        } catch (error) {
          this.loading = false;
          await Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาด",
            text: "ไม่สามารถลบข้อมูลได้",
          });
        }
      }
    },
    validateInput() {
      const isValidNumber = /^[0-9]+$/.test(this.telephone);
      const isValidLength =
        this.telephone.length >= 8 && this.telephone.length <= 10;

      this.showValidationError = !(isValidNumber && isValidLength);
    },
  },
};
</script>

<style scoped>
.addAdmin_btn {
  width: 20%;
}
</style>

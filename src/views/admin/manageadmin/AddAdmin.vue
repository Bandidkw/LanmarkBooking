<template>
  <div class="grid px-24 py-4 mt-3">
    <div class="col-12 lg:col-12 ">
      <center class="text-xl">เพิ่มข้อมูล admin</center>
      <form class="w-full ">
        <div class="flex flex-wrap -mx-3 mb-0 sm:mb-3 w-full">
          <div class="w-full md:w-1/2 px-3 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
              เบอร์โทรศัพท์ :
            </label>
            <InputText
              class="appearance-none block w-full  text-gray-700 border border-bluegray-800 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name" type="text" placeholder="000-000-0000" v-model="telephone" />
          </div>
          <div class="w-full px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
              Password :
            </label>
            <InputText
              class="appearance-none block w-full text-gray-700 border border-bluegray-800 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-password" type="password" placeholder="******************" v-model="password" />
          </div>
          <div class="w-full md:w-1/2 px-3 mb-3 sm:mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
              ชื่อเล่น :
            </label>
            <InputText
              class="appearance-none block w-full text-gray-700 border border-bluegray-800 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name" type="text" placeholder="Name" v-model="name" />
          </div>
        </div>
        <div class="md:flex md:items-center justify-content-end px-5">
          <!-- <div class="md:w-1/3"></div> -->
          <div class="md:w-1/3 flex justify-content-end">
            <button @click="addadmin"
              class=" addAdmin_btn  px-4 py-2 bg-blue-500 delay-1000 text-white text-center hover:bg-blue-700 border-none cursor-pointer"
              type="button">เพิ่มข้อมูล</button>
          </div>
          <!-- <div class="md:w-1/3"></div> -->
        </div>

      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: 'AddAdmin',
  data() {
    return {
      telephone: "",
      password: "",
      name: ""
    }
  },
  methods: {
    async addadmin() {
      if (this.telephone === null || this.telephone === "" || this.password === null || this.password === "" || this.name === "") {
        await Swal.fire({
          icon: "error",
          title: "กรุณากรอกข้อมูลให้ครบ",
          text: "กรุณากรอกข้อมูลให้ครบ",
        });
      } else {
        try {
          const res = await axios.post(`${process.env.VUE_APP_API}signup/admin`, {
            telephone: this.telephone,
            password: this.password,
            name: this.name,
            roles: "admin",
            level: "1"
          }, {
            headers: {
              token: localStorage.getItem("token"),
            },
          });
          if (res.data) {
            Swal.fire({
              icon: "success",
              title: "บันทึกสำเร็จ",
              text: "ข้อมูลถูกบันทึกเรียบร้อย",
            });
            this.$router.push("/manageadmin");
          } else {
            await Swal.fire({
              icon: "error",
              title: "เกิดข้อผิดพลาด",
              text: "ไม่สามารถลบข้อมูลได้",
            });
          }
        } catch (error) {
          await Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาด",
            text: "ไม่สามารถลบข้อมูลได้",
          });
        }
      }
    }
  },
};
</script>

<style scoped>
.addAdmin_btn {
  height: 3.5rem;
  width: 7rem;
  border-radius: 1rem;
}
</style>
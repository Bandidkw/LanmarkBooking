<template>
  <div class="grid px-10 mt-3">
    <div class="col-12 lg:col-12">
      <center class="text-xl">Hotel california</center>
      <form class="w-full">
        <div class="flex flex-wrap -mx-3 mb-6 w-full">
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-first-name"
            >
              name :
            </label>
            <input
              class="appearance-none block w-full text-gray-700 border border-bluegray-800 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              placeholder="name"
              v-model="name"
            />
          </div>
          <div class="w-full px-3">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-password"
            >
              discription :
            </label>
            <input
              class="appearance-none block w-full text-gray-700 border border-bluegray-800 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-password"
              type="password"
              placeholder="description"
              v-model="description"
            />
          </div>
        </div>
        <div class="md:flex md:items-center">
          <div class="md:w-1/3"></div>
          <div class="md:w-1/3">
            <button
              @click="addadmin"
              class="w-full px-4 py-2 bg-blue-500 text-white text-center hover:bg-purple-400 rounded"
              type="button"
            >
              เพิ่มข้อมูล
            </button>
          </div>
          <div class="md:w-1/3"></div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  props: {
    url: "",
  },
  data() {
    return {
      telephone: "",
      password: "",
      name: "",
    };
  },
  methods: {
    async addadmin() {
      if (
        this.name === null ||
        this.name === "" ||
        this.description === null ||
        this.description === ""
      ) {
        await Swal.fire({
          icon: "error",
          title: "กรุณากรอกข้อมูลให้ครบ",
          text: "กรุณากรอกข้อมูลให้ครบ",
        });
      } else {
        try {
          const api_url = this.url;
          const res = await axios.post(
            // `${process.env.VUE_APP_API}signup/admin`
            api_url,
            {
              name: this.name,
              description: this.description,
            },
            {
              headers: {
                token: localStorage.getItem("token"),
              },
            }
          );
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
    },
  },
};
</script>

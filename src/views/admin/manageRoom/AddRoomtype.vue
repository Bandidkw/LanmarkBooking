<template>
  <Button @click="onclick = true" class="bg-green-400 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mx-2"
    label="เพิ่มประเภทห้อง" />

  <Dialog header="เพิ่มประเภทห้อง" v-model:visible="onclick" modal :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <div class="grid px-10 mt-3">
      <div class="col-12 lg:col-12 ">
        <form class="w-full ">
          <div class="flex flex-wrap -mx-3 mb-6 w-full">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                ชื่อ :
              </label>
              <input
                class="appearance-none block w-full  text-gray-700 border border-bluegray-800 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name" type="text" placeholder="" v-model="name">
            </div>
            <div class="w-full px-3">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                คำอธิบาย :
              </label>
              <input
                class="appearance-none block w-full text-gray-700 border border-bluegray-800 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-password" type="text" placeholder="" v-model="description">
            </div>
          </div>
          <div class="md:flex md:items-center flex justify-content-end px-5">
            <div class="md:w-1/3"></div>
            <div class="md:w-1/3 ">
              <Button @click="addroomtype" label="เพิ่มข้อมูล"
                class="w-full px-4 py-2 bg-blue-500 text-white text-center hover:bg-purple-400 rounded" type="button" />
            </div>
            <div class="md:w-1/3"></div>
          </div>
        </form>
      </div>
    </div>
  </Dialog>
</template>
  
<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: 'AddRoomtype',
  emits: ['typeAdded'],
  data() {
    return {
      onclick: false,
      name: "",
      description: "",
    }
  },
  methods: {
    async addroomtype() {
      if (this.name === "" || this.description === null || this.description === "") {
        await Swal.fire({
          icon: "error",
          title: "กรุณากรอกข้อมูลให้ครบ",
          text: "กรุณากรอกข้อมูลให้ครบ",
        });
      } else {
        try {
          const res = await axios.post(`${process.env.VUE_APP_API}room/type`, {
            name: this.name,
            description: this.description,
            roles: "admin",
            level: "1"
          }, {
            headers: {
              token: localStorage.getItem("token"),
            },
          });
          if (res.data) {
            this.onclick = false
            Swal.fire({
              icon: "success",
              title: "บันทึกสำเร็จ",
              text: "ข้อมูลถูกบันทึกเรียบร้อย",
            });
            this.$emit('typeAdded');
          } else {
            this.onclick = false
            await Swal.fire({
              icon: "error",
              title: "เกิดข้อผิดพลาด",
              text: "ไม่สามารถลบข้อมูลได้",
            });
            this.onclick = true
          }
        } catch (error) {
          this.onclick = false
          await Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาด",
            text: error,
          });
          this.onclick = true
        }
      }
    }
  },
};
</script>
  
  
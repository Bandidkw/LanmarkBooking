<template>
  <Button
    @click="onclick = true"
    severity="secondary"
    icon="pi pi-user-plus"
    text
    raised
    class="hover:text-blue-500 rounded-xl font-bold py-2.5 px-4"
    label="เพิ่มประเภทห้อง"
  />

  <Dialog
    header="เพิ่มประเภทห้อง"
    v-model:visible="onclick"
    modal
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <div class="grid px-10 mt-3">
      <div class="col-12 lg:col-12">
        <form class="w-full">
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
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
              placeholder="กรอกประเภทที่พัก"
              v-model="name"
            />
          </div>
          <div class="w-full px-3">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-password"
            >
              คำอธิบาย :
            </label>
            <InputText
              class="appearance-none block w-full text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-password"
              type="text"
              placeholder="กรอกคำอธิบายสำหรับที่พัก"
              v-model="description"
            />
          </div>
          <div class="md:flex md:items-center justify-content-end px-3">
            <Button
              @click="addroomtype"
              label="เพิ่มข้อมูล"
              class="px-4 py-2.5 bg-blue-500 text-white text-center hover:bg-blue-700 rounded"
              type="button"
              severity="help"
              rounded
              icon="pi pi-user-plus"
              :loading="loading"
            />
          </div>
        </form>
      </div>
    </div>
  </Dialog>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import { ref } from "vue";

export default {
  name: "AddRoomtype",
  emits: ["typeAdded"],
  data() {
    const loading = ref(false);
    return {
      onclick: false,
      name: "",
      description: "",
      loading,
    };
  },
  methods: {
    async addroomtype() {
      this.loading = true;
      if (
        this.name === "" ||
        this.description === null ||
        this.description === ""
      ) {
        this.onclick = false;
        this.loading = false;
        await Swal.fire({
          icon: "error",
          title: "กรุณากรอกข้อมูลให้ครบ",
          text: "กรุณากรอกข้อมูลให้ครบ",
        });
        this.onclick = true;
      } else {
        try {
          const res = await axios.post(
            `${process.env.VUE_APP_API}room/type`,
            {
              name: this.name,
              description: this.description,
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
            this.onclick = false;
            this.loading = false;
            Swal.fire({
              icon: "success",
              title: "บันทึกสำเร็จ",
              text: "ข้อมูลถูกบันทึกเรียบร้อย",
            });
            this.$emit("typeAdded");
            this.name = "";
            this.description = "";
          } else {
            this.onclick = false;
            this.loading = false;
            await Swal.fire({
              icon: "error",
              title: "เกิดข้อผิดพลาด",
              text: "ไม่สามารถลบข้อมูลได้",
            });
            this.onclick = true;
          }
        } catch (error) {
          this.onclick = false;
          this.loading = false;
          await Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาด",
            text: error,
          });
          this.onclick = true;
        }
      }
    },
  },
};
</script>

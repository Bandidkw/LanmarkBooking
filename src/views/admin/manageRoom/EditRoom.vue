<template>
  <i class="pi pi-cog cursor-pointer icon-style" @click="getdata" />

  <!--eslint-disable-next-line vue/no-multiple-template-root -->
  <Dialog
    header="แก้ไขประเภทที่พัก"
    v-model:visible="sidebar"
    modal
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <div class="grid">
      <div class="col-12 text-center"></div>
    </div>
    <div class="grid">
      <div class="col-12 md:col-12">
        <form class="">
          <div class="col-12">
            <p>ชื่อ :</p>
            <InputText
              v-model="name"
              name="name"
              placeholder=""
              class="w-full"
            />
          </div>
          <div class="col-12">
            <p>รายละเอียด :</p>
            <InputText
              v-model="description"
              class="w-full"
              name="desciption"
              placeholder=""
            />
          </div>
          <div class="col-12 flex justify-content-end">
            <Button
              label="แก้ไข"
              rounded
              icon="pi pi-file-edit"
              :loading="loading"
              @click="editroom"
            />
          </div>
        </form>
      </div>
    </div>
  </Dialog>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";
import { Admin } from "../../../router/admin";
import { ref } from "vue";
export default {
  emits: ["typeAdded"],
  setup() {
    const admin = new Admin();
    return { admin };
  },
  props: {
    data: Object,
    title: String,
  },
  data: () => ({
    sidebar: false,
    name: "",
    description: "",
    loading: ref(false),
  }),
  methods: {
    async getdata() {
      const id = this.data._id;
      this.sidebar = true;
      try {
        // const res = await axios.get(`${process.env.VUE_APP_API}room/type/${id}`,
        //   { headers: { token: localStorage.getItem("token"), }, }
        // );
        this.name = this.data.name;
        this.description = this.data.description;
      } catch (error) {
        console.log(error);
      }
    },

    async editroom() {
      this.loading = true;
      if (
        this.name === "" ||
        this.description === null ||
        this.description === ""
      ) {
        this.sidebar = false;
        await Swal.fire({
          icon: "error",
          title: "กรอกข้อมูลไม่ครบ",
          text: "กรุณากรอกข้อมูลให้ครบ",
        });
        this.sidebar = true;
      } else {
        try {
          const id = this.data._id;
          const res = await axios.patch(
            `${process.env.VUE_APP_API}room/type/${id}`,
            {
              name: this.name,
              description: this.description,
              roles: "partner",
              level: "1",
            },
            {
              headers: {
                token: localStorage.getItem("token"),
              },
            }
          );
          if (res.data) {
            this.sidebar = false;
            await this.admin.GetRoomType();
            await Swal.fire({
              icon: "success",
              title: "แก้ไขข้อมูลสำเร็จ",
              text: "ข้อมูลแก้ไขข้อมูลเรียบร้อย",
            });
            this.$emit("typeAdded");
          } else {
            this.sidebar = false;
            await Swal.fire({
              icon: "error",
              title: "เกิดข้อผิดพลาด",
              text: "ไม่สามารถแก้ไขข้อมูลได้",
            });
            this.sidebar = true;
          }
        } catch (error) {
          this.sidebar = false;
          await Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาด",
            text: "ไม่สามารถแก้ไขข้อมูลได้",
          });
          this.sidebar = true;
        }
      }
    },
  },
};
</script>

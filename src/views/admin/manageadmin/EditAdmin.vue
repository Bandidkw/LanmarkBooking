<template>
  <i class="pi pi-cog cursor-pointer icon-style" @click="getdata" />

  <!--eslint-disable-next-line vue/no-multiple-template-root -->
  <Dialog
    v-model:visible="sidebar"
    header="แก้ไขข้อมูล admin"
    modal
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <div class="grid">
      <div class="col-12 md:col-12">
        <form class="">
          <div class="col-12">
            <p>เบอร์โทรศัพท์ :</p>
            <InputText
              v-model="telephone"
              name="telephone"
              placeholder="000-0000-00000"
              class="w-full"
            />
          </div>
          <div class="col-12">
            <p>password :(ถ้าไม่ได้ต้องแก้ไม่ต้องใส่)</p>
            <InputText
              type="password"
              class="w-full"
              v-model="password"
              name="password"
              placeholder="*****"
            />
          </div>
          <div class="col-12">
            <p>ชื่อ :</p>
            <InputText
              v-model="name"
              name="name"
              placeholder="กรุณากรอกชื่อ"
              class="w-full"
            />
          </div>
          <div class="col-12 flex justify-content-end">
            <Button
              label="แก้ไข"
              rounded
              icon="pi pi-file-edit"
              :loading="loading"
              @click="editadmin"
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
import { ref } from "vue";
export default {
  props: {
    data: Object,
    title: String,
  },
  data() {
    const loading = ref(false);
    return {
      sidebar: false,
      telephone: "",
      password: "",
      name: "",
      loading,
    };
  },
  methods: {
    async getdata() {
      const id = this.data._id;
      this.sidebar = true;
      try {
        const res = await axios.get(`${process.env.VUE_APP_API}admin/${id}`, {
          headers: { token: localStorage.getItem("token") },
        });
        this.telephone = res?.data?.data?.telephone;
        this.name = res?.data?.data?.name;
      } catch (error) {
        console.log(error);
      }
    },
    async editadmin() {
      this.loading = true;
      if (
        this.telephone === null ||
        this.telephone === "" ||
        this.name === ""
      ) {
        this.sidebar = false;
        this.loading = false;
        await Swal.fire({
          icon: "error",
          title: "กรอกข้อมูลไม่ครบ",
          text: "กรุณากรอกข้อมูลให้ครบ",
        });
        this.sidebar = true;
      } else {
        try {
          const id = this.data._id;
          const res = await axios.put(
            `${process.env.VUE_APP_API}admin/${id}`,
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
            this.sidebar = false;
            this.loading = false;
            await Swal.fire({
              icon: "success",
              title: "แก้ไขข้อมูลสำเร็จ",
              text: "ข้อมูลแก้ไขข้อมูลเรียบร้อย",
            });
          } else {
            this.sidebar = false;
            this.loading = false;
            await Swal.fire({
              icon: "error",
              title: "เกิดข้อผิดพลาด",
              text: "ไม่สามารถแก้ไขข้อมูลได้",
            });
            this.sidebar = true;
          }
        } catch (error) {
          this.loading = false;
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

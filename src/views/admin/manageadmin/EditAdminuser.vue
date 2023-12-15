<template>
  <div style="width: 60%">
    <div class="grid">
      <div class="col-12 text-center">
        <h2>แก้ไขข้อมูลส่วนตัว</h2>
      </div>
    </div>
    <div class="grid">
      <div class="col-12 md:col-12">
        <form>
          <div class="col-12">
            <p>ชื่อ :</p>
            <InputText
              v-model="name"
              name="name"
              placeholder="กรุณากรอกชื่อ"
              class="w-full"
            />
          </div>
          <div class="col-12">
            <p>เบอร์โทรศัพท์ :</p>
            <InputText
              v-model="telephone"
              name="telephone"
              placeholder="กรุณากรอกเบอร์โทรศัพท์"
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
  </div>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";
import { ref, onMounted } from "vue";

export default {
  props: {
    data: Object,
    title: String,
  },
  data() {
    const loading = ref(false);
    const getdata = async () => {
      this.sidebar = true;
      try {
        const res = await axios.get(
          `${process.env.VUE_APP_API}admin/findadmin`,
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );

        console.log(res.data.data, "res data");

        if (res.data && res.data.data) {
          const adminData = res.data.data;
          this._id = adminData._id;
          this.telephone = adminData.telephone;
          this.name = adminData.name;
        }
      } catch (error) {
        console.error(error);
      }
    };
    onMounted(() => {
      getdata();
    });
    return {
      _id: "",
      telephone: "",
      password: "",
      name: "",
      loading,
    };
  },
  methods: {
    async editadmin() {
      this.loading = true;
      if (this.name === "" || this.name === null) {
        this.loading = false;
        await Swal.fire({
          icon: "error",
          title: "กรอกข้อมูลไม่ครบ",
          text: "กรุณากรอกข้อมูลให้ครบ",
        });
      } else {
        try {
          const id = this._id;
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
          if (res.data.status === true) {
            this.loading = false;
            await Swal.fire({
              icon: "success",
              title: "แก้ไขข้อมูลสำเร็จ",
              text: "ข้อมูลแก้ไขข้อมูลเรียบร้อย",
            });
          } else {
            this.loading = false;
            await Swal.fire({
              icon: "error",
              title: "เกิดข้อผิดพลาด",
              text: "ไม่สามารถแก้ไขข้อมูลได้",
            });
          }
        } catch (error) {
          this.loading = false;
          await Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาด",
            text: "ไม่สามารถแก้ไขข้อมูลได้",
          });
        }
      }
    },

    getImage(item) {
      if (typeof item === "string") {
        return `https://drive.google.com/uc?export=view&id=${item}`;
      } else if (Array.isArray(item) && item.length > 0) {
        const firstImageId = item[0];
        return `https://drive.google.com/uc?export=view&id=${firstImageId}`;
      } else {
        return "";
      }
    },
  },
};
</script>

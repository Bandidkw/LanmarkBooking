<template>
  <div class="grid">
    <div class="col-12 text-center">
      <h2>แก้ไขข้อมูลส่วนตัว</h2>
    </div>
  </div>
  <div class="grid" style="width: 60%">
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
        <div class="col-12">
          <p>ชื่อต้น :</p>
          <InputText
            v-model="firstname"
            name="firstname"
            placeholder="กรุณากรอกชื่อต้น"
            class="w-full"
          />
        </div>
        <div class="col-12">
          <p>นามสกุล :</p>
          <InputText
            v-model="lastname"
            name="lastname"
            placeholder="กรุณากรอกนามสกุล"
            class="w-full"
          />
        </div>
        <div class="col-12">
          <p>e-mail :</p>
          <InputText
            v-model="email"
            name="email"
            placeholder="กรุณากรอกอีเมล"
            class="w-full"
          />
        </div>
      </form>
    </div>
  </div>
  <div class="grid">
    <div class="col-12 text-center mt-2">
      <Button label="แก้ไข" @click="editmember" />
    </div>
  </div>
  <!-- </Dialog> -->
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
    const getdata = async () => {
      try {
        const res = await axios.get(
          `${process.env.VUE_APP_API}member/findmember`,
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );

        console.log(res.data.data, "res data");

        if (res.data && res.data.data) {
          const memberData = res.data.data;
          this._id = memberData._id;
          this.telephone = memberData.telephone;
          this.name = memberData.name;
          this.firstname = memberData.firstname;
          this.lastname = memberData.lastname;
          this.email = memberData.email;
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
      firstname: "",
      lastname: "",
      email: "",
    };
  },
  methods: {
    async editmember() {
      if (this.name === "" || this.name === null) {
        await Swal.fire({
          icon: "error",
          title: "กรอกข้อมูลไม่ครบ",
          text: "กรุณากรอกข้อมูลให้ครบ",
        });
      } else {
        try {
          const id = this._id;
          const res = await axios.put(
            `${process.env.VUE_APP_API}member/${id}`,
            {
              telephone: this.telephone,
              password: this.password,
              name: this.name,
              firstname: this.firstname,
              lastname: this.lastname,
              email: this.email,
            },
            {
              headers: {
                token: localStorage.getItem("token"),
              },
            }
          );
          if (res.data.status === true) {
            await Swal.fire({
              icon: "success",
              title: "แก้ไขข้อมูลสำเร็จ",
              text: "ข้อมูลแก้ไขข้อมูลเรียบร้อย",
            });
          } else {
            await Swal.fire({
              icon: "error",
              title: "เกิดข้อผิดพลาด",
              text: "ไม่สามารถแก้ไขข้อมูลได้",
            });
          }
        } catch (error) {
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

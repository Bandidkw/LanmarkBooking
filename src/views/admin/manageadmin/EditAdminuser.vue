<template>
  <!-- <Button @click="getdata" class="hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-2"
    style="background-color: #ff7315" :label="title" :loading="loading" /> -->

  <!--eslint-disable-next-line vue/no-multiple-template-root -->
  <!-- <Dialog v-model:visible="sidebar" modal :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"> -->
  <div class="grid">
    <div class="col-12 text-center">
      <h2>Edit Partner Information</h2>
      <div class="col-12 flex justify-content-center">
        <img v-if="Array.isArray(image_card) && image_card.length > 0" :src="getImage(image_card)" alt="ID Card"
              width="200" style="max-width: 100%; height: auto" />
        <div v-else>ไม่มีรูปภาพ</div>
      </div>
    </div>
  </div>
  <div class="grid">
    <div class="col-12 md:col-12">
      <form class="">
        <div class="col-12">
            <p>เบอร์โทรศัพท์ : </p>
            <InputText v-model="telephone" name="telephone" placeholder="000-0000-00000" class="w-full " />
          </div>
          <div class="col-12">
            <p>password :(ถ้าไม่ได้ต้องแก้ไม่ต้องใส่)</p>
            <InputText type="password" class="w-full" v-model="password" name="password" placeholder="*****" />
          </div>
          <div class="col-12">
            <p> ชื่อ :</p>
            <InputText v-model="name" name="name" placeholder="กรุณากรอกชื่อ" class="w-full" />
          </div>
      </form>
    </div>
  </div>
  <div class="grid">
    <div class="col-12 text-center mt-2">
      <Button label="แก้ไข" @click="editadmin" />
    </div>
  </div>
  <!-- </Dialog> -->
</template>

<script>
import Swal from "sweetalert2";
import axios from 'axios';
import { ref, onMounted } from "vue";

export default {
  props: {
    data: Object,
    title: String,
  },
  data() {
    const getdata= async()=> {
      this.sidebar = true;
      try {
        const res = await axios.get(`${process.env.VUE_APP_API}admin/findadmin`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });

        console.log(res.data.data, "res data");

        if (res.data && res.data.data) {
          const adminData = res.data.data;
          this._id = adminData._id
          this.telephone = adminData.telephone;
          this.name = adminData.name;
        }
      } catch (error) {
        console.error(error);
      }
    }
    onMounted(() => {
      getdata();
    });
    return {
      _id:"",
      telephone: '',
      password: '',
      name: '',
    }
  },
  methods: {
    
    async editadmin() {
      if (this.name === "" || this.name === null) {
        await Swal.fire({
          icon: "error",
          title: "กรอกข้อมูลไม่ครบ",
          text: "กรุณากรอกข้อมูลให้ครบ",
        });
      } else {
        try {
          const id = this._id;
          const res = await axios.put(`${process.env.VUE_APP_API}admin/${id}`, {
            telephone:this.telephone,
            password:this.password,
            name : this.name,
            roles:"admin",
            level : "1"
          }, {
            headers: {
              token: localStorage.getItem("token"),
            },
          });
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
      if (typeof item === 'string') {
        return `https://drive.google.com/uc?export=view&id=${item}`;
      } else if (Array.isArray(item) && item.length > 0) {
        const firstImageId = item[0];
        return `https://drive.google.com/uc?export=view&id=${firstImageId}`;
      } else {
        return "";
      }
    }
  },
};

</script>

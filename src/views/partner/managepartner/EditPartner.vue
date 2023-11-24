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
        <img v-if="image_card" :src="getImage(image_card)" alt="ID Card" style="  max-width: 50%; height: 50%" />
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
          <p> ID Card :</p>
          <InputText v-model="idcard" name="idcard" class="w-full" />
        </div>

        <div class="col-12">
          <p> ชื่อ :</p>
          <InputText v-model="name" name="name" placeholder="กรุณากรอกชื่อ" class="w-full" />
        </div>
        <div class="col-12">
          <p> ที่อยู่ :</p>
          <InputText v-model="address" name="address" class="w-full" />
        </div>
        <div class="col-12">
          <p> Province :</p>
          <Dropdown
            class="appearance-none  w-full text-gray-700 border border-bluegray-800 rounded py-1 px-2 mb-3 leading-tight focus:outline-none focus:bg-white"
            v-model="province" :options="provincedropdown.value" optionLabel="name_th" optionValue="name_th"
            placeholder="เลือกจังหวัด" @change="getamphure('amphure')" />
        </div>
        <div class="col-12">
          <p> Amphure :</p>
          <Dropdown
            class="appearance-none w-full text-gray-700 border border-bluegray-800 rounded py-1 px-2 mb-3 leading-tight focus:outline-none focus:bg-white"
            v-model="amphure" :disabled="!province" :options="amphuredropdown.value" optionLabel="name_th"
            optionValue="name_th" placeholder="เลือกอำเภอ" @change="getamphure('tambon')" />
        </div>
        <div class="col-12">
          <p> Tambon :</p>
          <Dropdown
            class="appearance-none w-full text-gray-700 border border-bluegray-800 rounded py-1 px-2 mb-3 leading-tight focus:outline-none focus:bg-white"
            v-model="tambon" :disabled="!amphure" :options="tambondropdown.value" optionLabel="name_th"
            optionValue="name_th" placeholder="เลือกตำบล" />
        </div>
        <div class="col-12">
          <p>password :</p>
          <InputText type="password" class="w-full" v-model="password" name="password" placeholder="*****" />
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

    const provincedropdown = ref([]);
    const amphuredropdown = ref([null]);
    const tambondropdown = ref([null]);
    const getprovince = async () => {
      try {
        const province = await axios.get(
          `${process.env.VUE_APP_THAILAND}thailand/province`
        );
        this.provincedropdown.value = province.data;
        console.log(this.provincedropdown.value, 'province');
      } catch (error) {
        console.log(error);
      }
    };

    onMounted(() => {
      getprovince();
    });
    return {
      provincedropdown,
      amphuredropdown,
      tambondropdown,
      // loading: false,
      // sidebar: false,
      telephone: '',
      password: '',
      name: '',
      address: '',
      province: '',
      tambon: '',
      amphure: '',
      idcard: '',
      image_card: '',
    }
  },
  methods: {
    async getdata() {
      this.sidebar = true;

      try {
        const res = await axios.post(`${process.env.VUE_APP_API}partner/findpartner`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });

        console.log(res.data.data, "res data");

        if (res.data && res.data.data) {
          const partnerData = res.data.data;

          this.telephone = partnerData.telephone;
          this.name = partnerData.name;
          this.idcard = partnerData.idcard;
          this.address = partnerData.address;
          this.image_card = partnerData.image_card;
          this.password = partnerData.password;
          this.province = partnerData.province;

          const getamphure = await this.getamphure("amphure");
          if (getamphure === true) {
            console.log(this.amphuredropdown);
            this.amphure = partnerData.amphure;
          }

          const gettambon = await this.getamphure("tambon");
          if (gettambon === true) {
            this.tambon = partnerData.tambon;
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
    async editadmin() {
      if (this.name === "" || this.name === null) {
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
          const res = await axios.put(`${process.env.VUE_APP_API}partner/${id}`, {
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
            this.sidebar = false;
            await Swal.fire({
              icon: "success",
              title: "แก้ไขข้อมูลสำเร็จ",
              text: "ข้อมูลแก้ไขข้อมูลเรียบร้อย",
            });

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
    async getamphure(type) {
      try {
        if (type === "amphure") {
          const selectedProvinceObject = this.provincedropdown.value.find(
            (province) => province.name_th === this.province
          );
          const id = selectedProvinceObject.id;

          const amphure = await axios.get(
            `${process.env.VUE_APP_THAILAND}thailand/amphure/by-province-id/${id}`
          );
          this.amphuredropdown.value = amphure.data;
          return true;
        }

        if (type === "tambon") {
          const selectedAmphureObject = this.amphuredropdown.value.find(
            (amphure) => amphure.name_th === this.amphure
          );

          const id = selectedAmphureObject.id;

          const tambon = await axios.get(
            `${process.env.VUE_APP_THAILAND}thailand/tambon/by-amphure-id/${id}`
          );
          this.tambondropdown.value = tambon.data;
          return true;
        }
      } catch (error) {
        console.error(error);
        return false; // Indicate that there was an error
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
  created() {
    this.getdata()
  }
};

</script>

<template>
  <Button
    @click="getdata"
    class="hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-2"
    style="background-color: #ff7315"
    :label="title"
    :loading="loading"
  />

  <!--eslint-disable-next-line vue/no-multiple-template-root -->
  <Dialog
    v-model:visible="sidebar"
    modal
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <div class="grid">
      <div class="col-12 text-center">
        <h2>HOTEL PARTNER</h2>
      </div>
    </div>
    <div class="grid">
      <div class="col-12 md:col-12">
        <form class="">
          <div class="col-12">
            <p>ชื่อโรงแรม :</p>
            <InputText v-model="name" name="name" class="w-full" />
          </div>
          <div class="col-12">
            <p>รายละเอียด :</p>
            <InputText
              v-model="description"
              name="description"
              class="w-full"
            />
          </div>
          <div class="col-12">
            <p>เบอร์โทรศัพท์ :</p>
            <InputText
              v-model="phone_number"
              name="phone_number"
              class="w-full"
            />
          </div>
          <div class="col-12">
            <p>ราคา :</p>
            <InputText v-model="price" name="price" class="w-full" />
          </div>
          <div class="col-12">
            <p>ประเภทห้องพัก:</p>
            <Dropdown
              name="type"
              v-model="type"
              :options="cities"
              optionLabel="name"
              optionValue="_id"
              placeholder="เลือกประเภทห้องพัก"
              class="w-full"
            />
          </div>
          <div class="col-12">
            <p>จำนวนผู้เข้าพัก :</p>
            <InputText v-model="guests" name="guests" class="w-full" />
          </div>
          <div class="col-12">
            <p>จำนวนห้องนอน :</p>
            <InputText v-model="bedroom" name="bedroom" class="w-full" />
          </div>
          <div class="col-12">
            <p>จำนวนเตียง :</p>
            <InputText v-model="bed" name="bed" class="w-full" />
          </div>
          <div class="col-12">
            <p>จำนวนห้องน้ำ :</p>
            <InputText v-model="bathroom" name="bathroom" class="w-full" />
          </div>
          <div class="col-12">
            <p>ที่อยู่ :</p>
            <InputText v-model="address" name="address" class="w-full" />
          </div>
          <div class="col-12">
            <p>จังหวัด :</p>
            <Dropdown
              class="appearance-none  w-full text-gray-700 border border-bluegray-800 rounded py-1 px-2 mb-3 leading-tight focus:outline-none focus:bg-white"
              v-model="province"
              :options="provincedropdown.value"
              optionLabel="name_th"
              optionValue="name_th"
              placeholder="เลือกจังหวัด"
              @change="getamphure('amphure')"
            />
          </div>
          <div class="col-12">
            <p>อำเภอ :</p>
            <Dropdown
              class="appearance-none w-full text-gray-700 border border-bluegray-800 rounded py-1 px-2 mb-3 leading-tight focus:outline-none focus:bg-white"
              v-model="amphure"
              :options="amphuredropdown.value"
              optionLabel="name_th"
              optionValue="name_th"
              placeholder="เลือกอำเภอ"
              @change="getamphure('tambon')"
            />
          </div>
          <div class="col-12">
            <p>ตำบล :</p>
            <Dropdown
            class="appearance-none w-full text-gray-700 border border-bluegray-800 rounded py-1 px-2 mb-3 leading-tight focus:outline-none focus:bg-white"
              v-model="tambon"
              :options="tambondropdown.value"
              optionLabel="name_th"
              optionValue="name_th"
              placeholder="เลือกตำบล"
            />
          </div>
         
         
          <!-- <div class="col-12">
            <p>รหัสพาร์ทเนอร์ :</p>
            <InputText
              v-model="partner_id.password"
              name="partner_id.password"
              class="w-full"
            />
          </div> -->
        </form>
      </div>
    </div>
    <div class="grid">
      <div class="col-12 text-center mt-2">
        <Button label="แก้ไข" @click="editadmin" />
      </div>
    </div>
  </Dialog>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";
import { ref, onMounted } from "vue";

export default {
  props: {
    shop_id: String,
    data: Object,
    title: String,
  },
  data() {
    ////////  get dropdown list /////////

    const cities = ref([]);

    const gettype = async (_id) => {
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_API}room/type`,
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        console.log(response.data, "list ");

        if (response.data) {
          cities.value = response.data;
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
          text: "ไม่สามารถลบข้อมูลได้",
        });
      }
    };
    const provincedropdown = ref([]);
    const amphuredropdown = ref([null]);
    const tambondropdown = ref([null]);
    const getprovince = async () => {
      try {
        const province = await axios.get(
          `${process.env.VUE_APP_THAILAND}thailand/province`
        );
        this.provincedropdown.value = province.data;
      } catch (error) {
        console.log(error);
      }
    };

    onMounted(() => {
      gettype();
      getprovince();
    });
    return {
      cities,
      provincedropdown,
      amphuredropdown,
      tambondropdown,
      loading: false,
      sidebar: false,
      name: "",
      description: "",
      phone_number: "",
      price: "",
      type: "",
      guests: "",
      bedroom: "",
      bed: "",
      bathroom: "",
      address: "",
      tambon: "",
      amphure: "",
      province: "",
    };
  },
  methods: {
    async getdata() {
      const id = this.data._id;
      this.sidebar = true;
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_API}room/${id}`,
          {
            headers: { token: localStorage.getItem("token") },
          }
        );
        console.log(response.data, "data");
          this.name = response.data?.name
          this.description = response.data?.description
          this.phone_number = response.data?.phone_number
          this.price = response.data?.price
          this.type = response.data?.type._id
          this.guests = response.data?.guests
          this.bedroom = response.data?.bedroom
          this.bed = response.data?.bed
          this.bathroom = response.data?.bathroom
          this.address = response.data?.address         
          this.province = response.data?.province
          const getamphure = await this.getamphure("amphure")
          if(getamphure == true)
          {
            console.log(this.amphuredropdown)
            this.amphure = response.data?.amphure
          }       
          const gettambon = await this.getamphure("tambon")
          if(gettambon == true)
          {
            this.tambon = response.data?.tambon
          }
          
          
      } catch (error) {
        console.log(error);
      }
    },

    async editadmin() {
      if (
        // this.telephone === null ||
        // this.telephone === "" ||
        this.name === "" ||
        this.name === null
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
            `${process.env.VUE_APP_API}room/${id}`,
            {
              name: this.name,
              description: this.description,
              phone_number: this.phone_number,
              price: this.price,
              type: this.type,
              guests: this.guests,
              bedroom: this.bedroom,
              bed: this.bed,
              bathroom: this.bathroom,
              latitude: '1',
              longitude: '1',
              address: this.address,
              tambon: this.tambon,
              amphure: this.amphure,
              province: this.province,
            },
            {
              headers: {
                token: localStorage.getItem("token"),
              },
            }
          );
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
              text: res.data.message,
            });
            this.sidebar = true;
          }
        } catch (error) {
          this.sidebar = false;
          await Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาด",
            text: error,
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
          //
          const amphure = await axios.get(
            `${process.env.VUE_APP_THAILAND}thailand/amphure/by-province-id/${id}`
          );
          this.amphuredropdown.value = amphure.data;
          return true
        }
        if (type === "tambon") {
          const selectedAmphureObject = this.amphuredropdown.value.find(
            (amphure) => amphure.name_th === this.amphure
          );

          const id = selectedAmphureObject.id;

          //
          const tambon = await axios.get(
            `${process.env.VUE_APP_THAILAND}thailand/tambon/by-amphure-id/${id}`
          );
          this.tambondropdown.value = tambon.data;
          return true
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

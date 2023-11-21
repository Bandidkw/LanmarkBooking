<template>
  <div class="grid px-10 mt-3">
    <div class="col-12 lg:col-12">
      <center class="text-xl">เพิ่มข้อมูล ห้อง</center>
      <form class="w-full">
        <div class="flex flex-wrap -mx-3 mb-6 w-full">
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-first-name"
            >
              ชื่อห้อง :
            </label>
            <input
              class="appearance-none block w-full text-gray-700 border border-bluegray-800 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              v-model="name"
              placeholder="ชื่อโรงแรม"
            />
          </div>
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-first-name"
            >
              รายละเอียด :
            </label>
            <input
              class="appearance-none block w-full text-gray-700 border border-bluegray-800 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              v-model="description"
              placeholder="รายละเอียด"
            />
          </div>
          <div class="w-full px-3">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-password"
            >
              เบอร์โทรศัพท์ :
            </label>
            <input
              class="appearance-none block w-full text-gray-700 border border-bluegray-800 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-password"
              type="text"
              v-model="phone_number"
              placeholder="000-000-0000"
            />
          </div>
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-first-name"
            >
              ราคา :
            </label>
            <input
              class="appearance-none block w-full text-gray-700 border border-bluegray-800 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              v-model="price"
              placeholder="ราคา"
            />
          </div>
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-first-name"
            >
              ประเภทห้องพัก :
            </label>
            <Dropdown
      v-model="type"
      :options="cities"
      optionLabel="name"
      optionValue="_id" 
      placeholder="เลือกประเภท"/>
            <!-- <input
              class="appearance-none block w-full text-gray-700 border border-bluegray-800 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              v-model="type"
              placeholder="ประเภทห้องพัก"
            /> -->
          </div>
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-first-name"
            >
              จำนวนผู้เข้าพัก :
            </label>
            <input
              class="appearance-none block w-full text-gray-700 border border-bluegray-800 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              v-model="guests"
              placeholder="จำนวนผู้เข้าพัก"
            />
          </div>
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-first-name"
            >
              จำนวนห้องนอน :
            </label>
            <input
              class="appearance-none block w-full text-gray-700 border border-bluegray-800 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              v-model="bedroom"
              placeholder="จำนวนห้องนอน"
            />
          </div>
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-first-name"
            >
              จำนวนเตียง :
            </label>
            <input
              class="appearance-none block w-full text-gray-700 border border-bluegray-800 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              v-model="bed"
              placeholder="จำนวนเตียง"
            />
          </div>
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-first-name"
            >
              จำนวนห้องน้ำ :
            </label>
            <input
              class="appearance-none block w-full text-gray-700 border border-bluegray-800 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="number"
              v-model="bathroom"
              placeholder="จำนวนห้องน้ำ"
            />
          </div>
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-first-name"
            >
              ที่อยู่ :
            </label>
            <input
              class="appearance-none block w-full text-gray-700 border border-bluegray-800 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              v-model="address"
              placeholder="ที่อยู่"
            />
          </div>
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-first-name"
            >
              ตำบล :
            </label>
            <input
              class="appearance-none block w-full text-gray-700 border border-bluegray-800 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              v-model="tambon"
              placeholder="ตำบล"
            />
          </div>
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-first-name"
            >
              อำเภอ :
            </label>
            <input
              class="appearance-none block w-full text-gray-700 border border-bluegray-800 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              v-model="amphure"
              placeholder="อำเภอ"
            />
          </div>
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-first-name"
            >
              จังหวัด :
            </label>
            <input
              class="appearance-none block w-full text-gray-700 border border-bluegray-800 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              v-model="province"
              placeholder="จังหวัด"
            />
          </div>
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-first-name"
            >
              รหัสพาร์ทเนอร์ :
            </label>
            <input
              class="appearance-none block w-full text-gray-700 border border-bluegray-800 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              v-model="partner_id"
              placeholder="รหัสพาร์ทเนอร์"
            />
          </div>

          <div class="flex items-center pl-3">
            <label
              class="flex uppercase w-3/12 tracking-wide text-gray-700 text-xs font-bold"
              for="grid-first-name"
              >เพิ่มรูปภาพ :</label
            >
            <input
              class="appearance-none block w-9/12 text-gray-700 border border-bluegray-800 rounded py-3 px-3 leading-tight focus:outline-none focus:bg-white"
              type="file"
            />
          </div>
        </div>
        <div class="md:flex md:items-center">
          <div class="md:w-1/3"></div>
          <div class="md:w-1/3">
            <button
              @click="addRoom"
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
import { ref,onMounted } from "vue";
export default {
  name: "AddHotelPartner",
  data() {
    const cities = ref([]);
    const selectedCity = ref(null);
    const gettype = async (_id) => {
      try {
        const response = await axios.get(`${process.env.VUE_APP_API}room/type`,
        {
          headers: {
          token: localStorage.getItem("token"),
          },
        });
        console.log(response.data)
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
    onMounted(() => {
      gettype();
    });
    return {
      cities,
      selectedCity,
      name: "",
      description: "",
      phone_number: "",
      price: "",
      type: "",
      guests: "",
      bedroom: "",
      bed: "",
      bathroom: "",
      latitude: "",
      longitude: "",
      address: "",
      tambon: "",
      amphure: "",
      province: "",
      partner_id: "",
      status: "false",
      approve: "[]",
      statusbooking: "false",
    };
  },
  methods: {
    async addRoom() {
      try {
        const res = await axios.post(
          `${process.env.VUE_APP_API}room/hotel/`,
          {
            name: this.name,
            description: this.description,
            phone_number: this.phone_number,
            price: this.price,
            type: '655af84f07fdcb301090fc33',
            guests: this.guests,
            bedroom: this.bedroom,
            bed: this.bed,
            bathroom: this.bathroom,
            latitude: "1",
            longitude: "1",
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
          
        if (res.data.status=== true) {
          Swal.fire({
            icon: "success",
            title: "บันทึกสำเร็จ",
            text: "ข้อมูลถูกบันทึกเรียบร้อย",
          });
          this.resetForm;
        } else {
          await Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาด",
            text: "ไม่สามารถบันทึกข้อมูลได้",
          });
        }
        
      } catch (error) {
        console.log(error, "error");
        await Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด",
          text: error,
        });
      }
    },
  },
  resetForm() {
    this.name = "";
    this.description = "";
    this.phone_number = "";
    this.price = "";
    this.type = "";
    this.guests = "";
    this.bedroom = "";
    this.bed = "";
    this.bathroom = "";
    this.address = "";
    this.tambon = "";
    this.amphure = "";
    this.province = "";
    this.partner_id = "";
    // Clear errors
    this.errors = {};
  },
};
</script>

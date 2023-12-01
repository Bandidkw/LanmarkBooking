<template>
  <div class="grid px-24 py-4 mt-3 ">
    <div class="col-12 lg:col-12">
      <center class="text-xl">เพิ่มข้อมูลห้อง</center>
      <form class="w-full">
        <div class=" flex  flex-wrap -mx-3 mb-0  w-full">
          <div class="w-full md:w-1/2 px-4 mb-2">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
              ชื่อห้อง :
            </label>
            <InputText
              class="appearance-none block w-full text-gray-700 border border-bluegray-800 rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name" type="text" v-model="name" placeholder="ชื่อโรงแรม" />
          </div>
          <div class="w-full md:w-1/2 px-4 mb-2 ">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
              รายละเอียด :
            </label>
            <InputText
              class="appearance-none block w-full text-gray-700 border border-bluegray-800 rounded py-3 mb-2 px-4 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name" type="text" v-model="description" placeholder="รายละเอียด" />
          </div>
          <div class="w-full px-4 mb-2">
            <label class="block uppercase tracking-wide text-gray-700 mb-2 text-xs font-bold " for="grid-password">
              เบอร์โทรศัพท์ :
            </label>
            <InputText
              class="appearance-none block w-full text-gray-700 border border-bluegray-800 rounded py-3 mb-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-password" type="text" v-model="phone_number" placeholder="000-000-0000" />
          </div>
          <div class="w-full md:w-1/2 px-4  mb-2 ">
            <label class="block uppercase tracking-wide text-gray-700 text-xs mb-2 font-bold mb-2" for="grid-first-name">
              ราคา :
            </label>
            <InputText
              class="appearance-none block w-full text-gray-700 border border-bluegray-800 mb-2 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name" type="text" v-model="price" placeholder="ราคา" />
          </div>
          <div class="w-full md:w-1/2 px-4 mb-2">
            <label class="block uppercase tracking-wide text-gray-700 text-xs mb-2 font-bold mb-2" for="grid-first-name">
              ประเภทห้องพัก :
            </label>
            <Dropdown
              class="appearance-none w-full text-gray-700 border border-bluegray-800 rounded py-1 px-2  mb-2 leading-tight focus:outline-none focus:bg-white"
              v-model="type" :options="cities" optionLabel="name" optionValue="_id" placeholder="เลือกประเภท" />
          </div>
          <div class="w-full md:w-1/2 px-4 mb-2 ">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
              จำนวนผู้เข้าพัก :
            </label>
            <InputText
              class="appearance-none block w-full text-gray-700 border border-bluegray-800 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name" type="text" v-model="guests" placeholder="จำนวนผู้เข้าพัก" />
          </div>
          <div class="w-full md:w-1/2 px-4 mb-2">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
              จำนวนห้องนอน :
            </label>
            <InputText
              class="appearance-none block w-full text-gray-700 border border-bluegray-800 rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name" type="text" v-model="bedroom" placeholder="จำนวนห้องนอน" />
          </div>
          <div class="w-full card flex justify-content-start px-4 mb-2 gap-2" style="flex-direction: column;">
            <label class="block uppercase tracking-wide text-gray-700 text-xs  font-bold mb-2" for="grid-first-name">
              ประเภทเตียง :
            </label>
          <Dropdown v-model="selectedBed" :options="bedtype" optionLabel="name" placeholder="เลือกประเภทเตียง" class="w-full md:w-14rem" style="border: #000 1px solid;" />
          <InputText v-show="selectedBed === 'Custom'" type="text" v-model="bedcustom" placeholder="ประเภทเตียงเพิ่มเติม" />
          <div>{{ selectedBed }}</div>
          </div>
          <div class="w-full md:w-1/2 px-4 mb-2 ">
            <label class="block uppercase tracking-wide text-gray-700 text-xs  font-bold mb-2" for="grid-first-name">
              จำนวนเตียง :
            </label>
            <InputText
              class="appearance-none block w-full text-gray-700 border border-bluegray-800 rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name" type="text" v-model="bed" placeholder="จำนวนเตียง" />
          </div>
          <div class="w-full md:w-1/2 px-4 mb-2 ">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
              จำนวนห้องน้ำ :
            </label>
            <InputText
              class="appearance-none block w-full text-gray-700 border border-bluegray-800 rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name" type="number" v-model="bathroom" placeholder="จำนวนห้องน้ำ" />
          </div>
          <div class="w-full md:w-1/2 px-4 mb-2 ">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
              ที่อยู่ :
            </label>
            <InputText
              class="appearance-none block w-full text-gray-700 border border-bluegray-800 rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name" type="text" v-model="address" placeholder="ที่อยู่" />
          </div>
          <div class="w-full md:w-1/2 px-4 mb-2 ">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
              จังหวัด :
            </label>
            <Dropdown
              class="appearance-none  w-full text-gray-700 border border-bluegray-800 rounded py-1 px-2 mb-2 leading-tight focus:outline-none focus:bg-white"
              v-model="province" :options="provincedropdown.value" optionLabel="name_th" optionValue="name_th"
              placeholder="เลือกจังหวัด" @change="getamphure('amphure')" />

          </div>

          <div class="w-full md:w-1/2 px-4 mb-2 ">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
              อำเภอ :
            </label>
            <Dropdown
              class="appearance-none w-full text-gray-700 border border-bluegray-800 rounded py-1 px-2 mb-2 leading-tight focus:outline-none focus:bg-white"
              v-model="amphure" :options="amphuredropdown.value" optionLabel="name_th" optionValue="name_th"
              placeholder="เลือกอำเภอ" @change="getamphure('tambon')" />
          </div>

          <div class="w-full md:w-1/2 px-4 mb-2 ">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
              ตำบล :
            </label>
            <Dropdown
              class="appearance-none w-full text-gray-700 border border-bluegray-800 rounded py-1 px-2 mb-2 leading-tight focus:outline-none focus:bg-white"
              v-model="tambon" :options="tambondropdown.value" optionLabel="name_th" optionValue="name_th"
              placeholder="เลือกตำบล" />
          </div>


          <div class="w-full md:w-1/2 px-4 mb-2 ">
            <label class="flex uppercase w-3/12 tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-first-name">เพิ่มรูปภาพ :
            </label>
            <FileUpload name="demo[]" url="/api/upload" id="fileinput" ref="fileinput" type="file"
              class="custom-file-upload" @change="handleFileChange" accept="image/*" multiple>
              <template #empty>
                <p>Upload File Picture</p>
              </template>
            </FileUpload>
          </div>
        </div>
        <div class="flex justify-content-end " style="margin-right: 40px;">
          <div class="md:w-1/3"></div>
          <div class="md:w-1/3">
            <Button @click="addRoom" label="เพิ่มข้อมูลห้อง" />
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
import { ref, onMounted } from "vue";

export default {
  name: "AddHotelPartner",
  data() {
    const cities = ref([]);
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
    const provincedropdown = ref([]);
    const amphuredropdown = ref([null]);
    const tambondropdown = ref([null]);
    const selectedBed = ref();
    const bedtype = ref([
    { name: 'Single Bed', code:'เตียงเดี่ยว ขนาด 3 ฟุต'},
    { name: 'Twin Bed' , code:'เตียงเดี่ยว ขนาด 3.5 ฟุต'},
    { name: 'Double Bed', code:'เตียงคู่ขนาดใหญ่ 1 เตียง'},
    { name: 'Hollywood Twin', code:'เตียงเดี่ยว 2 เตียงติดกัน'},
    { name: 'Queen Size', code:'เตียงเดี่ยว ขนาด 5 ฟุต'},
    { name: 'King Size', code:'เตียงเดี่ยว ขนาด 6 ฟุต'},
    { name: 'Triple Bed', code:'เตียงเดี่ยวจำนวน 3 เตียง'},
    { name: 'Extra Bed', code:'เตียงเสริม'},
    { name: 'Mattress', code:'ฟูกนอนพื้น'},
    { name: 'Murphy Bed', code:'เตียงแบบพับเก็บได้'},
    { name: 'Bunk Bed', code:'เตียง 2 ชั้น'},
    { name: 'Custom'},
]);
    if (this.selectedBed === 'Custom') {
        this.bedcustom = 'เตียงแบบกำหนดเอง';
    }
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
      bedcustom: "",
      selectedBed,
      bedtype,
      cities,
      provincedropdown,
      amphuredropdown,
      tambondropdown,
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
      image: [],
      status: "false",
      approve: "[]",
      statusbooking: "false",
      value: "",
    };
  },
  methods: {
    handleFileChange(event) {
      const input = this.$refs.fileinput;
      if (input.files && input.files.length > 0) {
        this.image = Array.from(input.files);
      }
    },

    async addRoom() {
      try {
        // await this.uploadPicture();
        const res = await axios.post(
          `${process.env.VUE_APP_API}room/hotel/`,
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
        if (res.data.status === true) {
          console.log(res.data.data._id)
          // for (const images of this.image) {
          await this.uploadPicture(res.data.data._id);
          // }
          Swal.fire({
            icon: "success",
            title: "บันทึกสำเร็จ",
            text: "ข้อมูลถูกบันทึกเรียบร้อย",
          });
          this.resetForm();
          this.$router.push('/manageroom')
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
    //// uploadfile picture
    async uploadPicture(_id,) {
      const formData = new FormData();
      for (const images of this.image) {
        formData.append("imgCollection", images); // Fix this line
      }
      try {
        const upimage = await axios.post(
          `${process.env.VUE_APP_API}room/picture/${_id}`,
          formData, {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
        );
        if (upimage.data && upimage.data) {
          console.log(upimage.data, "success_Image");
        } else {
          console.error("Data is missing in the API response.");
        }
      } catch (error) {
        console.error("Error uploading picture:", error);
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
        }
      } catch (error) {
        console.log(error);
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
    this.image = "",
      // Clear errors
      this.errors = {};
  },

};
</script>

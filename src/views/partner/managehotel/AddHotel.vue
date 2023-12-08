<template>
  <div class="grid px-24 py-4 mt-3">
    <div class="col-12 lg:col-12">
      <h1 class="text-xl flex justify-content-center">เพิ่มข้อมูลห้อง</h1>
      <form style="max-width: 750px">
        <div class="flex flex-wrap mb-0">
          <div class="w-full md:w-1/2 px-4 mb-2">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-first-name"
            >
              ชื่อห้อง :
            </label>
            <InputText
              class="appearance-none block w-full text-gray-700 rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              v-model="name"
              placeholder="ชื่อโรงแรม"
            />
          </div>
          <div class="w-full md:w-1/2 px-4 mb-2">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-first-name"
            >
              รายละเอียด :
            </label>
            <InputText
              class="appearance-none block w-full text-gray-700 rounded py-3 mb-2 px-4 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              v-model="description"
              placeholder="รายละเอียด"
            />
          </div>
          <div class="w-full px-4 mb-2">
            <label
              class="block uppercase tracking-wide text-gray-700 mb-2 text-xs font-bold"
              for="grid-password"
            >
              เบอร์โทรศัพท์ :
            </label>
            <InputText
              class="appearance-none block w-full text-gray-700 rounded py-3 mb-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-password"
              type="text"
              v-model="phone_number"
              placeholder="000-000-0000"
            />
          </div>
          <div class="w-full md:w-1/2 px-4 mb-2">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs mb-2 font-bold mb-2"
              for="grid-first-name"
            >
              ราคา :
            </label>
            <InputText
              class="appearance-none block w-full text-gray-700 mb-2 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              v-model="price"
              placeholder="ราคา"
            />
          </div>
          <div class="w-full md:w-1/2 px-4 mb-2">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs mb-2 font-bold mb-2"
              for="grid-first-name"
            >
              ประเภทห้องพัก :
            </label>
            <Dropdown
              class="appearance-none w-full text-gray-700 rounded py-1 px-2 mb-2 leading-tight focus:outline-none focus:bg-white"
              v-model="type"
              showClear
              :options="cities"
              optionLabel="name"
              optionValue="_id"
              placeholder="เลือกประเภท"
            />
          </div>
          <div
            v-show="type === '656aafdbe0452c77321a212d'"
            class="w-full md:w-1/2 px-4 mb-2"
          >
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs mb-2 font-bold mb-2"
              for="grid-first-name"
            >
              ระดับห้อง :
            </label>
            <Dropdown
              class="appearance-none w-full text-gray-700 rounded py-1 px-2 mb-2 leading-tight focus:outline-none focus:bg-white"
              v-model="inputlevelroom"
              :options="roomLevel"
              optionLabel="label"
              optionValue="value"
              placeholder="เลือกประเภท"
            />
          </div>
          <div class="w-full md:w-1/2 px-4 mb-2">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-first-name"
            >
              จำนวนผู้เข้าพัก :
            </label>
            <InputText
              class="appearance-none block w-full text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              v-model="guests"
              placeholder="จำนวนผู้เข้าพัก"
            />
          </div>
          <div class="w-full md:w-1/2 px-4 mb-2">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-first-name"
            >
              จำนวนห้องนอน :
            </label>
            <InputText
              class="appearance-none block w-full text-gray-700 rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              v-model="bedroom"
              placeholder="จำนวนห้องนอน"
            />
          </div>
          <div class="w-full md:w-1/2 px-4 mb-2">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-first-name"
              >ประเภทเตียง :</label
            >
            <Dropdown
              v-model="bedtype"
              showClear
              :options="selectbed"
              optionLabel="label"
              optionValue="value"
              class="appearance-none w-full text-gray-700 rounded py-1 px-2 mb-2 leading-tight focus:outline-none focus:bg-white"
              placeholder="เลือกประเภทเตียง"
              filter
            />
          </div>
          <div
            v-show="bedtype === 'เพิ่มเติม'"
            class="w-full md:w-1/2 px-4 mb-2"
          >
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-first-name"
              >กรอกประเภทเตียงเพิ่มเติม :</label
            >
            <InputText
              type="text"
              v-model="inputbedtype"
              placeholder="กรอกประเภทเตียงเพิ่มเติม"
              class="appearance-none block w-full text-gray-700 rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white"
            />
          </div>

          <div class="w-full md:w-1/2 px-4 mb-2">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-first-name"
            >
              จำนวนเตียง :
            </label>
            <InputText
              class="appearance-none block w-full text-gray-700 rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              v-model="bed"
              placeholder="จำนวนเตียง"
            />
          </div>
          <div class="w-full md:w-1/2 px-4 mb-2">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-first-name"
            >
              จำนวนห้องน้ำ :
            </label>
            <InputText
              class="appearance-none block w-full text-gray-700 rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="number"
              v-model="bathroom"
              placeholder="จำนวนห้องน้ำ"
            />
          </div>

          <div class="w-full md:w-1/2 px-4 mb-2 flex gap-2">
            <div class="w-full">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name"
                >ประเภทผู้เช่า :</label
              >
              <Dropdown
                v-model="partnertype"
                showClear
                :options="selectpartnertype"
                optionLabel="label"
                optionValue="value"
                class="appearance-none w-full text-gray-700 rounded py-1 px-2 mb-2 leading-tight focus:outline-none focus:bg-white"
                placeholder="เลือกประเภทผู้เช่า"
              />
            </div>
            <div class="w-full">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name"
                >เลือกระยะเวลา :</label
              >
              <Calendar
                class="w-full"
                style="height: 56px"
                v-model="selectedDate"
                showIcon
                iconDisplay="input"
                dateFormat="dd/mm/yy"
                selectionMode="range"
                :manualInput="false"
                :numberOfMonths="2"
                :minDate="minSelectableDate"
                :disabled-dates="disabledDates"
                :disabled="partnertype !== 'ผู้เช่าปล่อยเช่า'"
              />
            </div>
          </div>

          <div class="w-full md:w-1/2 px-4 mb-2">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="near-location"
            >
              สถานที่ใกล้เคียง:
            </label>
            <div class="flex gap-2">
              <InputText
                class="appearance-none block w-full text-gray-700 rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white"
                id="near-location"
                type="text"
                v-model="nearlocation"
                placeholder="สถานที่ใกล้เคียง"
              />
              <InputText
                class="appearance-none block w-full text-gray-700 rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white"
                id="distance-location"
                type="text"
                v-model="distancelocation"
                placeholder="ระยะทาง"
              />
            </div>
          </div>
          <!-- เป็น array -->
          <!-- <div class="w-full md:w-1/2 px-4 mb-2 ">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-first-name">สถานที่ใกล้เคียง :</label>
            <div class="mb-4">
              <InputText v-model="newTask.location" placeholder="สถานที่ใกล้เคียง" class="border p-2" />
              <InputText v-model="newTask.distance" placeholder="ระยะทาง" class="border p-2" />
              <Button @click="addTask" icon="pi pi-plus" class="bg-blue-500 text-white p-2 ml-2" />
            </div>
            <ul>
              <li v-for="(task, index) in tasks" :key="index" class="border-b py-2 flex " style="align-items: center;">
                สถานที่ :{{ task.location }} || ระยะทาง :{{ task.distance }}
                <Button @click="removeTask(index)" icon="pi pi-trash" class="p-button-danger p-button-outlined ml-2" />
              </li>
            </ul>
          </div> -->
          <div class="w-full md:w-1/2 px-4 mb-2">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-first-name"
            >
              ที่อยู่ :
            </label>
            <InputText
              class="appearance-none block w-full text-gray-700 rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              v-model="address"
              placeholder="ที่อยู่"
            />
          </div>
          <div class="w-full md:w-1/2 px-4 mb-2">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-first-name"
            >
              จังหวัด :
            </label>
            <Dropdown
              class="appearance-none w-full text-gray-700 rounded py-1 px-2 mb-2 leading-tight focus:outline-none focus:bg-white"
              v-model="province"
              :options="provincedropdown.value"
              optionLabel="name_th"
              optionValue="name_th"
              placeholder="เลือกจังหวัด"
              @change="getamphure('amphure')"
              filter
            >
            </Dropdown>
          </div>

          <div class="w-full md:w-1/2 px-4 mb-2">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-first-name"
            >
              อำเภอ :
            </label>
            <Dropdown
              class="appearance-none w-full text-gray-700 rounded py-1 px-2 mb-2 leading-tight focus:outline-none focus:bg-white"
              v-model="amphure"
              :options="amphuredropdown.value"
              optionLabel="name_th"
              optionValue="name_th"
              placeholder="เลือกอำเภอ"
              @change="getamphure('tambon')"
              filter
            />
          </div>

          <div class="w-full md:w-1/2 px-4 mb-2">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-first-name"
            >
              ตำบล :
            </label>
            <Dropdown
              class="appearance-none w-full text-gray-700 rounded py-1 px-2 mb-2 leading-tight focus:outline-none focus:bg-white"
              v-model="tambon"
              :options="tambondropdown.value"
              optionLabel="name_th"
              optionValue="name_th"
              placeholder="เลือกตำบล"
              filter
            />
          </div>

          <div class="w-full md:w-1/2 px-4 mb-2">
            <label
              class="flex uppercase w-3/12 tracking-wide text-gray-700 text-xs font-bold mb-2"
              style="align-items: center"
              for="grid-first-name"
              >เพิ่มรูปภาพ :
            </label>
            <p class="text-red-500 text-xs">
              (* เพิ่มรูปภาพห้องพัก 5 รูปภาพเพื่อนำไปแสดงหน้าหลัก)
            </p>
            <FileUpload
              name="demo[]"
              url="/api/upload"
              id="fileinput"
              ref="fileinput"
              type="file"
              class="custom-file-upload"
              @change="handleFileChange"
              accept="image/*"
              multiple
              :maxFileSize="Number('999999999')"
            >
              <template #empty>
                <p>อัพโหลดรูปภาพห้อง</p>
              </template>
            </FileUpload>
          </div>
        </div>
        <div class="flex justify-content-end" style="margin-right: 40px">
          <div class="md:w-1/3">
            <Button
              @click="addRoom"
              label="เพิ่มข้อมูลห้อง"
              severity="help"
              rounded
              icon="pi pi-cloud-upload"
              :loading="loading"
            />
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
    const loading = ref(false);
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
        console.log(response.data);
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
      name: "",
      description: "",
      phone_number: "",
      price: "",
      guests: "",
      bedroom: "",
      bed: "",
      bathroom: "",
      latitude: "",
      longitude: "",
      address: "",
      type: "",

      tambon: "",
      amphure: "",
      province: "",
      image: [],
      status: "false",
      approve: "[]",
      statusbooking: "false",
      value: "",
      bedtype: "",
      inputbedtype: "",
      inputlevelroom: "",
      partnertype: "",
      timebookingstart: "",
      timebookingend: "",
      nearlocation: "",
      distancelocation: "",
      selectpartnertype: [
        { label: "เจ้าของปล่อยเช่า", value: "เจ้าของปล่อยเช่า" },
        { label: "ผู้เช่าปล่อยเช่า", value: "ผู้เช่าปล่อยเช่า" },
      ],
      selectbed: [
        { label: "เตียงเดี่ยว ขนาด 3 ฟุต", value: "เตียงเดี่ยว ขนาด 3 ฟุต" },
        {
          label: "เตียงเดี่ยว ขนาด 3.5 ฟุต",
          value: "เตียงเดี่ยว ขนาด 3.5 ฟุต",
        },
        {
          label: "เตียงคู่ขนาดใหญ่ 1 เตียง",
          value: "เตียงคู่ขนาดใหญ่ 1 เตียง",
        },
        {
          label: "เตียงเดี่ยว 2 เตียงติดกัน",
          value: "เตียงเดี่ยว 2 เตียงติดกัน",
        },
        { label: "เตียงเดี่ยว ขนาด 5 ฟุต", value: "เตียงเดี่ยว ขนาด 5 ฟุต" },
        { label: "เตียงเดี่ยว ขนาด 6 ฟุต", value: "เตียงเดี่ยว ขนาด 6 ฟุต" },
        {
          label: "เตียงเดี่ยวจำนวน 3 เตียง",
          value: "เตียงเดี่ยวจำนวน 3 เตียง",
        },
        { label: "เตียงเสริม", value: "เตียงเสริม" },
        { label: "ฟูกนอนพื้น", value: "ฟูกนอนพื้น" },
        { label: "เตียงแบบพับเก็บได้", value: "เตียงแบบพับเก็บได้" },
        { label: "เตียง 2 ชั้น", value: "เตียง 2 ชั้น" },
        { label: "เพิ่มเติม", value: "เพิ่มเติม" },
      ],
      roomLevel: [
        { label: "ห้องสแตนดาร์ด ", value: "ห้องสแตนดาร์ด" },
        { label: "ห้องซูพีเรีย", value: "ห้องซูพีเรีย" },
        { label: "ห้องดีลักซ์ ", value: "ห้องดีลักซ์" },
        { label: "ห้องสวีท ", value: "ห้องสวีท" },
        { label: "ห้องฮันนีมูน", value: "ห้องฮันนีมูน" },
        { label: "ห้องสำหรับครอบครัว", value: "ห้องสำหรับครอบครัว" },
        { label: "ห้องคาบาน่า", value: "ห้องคาบาน่า" },
        { label: "ห้องพักมีสองชั้น", value: "ห้องพักมีสองชั้น" },
        { label: "ห้องสตูดิโอ", value: "ห้องสตูดิโอ" },
      ],

      // newTask: { location: '', distance: '' },
      // tasks: [],
      selectedDate: "",
      minSelectableDate: new Date(),
      disabledDates: [new Date(2023, 10, 29), new Date(2023, 10, 30)],
      loading,
    };
  },
  methods: {
    // addTask() {
    //   if (this.newTask.location && this.newTask.distance) {
    //     this.tasks.push({ location: this.newTask.location, distance: this.newTask.distance });
    //     this.newTask.location = '';
    //     this.newTask.distance = '';
    //   }
    // },
    // removeTask(index) {
    //   this.tasks.splice(index, 1);
    // },
    handleFileChange(event) {
      const input = this.$refs.fileinput;
      const selectedFiles = Array.from(input.files);
      if (selectedFiles.length > 5 || this.image.length > 16) {
        this.clearFileInput();
        this.image = selectedFiles;
      } else {
        this.image = this.image.concat(selectedFiles);
      }
    },

    clearFileInput() {
      this.$refs.fileinput.clear();
      this.image = [];
    },

    async addRoom() {
      try {
        this.loading = true;
        const typehotelbed =
          this.bedtype === "เพิ่มเติม" ? this.inputbedtype : this.bedtype;
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
            typehotelbed: typehotelbed,
            typehotelroom: this.inputlevelroom,
            nearlocation: this.nearlocation,
            distancelocation: this.distancelocation,
            timebookingstart: this.selectedDate[0],
            timebookingend: this.selectedDate[1],
            partnertype: this.partnertype,
          },
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        if (res.data.status === true) {
          console.log(res.data.data._id);
          // for (const images of this.image) {
          await this.uploadPicture(res.data.data._id);
          // }
          this.loading = false;

          Swal.fire({
            icon: "success",
            title: "บันทึกสำเร็จ",
            text: "ข้อมูลถูกบันทึกเรียบร้อย",
          });
          this.$router.push("/manageroom");
        } else {
          this.loading = false;
          await Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาด",
            text: "ไม่สามารถบันทึกข้อมูลได้",
          });
        }
      } catch (error) {
        this.loading = false;

        console.log(error, "error");
        await Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด",
          text: error,
        });
      }
    },
    //// uploadfile picture
    async uploadPicture(_id) {
      for (const images of this.image) {
        const formData = new FormData();
        formData.append("imgCollection", images); // Fix this line
        try {
          const upimage = await axios.post(
            `${process.env.VUE_APP_API}room/picture/${_id}`,
            formData,
            {
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
};
</script>

<template>
  <i class="pi pi-cog cursor-pointer icon-style" @click="getdata" />

  <!--eslint-disable-next-line vue/no-multiple-template-root -->
  <Dialog
    v-model:visible="sidebar"
    header="แก้ไขข้อมูล"
    modal
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
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
            <p>ประเภทห้องพัก :</p>
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
          <div v-if="type === '656aafdbe0452c77321a212d'" class="col-12">
            <p>ระดับห้อง :</p>
            <Dropdown
              class="w-full"
              v-model="inputlevelroom"
              :options="roomLevel"
              optionLabel="label"
              optionValue="value"
              placeholder="เลือกประเภท"
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
            <p>ประเภทเตียง :</p>
            <Dropdown
              v-model="bedtype"
              :options="selectbed"
              optionLabel="label"
              optionValue="value"
              class="w-full"
              placeholder="เลือกประเภทเตียง"
            />
          </div>
          <div class="col-12" v-if="bedtype === 'เพิ่มเติม'">
            <p>กรอกประเภทเตียงเพิ่มเติม :</p>
            <InputText
              type="text"
              v-model="inputbedtype"
              placeholder="กรอกประเภทเตียงเพิ่มเติม"
              class="w-full"
            />
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
            <p>ประเภทผู้เช่า :</p>
            <Dropdown
              v-model="partnertype"
              :options="selectpartnertype"
              optionLabel="label"
              optionValue="value"
              class="w-full"
            />
          </div>
          <div class="col-12">
            <p>เลือกระยะเวลา :</p>
            <Calendar
              class="w-full"
              style="height: 56px"
              v-model="selectedDate"
              showIcon
              iconDisplay="input"
              dateFormat="dd/mm/yy"
              selectionMode="range"
              :manualInput="true"
              :numberOfMonths="2"
              :minDate="minSelectableDate"
              :disabled-dates="disabledDates"
              :disabled="partnertype !== 'ผู้เช่าปล่อยเช่า'"
            />
          </div>
          <div class="col-12">
            <p>สถานที่ใกล้เคียง:</p>
            <div class="flex gap-2">
              <InputText v-model="nearlocation" class="w-full" />
              <InputText v-model="distancenearlocation" class="w-full" />
            </div>
          </div>

          <div class="col-12">
            <p>ที่อยู่ :</p>
            <InputText v-model="address" name="address" class="w-full" />
          </div>
          <div class="col-12">
            <p>จังหวัด :</p>
            <Dropdown
              class="appearance-none w-full text-gray-700 rounded py-1 px-2 mb-3 leading-tight focus:outline-none focus:bg-white"
              v-model="province"
              :options="provincedropdown.value"
              optionLabel="name_th"
              optionValue="name_th"
              placeholder="เลือกจังหวัด"
              @change="getamphure('amphure')"
              filter
            />
          </div>
          <div class="col-12">
            <p>อำเภอ :</p>
            <Dropdown
              class="appearance-none w-full text-gray-700 rounded py-1 px-2 mb-3 leading-tight focus:outline-none focus:bg-white"
              v-model="amphure"
              :options="amphuredropdown.value"
              optionLabel="name_th"
              optionValue="name_th"
              placeholder="เลือกอำเภอ"
              @change="getamphure('tambon')"
              filter
            />
          </div>
          <div class="col-12">
            <p>ตำบล :</p>
            <Dropdown
              class="appearance-none w-full text-gray-700 rounded py-1 px-2 mb-3 leading-tight focus:outline-none focus:bg-white"
              v-model="tambon"
              :options="tambondropdown.value"
              optionLabel="name_th"
              optionValue="name_th"
              placeholder="เลือกตำบล"
              filter
            />
          </div>
          <div class="col-12">
            <p>ละติจูด :</p>
            <InputText v-model="latitude" name="latitude" class="w-full" />
          </div>
          <div class="col-12">
            <p>ลองจิจูด :</p>
            <InputText v-model="longitude" name="longitude" class="w-full" />
          </div>
          <GMapMap
            :center="{ lat: parseFloat(latitude), lng: parseFloat(longitude) }"
            :zoom="7"
            map-type-id="terrain"
            class="mt-2"
            style="height: 400px"
          >
            <GMapMarker
              :position="{
                lat: parseFloat(latitude),
                lng: parseFloat(longitude),
              }"
              v-if="latitude && longitude"
            />
          </GMapMap>
          <div class="col-12 flex justify-content-end text-center mt-2">
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
import { ref, onMounted } from "vue";

export default {
  props: {
    shop_id: String,
    data: Object,
    title: String,
  },
  data() {
    ////////  get dropdown list /////////
    const loading = ref(false);
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
          `https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province.json`
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
      loading,
      cities,
      provincedropdown,
      amphuredropdown,
      tambondropdown,
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
      latitude: "",
      longitude: "",
      address: "",
      tambon: "",
      amphure: "",
      province: "",
      bedtype: "",
      inputbedtype: "",
      inputlevelroom: "",
      partnertype: "",
      timebookingstart: "",
      timebookingend: "",
      nearlocation: "",
      distancenearlocation: "",
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
      selectedDate: "",
      minSelectableDate: new Date(),
      disabledDates: [new Date(), new Date()],
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
        this.name = response.data?.name;
        this.description = response.data?.description;
        this.phone_number = response.data?.phone_number;
        this.price = response.data?.price;
        this.type = response.data?.type._id;
        this.bedtype = response.data?.typehotelbed;
        this.inputlevelroom = response.data?.typehotelroom;
        this.guests = response.data?.guests;
        this.bedroom = response.data?.bedroom;
        this.bed = response.data?.bed;
        this.bathroom = response.data?.bathroom;
        this.address = response.data?.address;
        this.province = response.data?.province;
        this.nearlocation = response.data?.nearlocation;
        this.distancenearlocation = response.data?.distancenearlocation;
        this.latitude = response.data?.latitude;
        this.longitude = response.data?.longitude;
        this.selectedDate = [
          new Date(response.data.timebookingstart),
          new Date(response.data.timebookingend),
        ];
        this.partnertype = response.data?.partnertype;
        const getamphure = await this.getamphure("amphure");
        if (getamphure == true) {
          this.amphure = response.data?.amphure;
        }
        const gettambon = await this.getamphure("tambon");
        if (gettambon == true) {
          this.tambon = response.data?.tambon;
        }
      } catch (error) {
        console.log(error);
      }
    },

    async editadmin() {
      this.loading = true;
      if (
        // this.telephone === null ||
        // this.telephone === "" ||
        this.name === "" ||
        this.name === null
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
          const typehotelbed =
            this.bedtype === "เพิ่มเติม" ? this.inputbedtype : this.bedtype;
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
              latitude: this.latitude,
              longitude: this.longitude,
              address: this.address,
              tambon: this.tambon,
              amphure: this.amphure,
              province: this.province,
              typehotelbed: typehotelbed,
              typehotelroom: this.inputlevelroom,
              nearlocation: this.nearlocation,
              distancenearlocation: this.distancenearlocation,
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
              text: res.data.message,
            });
            this.sidebar = true;
          }
        } catch (error) {
          this.sidebar = false;
          this.loading = false;
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
            `https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_amphure.json`
          );
          this.amphuredropdown.value = amphure.data?.filter(
            (amphure) => amphure.province_id === id
          );
          return true;
        }
        if (type === "tambon") {
          const selectedAmphureObject = this.amphuredropdown.value.find(
            (amphure) => amphure.name_th === this.amphure
          );

          const id = selectedAmphureObject.id;

          //
          const tambon = await axios.get(
            `https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_tambon.json`
          );
          this.tambondropdown.value = tambon.data?.filter(
            (tambon) => tambon.amphure_id === id
          ); 
          return true;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<template>
  <div style="width: 60%;">
    <div class="grid">
      <div class="col-12 text-center">
        <h2>แก้ไขข้อมูลส่วนตัว</h2>
      </div>
    </div>
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
            <p>ชื่อ :</p>
            <InputText
              v-model="name"
              name="name"
              placeholder="กรุณากรอกชื่อ"
              class="w-full"
            />
          </div>
          <div class="col-12">
            <p>ที่อยู่ :</p>
            <InputText v-model="address" name="address" class="w-full" />
          </div>
          <div class="col-12">
            <p>จังหวัด :</p>
            <Dropdown
              class="appearance-none w-full text-gray-700 border  rounded py-1 px-2 mb-3 leading-tight focus:outline-none focus:bg-white"
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
              class="appearance-none w-full text-gray-700 border  rounded py-1 px-2 mb-3 leading-tight focus:outline-none focus:bg-white"
              v-model="amphure"
              :disabled="!province"
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
              class="appearance-none w-full text-gray-700 border  rounded py-1 px-2 mb-3 leading-tight focus:outline-none focus:bg-white"
              v-model="tambon"
              :disabled="!amphure"
              :options="tambondropdown.value"
              optionLabel="name_th"
              optionValue="name_th"
              placeholder="เลือกตำบล"
            />
          </div>
          <div class="col-12">
            <p>email :</p>
            <InputText v-model="email" name="email" class="w-full" />
          </div>
          <div class="col-12">
            <p>รูปบัตรประชาชน :</p>
            <div class="text-center">
              <img
                v-if="image_card && newimageid_cardpreview === ''"
                :src="getImage(image_card)"
                alt="ID Card"
                width="300"
              />
              <img
                v-if="newimageid_cardpreview"
                :src="newimageid_cardpreview"
                alt="ID Card"
                width="300"
              />
              <FileUpload
                mode="basic"
                name="demo[]"
                id="imageidcardinput"
                ref="imageidcardinput"
                type="file"
                accept="image/*"
                customUpload
                @change="handleFileChange('image_bank')"
                chooseLabel="เปลี่ยนรูป"
                class="mt-3"
              />
            </div>
          </div>
          <div class="col-12">
            <p>เลขบัตรประชาชน :</p>
            <InputText v-model="idcard" name="idcard" class="w-full" />
          </div>
          <div class="col-12">
            <p>รูปเลขบัญชีธนาคาร :</p>
            <div class="text-center">
              <img
                v-if="image_bank && newimage_bank === ''"
                :src="getImage(image_bank)"
                alt="ID Card"
                width="300"
              />
              <img
                v-if="newimage_bankpreview"
                :src="newimage_bankpreview"
                alt="ID Card"
                width="300"
              />
              <FileUpload
                mode="basic"
                name="demo[]"
                id="imagebankinput"
                ref="imagebankinput"
                type="file"
                accept="image/*"
                customUpload
                @change="handleFileChangebank('image_bank')"
                chooseLabel="เปลี่ยนรูป"
                class="mt-3"
              />
            </div>
          </div>
          <div class="col-12">
            <p>ธนาคาร :</p>
            <Dropdown
              v-model="bank"
              :options="banks"
              optionLabel="label"
              optionValue="value"
              placeholder="เลือกธนาคารที่ใช้งาน"
              class="w-full"
            />
          </div>
          <div class="col-12">
            <p>เลขบัญชี :</p>
            <InputText v-model="numberbank" name="numberbank" class="w-full" />
          </div>
          <div class="col-12">
            <p>password :(ถ้าไม่ได้เปลี่ยนรหัสผ่านไม่ต้องกรอก)</p>
            <InputText
              type="password"
              class="w-full"
              name="password"
              placeholder="*****"
              v-model="password"
            />
          </div>
          <div class="col-12">
            <div class="col-12 text-center flex justify-content-end mt-2">
              <Button
                label="แก้ไข"
                severity="help"
                rounded
                icon="pi pi-file-edit"
                :loading="loading"
                @click="editpartner"
              />
            </div>
          </div>
        </form>
      </div>
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
    const loading = ref(false);
    const provincedropdown = ref([]);
    const amphuredropdown = ref([null]);
    const tambondropdown = ref([null]);
    const getprovince = async () => {
      try {
        const province = await axios.get(
          `${process.env.VUE_APP_THAILAND}thailand/province`
        );
        this.provincedropdown.value = province.data;
        console.log(this.provincedropdown.value, "province");
      } catch (error) {
        console.log(error);
      }
    };
    const getdata = async () => {
      this.sidebar = true;
      try {
        const res = await axios.get(
          `${process.env.VUE_APP_API}partner/findpartner`,
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );

        console.log(res.data.data, "res data");

        if (res.data && res.data.data) {
          const partnerData = res.data.data;
          this._id = partnerData._id;
          this.telephone = partnerData.telephone;
          this.name = partnerData.name;
          this.idcard = partnerData.idcard;
          this.address = partnerData.address;
          this.image_card = partnerData.image_idcard;
          this.image_bank = partnerData.image_bank;
          this.province = partnerData.province;
          this.email = partnerData.email;
          this.bank = partnerData.bank;
          this.numberbank = partnerData.numberbank;
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
    };
    onMounted(() => {
      getprovince();
      getdata();
    });
    return {
      loading,
      provincedropdown,
      amphuredropdown,
      tambondropdown,
      _id: "",
      telephone: "",
      password: "",
      name: "",
      address: "",
      province: "",
      tambon: "",
      amphure: "",
      idcard: "",
      image_card: "",
      email: "",
      bank: "",
      numberbank: "",
      newimageid_card: "",
      newimageid_cardpreview: "",
      image_bank: "",
      newimage_bank: "",
      newimage_bankpreview: "",
      banks: [
        { value: "กรุงเทพ", label: "กรุงเทพ" },
        { value: "กสิกร", label: "กสิกร" },
        { value: "กรุงไทย", label: "กรุงไทย" },
        { value: "ทหารไทย", label: "ทหารไทย" },
        { value: "ไทยพาณิชย์", label: "ไทยพาณิชย์" },
        { value: "กรุงศรีอยุธยา", label: "กรุงศรีอยุธยา" },
        { value: "ยูบีโอ", label: "ยูบีโอ" },
        { value: "ออมสิน", label: "ออมสิน" },
        { value: "ธกส", label: "ธกส" },
      ],
    };
  },
  methods: {
    async editpartner() {
      if (this.name === "" || this.name === null) {
        await Swal.fire({
          icon: "error",
          title: "กรอกข้อมูลไม่ครบ",
          text: "กรุณากรอกข้อมูลให้ครบ",
        });
      } else {
        try {
          this.loading = true;
          const id = this._id;
          let changeimage_bank = false;
          if (this.newimageid_card != "" && this.image_card != []) {
            const res = await axios.delete(
              `${process.env.VUE_APP_API}partner/${id}/picture/${this.image_card}`
            );
            console.log(res.data.message);
          }
          if (this.newimage_bank != "" && this.image_bank != []) {
            changeimage_bank = true;
          }
          const res = await axios.put(
            `${process.env.VUE_APP_API}partner/${id}`,
            {
              telephone: this.telephone,
              password: this.password,
              name: this.name,
              idcard: this.idcard,
              address: this.address,
              tambon: this.tambon,
              amphure: this.amphure,
              province: this.province,
              email: this.email,
              bank: this.bank,
              numberbank: this.numberbank,
              changeimage_bank: changeimage_bank, // มีการเปลี่ยนรูปบัญชีหรือไม่
              level: "1",
            },
            {
              headers: {
                token: localStorage.getItem("token"),
              },
            }
          );
          if (res.data.status === true) {
            if (this.newimageid_card != "" || this.newimage_bank != "") {
              await this.uploadPicture(id);
            }
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
            text: error,
          });
          console.log(error);
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
      if (typeof item === "string") {
        return `https://drive.google.com/uc?export=view&id=${item}`;
      } else if (Array.isArray(item) && item.length > 0) {
        const firstImageId = item[0];
        return `https://drive.google.com/uc?export=view&id=${firstImageId}`;
      } else {
        return "";
      }
    },

    handleFileChange(fieldName) {
      const input =
        fieldName === "filepic"
          ? this.$refs.fileinput
          : this.$refs.imageidcardinput;

      if (input.files && input.files.length > 0) {
        this.newimageid_card = input.files[0];
        this.newimageid_cardpreview = input.files[0].objectURL;
      }
    },
    handleFileChangebank(fieldName) {
      const input =
        fieldName === "filepic2"
          ? this.$refs.fileinput
          : this.$refs.imagebankinput;

      if (input.files && input.files.length > 0) {
        this.newimage_bank = input.files[0];
        this.newimage_bankpreview = input.files[0].objectURL;
      }
    },
    //// uploadfile picture
    async uploadPicture(_id) {
      try {
        if (this.newimageid_card != "") {
          const formDataFilepic = new FormData();
          formDataFilepic.append("imgCollection", this.newimageid_card);
          const res = await axios.post(
            `${process.env.VUE_APP_API}partner/picture/${_id}`,
            formDataFilepic
          );
          if (res.data.status === true) {
            console.log("อัพโหลดรูปบัตรประชาชนสำเร็จ");
          } else {
            console.log("error");
          }
        }
        if (this.newimage_bank != "") {
          const formDataImageBank = new FormData();
          formDataImageBank.append("imgbank", this.newimage_bank);
          const res = await axios.post(
            `${process.env.VUE_APP_API}partner/picturebank/${_id}`,
            formDataImageBank
          );
          if (res.data.status === true) {
            console.log("อัพโหลดรูปบัตรประชาชนสำเร็จ");
          } else {
            console.log("error");
          }
        }
      } catch (error) {
        console.error("Error uploading pictures:", error);
      }
    },
  },
};
</script>

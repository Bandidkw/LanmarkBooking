<template>
  <div class="center-container">
    <div class="grid-cols-1">
      <div class="register-text flex items-center justify-center" style="flex-direction: column;">
        <h1 class="text-center">ร่วมงานกับเรา</h1>
        <h1 class="text-center">lanmark.online</h1>
      </div>
      <div class="button_selection">
        <Button
          @click="showModal('partner')"
          class="hover:bg-blue-700 hover:text-white"
          style="color: #fff"
          label=" สมัครเป็นพาร์ทเนอร์"
          severity="secondary"
          outlined
        />
        <Button
          @click="showModal('member')"
          class="hover:bg-orange-700 hover:text-white"
          label=" สมัครเป็นสมาชิก"
          severity="warning"
          outlined
        />
      </div>
    </div>

    <Dialog
      v-model:visible="showModalMember"
      maximizable
      modal
      header="สมัครสมาชิก"
      :style="{ width: '50rem' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
      @onHide="close('member')"
    >
      <form class="form-control">
        <label for="fname">ชื่อ :</label>

        <InputText
          class="input-form"
          type="text"
          v-model="member.name"
          @input="validateField('name', 'member')"
          placeholder="กรอกชื่อ"
        />
        <span class="error-message">{{ errors.name }}</span>
        <div class="input-content">
          <div class="input-box">
            <label for="fname">ชื่อจริง :&emsp;&emsp;&emsp;&emsp;</label>
            <InputText
              class="input-form"
              type="text"
              v-model="member.fname"
              @input="validateField('fname', 'member')"
              placeholder="กรอกชื่อจริง"
            />
            <span class="error-message">{{ errors.fname }}</span>
          </div>
          <div class="input-box">
            <label for="lname">นามสกุล &nbsp;:</label>
            <InputText
              class="input-form"
              type="text"
              v-model="member.lname"
              @input="validateField('lname', 'member')"
              placeholder="กรอกนามสกุล"
            />
            <span class="error-message">{{ errors.lname }}</span>
          </div>
        </div>

        <label for="email">อีเมล์ :</label>
        <InputText
          class="input-form"
          type="email"
          v-model="member.email"
          @input="validateField('email', 'member')"
          placeholder="กรอกอีเมล์"
        />
        <span class="error-message">{{ errors.email }}</span>

        <label for="phone"> เบอร์โทรศัพท์:</label>
        <InputText
          class="input-form"
          type="tel"
          v-model="member.phone"
          @input="validateField('phone', 'member')"
          placeholder="กรอกเบอร์โทรศัพท์"
        />
        <span class="error-message">{{ errors.phone }}</span>

        <div class="input-content">
          <div class="input-box">
            <label for="password">รหัสผ่าน :</label>
            <InputText
              class="input-form"
              type="password"
              v-model="member.password"
              @input="validateField('password', 'member')"
              placeholder="กรอกรหัสผ่าน"
            />
            <span class="error-message">{{ errors.password }}</span>
          </div>
          <div class="input-box">
            <label for="confirmPassword">ยืนยันรหัสผ่าน :</label>
            <InputText
              class="input-form"
              type="password"
              v-model="member.confirmPassword"
              @input="validateField('confirmPassword', 'member')"
              placeholder="ยืนยันรหัสผ่าน"
            />
            <span class="error-message">{{ errors.confirmPassword }}</span>
          </div>
        </div>

        <div class="flex justify-content-end">
          <Button
            label="ลงทะเบียน"
            class="hover:bg-blue-700"
            style="background-color: #3b82f6"
            icon="pi pi-user-plus"
            :loading="loading"
            @click="register('member')"
            rounded
          />
          <ContractMember :datacontract="datacontract" :id="id" />
        </div>
      </form>
    </Dialog>

    <!-- Partner Modal -->
    <Dialog
      v-model:visible="showModalPartner"
      @onHide="close('partner')"
      maximizable
      modal
      header="สมัครพาร์ทเนอร์"
      :style="{ width: '50rem', zIndex: '1' }"
      :breakpoints="{ '1199px': '75vw', '640px': '90vw' }"
    >
      <form class="form-control">
        <div class="input-content">
          <div class="input-box">
            <label for="name">ชื่อ :</label>
            <InputText
              class="input-form"
              type="text"
              v-model="partner.name"
              @input="validateField('name', 'partner')"
              placeholder="กรอกชื่อ"
            />
            <span class="error-message">{{ errors.name }}</span>
          </div>

          <div class="input-box">
            <label for="lname">นามสกุล &nbsp;:</label>
            <InputText
              class="input-form"
              type="text"
              v-model="partner.lastname"
              @input="validateField('lastname', 'partner')"
              placeholder="กรอกนามสกุล"
            />
            <span class="error-message">{{ errors.lastname }}</span>
          </div>
        </div>

        <label for="phone"> เบอร์โทรศัพท์:</label>
        <InputText
          class="input-form"
          type="tel"
          v-model="partner.phone"
          @input="validateField('phone', 'partner')"
          placeholder="กรอกเบอร์โทรศัพท์"
        />
        <span class="error-message">{{ errors.phone }}</span>

        <label for="email">อีเมล์ :</label>
        <InputText
          class="input-form"
          type="email"
          v-model="partner.email"
          @input="validateField('partner', 'member')"
          placeholder="กรอกอีเมล์"
        />
        <span class="error-message">{{ errors.email }}</span>

        <label for="idcard">เลขบัตรประจำตัวประชาชน :</label>
        <InputText
          class="input-form"
          type="tel"
          v-model="partner.idcard"
          @input="validateField('idcard', 'partner')"
          placeholder="กรอกเลขบัตรประจำตัวประชาชน"
        />
        <span class="error-message">{{ errors.idcard }}</span>

        <label for="filepic">แนบรูปบัตรประจำตัวประชาชน :</label>
        <FileUpload
          name="demo[]"
          mode="basic"
          id="fileinput"
          ref="fileinput"
          type="file"
          class="custom-file-upload"
          customUpload
          @change="handleFileChange('filepic')"
          accept="image/*"
          chooseLabel="แนบรูปภาพ"
        >
        </FileUpload>
        <span class="error-message">{{ errors.filepic }}</span>

        <img
          v-if="partner.filepic && !newimage_idcardpreview"
          :src="getImage(partner.filepic)"
          class="image-preview"
        />
        <img
          v-if="newimage_idcardpreview"
          :src="newimage_idcardpreview"
          class="image-preview"
        />

        <label for="address">ที่อยู่ :</label>
        <InputText
          class="input-form"
          type="tel"
          v-model="partner.address"
          @input="validateField('address', 'partner')"
          placeholder="กรอกที่อยู่ปัจจุบัน"
        />
        <span class="error-message">{{ errors.address }}</span>

        <div class="input-content">
          <div class="input-box">
            <label for="province"> จังหวัด :</label>
            <Dropdown
              v-model="partner.province"
              :options="provincedropdown.value"
              optionLabel="name_th"
              optionValue="name_th"
              placeholder="เลือกจังหวัด"
              @change="getamphure('amphure')"
              filter
            />
            <span class="error-message">{{ errors.province }}</span>
          </div>
          <div class="input-box">
            <label for="amphure"> อำเภอ :</label>
            <Dropdown
              v-model="partner.amphure"
              :options="amphuredropdown.value"
              optionLabel="name_th"
              optionValue="name_th"
              placeholder="เลือกอำเภอ"
              @change="getamphure('tambon')"
              filter
            />
            <span class="error-message">{{ errors.amphure }}</span>
          </div>
          <div class="input-box">
            <label for="tambon"> ตำบล :</label>
            <Dropdown
              v-model="partner.tambon"
              :options="tambondropdown.value"
              optionLabel="name_th"
              optionValue="name_th"
              placeholder="เลือกตำบล"
              filter
            />
            <span class="error-message">{{ errors.tambon }}</span>
          </div>
        </div>

        <label for="image_bank">แนบสำเนา หรือ รูปภาพสมุดบัญชี :</label>
        <FileUpload
          mode="basic"
          chooseLabel="แนบรูปภาพ"
          name="demo[]"
          id="imagebankinput"
          ref="imagebankinput"
          type="file"
          accept="image/*"
          customUpload
          @change="handleFileChange('image_bank')"
        />
        <span class="error-message">{{ errors.image_bank }}</span>

        <img
          v-if="partner.image_bank && !newimage_bankpreview"
          :src="getImage(partner.image_bank)"
          class="image-preview"
        />
        <img
          v-if="newimage_bankpreview"
          :src="newimage_bankpreview"
          class="image-preview"
        />

        <div class="input-content">
          <div class="input-box">
            <label for="bank">ธนาคาร :</label>
            <Dropdown
              v-model="partner.bank"
              :options="banks"
              optionLabel="label"
              optionValue="value"
              placeholder="เลือกธนาคารที่ใช้งาน"
            />
            <span class="error-message">{{ errors.bank }}</span>
          </div>
          <div class="input-box">
            <label for="numberbank">เลขบัญชี :</label>
            <InputText
              class="input-form"
              type="tel"
              v-model="partner.numberbank"
              @input="validateField('numberbank', 'partner')"
              placeholder="กรอกเลขบัญชีธนาคาร"
            />
            <span class="error-message">{{ errors.numberbank }}</span>
          </div>
        </div>

        <div class="input-content">
          <div class="input-box">
            <label for="password">รหัสผ่าน :</label>
            <InputText
              class="input-form"
              type="password"
              v-model="partner.password"
              @input="validateField('password', 'partner')"
              placeholder="กรอกรหัสผ่าน"
            />
            <span class="error-message">{{ errors.password }}</span>
          </div>

          <div class="input-box">
            <label for="confirmPassword">ยืนยันรหัสผ่าน :</label>
            <InputText
              class="input-form"
              type="password"
              v-model="partner.confirmPassword"
              @input="validateField('confirmPassword', 'partner')"
              placeholder="ยืนยันรหัสผ่าน"
            />
            <span class="error-message">{{ errors.confirmPassword }}</span>
          </div>
        </div>

        <div class="flex justify-content-end">
          <Button
            class="hover:bg-blue-700"
            style="background-color: #3b82f6"
            label="ลงทะเบียน"
            icon="pi pi-user-plus"
            :loading="loading"
            @click="register('partner')"
            rounded
          />
        </div>
        <div>
          <Contract :datacontract="datacontract" :id="id" />
        </div>
      </form>
    </Dialog>
  </div>
</template>

<script>
import * as yup from "yup";
import axios from "axios";
import { onMounted, ref } from "vue";
import { useToast } from "primevue/usetoast";
import Contract from "../components/Contract_Modal.vue";
import ContractMember from "../components/ContractMember_Modal.vue";
export default {
  data() {
    const loading = ref(false);
    const toast = useToast();
    const provincedropdown = ref([]);
    const amphuredropdown = ref([null]);
    const tambondropdown = ref([null]);
    const checked = ref(false);
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

    const showSuccess = () => {
      toast.add({
        severity: "success",
        summary: "ลงทะเบียนสำเร็จ",
        detail: "ยินดีต้อนรับ",
        life: 3000,
      });
    };

    const showError = () => {
      toast.add({
        severity: "error",
        summary: "ลงทะเบียนไม่สำเร็จ",
        detail: "ข้อมูลไม่ถูกต้อง หรือ ครบถ้วน",
        life: 3000,
      });
    };

    onMounted(() => {
      getprovince();
    });

    return {
      provincedropdown,
      amphuredropdown,
      tambondropdown,
      member: {
        name: "",
        fname: "",
        lname: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      },
      partner: {
        name: "",
        lastname: "",
        phone: "",
        idcard: "",
        filepic: null,
        email: "",
        address: "",
        tambon: "",
        amphure: "",
        province: "",
        password: "",
        confirmPassword: "",
        image_bank: null,
        numberbank: "",
        bank: null,
      },
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
      errors: {},
      showModalPartner: false,
      showModalMember: false,
      showSuccess,
      showError,
      checked,
      id: null,
      loading,
      newimage_bankpreview: null,
      newimage_idcardpreview: null,
    };
  },
  components: {
    Contract,
    ContractMember,
  },
  methods: {
    async handleFileChange(fieldName) {
      const input =
        fieldName === "filepic"
          ? this.$refs.fileinput
          : this.$refs.imagebankinput;

      if (input.files && input.files.length > 0) {
        if (fieldName === "filepic") {
          this.newimage_idcardpreview = URL.createObjectURL(input.files[0]);
          this.partner.filepic = input.files[0];
        } else if (fieldName === "image_bank") {
          this.newimage_bankpreview = URL.createObjectURL(input.files[0]);
          this.partner.image_bank = input.files[0];
        }

        await this.validateField(fieldName, "partner");
      }
    },

    beforeDestroy() {
      if (this.newimage_bankpreview) {
        URL.revokeObjectURL(this.newimage_bankpreview);
      }
      if (this.newimage_idcardpreview) {
        URL.revokeObjectURL(this.newimage_idcardpreview);
      }
    },

    async getamphure(type) {
      try {
        if (type === "amphure") {
          const selectedProvinceObject = this.provincedropdown.value.find(
            (province) => province.name_th === this.partner.province
          );
          const id = selectedProvinceObject.id;
          const amphure = await axios.get(
            `https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_amphure.json`
          );
          this.amphuredropdown.value = amphure.data?.filter(
            (amphure) => amphure.province_id === id
          );
        }
        if (type === "tambon") {
          const selectedAmphureObject = this.amphuredropdown.value.find(
            (amphure) => amphure.name_th === this.partner.amphure
          );
          const id = selectedAmphureObject.id;
          const tambon = await axios.get(
            `https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_tambon.json`
          );
          this.tambondropdown.value = tambon.data?.filter(
            (tambon) => tambon.amphure_id === id
          );
        }
      } catch (error) {
        console.log(error);
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
    /// show modal
    showModal(type) {
      if (type === "partner") {
        this.showModalPartner = true;
        this.showModalMember = false;
      } else if (type === "member") {
        this.showModalPartner = false;
        this.showModalMember = true;
      }
    },
    //// register
    async register(userType) {
      this.loading = true;
      try {
        if (userType === "member") {
          await this.validateMemberForm();
          const res = await axios.post(
            `${process.env.VUE_APP_API}signup/member`,
            {
              telephone: this.member.phone,
              password: this.member.password,
              name: this.member.name,
              firstname: this.member.fname,
              lastname: this.member.lname,
              email: this.member.email,
              roles: "member",
            }
          );
          if (res.data.status == true) {
            console.log(res, "success");
            this.loading = false;
            this.showSuccess();
            this.showModalMember = false;
            await this.$router.push("/");
          } else {
            this.loading = false;
            this.$toast.add({
              severity: "error",
              summary: "สมัครสมาชิกไม่สำเร็จ",
              detail: res.data.message,
              life: 3000,
            });
            console.error("Data is missing in the API response.");
          }
        } else if (userType === "partner") {
          await this.validatePartnerForm();
          const res = await axios.post(
            `${process.env.VUE_APP_API}signup/partner`,
            {
              telephone: this.partner.phone,
              password: this.partner.password,
              name: this.partner.name,
              lastname: this.partner.lastname,
              idcard: this.partner.idcard,
              address: this.partner.address,
              tambon: this.partner.tambon,
              amphure: this.partner.amphure,
              province: this.partner.province,
              email: this.partner.email,
              bank: this.partner.bank,
              numberbank: this.partner.numberbank,
              level: "1",
            }
          );

          if (res.data.status === true) {
            console.log(res.data);
            await this.uploadPicture(res.data.data._id);
            this.showSuccess();
            this.showModalPartner = false;
            this.loading = false;
            await this.$router.push("/");
          } else {
            this.loading = false;
            this.$toast.add({
              severity: "error",
              summary: "ลงทะเบียนไม่สำเร็จ",
              detail: res.data.message,
              life: 3000,
            });
            console.error("Data is missing in the API response.");
          }
        }
      } catch (error) {
        this.loading = false;

        this.showError();
        console.error("Form validation failed:", error);
      }
    },
    //// uploadfile picture
    async uploadPicture(_id) {
      try {
        const formDataFilepic = new FormData();
        formDataFilepic.append("imgCollection", this.partner.filepic);

        const formDataImageBank = new FormData();
        formDataImageBank.append("imgbank", this.partner.image_bank);

        const [upfilePick, upImageBank] = await Promise.all([
          axios.post(
            `${process.env.VUE_APP_API}partner/picture/${_id}`,
            formDataFilepic
          ),
          axios.post(
            `${process.env.VUE_APP_API}partner/picturebank/${_id}`,
            formDataImageBank
          ),
        ]);

        if (upfilePick.data && upfilePick.data) {
          console.log(upfilePick.data, "success_Image for upfilePick");
        } else {
          console.error("Data is missing in the API response for upfilePick.");
        }

        if (upImageBank.data && upImageBank.data) {
          console.log(upImageBank.data, "success_Image for upImageBank");
        } else {
          console.error("Data is missing in the API response for upImageBank.");
        }
      } catch (error) {
        console.error("Error uploading pictures:", error);
      }
    },

    ///// validation and yup form
    async validateMemberForm() {
      const MemberSchema = yup.object({
        name: yup.string().required(" * กรุณากรอกชื่อ"),
        fname: yup.string().required("* กรุณากรอกชื่อจริง"),
        lname: yup.string().required("* กรุณากรอกนามสกุล"),
        email: yup
          .string()
          .email("* กรุณากรอกอีเมลให้ถูกต้อง")
          .required("* กรุณากรอกอีเมล"),
        phone: yup
          .string()
          .required("* กรุณากรอกเบอร์โทรศัพท์")
          .min(8, "* เบอร์โทรต้องมีอย่างน้อย 8 หลัก")
          .max(10, "* เบอร์โทรต้องมีไม่เกิน 10 หลัก"),

        password: yup.string().required("* กรุณากรอกรหัสผ่าน"),
        confirmPassword: yup
          .string()
          .oneOf([yup.ref("password"), null], "* รหัสผ่านไม่ตรงกัน")
          .required("* กรุณายืนยันรหัสผ่าน"),
      });
      await this.validateForm(MemberSchema, this.member);
    },
    async validatePartnerForm() {
      const PartnerSchema = yup.object({
        name: yup.string().required("* กรุณากรอกชื่อ"),
        lastname: yup.string().required("* กรุณากรอกนามสกุล"),
        phone: yup
          .string()
          .required("* กรุณากรอกเบอร์โทรศัพท์")
          .min(8, "* เบอร์โทรต้องมีอย่างน้อย 8 หลัก")
          .max(10, "* เบอร์โทรต้องมีไม่เกิน 10 หลัก"),
        idcard: yup.string().required("* กรุณากรอกเลขบัตรประชาชน"),
        filepic: yup.mixed().required("* กรุณากรอกอัพโหลดรูปบัตรประชาชน"),
        email: yup
          .string()
          .email("* กรุณากรอกอีเมลให้ถูกต้อง")
          .required("* กรุณากรอกอีเมล"),
        address: yup.string().required("* กรุณากรอกที่อยู่"),
        tambon: yup.string().required("* กรุณาเลือกตำบล"),
        amphure: yup.string().required("* กรุณากรอกอำเภอ"),
        province: yup.string().required("* กรุณากรอกจังหวัด"),
        numberbank: yup.string().required("* กรุณากรอกเลขบัญชี"),
        bank: yup.string().required("* กรุณาเลือกบัญชีธนาคาร"),
        image_bank: yup.mixed().required("* กรุณาอัพโหลดภาพบัญชี"),
        password: yup.string().required("* กรุณากรอกรหัสผ่าน"),
        confirmPassword: yup
          .string()
          .oneOf([yup.ref("password"), null], "* รหัสผ่านให้ตรงกัน")
          .required("* กรุณายืนยันรหัสผ่าน"),
      });
      await this.validateForm(PartnerSchema, this.partner);
    },

    async validateForm(schema, data) {
      try {
        await schema.validate(data, { abortEarly: false });
        this.errors = {};
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          const errors = {};
          error.inner.forEach((e) => {
            errors[e.path] = e.message;
          });
          this.errors = errors;
        }
        throw error;
      }
    },
    async validateField(fieldName, userType) {
      const schema = yup.object({
        [fieldName]: yup.string().required(`${fieldName} is required.`),
      });

      try {
        await schema.validateAt(fieldName, this[userType]);
        this.errors[fieldName] = null;
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          this.errors[fieldName] = error.message;
        }
      }
    },
    //// resetform
    resetForm() {
      this.member = {
        name: "",
        fname: "",
        lname: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      };
      this.partner = {
        name: "",
        lastname: "",
        phone: "",
        idcard: "",
        filepic: null,
        address: "",
        tambon: "",
        amphure: "",
        province: "",
        password: "",
        confirmPassword: "",
        bank: null,
        numberbank: "",
        image_bank: "",
      };
    },

    /// closemodal
    close(userType) {
      this.resetForm();
      if (userType === "partner") {
        this.showModalPartner = false;
      } else if (userType === "member") {
        this.showModalMember = false;
      }
    },
  },
  watch: {
    showModalMember(newValue) {
      if (newValue === false) {
        this.close("member");
      }
    },
    showModalPartner(newValue) {
      if (!newValue) {
        this.close("partner");
      }
    },
  },
};
</script>

<style scoped>
.center-container {
  background-image: url("/public/images/hotel-room/register3.jpg");
  display: flex;
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  align-items: center;
  justify-content: center;
  height: 90vh;
  position: relative;
  z-index: 0;
}

.image-preview {
  width: 200px;
}
.button_selection {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  align-items: center;
  column-gap: 2rem;
}

.error-message {
  color: red;
  font-size: 10px;
}

label {
  font-size: 12px;
}

.input-content {
  display: grid;
  gap: 0.5rem;
  grid-template-columns: repeat(2, 1fr);
}

.input-box {
  display: grid;
  align-items: center;
  gap: 0.5rem;
}

input {
  border-radius: 8px;
  width: 100%;
}

.register-text h1 {
  margin: 0;
  padding: 0;
  color: #fff;
  font-size: 6rem;
}

.close-button {
  border-radius: 1.5rem;
}

@media (max-width: 768px) {
  label {
    font-size: 10px;
  }
}

@media (max-width: 640px) {
  .input-content {
    display: flow;
  }

  .register-text h1 {
    margin: 0;
    padding: 0;
    color: #fff;
    font-size: 4rem;
  }

  .input-box {
    display: grid;
    grid-template-columns: repeat(2, auto);
  }
}
@media (max-width: 576px) {
  .button_selection{
    margin-top: 0.5rem;
    row-gap: 1rem;
  }
  .register-text h1{
    margin: 0.5rem;
    font-size: 2rem;
  }
  
}

div:where(.swal2-container) {
  z-index: 9000;
}
</style>

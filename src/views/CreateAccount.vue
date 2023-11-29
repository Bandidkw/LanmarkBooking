<template>
  <div class="center-container">
    <div class="grid-cols-1">
      <div class="register-text">
        <h1>WELCOME</h1>
      </div>
      <div class="button_selection">
        <Button @click="showModal('partner')" class="hover:bg-blue-700 hover:text-white " style="color: #fff;"
          label=" For Partner" severity="secondary" outlined />
        <Button @click="showModal('member')" class="hover:bg-orange-900" label=" For Member" severity="warning"
          outlined />

      </div>
    </div>

    <Dialog v-model:visible="showModalMember" maximizable modal header="สมัครสมาชิก" :style="{ width: '50rem' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }" @onHide="close('member')">
      <form class="form-control">
        <label for="fname">Name :</label>

        <InputText class="input-form" type="text" v-model="member.name" @input="validateField('name', 'member')"
          placeholder="name" />
        <span class="error-message">{{ errors.name }}</span>
        <div class="input-content">
          <div class="input-box">
            <label for="fname">Firstname :&emsp;&emsp;&emsp;&emsp;</label>
            <InputText class="input-form" type="text" v-model="member.fname" @input="validateField('fname', 'member')"
              placeholder="First name" />
            <span class="error-message">{{ errors.fname }}</span>
          </div>
          <div class="input-box">
            <label for="lname">Lastname &nbsp;:</label>
            <InputText class="input-form" type="text" v-model="member.lname" @input="validateField('lname', 'member')"
              placeholder="Last name" />
            <span class="error-message">{{ errors.lname }}</span>
          </div>
        </div>

        <label for="email">E-mail</label>
        <InputText class="input-form" type="email" v-model="member.email" @input="validateField('email', 'member')"
          placeholder="Email" />
        <span class="error-message">{{ errors.email }}</span>

        <label for="phone"> Phone:</label>
        <InputText class="input-form" type="tel" v-model="member.phone" @input="validateField('phone', 'member')"
          placeholder="Phone number" />
        <span class="error-message">{{ errors.phone }}</span>

        <div class="input-content">
          <div class="input-box">
            <label for="password">Password :</label>
            <InputText class="input-form" type="password" v-model="member.password"
              @input="validateField('password', 'member')" placeholder="Password" />
            <span class="error-message">{{ errors.password }}</span>
          </div>
          <div class="input-box">
            <label for="confirmPassword">Confirm-Password :</label>
            <InputText class="input-form" type="password" v-model="member.confirmPassword"
              @input="validateField('confirmPassword', 'member')" placeholder="Confirm Password" />
            <span class="error-message">{{ errors.confirmPassword }}</span>
          </div>
        </div>

        <div class="flex justify-content-end">
          <Button label="Register" @click="register('member')" severity="help" rounded />
        </div>
      </form>
    </Dialog>


    <!-- Partner Modal -->
    <Dialog v-model:visible="showModalPartner" :baseZIndex="3000" @onHide="close" maximizable modal header="สมัครพาร์ทเนอร์"
      :style="{ width: '50rem' , zIndex: '1'}" :breakpoints="{ '1199px': '75vw', '640px': '90vw' }">
      <form class="form-control">
        <label for="name">Name :</label>
        <InputText class="input-form" type="text" v-model="partner.name" @input="validateField('name', 'partner')"
          placeholder="name" />
        <span class="error-message">{{ errors.name }}</span>

        <label for="phone"> Phone :</label>
        <InputText class="input-form" type="tel" v-model="partner.phone" @input="validateField('phone', 'partner')"
          placeholder="Phone number" />
        <span class="error-message">{{ errors.phone }}</span>

        <label for="idcard"> ID CARD :</label>
        <InputText class="input-form" type="tel" v-model="partner.idcard" @input="validateField('idcard', 'partner')"
          placeholder="ID Card number" />
        <span class="error-message">{{ errors.idcard }}</span>

        <label for="filepic"> File Picture ID Card :</label>
        <div class="card">
          <FileUpload name="demo[]"  id="fileinput" ref="fileinput" type="file"
            class="custom-file-upload" @change="handleFileChange" accept="image/*">
            <template #empty>
              <p>Upload File Picture</p>
            </template>
          </FileUpload>
          <span class="error-message">{{ errors.filepic }}</span>
        </div>
        <div class="input-content">
          <div class="input-box">
            <label for="province"> จังหวัด :</label>
            <Dropdown v-model="partner.province" :options="provincedropdown.value" optionLabel="name_th"
              optionValue="name_th" placeholder="เลือกจังหวัด" @change="getamphure('amphure')" />
            <span class="error-message">{{ errors.province }}</span>
          </div>
          <div class="input-box">
            <label for="amphure"> อำเภอ :</label>
            <Dropdown v-model="partner.amphure" :options="amphuredropdown.value" optionLabel="name_th"
              optionValue="name_th" placeholder="เลือกอำเภอ" @change="getamphure('tambon')" />
            <span class="error-message">{{ errors.amphure }}</span>
          </div>
          <div class="input-box">
            <label for="tambon"> ตำบล :</label>
            <Dropdown v-model="partner.tambon" :options="tambondropdown.value" optionLabel="name_th" optionValue="name_th"
              placeholder="เลือกตำบล" />
            <span class="error-message">{{ errors.tambon }}</span>
          </div>
        </div>

        <label for="address"> Address :</label>
        <InputText class="input-form" type="tel" v-model="partner.address" @input="validateField('address', 'partner')"
          placeholder="Address" />
        <span class="error-message">{{ errors.address }}</span>

        <div class="input-content ">
          <div class="input-box ">
            <label for="password">Password :</label>
            <InputText class="input-form" type="password" v-model="partner.password"
              @input="validateField('password', 'partner')" placeholder="password" />
            <span class="error-message">{{ errors.password }}</span>
          </div>

          <div class="input-box">
            <label for="confirmPassword">Confirm-Password :</label>
            <InputText class="input-form" type="password" v-model="partner.confirmPassword"
              @input="validateField('confirmPassword', 'partner')" placeholder="confirmPassword" />
            <span class="error-message">{{ errors.confirmPassword }}</span>
          </div>
        </div>
        <div class="flex justify-content-end">
          <Button label="Register" @click="register('partner')" severity="help" rounded />
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
export default {
  data() {

    const toast = useToast()
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

    const showSuccess = () => {
      toast.add({ severity: 'success', summary: 'ลงทะเบียนสำเร็จ', detail: 'ยินดีต้อนรับ', life: 3000 });
    }

    const showError = () => {
      toast.add({ severity: 'error', summary: 'ลงทะเบียนไม่สำเร็จ', detail: 'ข้อมูลไม่ถูกต้อง หรือ ครบถ้วน', life: 3000 });
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
        phone: "",
        idcard: "",
        filepic: null,
        address: "",
        tambon: "",
        amphure: "",
        province: "",
        password: "",
        confirmPassword: "",
      },
      errors: {},
      showModalPartner: false,
      showModalMember: false,
      showSuccess,
      showError
    };
  },
  // created() {
  //   this.loadProvinces();
  // },
  methods: {

    handleFileChange(event) {
      const input = this.$refs.fileinput;
      if (input.files && input.files.length > 0) {
        this.partner.filepic = input.files[0];
        this.validateField("filepic", "partner");
      }
    },
    async getamphure(type) {
      try {
        if (type === "amphure") {
          const selectedProvinceObject = this.provincedropdown.value.find(
            (province) => province.name_th === this.partner.province
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
            (amphure) => amphure.name_th === this.partner.amphure
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
      try {
        if (userType === "member") {
          await this.validateMemberForm();
          const productResponse = await axios.post(
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
          if (productResponse.data && productResponse.data) {
            console.log(productResponse, "success");
          } else {
            this.showError()
            console.error("Data is missing in the API response.");
          }
        } else if (userType === "partner") {
          await this.validatePartnerForm();
          const productResponse = await axios.post(
            `${process.env.VUE_APP_API}signup/partner`,
            {
              telephone: this.partner.phone,
              password: this.partner.password,
              name: this.partner.name,
              idcard: this.partner.idcard,
              address: this.partner.address,
              tambon: this.partner.tambon,
              amphure: this.partner.amphure,
              province: this.partner.province,
              level: "1",
            }
          );
          if (productResponse.data.status === true) {
            console.log(productResponse.data);
            await this.uploadPicture(productResponse.data.data._id);
          } else {
            this.showError()
            console.error("Data is missing in the API response.");
          }
        }
        this.showSuccess()
        this.showModalPartner = false;
        this.showModalMember = false;

        await this.$router.push("/");
      } catch (error) {
        this.showError()
        console.error("Form validation failed:", error);
      }
    },

    //// uploadfile picture
    async uploadPicture(_id) {
      const formData = new FormData();
      formData.append("imgCollection", this.partner.filepic);
      try {
        const upfilePick = await axios.post(
          `${process.env.VUE_APP_API}partner/picture/${_id}`,
          formData
        );

        if (upfilePick.data && upfilePick.data) {
          console.log(upfilePick.data, "success_Image");
        } else {
          console.error("Data is missing in the API response.");
        }
      } catch (error) {
        console.error("Error uploading picture:", error);
      }
    },

    ///// validation and yup form
    async validateMemberForm() {
      const MemberSchema = yup.object({
        name: yup.string().required(" Name is required."),
        fname: yup.string().required("First name is required."),
        lname: yup.string().required("Last Name is required."),
        email: yup
          .string()
          .email("Invalid email format.")
          .required("Email is required."),
        phone: yup.string()
          .required("Please Enter Phone Number")
          .matches(
            /^[0-9-]+$/,
            "Invalid phone number. Please enter a valid phone number."
          ),
        password: yup.string().required("Password is required."),
        confirmPassword: yup
          .string()
          .oneOf([yup.ref("password"), null], "Passwords must match.")
          .required("Confirm Password is required."),
      });
      await this.validateForm(MemberSchema, this.member);
    },
    async validatePartnerForm() {
      const PartnerSchema = yup.object({
        name: yup.string().required("Name is required."),
        phone: yup.string()
          .required("Please Enter Phone Number")
          .matches(
            /^[0-9-]+$/,
            "Invalid phone number. Please enter a valid phone number."
          ),
        idcard: yup.string().required("ID card is required")
          .matches(
            /^[0-9]{1}-[0-9]{4}-[0-9]{5}-[0-9]{2}-[0-9]{1}$/,
            "Invalid Id Card Number. Please enter a valid Id Card number."
          ),
        filepic: yup
          .mixed()
          .required("Please upload a file")
          .test("fileSize", "File size is too large", (value) => {
            return value && value.size <= 1024000; // 1 MB
          }),
        address: yup.string().required("Address is required."),
        tambon: yup.string().required("tambon is required."),
        amphure: yup.string().required("Amphure is required."),
        province: yup.string().required("Province is required."),
        password: yup.string().required("Password is required."),
        confirmPassword: yup
          .string()
          .oneOf([yup.ref("password"), null], "Passwords must match.")
          .required("Confirm Password is required."),
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
        if (fieldName === 'phone' && this[userType][fieldName]) {
          // this[userType][fieldName] = this[userType][fieldName].replace(/[^0-9]/g, ''); // Remove non-numeric characters
          this[userType][fieldName] = this[userType][fieldName].replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
        }
        if (fieldName === 'idcard' && this[userType][fieldName]) {
          // this[userType][fieldName] = this[userType][fieldName].replace(/[^0-9]/g, ''); // Remove non-numeric characters
          this[userType][fieldName] = this[userType][fieldName].replace(/(\d{1})(\d{4})(\d{5})(\d{2})(\d{1})/, '$1-$2-$3-$4-$5');
        }
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
        phone: "",
        idcard: "",
        filepic: null,
        address: "",
        tambon: "",
        amphure: "",
        province: "",
        password: "",
        confirmPassword: "",
      };
      // Clear errors
      this.errors = {};
    },

    /// closemodal
    close(userType) {
      this.resetForm();
      if (userType === 'partner') {
        this.showModalPartner = false;
      } else if (userType === 'member') {
        this.showModalMember = false;
      }
    },

  },
  watch: {
    showModalMember(newValue) {
      if (newValue === false) {
        this.close('member');
      }
    },
    showModalPartner(newValue) {
      if (!newValue) {
        this.close('partner');
      }
    }
  }
};
</script>

<style scoped>
.center-container {
  background-image: url("/public/images/hotel-room/Register_Page.png");
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
  display: flex;
  justify-content: space-between;
}

.input-box {
  display: grid;
  align-items: center;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
}

input {
  border: solid 1px #3b82f6;
  border-radius: 8px;
  width: 100%;
}

.register-text h1 {
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
    display: grid;
  }

  .register-text h1 {
    color: #fff;
    font-size: 4rem;
  }

  .input-box {
    display: grid;
    grid-template-columns: repeat(2, auto);
    justify-content: space-between;
  }
}

div:where(.swal2-container) {
  z-index: 9000;
}
</style>

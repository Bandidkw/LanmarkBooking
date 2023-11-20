<template>
  <div class="center-container">
    <div class="grid-cols-1">
      <div class="register-text">
        <h1>WELCOME</h1>
        <br />
        <h2 class="text-white flex justify-center mb-6">Register for ...</h2>
      </div>
      <div class="button_selection">
        <button
          @click="showModal('partner')"
          type="button"
          class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          For Partner
        </button>
        <button
          @click="showModal('member')"
          class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
        >
          <span
            class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"
          >
            For Member
          </span>
        </button>
      </div>
    </div>

    <div v-if="showModalMember" class="Modal-content">
      <div class="top-pop">
        <form  class="form-control">
          <div class="top-pop">
            <h1>สมัครสมาชิก</h1>
            <button
              @click="close"
              type="button"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 hover:rounded-full text-sm w-1 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="default-modal"
            >
              <svg
                class="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>

          <label for="fname">Name :</label>

          <input
            class="input-form"
            type="text"
            v-model="member.name"
            @input="validateField('name', 'member')"
            placeholder="name"
          />
          <span class="error-message">{{ errors.name }}</span>
          <div class="input-content">
            <div class="input-box">
              <label for="fname">First Name :</label>
              <input
                class="input-form"
                type="text"
                v-model="member.fname"
                @input="validateField('fname', 'member')"
                placeholder="First name"
              />
              <span class="error-message">{{ errors.fname }}</span>
            </div>
            <div class="input-box">
              <label for="lname">Last Name :</label>
              <input
                class="input-form"
                type="text"
                v-model="member.lname"
                @input="validateField('lname', 'member')"
                placeholder="Last name"
              />
              <span class="error-message">{{ errors.lname }}</span>
            </div>
          </div>

          <label for="email">E-mail</label>
          <input
            class="input-form"
            type="email"
            v-model="member.email"
            @input="validateField('email', 'member')"
            placeholder="Email"
          />
          <span class="error-message">{{ errors.email }}</span>

          <label for="phone"> Phone:</label>
          <input
            class="input-form"
            type="tel"
            v-model="member.phone"
            @input="validateField('phone', 'member')"
            placeholder="Phone number"
          />
          <span class="error-message">{{ errors.phone }}</span>

          <div class="input-content">
            <div class="input-box">
              <label for="password">Password :</label>
              <input
                class="input-form"
                type="password"
                v-model="member.password"
                @input="validateField('password', 'member')"
                placeholder="Password"
              />
              <span class="error-message">{{ errors.password }}</span>
            </div>
            <div class="input-box">
              <label for="confirmPassword">Confirm-Password :</label>

              <input
                class="input-form"
                type="password"
                v-model="member.confirmPassword"
                @input="validateField('confirmPassword', 'member')"
                placeholder="Confirm Password"
              />
              <span class="error-message">{{ errors.confirmPassword }}</span>
            </div>
          </div>

          <div class="">
            <button
              @click="register('member')"
              type="button"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Partner Modal -->

    <div v-if="showModalPartner" class="Modal-content">
      <div class="top-pop"></div>
      <form  class="form-control">
        <div class="top-pop">
          <h1>สมัครพาร์ทเนอร์</h1>
          <button
            @click="close"
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 hover:rounded-full text-sm w-1 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="default-modal"
          >
            <svg
              class="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>

        <label for="name">Name :</label>
        <input
          class="input-form"
          type="text"
          v-model="partner.name"
          @input="validateField('name', 'partner')"
          placeholder="name"
        />
        <span class="error-message">{{ errors.name }}</span>

        <label for="phone"> Phone :</label>
        <input
          class="input-form"
          type="tel"
          v-model="partner.phone"
          @input="validateField('phone', 'partner')"
          placeholder="Phone number"
        />
        <span class="error-message">{{ errors.phone }}</span>

        <label for="idcard"> ID CARD :</label>
        <input
          class="input-form"
          type="tel"
          v-model="partner.idcard"
          @input="validateField('idcard', 'partner')"
          placeholder="ID Card number"
        />
        <span class="error-message">{{ errors.idcard }}</span>

        <label for="filepic"> File Picture ID Card :</label>
        <input
          class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          id="fileinput"
          type="file"
          ref="fileinput"
          @change="handleFileChange"
          placeholder="File Picture number"
        />
        <span class="error-message">{{ errors.filepic }}</span>

        <div class="input-content">
          <div class="input-box">
            <label for="address"> Address :</label>
            <input
              class="input-form"
              type="tel"
              v-model="partner.address"
              @input="validateField('address', 'partner')"
              placeholder="Address"
            />
            <span class="error-message">{{ errors.address }}</span>
          </div>
          <div class="input-box">
            <label for="tumbon"> Tumbon :</label>
            <input
              class="input-form"
              type="tel"
              v-model="partner.tumbon"
              @input="validateField('tumbon', 'partner')"
              placeholder="Tumbon"
            />
            <span class="error-message">{{ errors.tumbon }}</span>
          </div>
        </div>
        <div class="input-content">
          <div class="input-box">
            <label for="amphure"> Amphure :</label>
            <input
              class="input-form"
              type="tel"
              v-model="partner.amphure"
              @input="validateField('amphure', 'partner')"
              placeholder="Amphure "
            />
            <span class="error-message">{{ errors.amphure }}</span>
          </div>

          <div class="input-box">
            <label for="province"> Province :</label>
            <input
              class="input-form"
              type="tel"
              v-model="partner.province"
              @input="validateField('province', 'partner')"
              placeholder="Province"
            />
            <span class="error-message">{{ errors.province }}</span>
          </div>
        </div>

        <div class="input-content">
          <div class="input-box">
            <label for="password">Password :</label>
            <input
              class="input-form"
              type="text"
              v-model="partner.password"
              @input="validateField('password', 'partner')"
              placeholder="password"
            />
            <span class="error-message">{{ errors.password }}</span>
          </div>

          <div class="input-box">
            <label for="confirmPassword">Confirm-Password :</label>
            <input
              class="input-form"
              type="text"
              v-model="partner.confirmPassword"
              @input="validateField('confirmPassword', 'partner')"
              placeholder="confirmPassword"
            />
            <span class="error-message">{{ errors.confirmPassword }}</span>
          </div>
        </div>
        <div class="">
          <button
            @click="register('partner')"
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            Register
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import * as yup from "yup";
import axios from "axios";

export default {
  data() {
    return {
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
        tumbon: "",
        amphure: "",
        province: "",
        password: "",
        confirmPassword: "",
      },
      errors: {},
      showModalPartner: false,
      showModalMember: false,
    };
  },
  methods: {
    handleFileChange(event) {
      const input = this.$refs.fileinput;
      if (input.files && input.files.length > 0) {
        this.partner.filepic = input.files[0];
        this.validateField("filepic", "partner");
      }
    },
    showModal(type) {
      if (type === "partner") {
        this.showModalPartner = true;
        this.showModalMember = false;
      } else if (type === "member") {
        this.showModalPartner = false;
        this.showModalMember = true;
      }
    },
    async register(userType) {
      try {
        if (userType === "member") {
          await this.validateMemberForm();
        } else if (userType === "partner") {
          await this.validatePartnerForm();
        }
        const productResponse = await axios.post(
          `${process.env.VUE_APP_API}signup/partner`,{
            telephone:this.partner.phone,
            password:this.partner.password,
            name : this.partner.name,
            idcard:this.partner.idcard,
            address:this.partner.address,
            tambon:this.partner.tumbon,
            amphure: this.partner.amphure,
            province:this.partner.province,
            level : "1"
          }
        );
        if (productResponse.data && productResponse.data) {
          item_product.value = productResponse.data;
          console.log(productResponse.data)
        } else {
          console.error("Data is missing in the API response.");
        }
        const upfilePick = await axios.post(
          `${process.env.VUE_APP_API}partner/picture/:id`,{
            filepic:this.partner.filepic,
          }
        );
        if (upfilePick.data && upfilePick.data) {
          item_product.value = upfilePick.data;
          console.log(upfilePick.data)
        } else {
          console.error("Data is missing in the API response.");
        }
      } catch (error) {
        console.error("Form validation failed:", error);
      }
    },
    async validateField(fieldName, userType) {
      // Validate a specific field in real-time
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
    async validateMemberForm() {
      const MemberSchema = yup.object({
        name: yup.string().required(" Name is required."),
        fname: yup.string().required("First name is required."),
        lname: yup.string().required("Last Name is required."),
        email: yup
          .string()
          .email("Invalid email format.")
          .required("Email is required."),
        phone: yup.string().required("Please Enter Phone Number"),
        password: yup.string().required("Password is required."),
        confirmPassword: yup
          .string()
          .oneOf([yup.ref("password"), null], "Passwords must match.")
          .required("Confirm Password is required."),
      });
      await this.validateForm(MemberSchema, this.member);
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
    async validatePartnerForm() {
      const PartnerSchema = yup.object({
        name: yup.string().required("Name is required."),
        phone: yup.string().required("Please Enter Phone Number."),
        idcard: yup.string().required("ID card  is required"),
        filepic: yup
          .mixed()
          .required("Please upload a file")
          .test("fileSize", "File size is too large", (value) => {
            return value && value.size <= 1024000; // 1 MB
          }),
        address: yup.string().required("Address is required."),
        tumbon: yup.string().required("Tumbon is required."),
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
        tumbon: "",
        amphure: "",
        province: "",
        password: "",
        confirmPassword: "",
      };
      // Clear errors
      this.errors = {};
    },
    close() {
      this.resetForm();
      if (this.showModalPartner) {
        this.showModalPartner = false;
      } else if (this.showModalMember) {
        this.showModalMember = false;
      }
    },
  },
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
  height: 75vh;
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

.Modal-content {
  cursor: default;
  width: 100%;
  max-width: 600px;
  background-color: rgb(255, 255, 255);
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -45%);
  padding: 1rem 2rem;
  z-index: 99;
}
label {
  font-size: 12px;
}
.input-content {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}
.input-box {
  display: grid;
  align-items: center;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
}
input {
  border: solid 1px purple;
  border-radius: 8px;
}
.register-text h1 {
  color: #fff;
  font-size: 5rem;
}

@media (max-width: 768px) {
  label {
    font-size: 10px;
  }
}
</style>

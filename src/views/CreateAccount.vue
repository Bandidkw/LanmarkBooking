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
        <form @submit.prevent="register" class="form-control">
          <div class="top-pop">
            <h1>สมัครสมาชิก</h1>
            <button
              @click="close"
              type="button"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-1 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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

          <label for="recommendedPhone">Recommended Phone</label>
          <input
            class="input-form"
            type="tel"
            v-model="member.recommendedPhone"
            @input="validateField('recommendedPhone', 'member')"
            placeholder="Recommended Phone number"
          />
          <span class="error-message">{{ errors.recommendedPhone }}</span>

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
      <form @submit.prevent="register('partner')" class="form-control">
        <div class="top-pop">
          <h1>สมัครพาร์ทเนอร์</h1>
          <button
            @click="close"
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-1 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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

        <label for="companyName">Company-Name :</label>
        <input
          class="input-form"
          type="text"
          v-model="partner.companyName"
          @input="validateField('companyName', 'partner')"
          placeholder="CompanyName"
        />
        <span class="error-message">{{ errors.companyName }}</span>

        <label for="password">Password :</label>
        <input
          class="input-form"
          type="text"
          v-model="partner.password"
          @input="validateField('password', 'partner')"
          placeholder="password"
        />
        <span class="error-message">{{ errors.password }}</span>

        <label for="confirmPassword">Confirm-Password :</label>
        <input
          class="input-form"
          type="text"
          v-model="partner.confirmPassword"
          @input="validateField('confirmPassword', 'partner')"
          placeholder="confirmPassword"
        />
        <span class="error-message">{{ errors.confirmPassword }}</span>

        <div class="">
          <button
            @click="register('partner')"
            type="button"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import * as yup from "yup";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      member: {
        name: "",
        fname: "",
        lname: "",
        email: "",
        phone: "",
        recommendedPhone: "",
        password: "",
        confirmPassword: "",
      },
      partner: {
        name: "",
        phone: "",
        password: "",
        confirmPassword: "",
        companyName: "",
      },
      errors: {},
      showModalPartner: false,
      showModalMember: false,
    };
  },
  methods: {
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
          try{
            const res = await axios.post(`${process.env.VUE_APP_API}signup/member`, {
            telephone: this.member.phone,
            password:this.member.password ,
            name:this.member.name,
            firstname:this.member.firstname,
            lastname:this.member.lastname,
            email:this.member.email,
            telephone_inviter:this.member.recommendedPhone,
            roles:"member"
          },{
            headers: {
              token: localStorage.getItem("token"),
            },
          });
          if (res.data) {
            Swal.fire({
            icon: "success",
            title: "สมัครสมาชิกmemberสำเร็จ",
            text: "สมัครสมาชิกmemberสำเร็จ",
          });
          this.$router.push("/");
          } else {
            await Swal.fire({
              icon: "error",
              title: "เกิดข้อผิดพลาด",
              text: "ไม่สามารถลบข้อมูลได้",
          });
          }
          }catch (error){
            await Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาด",
            text: "ไม่สามารถลบข้อมูลได้8+",
          });
          }
          
        } else if (userType === "partner") {

          await this.validatePartnerForm();
          try{
            const res = await axios.post(`${process.env.VUE_APP_API}signup/partner`, {
            telephone: this.partner.phone,
            password:this.partner.password ,
            name:this.partner.name,
            companyname:this.partner.companyName,
            level:1
          },{
            headers: {
              token: localStorage.getItem("token"),
            },
          });
          if (res.data) {
            Swal.fire({
            icon: "success",
            title: "สมัครสมาชิกpartnerสำเร็จ",
            text: "สมัครสมาชิกpartnerสำเร็จ กรุณารอadmin อนุมัติไอดี partner",
          });
          this.$router.push("/");
          } else {
            await Swal.fire({
              icon: "error",
              title: "เกิดข้อผิดพลาด",
              text: "ไม่สามารถลบข้อมูลได้",
          });
          }
          }catch (error){
            await Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาด",
            text: "ไม่สามารถลบข้อมูลได้8+",
          });
          }
        }
        console.log("Form submitted successfully!");
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
        recommendedPhone: yup.string().required(),
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
        companyName: yup.string().required("Company Name is required."),
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
        recommendedPhone: "",
        password: "",
        confirmPassword: "",
      };
      this.partner = {
        name: "",
        phone: "",
        password: "",
        confirmPassword: "",
        companyName: "",
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
  width: 60%;
  max-width: 600px;
  background-color: rgb(255, 255, 255);
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 1rem 2rem;
  z-index: 9999;
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

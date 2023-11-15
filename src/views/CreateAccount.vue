<template>
    <div class="login-popup">
      <div class="popup-content">
        <div class="top-pop">
          <h1>Sign up</h1>
          <i class="bi bi-x close-btn" @click="close"></i>
        </div>
        <form @submit.prevent="register" class="form-control">
          <div class="input-content">
            <div class="input-box">
              <label for="username">Username :</label>
              <input
                class="input-form"
                type="text"
                v-model="value.username"
                @input="validateField('username')"
                placeholder="Username"
              />
              <span class="error-message">{{ errors.username }}</span>
            </div>
            <div class="input-box">
              <label for="lastname">Lastname :</label>
              <input
                class="input-form"
                type="text"
                v-model="value.lastname"
                @input="validateField('lastname')"
                placeholder="Last name"
              />
              <span class="error-message">{{ errors.lastname }}</span>
            </div>
          </div>
  
          <label for="email">Email</label>
          <input
            class="input-form"
            type="email"
            v-model="value.email"
            @input="validateField('email')"
            placeholder="Email"
          />
          <span class="error-message">{{ errors.email }}</span>
  
          <label for="recommendedPhone"> Phone</label>
          <input
            class="input-form"
            type="tel"
            v-model="value.Phone"
            @input="validateField('Phone')"
            placeholder="Phone number"
          />
          <span class="error-message">{{ errors.Phone }}</span>
  
          <label for="recommendedPhone">Recommended Phone</label>
          <input
            class="input-form"
            type="tel"
            v-model="value.recommendedPhone"
            @input="validateField('recommendedPhone')"
            placeholder="Recommended Phone number"
          />
          <span class="error-message">{{ errors.recommendedPhone }}</span>
  
          <div class="input-content">
            <div class="input-box">
              <label for="registrationPassword">Password :</label>
              <input
                class="input-form"
                type="password"
                v-model="value.registrationPassword"
                @input="validateField('registrationPassword')"
                placeholder="Password"
              />
              <span class="error-message">{{ errors.registrationPassword }}</span>
            </div>
            <div class="input-box">
              <label for="confirmPassword">Confirm-Password :</label>
  
              <input
                class="input-form"
                type="password"
                v-model="value.confirmPassword"
                @input="validateField('confirmPassword')"
                placeholder="Confirm Password"
              />
              <span class="error-message">{{ errors.confirmPassword }}</span>
            </div>
          </div>
  
          <div class="button-con">
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import * as yup from "yup";
  
  export default {
    data() {
      return {
        value: {
          username: "",
          lastname: "",
          email: "",
          phone: "",
          recommendedPhone: "",
          registrationPassword: "",
          confirmPassword: "",
        },
        errors: {},
      };
    },
    methods: {
      async register() {
        try {
          await this.validateForm();
          console.log("Form submitted successfully!");
        } catch (error) {
          console.error("Form validation failed:", error);
        }
      },
      async validateField(fieldName) {
        // Validate a specific field in real-time
        const schema = yup.object({
          [fieldName]: yup.string().required(`${fieldName} is required.`),
        });
  
        try {
          await schema.validateAt(fieldName, this.value);
          this.errors[fieldName] = null;
        } catch (error) {
          if (error instanceof yup.ValidationError) {
            this.errors[fieldName] = error.message;
          }
        }
      },
      async validateForm() {
        const schema = yup.object({
          username: yup.string().required("Username is required."),
          lastname: yup.string().required("Last Name is required."),
          email: yup
            .string()
            .email("Invalid email format.")
            .required("Email is required."),
          Phone: yup.string().required("Please Enter Phone Number"),
          recommendedPhone: yup.string().required(),
          registrationPassword: yup.string().required("Password is required."),
          confirmPassword: yup
            .string()
            .oneOf(
              [yup.ref("registrationPassword"), null],
              "Passwords must match"
            )
            .required("Confirm Password is required."),
        });
  
        try {
          await schema.validate(this.value, { abortEarly: false });
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
      resetForm() {
        this.value = {
          username: "",
          lastname: "",
          email: "",
          phone: "",
          recommendedPhone: "",
          registrationPassword: "",
          confirmPassword: "",
        };
        // Clear errors
        this.errors = {};
      },
      close() {
        this.resetForm();
        this.$emit("close");
      },
    },
  };
  </script>
  
  <style scoped>
  .login-box {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 0.5rem;
    width: 5rem;
    height: 3rem;
    /* padding: 0.5rem; */
    background-color: #c7c7c7;
    border-radius: 25px;
  }
  
  .popup-content {
    cursor: default;
    width: 45%;
    height: 38rem;
    top: 50%;
    left: 50%;
    box-shadow: 0 5px 5px rgb(0, 0, 0, 0.5);
    transform: translate(0, 0);
    padding: 1rem 3rem;
    border-radius: 8px;
    z-index: 9999;
  }
  .popup-content i {
    display: flex;
    justify-content: flex-end;
  }
  .form-control {
    cursor: default;
    text-align: left;
    display: flex;
    flex-direction: column;
    padding-top: 1.5rem;
    row-gap: 0.5rem;
  }
  .text-form {
    cursor: default;
    font-size: 1.1rem;
  }
  .input-form {
    font-weight: 400;
    width: 100%;
    height: 2rem;
    padding: 1rem;
  }
  .error-message {
    font-size: 10px;
    color: red;
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
  
  @media only screen and (max-width: 1024px) {
    .popup-content {
      cursor: default;
      width: 50%;
      height: 50rem;
      top: 50%;
      left: 50%;
      box-shadow: 0 5px 5px rgb(0, 0, 0, 0.5);
      transform: translate(-50%, -50%);
      padding: 1rem 3rem;
      border-radius: 8px;
      z-index: 9999;
    }
    .input-content {
      display: grid;
      grid-template-rows: repeat(2, 1fr);
    }
    .input-box {
      align-items: center;
      gap: 0.5rem;
    }
  }
  </style>
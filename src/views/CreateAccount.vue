<template>
    <div class="login-popup">
     
    </div>
  </template>
  
  <script>

  
  export default {
    data() {
      return {
        value: {},
        errors: {},
      };
    },
    methods: {   
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
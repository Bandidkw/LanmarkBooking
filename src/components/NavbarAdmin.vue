<!-- Navbar.vue -->
<template>
    <nav class="nav-bar">
      <router-link to="/" class="topweb-left">
        <img src="/logo/lanmark-logo-navbar.png" alt="">
      </router-link>
      <div class="topweb-right">
        <div>
            admin
        </div>
      </div>
    </nav>
  </template>
  
  <script>
  
  </script>
  
  
    
  
  <!---------------------------- style -------------------------------->
  
  <style lang="scss">
  
  // @import '@/assets/scss/custom/_navbar.scss';
  
  .nav-bar {
  
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .topweb-left img {
    width: 100%;
    height: 3rem;
  }
  
  .topweb-right {
    display: flex;
    align-items: center;
    column-gap: 1rem;
  }
  
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
  
  .login-box .log-icon:active {
    background-color: #00bbf9;
    box-shadow: 0 3px #666;
    transform: translateY(1px);
  }
  
  .login-box button {
    cursor: pointer;
    /* background-color: #000; */
    width: 2.5rem;
    height: 2.5rem;
    border: none;
    border-radius: 50%;
    padding: 0.2rem;
  }
  
  .login-box i {
    color: #000;
    font-size: 1.5rem;
  }
  
  /*------------------------------- LoginPopup ----------------------------*/
  
  .top-pop {
    display: flex;
    justify-content: space-between;
  }
  
  .top-pop h1 {
    font-size: 2rem;
  }
  
  .login-popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .popup-content {
    cursor: default;
    width: 30%;
    height: 25rem;
    background-color: #fff;
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
  
  .button-con {
    row-gap: 1rem;
    display: flex;
    flex-direction: column;
  }
  
  .button-con input[type="checkbox"] {
    margin-right: 5px;
  }
  
  .button-con button {
    border-radius: 1rem;
    width: 5rem;
  }
  
  .close-btn {
    cursor: pointer;
  }
  
  .show-pass {
    display: flex;
    align-items: center;
  }
  
  .show-pass input,
  label {
    cursor: pointer;
  }</style>
    
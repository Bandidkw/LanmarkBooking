<template>
    <div class="regis-title">
      <div class="bg-img"></div>
      <div class="regis-info">
        <h2>สมัครสมาชิก</h2>
        <form class="form-con" action="">
          <div class="form-info">
            <div class="form-group-1">
              <label for="f-name">ชื่อ</label>
              <input type="text">
            </div>
            <div class="form-group-2">
              <label for="l-name">นามสกุล</label>
            <input type="text">
            </div>
          </div>
          <div class="form-email">
            <label for="email">อีเมลล์</label>
            <input type="text">
          </div>
          <div class="form-phonenumber">
            <label for="number-phone">เบอร์โทรศัพท์</label>
            <input type="number">
          </div>
          <div class="form-co">
            <label for="number-co">เบอร์โทรศัพท์(ผู้แนะนำ)</label>
            <input type="number">
          </div>
          <div class="form-pw">

          </div>
        </form>
      </div>
      <button>สร้าง</button>
      <!-- Add registration form here -->
    </div>
  </template>
  
  <script>
  export default {
    name: "RegisterPage",
  }
  </script>
  
  <style scoped>
  /* Add your registration page styles here */
  .regis-title{
    max-width: 500px;
    width: 400px;
    border-radius: 20px;
    color: #fff;
    background: rgba(0,0,0, 0.3);
    padding: 1rem;
    display: flex;
    flex-direction: column;
  }
  .regis-title button{
    border: none;
    height: 2rem;
    color: #fff;
    background-color: #f15bb5;
    border: #fff 1px solid;
    font-size: 1rem;
    transition: 0.4s;
  }
  .regis-title input:focus{
  box-sizing: border-box;
  border: #f15bb5 1px solid;
  background-color: lightblue;
}
.regis-info{
  font-size: 0.8rem;
}
.form-info{
  justify-content: space-between;
  display: flex;
}
.form-group-1{
  display: flex;
  flex-direction: column;
}
.form-group-1,.form-group-2{
  width: 45%;
}
.form-email, .form-phonenumber,.form-co{
  display: flex;
  flex-direction: column;
}
.form-group-2{
  display: flex;
  flex-direction: column;
}
  .form-con{
    display: flex;
    flex-direction: column;
  }
  .form-con input{
    border-radius: 5px;
    border: none;
    outline: none;
    margin: 0.5rem 0;
    padding: 10px;
    height: 2rem;
  }
  input[type=number]::-webkit-inner-spin-button, 
  input[type=number]::-webkit-outer-spin-button { 
  -webkit-appearance: none; 
}
  </style>
  
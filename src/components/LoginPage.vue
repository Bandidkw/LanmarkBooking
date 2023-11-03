<template>
    <div class="login-title">
      <div class="bg-img"></div>
      <div class="login-info">
        <h2>เข้าสู่ระบบ</h2>
        <form class="form-con" action="">
          <label for="number-email">เบอร์โทรศัพท์หรืออีเมลล์</label>
          <input type="text">
          <label for="password-login">รหัสผ่าน</label>
          <input type="password">
        </form>
      </div>
      <button>เข้าสู่ระบบ</button>
      <!-- Add login form here -->
    </div>
  </template>
  
  <script>
  export default {
    name: "LoginPage",
  };
  </script>

  <style scoped>
  /* Add your login page styles here */

.login-title{
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
  border-radius: 25px;
  text-align: center;
  width: 30rem;
  height: 500px;
  background: rgba(0,0,0, 0.3);
  min-height: calc(100vh - 350px);
  -webkit-box-shadow: 0px 0px 17px 5px rgba(223, 0, 186, 0.37);
  -moz-box-shadow: 0px 0px 317px 5px rgba(223, 0, 186, 0.37);
  box-shadow: 0px 0px 17px 5px rgba(223, 0, 186, 0.37);
}
.bg-img{
  border-radius: 30px 30px 0 0;
  width: 100%;
  height: 30%;
  background: rgba(0,0,0, 0.1);
}
.login-info{
  width: 80%;
  padding: 2rem 2rem;
  margin: 1rem 0;
}
.login-info input{
  outline: none;
  border-radius: 5px;
  border: none;
  padding: 10px;
  height: 2rem;
  width: 100%;
}
.login-info form{
  font-size: 1rem;
  text-align: left;
  margin: 0.5rem 0;
}
.login-info label{
  margin: 0.5rem 0;
}
.login-title button{
  border-radius: 10px;
  width: 7rem;
  height: 2.5rem;
  color: #fff;
  background-color: #f15bb5;
  border: #fff 1px solid;
  font-size: 1rem;
  transition: 0.4s;
}
.login-title button:hover{
  transform: scale(1.1);
}
.form-con input:focus{
  box-sizing: border-box;
  border: #f15bb5 1px solid;
  background-color: lightblue;
}
.forget-pass{
  border-radius: 0 0 20px 20px;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  width: 100%;
  height: 10%;
  background: rgba(0,0,0, 0.3);
  align-content: start;
  padding: 1rem;
  display: flex;
}
.forget-pass p{
  margin: 0 10px 0 0;
}
  </style>
  
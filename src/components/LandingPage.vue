<template>
    <div class="container">
      <div class="title">
            <h2 class="card-title mb-3">เป็นพาร์ทเนอร์กับเรา</h2>
            <h1>พร้อมกับรับสิทธิพิเศษมากมาย</h1>
            <button type="primary" class="btn btn-primary mt-3" @click="Register">สมัครสมาชิก</button>
          </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "LandingPage",
    methods:{
            Register(){
            this.$router.push('/register');
      }
    }
  };
  </script>
  
  /* Add your landing page styles here */

  <style scoped>
  /*---------- reset ค่าเริ่มต้นของ html ----------*/
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-decoration: none;
    list-style-type: none;
  }
  /*---------- ขนาดของการ์ด ----------*/
  .title {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;
    border-radius: 25px;
    text-align: center;
    padding: 10rem 2rem;
    max-width: 600px;
    height: 500px;
    min-height: calc(100vh - 350px);
    background-color: #000;
    background: rgba(0,0,0, 0.3);
    width: auto;
    width: 100%;
    -webkit-box-shadow: 0px 0px 17px 5px rgba(223, 0, 186, 0.37);
    -moz-box-shadow: 0px 0px 317px 5px rgba(223, 0, 186, 0.37);
    box-shadow: 0px 0px 17px 5px rgba(223, 0, 186, 0.37);
    }
    .title h1{
      margin-bottom: 3rem;
    }
    /*----------- ปุ่มสมัครสมาชิก -----------*/ 
    .btn{
      padding: 5px;
      font-size: 1rem;
      width: 7.5rem;
      height: 2.5rem;
      border: #fff 1px solid;
      background: rgba(0,0,0, 0.5);
      transition: 0.4s;
    }
    .btn:hover{
      color: #fff;
      background-color: #f15bb5;
      transform: scale(1.1);
    }
  </style>
  
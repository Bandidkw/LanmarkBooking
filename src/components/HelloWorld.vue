<template>
  <div class="container">
    <div class="body-container">
      
<!---------------- top-web ---------------->

      <div class="top-web">
        <nav class="navbar">
      <a href="">NBA BOOKING</a>
      <button>Login</button>
    </nav>
      </div>

<!---------------- content ---------------->

    <div class="content">
      <div class="info">
        <h3>เป็นพาร์ทเนอร์กับเรา</h3>
        <h2>พร้อมกับรับสิทธิพิเศษ</h2>
        <div class="regis-btn">
        <button>สมัครสมาชิก</button>
      </div>

<!---------------- hotel-logo ---------------->

      <div class="hotel-logo">
        <div class="hotel-box">
          <img src="./hotel-logo/1.jpg" alt="">
        </div>
        <div class="hotel-box">
          <img src="./hotel-logo/2.jpg" alt="">
        </div>
        <div class="hotel-box">
          <img src="./hotel-logo/3.jpg" alt="">
        </div>
        <div class="hotel-box">
          <img src="./hotel-logo/4.jpg" alt="">
        </div>
        <div class="hotel-box">
          <img src="./hotel-logo/5.png" alt="">
        </div>
        <div class="hotel-box">
          <img src="./hotel-logo/6.jpg" alt="">
        </div>
        <div class="hotel-box">
          <img src="./hotel-logo/7.jpg" alt="">
        </div>
        <div class="hotel-box">
          <img src="./hotel-logo/8.png" alt="">
        </div>
        <div class="hotel-box">
          <img src="./hotel-logo/9.jpg" alt="">
        </div>
        <div class="hotel-box">
          <img src="./hotel-logo/10.png" alt="">
        </div>
        <div class="hotel-box">
          <img src="./hotel-logo/11.png" alt="">
        </div>
        <div class="hotel-box">
          <img src="./hotel-logo/12.png" alt="">
        </div>
      </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*---------------- top-web ----------------*/
.container{
  width: 100%;
  display: block;
  align-items: center;
  background-image: url("img/bg-img.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  overflow: hidden;
  min-height: 100vh;
}
.top-web{
  position: fixed;
  top: 0;
  left: 0;
  display: flex;  width: 100%;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  padding: 0 5%;
  backdrop-filter: blur(5px);
  box-shadow: 0 1px 20px 1px lightblue;
}
.top-web a{
  font-size: 1.5rem;
  color: #fff;
}
.top-web button{
  background-color: #b5179e;
  color: #fff;
  cursor: pointer;
  width: 7.5rem;
  font-size: 1.1rem;
  height: 2.5rem;
  border: none;
  border-radius: 10px;
  transition: transform .2s;
}
.top-web button:hover{
  transform: scale(1.1);
}
.navbar{
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
/*---------------- content ----------------*/
.content{
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 190px);
}
.body-container{
  overflow: hidden;
  min-height: 100vh;
}
.info{
  width: 100%;
  max-width: 700px;
  min-height: calc(100vh - 350px);
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  border-radius: 20px;
  background: rgba(0,0,0, 0.4);
}
.info h3{
  color: #fff;
  font-size: 2rem;
  font-weight: normal;
  margin-bottom: 1rem;
}
.info h2{
  color: #fff;
  font-size: 2.5rem;
  margin-bottom: 5rem;
}
.regis-btn button{
  background-color: rgba(0,0,0, 0.4);
  color: #fff;
  border: #fff 1px solid;
  border-radius: 10px;
  width: 9.5rem;
  height: 2.8rem;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.2s;
}
/*---------------- hotel ----------------*/
.hotel-logo{
  margin-top: 5rem;
  color: #fff;
  display: flex;
  padding: 0 5%;
  width: 100%;
  height: 70px;
}
.hotel-logo img{
  background:#fff;
  width: 100%;
}
.hotel-box{
  padding: 3px;
  width: 90px;
}
.hotel-box img{
  border-radius: 10px;
  width: 100%;
  height: 100%;
}
.regis-btn button:hover{
  background-color: #b5179e;
  transform: scale(1.1);
}
</style>
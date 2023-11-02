<template>
  <div class="container">
    <div class="body-container">
      
<!---------------- top-web ---------------->

      <div class="top-web">
        <nav class="navbar">
      <a href="#">NBA BOOKING</a>
      <button @click="say('แจ้งเตือนเข้าสู่ระบบ')">เข้าสู่ระบบ</button>
    </nav>
      </div>

<!-------------- content -------------->

    <div class="content">
      <div class="info">
        <h3>เป็นพาร์ทเนอร์กับเรา</h3>
        <h2>พร้อมกับรับสิทธิพิเศษ</h2>
        <div class="regis-btn">
        <button>สมัครสมาชิก</button>
      </div>

<!---------------- hotel-logo ---------------->

      <div class="col">
        <div class="row align-item-center">
          <div class="col-2 col-md col-lg-1 justify-content-center" v-for="(item,index) in url" :key="index">
          <img class="partner-logo" :src="item.url">
        </div>
        </div>
      </div>
      </div>
    </div>
    </div>
  </div>
</template>

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
  font-weight: 700;
  color: #fff;
}
.top-web button{
  background-color: #b5179e;
  color: #fff;
  cursor: pointer;
  width: 7.5rem;
  font-size: 1rem;
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
  max-width: 750px;
  min-height: calc(100vh - 350px);
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  border-radius: 20px;
  background: rgba(0,0,0, 0.5);
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
.col{
  margin-top: 5rem ;
  padding: 0.5rem 1.5rem 0 1.5rem;
  display: flex;
  align-items:center;
}
.col-2{
  width: 3.4rem;
  display: flex;
}
.row{
  column-gap: 5px;
  display: flex;
}
.partner-logo{
  border-radius: 15px;
  background-color: #fff;
  width: 100%;
  margin: 1rem 0;
}
.regis-btn button:hover{
  background-color: #b5179e;
  transform: scale(1.1);
}
</style>

<!---------------- Script-Section ---------------->

<script >
  export default{
    name:'app',
    data() {
        return {
            url: [
                {
                    id: 2,
                    url: '/hotel-logo/1.jpg'
                },
                {
                    id: 3,
                    url: '/hotel-logo/2.jpg'
                },
                {
                    id: 4,
                    url: '/hotel-logo/3.jpg'
                },
                {
                    id: 5,
                    url: '/hotel-logo/4.jpg'
                },
                {
                    id: 6,
                    url: '/hotel-logo/5.png'
                },
                {
                    id: 7,
                    url: '/hotel-logo/6.jpg'
                },
                {
                    id: 8,
                    url: '/hotel-logo/7.jpg'
                },
                {
                    id: 9,
                    url: '/hotel-logo/8.png'
                },
                {
                    id: 10,
                    url: '/hotel-logo/9.jpg'
                },
                {
                    id: 11,
                    url: '/hotel-logo/10.png'
                },
                {
                    id: 12,
                    url: '/hotel-logo/11.png'
                },
                {
                    id: 13,
                    url: '/hotel-logo/12.png'
                },
               
            ]
        }
    }
  }
</script>
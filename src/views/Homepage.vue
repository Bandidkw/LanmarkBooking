<!-- Content.vue -->
<template>
  <div class="invitatain">
    <!------------------------------- choose-room ------------------------>
    <div class="choose-room justify-center">
          <div class="room">
              <i class="bi bi-house-door"></i>
              <a @click="createAccount">อพาร์ทเม้นท์</a>
          </div>
          <div class="room">
              <i class="bi bi-house"></i>
              <a @click="createAccount">ห้องพักทั่วไป</a>
          </div>
          <div class="room">
              <i class="bi bi-building"></i>
              <a @click="createAccount">คอนโด</a>
          </div>
          <div class="room">
              <i class="bi bi-tsunami"></i>
              <a @click="createAccount">ริมทะเล</a>
          </div>
          <div class="room">
              <i class="bi bi-tree"></i>
              <a @click="createAccount">ป่า-เขา</a>
          </div>
          <div class="room">
              <i class="bi bi-brightness-alt-high"></i>
              <a @click="createAccount">เกาะ</a>
          </div>
          <div class="room">
              <i class="bi bi-houses"></i>
              <a @click="createAccount">คฤหาสน์</a>
          </div>
<!----------------------------------------- Filter-box ------------------------------->
          <div class="filter">
            <div class="filter-btn" @click="showFilter">
              <i class="bi bi-sliders"></i>
              <span>ตัวกรอง</span>
            </div>
            <div class="filter-popup" v-if="isFilterVisible" @click.stop>
              <div class="top-filter">
                <h2>ประเภทที่พัก</h2>
                <button class="btn btn-info" @click="closeFilter"><i class="bi bi-x"></i></button>
              </div>
              <label for="category">ประเภท</label>
            <select class="form-select form-select-lg mb-3" id="category" v-model="selectedCategory">
            <option value="apartment">อพาร์ทเม้นท์</option>
            <option value="
general-room">ห้องพักทั่วไป</option>
            <option value="condo">คอนโด</option>
            <option value="seaside">ริมทะเล</option>
            <option value="mountain forest">ป่า-เขา</option>
            <option value="island">เกาะ</option>
            <option value="mansion">คฤหาสน์</option>
            <!-- เพิ่มประเภทเพิ่มเติมตามที่คุณต้องการ -->
            </select>

        <!-- ช่องเลือกราคา -->
        <label for="price">ช่วงราคา</label>
        <select id="price" v-model="selectedPriceRange">
        <option value="0-300">0 - 300 บาท</option>
        <option value="300-500">300 - 500 บาท</option>
        <option value="500-1000">500 - 1000 บาท</option>
        <!-- เพิ่มช่วงราคาเพิ่มเติมตามที่คุณต้องการ -->
        </select>

        <!-- ช่องเลือกจำนวน -->
        <label for="quantity">จำนวนเข้าพัก</label>
        <input type="number" id="quantity" v-model="selectedQuantity" min="1">
      </div>
    </div>
  </div>
<!-------------------------- popular-section --------------------------->
        <div class="poppular-box">
          <div class="poppular-info">
            <h3>POPULAR</h3>
            <i class="bi bi-award-fill text-warning p-0 text-orange-400"></i>
          </div>
          <PopularSection/>
      </div>
  </div>
</template>

<script>

import PopularSection from '@/views/section/PopularSection.vue'

export default {
  components:{
    PopularSection,
    },
  name: 'HomepageMain',
  data(){
      return{
        isFilterVisible:false,
        selectedCategory:'',
        priceRange: [0, 100],
        selectedQuantity: '',
      };
    },
    methods:{
      showFilter() {
    this.isFilterVisible = true;
  },
    closeFilter() {
    this.isFilterVisible = false;
    this.selectedCategory = '';
    this.selectedPriceRange = '';
    this.selectedQuantity = '';
  },
    }
};
</script>

<style scoped>
.invitatain{
  width: 100%;
  padding: 2rem 5rem;
  display: flex;
  flex-direction: column;
}
.title-info{
  display: flex;
  width: 100%;
  height: 2.5rem;
  justify-content: center;
}

/*------------------------- search-box-style -------------------------*/
.search-box-cus{
  width: 30%;
  height: 100%;
}
.input-group{
  display: flex;
  height: 100%;
}
.search{
  height: 100%;
  width: 80%;
}
.search input{
  border-radius: 25px 0 0 25px;
}
.input-group-append{
  border: #00bbf9 1px solid;
  border-radius: 0 25px 25px 0;
  width: 20%;
}
.input-group-append button{
  border-radius: 0 25px 25px 0;
}
.input-group button{
  border: none;
  width: 100%;
  height: 100%;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
}
.search input{
  /* border: none; */
  border: #00bbf9 1px solid;
  width: 100%;
  height: 100%;
  padding: 1rem;
  transition: all 0.2s ease-in-out;
}
/*---------------------------- hover % focus -------------------------------*/
.input-group-append button:hover{
  background-color: #00bbf9 ;
  border-radius: 0 25px 25px 0;
}
.search input[type=text]:focus{
  border-radius: 25px 0 0 25px;
  outline: none;
  background-color: #7cd7f5;
}


/*---------------------------- choose-style ------------------------*/
.choose-room{
  margin-top: 1rem;
  padding: 10px;
  display: flex;
  align-items: center;
  column-gap: 2rem;
}
.room{
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1rem;
}
.room i{
  font-size: 1.2rem;
}
.room a,i{
  color: #252525;
  transition:all 0.2s ease-in-out;
}
.room:hover{
  text-shadow: 0px 0px 5px #5dd6ff;
  color: #6b6b6b;
  text-decoration: underline;
}
.filter{
  cursor: default;
  border: #707070 1px solid;
  padding: 8px;
  border-radius: 0.5rem;
  column-gap: 5px;
  color: #707070;
  display:flex;
  transition: all 0.2s ease-in-out;
}
.filter a,i{
  font-size: 1rem;
  color: #252525;
}
/* .filter:hover{
  background-color: #5dd6ff;
} */

/*-------------------------------- filter-popup ----------------------*/


.filter-btn{
cursor: pointer;
}
.filter-popup {
display: flex;
flex-direction: column;
z-index: 9999;
position: fixed;
width: 50%;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
padding: 20px;
background-color: #fff;
box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}
.filter-popup button{
cursor: pointer;
}
.top-filter{
display: flex;
justify-content: space-between;
}
/*---------------------------- popular-style ----------------------*/
.poppular-box{
position: relative;
z-index: 0;
}
.poppular-box h3{
margin: 0;
font-size: 1.5rem;
}
.poppular-info{
align-items: center;
column-gap: 0.5rem;
display: flex;
}
.poppular-info i{
font-size: 1.5rem;
/* color: #ffb703; */
}
.content{
  width: 100%;
}
p{
  color:var(--gray-800);
  font-weight: 400;
}
.grid-img{
  position: relative;
  width: 100%;
  height: 70%;
}
.grid-img img{
  position: relative;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}
.hotel-logo{
  border-radius: 1rem;
}
.img-promo{
  display: grid;
  grid-column-gap: 1rem;
  grid-template-columns: repeat(6,1fr);
  grid-template-rows: repeat(1,300px);
}
.img-promo .hidden{
  cursor: pointer;
  color: #cccccc;
  position: absolute;
  font-size: 1.8rem;
  top: 30%;
  right: 10%;
  transform: translate(50%,50%);
  transition: all 0.2s ease-in-out;
}
.img-promo i:hover{
  color: #fff;
}
.img-promo img{
  width: 100%;
  height: 100%;
}
.promo-details h4,p{
  color: #000;
  margin: 0;
  padding: 0;
}
.hidden{
  transition: .5s ease;
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 15%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;
}
.grid-img:hover .hidden{
  opacity: 1;
}
@media screen and (max-width:768px) {
.search-box-cus{
  display: none;
}
.room a{
  display: none;
}

}
</style>
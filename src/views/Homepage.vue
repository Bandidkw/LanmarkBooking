<!-- Content.vue -->
<template>
  <div class="invitatain lg:py-0 lg:px-2 sm:px-1">
    <!------------------------------- choose-room ------------------------>
    <div class="choose-room">
      <div class="room">
        <i class="bi bi-house-door"></i>
        <a @click="createaccount">อพาร์ทเม้นท์</a>
      </div>
      <div class="room">
        <i class="bi bi-house"></i>
        <a @click="createaccount">ห้องพักทั่วไป</a>
      </div>
      <div class="room">
        <i class="bi bi-building"></i>
        <a @click="createaccount">คอนโด</a>
      </div>
      <div class="room">
        <i class="bi bi-tsunami"></i>
        <a @click="createaccount">ริมทะเล</a>
      </div>
      <div class="room">
        <i class="bi bi-tree"></i>
        <a @click="createaccount">ป่า-เขา</a>
      </div>
      <div class="room">
        <i class="bi bi-brightness-alt-high"></i>
        <a @click="createaccount">เกาะ</a>
      </div>
      <div class="room">
        <i class="bi bi-houses"></i>
        <a @click="createaccount">คฤหาสน์</a>
      </div>
      <!----------------------------------------- Filter-box ------------------------------->
      <div class="filter cursor-pointer" @click="showFilter">
        <div class="filter-btn">
          <i class="bi bi-sliders"></i>
          <span>ตัวกรอง</span>
        </div>
        <div class="filter-popup" v-if="isFilterVisible" :class="{ 'open': isFilterVisible }" @click.stop>
          <div class="top-filter">
            <div>
              <h2>ประเภทที่พัก</h2>
            </div>
            <Button @click="closeFilter" icon="pi pi-times" severity="danger" text rounded aria-label="Cancel" />
          </div>
          <label class="py-2" for="category">ประเภท</label>
          <div class="card flex justify-content-start">
        <Dropdown v-model="selectedType" :options="roomtype" optionLabel="name" placeholder="เลือกประเภท" class="w-full" />
    </div>

          <!-- ช่องเลือกราคา -->
          <label class="py-2" for="price">ช่วงราคา</label>
          <div class="card flex justify-content-start">
        <Dropdown v-model="selectedPriceRange" :options="pricerange" optionLabel="name" placeholder="เลือกช่วงราคา" class="w-full" />
    </div>

          <label class="py-2" for="bed">ประเภทเตียง</label>
          <div class="card flex justify-content-start">
        <Dropdown v-model="selectedBed" :options="bedtype" optionLabel="name" placeholder="เลือกประเภทเตียง" class="w-full" />
        <!-- <div>{{ selectedBed }}</div> -->
    </div>
          <!-- ช่องเลือกจำนวน -->
          <label class="py-2" for="quantity">จำนวนเข้าพัก</label>
          <div class="card w-full flex justify-content-between">
            <span class="p-float-label">
              <InputNumber v-model="value" inputId="minmax-buttons" mode="decimal" showButtons :min="0" :max="100" />
        </span>
        <Button label="ค้นหา" severity="secondary"  />
    </div>
        </div>
      </div>
    </div>
    
    <!-------------------------- popular-section --------------------------->
    <div class="poppular-box">
      <PopularSection />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import PopularSection from "@/views/section/PopularSection.vue";

export default {
  components: {
    PopularSection,
  },
  name: "HomepageMain",
  data() {
    const selectedType = ref();
    const roomtype = ref([
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
]);
    const selectedPriceRange = ref();
    const pricerange = ref([
    { name: '0-500', code: '' },
    { name: '501-1,000', code: '' },
    { name: '1,001-3,000', code: '' },
    { name: '3,001-5,000', code: '' },
    { name: 'มากกว่า 5,000', code: '' }
]);
const selectedBed = ref();
    const bedtype = ref([
    { name: 'Single Bed', code:'เตียงเดี่ยว ขนาด 3 ฟุต'},
    { name: 'Twin Bed' , code:'เตียงเดี่ยว ขนาด 3.5 ฟุต'},
    { name: 'Double Bed', code:'เตียงคู่ขนาดใหญ่ 1 เตียง'},
    { name: 'Hollywood Twin', code:'เตียงเดี่ยว 2 เตียงติดกัน'},
    { name: 'Queen Size', code:'เตียงเดี่ยว ขนาด 5 ฟุต'},
    { name: 'King Size', code:'เตียงเดี่ยว ขนาด 6 ฟุต'},
    { name: 'Triple Bed', code:'เตียงเดี่ยวจำนวน 3 เตียง'},
    { name: 'Extra Bed', code:'เตียงเสริม'},
    { name: 'Mattress', code:'ฟูกนอนพื้น'},
    { name: 'Murphy Bed', code:'เตียงแบบพับเก็บได้'},
    { name: 'Bunk Bed', code:'เตียง 2 ชั้น'},
]);
const value = ref();
    return {
      isFilterVisible: false,
      roomtype,
      selectedType,
      selectedPriceRange,
      pricerange,
      selectedBed,
      bedtype,
      value,
    };
  },
  methods: {
    showFilter() {
      this.isFilterVisible = true;

      document.body.classList.add('filter-popup-open');
    },
    closeFilter() {
      this.isFilterVisible = false;

      document.body.classList.remove('filter-popup-open');

      this.selectedType = "";
      this.selectedCategory = "";
      this.selectedPriceRange = "";
      this.selectedQuantity = "";
      this.selectedBedtype = "";
      this.value = "";
    },
  },
};
</script>

<style scoped>
.invitatain {
  width: 100%;
  padding: 0 3rem 1rem 3rem;
  display: flex;
  flex-direction: column;
}

.title-info {
  display: flex;
  width: 100%;
  height: 2.5rem;
  justify-content: center;
}

/*------------------------- search-box-style -------------------------*/
.search-box-cus {
  width: 30%;
  height: 100%;
}

.input-group {
  display: flex;
  height: 100%;
}

.search {
  height: 100%;
  width: 80%;
}

.search input {
  border-radius: 25px 0 0 25px;
}

.input-group-append {
  border: #3b82f6 1px solid;
  border-radius: 0 25px 25px 0;
  width: 20%;
}

.input-group-append button {
  border-radius: 0 25px 25px 0;
}

.input-group button {
  border: none;
  width: 100%;
  height: 100%;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
}

.search input {
  /* border: none; */
  border: #3b82f6 1px solid;
  width: 100%;
  height: 100%;
  padding: 1rem;
  transition: all 0.2s ease-in-out;
}

/*---------------------------- hover % focus -------------------------------*/
.input-group-append button:hover {
  background-color: #3b82f6;
  border-radius: 0 25px 25px 0;
}

.search input[type="text"]:focus {
  border-radius: 25px 0 0 25px;
  outline: none;
  background-color: #3b82f6;
}

/*---------------------------- choose-style ------------------------*/
.choose-room {
  margin-top: 1rem;
  padding: 10px;
  display: flex;
  align-items: center;
  column-gap: 2rem;
  justify-content: center;
}

.room {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1rem;
}

.room i {
  font-size: 1.2rem;
}

.room a,
i {
  color: #252525;
  transition: all 0.2s ease-in-out;
}

.room:hover {
  text-shadow: 0px 0px 5px #3b82f6;
  color: #6b6b6b;
  text-decoration: underline;
}

.filter {
  cursor: default;
  border: #707070 1px solid;
  padding: 8px;
  border-radius: 0.5rem;
  column-gap: 5px;
  color: #707070;
  display: flex;
  transition: all 0.2s ease-in-out;
}

.filter a,
i {
  font-size: 1rem;
  color: #252525;
}


/*-------------------------------- filter-popup ----------------------*/

.filter-btn {
  cursor: pointer;
}

.filter-popup {
  display: flex;
  flex-direction: column;
  z-index: 9999;
  position: fixed;
  width: 40%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  padding: 20px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  transition: transform 0.5s ease-in-out;
  transform-origin: bottom;
}

.filter-popup.open {
  transform: translate(-50%, -50%);
}

.filter-popup button {
  cursor: pointer;
}

.top-filter {
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/*---------------------------- popular-style ----------------------*/
.poppular-box {
  position: relative;
  z-index: 0;
}

.poppular-box h3 {
  margin: 0;
  font-size: 1.5rem;
}

.poppular-info {
  align-items: center;
  column-gap: 0.5rem;
  display: flex;
}

.poppular-info i {
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  color: #ffb703;
}

.content {
  width: 100%;
}

p {
  color: var(--gray-800);
  font-weight: 400;
}

.grid-img {
  position: relative;
  width: 100%;
  height: 70%;
}

.grid-img img {
  position: relative;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.hotel-logo {
  border-radius: 1rem;
}

.img-promo {
  display: grid;
  grid-column-gap: 1rem;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(1, 300px);
}

.img-promo .hidden {
  cursor: pointer;
  color: #cccccc;
  position: absolute;
  font-size: 1.8rem;
  top: 30%;
  right: 10%;
  transform: translate(50%, 50%);
  transition: all 0.2s ease-in-out;
}

.img-promo i:hover {
  color: #fff;
}

.img-promo img {
  width: 100%;
  height: 100%;
}

.promo-details h4,
p {
  color: #000;
  margin: 0;
  padding: 0;
}

.hidden {
  transition: 0.5s ease;
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 15%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;
}
.grid-img:hover .hidden {
  opacity: 1;
}
@media screen and (max-width: 768px) {
  .search-box-cus {
    display: none;
  }
  .room a {
    display: none;
  }
}

@media screen and (max-width:430px) {
  .invitatain{
    padding: 0 1rem;
  }
  
}
@media screen and (max-width:414px) {
  .invitatain{
    padding: 0 2rem 1rem 2rem;
  }
  .choose-room{
    column-gap: 1rem;
  }
}
</style>

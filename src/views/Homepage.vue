<!-- Content.vue -->
<template>
  <div class="invitatain lg:py-0 lg:px-2 sm:px-1" style="row-gap: 1rem">
    <!------------------------------- choose-room ------------------------>
    <div class="choose-room px-4">
      <div
        class="filter-type overflow-x-auto hide-scrollbar flex gap-5"
        ref="menuContainer"
        style="position: relative; overflow-x: auto"
      >
        <div class="room" @click="emitOption('')">
          <img
            src="https://www.svgrepo.com/show/404610/global-globe-planet-space-world.svg"
            alt=""
          />
          <a class="font-type">ทั้งหมด</a>
        </div>
        <div class="room" @click="emitOption('บ้าน')">
          <img src="https://www.svgrepo.com/download/70465/house.svg" alt="" />
          <a class="font-type">บ้าน</a>
        </div>
        <div class="room" @click="emitOption('อพาร์ทเม้นท์')">
          <img src="https://www.svgrepo.com/show/187290/apartment.svg" alt="" />
          <a class="font-type">อพาร์ทเม้นท์</a>
        </div>
        <div class="room" @click="emitOption('ห้องพักทั่วไป')">
          <img
            src="https://www.svgrepo.com/show/149612/hotel-room.svg"
            alt=""
          />
          <a class="font-type">ห้องพักทั่วไป</a>
        </div>
        <div class="room" @click="emitOption('โรงแรม')">
          <img src="https://www.svgrepo.com/show/288092/hotel.svg" alt="" />
          <a class="font-type">โรงแรม</a>
        </div>
        <div class="room" @click="emitOption('คอนโด')">
          <img
            src="https://www.svgrepo.com//show/187275/apartment.svg"
            alt=""
          />
          <a class="font-type">คอนโด</a>
        </div>
        <div class="room" @click="emitOption('รีสอร์ท')">
          <img
            src="https://www.svgrepo.com/show/204714/sun-bath-resort.svg"
            alt=""
          />
          <a class="font-type">รีสอร์ท</a>
        </div>
        <div class="room" @click="emitOption('เกาะ')">
          <img src="https://www.svgrepo.com/show/154717/island.svg" alt="" />
          <a class="font-type">เกาะ</a>
        </div>
        <div class="room" @click="emitOption('ป่า-เขา')">
          <img src="https://www.svgrepo.com/show/88715/forest.svg" alt="" />
          <a class="font-type">ป่า-เขา</a>
        </div>
        <div class="room" @click="emitOption('ริมทะเล')">
          <img src="https://www.svgrepo.com/show/18600/sea.svg" alt="" />
          <a class="font-type">ริมทะเล</a>
        </div>
        <div class="room" @click="emitOption('คฤหาสน์')">
          <img
            src="https://www.svgrepo.com/download/51006/mansion.svg"
            alt=""
          />
          <a class="font-type">คฤหาสน์</a>
        </div>
        <div class="room" @click="emitOption('หาดท้องถิ่น')">
          <img
            src="https://www.svgrepo.com/show/490550/beach-umbrella.svg"
            alt=""
          />
          <a class="font-type">หาดท้องถิ่น</a>
        </div>
        <div class="room" @click="emitOption('เช่าออฟฟิศ')">
          <img
            src="https://www.svgrepo.com/show/251705/office-studio.svg"
            alt=""
          />
          <a class="font-type">เช่าออฟฟิศ</a>
        </div>
        <div class="room" @click="emitOption('เช่าห้องประชุม')">
          <img
            src="https://www.svgrepo.com/show/450753/conference-room.svg"
            alt=""
          />
          <a class="font-type">เช่าห้องประชุม</a>
        </div>
        <div class="room" @click="emitOption('เช่าพื้นที่ครัว')">
          <img
            src="https://www.svgrepo.com/show/490818/kitchen-room.svg"
            alt=""
          />
          <a class="font-type">เช่าพื้นที่ครัว</a>
        </div>
        <div class="room" @click="emitOption('เพื่อนนำเที่ยว')">
          <img
            src="https://www.svgrepo.com/show/429803/guide-human.svg"
            alt=""
          />
          <a class="font-type">เพื่อนนำเที่ยว</a>
        </div>
      </div>

      <!----------------------------------------- Button-box ------------------------------->

      <div class="flex gap-2">
        <Button
          class="filter filter-mate"
          outlined
          label="รูมเมท"
          icon="bi bi-people icon"
        />
        <Button
          icon="bi bi-bucket"
          class="filter filter-mate"
          label="แม่บ้าน"
          outlined
        />
        <Button
          icon="bi bi-filter-circle"
          class="filter filter-btn"
          label="ตัวกรอง"
          outlined
          @click="showFilter"
        />
      </div>
      <!----------------------------------------- Button-box ------------------------------->

      <!----------------------------------------- Filter-box ------------------------------->
      <Dialog
        v-model:visible="isFilterVisible"
        modal
        header="ตัวกรอง"
        :style="{ width: '50rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
      >
        <div class="flex justify-content-center py-2 gap-4">
          <Button
            label="room"
            severity="secondary"
            text
            raised
            @click="toggleCard('normal')"
          />
          <Button
            label="roommate"
            severity="secondary"
            text
            raised
            @click="toggleCard('roommate')"
          />
        </div>

        <Card v-if="activeCard === 'normal'">
          <template #title> <div class="text-center">Normal</div></template>
          <template #content>
            <div class="grid">
              <div class="col-12 flex justify-content-center gap-4">
                <Button
                  class="w-full"
                  label="ทั่วไป"
                  severity="secondary"
                  text
                  raised
                />
                <Button
                  class="w-full"
                  label="รูมเมท"
                  severity="secondary"
                  text
                  raised
                />
              </div>
              <div class="col-12">
                <p>TypeRoom :</p>
                <div class="flex gap-2 overflow-x-auto">
                  <div
                    v-for="(type, index) in roomtype"
                    :key="index"
                    class="py-3 px-1"
                    style="width: auto; font-size: 16px"
                  >
                    <Button
                      :label="type.name"
                      class="button-filter"
                      text
                      severity="secondary"
                      raised
                      :class="{
                        'button-filter-clicked':
                          clickedButtons['roomType'] === type.name,
                      }"
                      @click="handleButtonClick('roomType', type.name)"
                    />
                  </div>
                </div>
              </div>
              <div class="col-12">
                <div class="flex gap-4">
                  <Dropdown
                    class="appearance-none w-full text-gray-700 rounded py-1 px-2 mb-2 leading-tight focus:outline-none focus:bg-white"
                    v-model="clickedButtons.province"
                    :options="provincedropdown.value"
                    optionLabel="name_th"
                    optionValue="name_th"
                    placeholder="เลือกจังหวัด"
                    @change="getamphure('amphure')"
                    filter
                  />
                  <Dropdown
                    class="appearance-none w-full text-gray-700 rounded py-1 px-2 mb-2 leading-tight focus:outline-none focus:bg-white"
                    v-model="clickedButtons.amphure"
                    :options="amphuredropdown.value"
                    optionLabel="name_th"
                    optionValue="name_th"
                    placeholder="เลือกอำเภอ"
                    @change="getamphure('tambon')"
                    filter
                  />
                </div>
              </div>
              <div class="col-12">
                <p>ช่วงราคา :</p>
                <InputText v-model.number="priceRange" class="w-full" />
                <Slider
                  :min="200"
                  :max="15000"
                  v-model="priceRange"
                  range
                  class="w-full"
                />
              </div>
              <div class="col-12">
                <p>จำนวนผู้เข้าพัก :</p>
                <div class="flex justify-content-between overflow-x-auto">
                  <div
                    v-for="(type, index) in 8"
                    :key="index"
                    class="py-3 px-1"
                    style="width: auto; font-size: 16px"
                  >
                    <Button
                      :label="
                        index === 0
                          ? 'ทั้งหมด'
                          : index === 7
                          ? '7+'
                          : index.toString()
                      "
                      class="button-filter-child"
                      text
                      severity="secondary"
                      raised
                      :class="{
                        'button-filter-clicked':
                          clickedButtons['guests'] === index,
                      }"
                      @click="handleButtonClick('guests', index)"
                    />
                  </div>
                </div>
              </div>
              <div class="col-12">
                <p>ห้องนอน :</p>
                <div class="flex justify-content-between overflow-x-auto">
                  <div
                    v-for="(type, index) in 8"
                    :key="index"
                    class="py-3 px-1"
                    style="width: auto; font-size: 16px"
                  >
                    <Button
                      :label="
                        index === 0
                          ? 'ทั้งหมด'
                          : index === 7
                          ? '7+'
                          : index.toString()
                      "
                      class="button-filter-child"
                      text
                      severity="secondary"
                      raised
                      :class="{
                        'button-filter-clicked':
                          clickedButtons['bedrooms'] === index,
                      }"
                      @click="handleButtonClick('bedrooms', index)"
                    />
                  </div>
                </div>
              </div>
              <div class="col-12">
                <p>เตียง :</p>
                <div class="flex justify-content-between overflow-x-auto">
                  <div
                    v-for="(type, index) in 8"
                    :key="index"
                    class="py-3 px-1"
                    style="width: auto; font-size: 16px"
                  >
                    <Button
                      :label="
                        index === 0
                          ? 'ทั้งหมด'
                          : index === 7
                          ? '7+'
                          : index.toString()
                      "
                      class="button-filter-child"
                      text
                      severity="secondary"
                      raised
                      :class="{
                        'button-filter-clicked':
                          clickedButtons['beds'] === index,
                      }"
                      @click="handleButtonClick('beds', index)"
                    />
                  </div>
                </div>
              </div>
              <div class="col-12">
                <p>ห้องน้ำ :</p>
                <div class="flex justify-content-between overflow-x-auto">
                  <div
                    v-for="(type, index) in 8"
                    :key="index"
                    class="py-3 px-1"
                    style="width: auto; font-size: 16px"
                  >
                    <Button
                      :label="
                        index === 0
                          ? 'ทั้งหมด'
                          : index === 7
                          ? '7+'
                          : index.toString()
                      "
                      class="button-filter-child"
                      text
                      severity="secondary"
                      raised
                      :class="{
                        'button-filter-clicked':
                          clickedButtons['bathrooms'] === index,
                      }"
                      @click="handleButtonClick('bathrooms', index)"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="flex justify-content-end">
              <Button
                icon="bi bi-filter-circle"
                label="FILTER"
                severity="secondary"
                @click="test"
              />
            </div>
          </template>
        </Card>

        <Card v-else-if="activeCard === 'roommate'">
          <template #title> <div class="text-center">RoomMate</div></template>
          <template #content>
            <p class="m-0">
              ROOMMATEEEEEEEE ipsum dolor sit amet, consectetur adipisicing
              elit. Inventore sed consequuntur error repudiandae numquam
              deserunt quisquam repellat libero asperiores earum nam nobis,
              culpa ratione quam perferendis esse, cupiditate neque quas!
            </p>
          </template>
        </Card>

        <!-- <Button @click="filterData" label="ค้นหา" severity="secondary" /> -->
      </Dialog>
    </div>

    <!-------------------------- popular-section --------------------------->
    <div class="poppular-box">
      <PopularSection :filterValue="selectedValue" />
    </div>
    <!-- <div class="footer-box w-full">
      <Footer/>
    </div> -->
  </div>
</template>

<script>
import axios from "axios";
import { ref, onMounted } from "vue";
import PopularSection from "@/views/section/PopularSection.vue";
import Footer from "@/components/Footer/footer.vue";

export default {
  components: {
    PopularSection,
    Footer,
  },
  created() {
    axios
      .get(`${process.env.VUE_APP_API}room/type`)
      .then((response) => {
        this.roomtype = response.data;
        console.log(this.roomtype, "kkkk");
      })
      .catch((error) => {
        console.error("Error fetching room types", error);
      });
  },
  name: "HomepageMain",
  data() {
    const cities = ref([]);
    const provincedropdown = ref([]);
    const amphuredropdown = ref([null]);
    const tambondropdown = ref([null]);
    const priceRange = ref([200 + " - " + 15000 + "+"]);
    const selectedTypelessor = ref();
    const typelessor = ref([
      { name: "เจ้าของปล่อยเช่า", code: "" },
      { name: "ผู้เช่าปล่อยเช่า", code: "" },
    ]);

    const value = ref();
    const getprovince = async () => {
      try {
        const province = await axios.get(
          `${process.env.VUE_APP_THAILAND}thailand/province`
        );
        this.provincedropdown.value = province.data;
      } catch (error) {
        console.log(error);
      }
    };

    onMounted(() => {
      getprovince();
    });
    return {
      // isFilterVisible: false,
      isFilterVisible: true,
      roomtype: [],
      selectedTypelessor,
      priceRange,
      value,
      typelessor,
      selectedValue: "",
      activeCard: null,
      cities,
      provincedropdown,
      amphuredropdown,
      tambondropdown,

      clickedButtons: [
        {
          amphure: "",
          province: "",
          roomType: null,
          guests: null,
          bedrooms: null,
          beds: null,
          bathrooms: null,
        },
      ],
    };
  },
  methods: {
    test() {
      console.log(this.clickedButtons, "test");
    },

    handleButtonClick(column, index) {
      const label = index === 0 ? " " : index === 7 ? "7+" : index.toString();
      this.clickedButtons[column] =
        this.clickedButtons[column] === index ? null : index;
    },

    // เพิ่มฟังก์ชัน scrollLeft
    scrollLeft() {
      const container = this.$refs.menuContainer;
      container.scrollBy({
        left: -100, // ปรับตามความเหมาะสม
        behavior: "smooth",
      });
    },

    // เพิ่มฟังก์ชัน scrollRight
    scrollRight() {
      const container = this.$refs.menuContainer;
      container.scrollBy({
        left: 100, // ปรับตามความเหมาะสม
        behavior: "smooth",
      });
    },
    // ฟังก์ชัน handleScroll
    handleScroll() {
      const container = this.$refs.menuContainer;
      const scrollLeft = container.scrollLeft;
      const menuCount = container.children.length;
      const menuWidth = container.children[0].clientWidth;

      console.log("scrollLeft:", scrollLeft);
      console.log("menuCount:", menuCount);
      console.log("menuWidth:", menuWidth);

      if (scrollLeft + container.clientWidth >= container.scrollWidth) {
        container.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      }
    },
    showFilter() {
      this.isFilterVisible = true;
    },
    filterData() {
      // this.fetchFilteredData();
      console.log("kim");
    },

    emitOption(selectedValue) {
      this.selectedValue = selectedValue;
    },
    toggleCard(cardType) {
      if (this.activeCard === cardType) {
        this.activeCard = null;
      } else {
        this.activeCard = cardType;
      }
    },

    async getamphure(type) {
      try {
        if (type === "amphure") {
          const selectedProvinceObject = this.provincedropdown.value.find(
            (province) => province.name_th === this.clickedButtons.province
          );
          const id = selectedProvinceObject.id;
          //
          const amphure = await axios.get(
            `${process.env.VUE_APP_THAILAND}thailand/amphure/by-province-id/${id}`
          );
          this.amphuredropdown.value = amphure.data;
        }
        if (type === "tambon") {
          const selectedAmphureObject = this.amphuredropdown.value.find(
            (amphure) => amphure.name_th === this.clickedButtons.amphure
          );

          const id = selectedAmphureObject.id;

          //
          const tambon = await axios.get(
            `${process.env.VUE_APP_THAILAND}thailand/tambon/by-amphure-id/${id}`
          );
          this.tambondropdown.value = tambon.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.button-filter-clicked {
  background-color: #3b82f6;
  color: white;
}
.hide-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
  -ms-overflow-style: none;
}

.hide-scrollbar::-webkit-scrollbar {
  width: 0.4rem;
}

.hide-scrollbar::-webkit-scrollbar-thumb {
  background-color: transparent;
}
.invitatain {
  width: 100%;
  padding: 0 3rem 1rem 3rem;
  display: flex;
  flex-direction: column;
}
.font-type {
  font-size: 0.8rem;
}
.title-info {
  display: flex;
  width: 100%;
  height: 2.5rem;
  justify-content: center;
}
.filter-type {
  gap: 1.25rem;
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
  margin: 1rem;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 1.5rem;
}
.room {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  color: #000;
  text-decoration: none;
}

.room img {
  width: 1.4rem;
}

.room:hover {
  color: #000;
}

.room::before {
  content: "";
  position: absolute;
  display: block;
  width: 100%;
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: #000000;
  transform: scaleX(0);
  transform-origin: top left;
  transition: transform 0.3s ease;
}

.room:hover::before {
  transform: scaleX(1);
}

.room a {
  font-size: 12px;
  padding-bottom: 0.5rem;
}
.filter {
  color: #494949;
  display: flex;
  height: 50px;
  width: 110px;
  font-size: 14px;
  border-radius: 12px;
}
/*---------------------------- popular-style ----------------------*/

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
.p-inputnumber-input {
  width: 100%;
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
@media (max-width: 1440px) {
  .filter-type {
    column-gap: 2rem;
    max-width: 800px;
  }
  .room a {
    font-size: 0.5em;
  }
}
/*--------filter---------*/
.button-filter {
  font-size: 10px;
  height: 30px;
  width: 80px;
  border-radius: 0.5rem;
  border: none;
}

.button-filter-child {
  font-size: 10px;
  height: 38px;
  width: 70px;
  border-radius: 0.5rem;
  justify-content: center;
  border: none;
}
/*-----------------*/

@media screen and (max-width: 1280px) {
  .search-box-cus {
    display: none;
  }
  .room a {
    display: none;
  }
  .choose-room {
    column-gap: 1rem;
  }
  .filter-type {
    column-gap: 2rem;
    max-width: 400px;
  }
}
@media screen and (max-width: 768px) {
  .search-box-cus {
    display: none;
  }
  .room a {
    display: none;
  }
}

@media screen and (max-width: 640px) {
  .p-inputnumber-input {
    width: 100%;
  }
}
@media screen and (max-width: 576px) {
  .p-inputnumber-input {
    width: 100%;
  }
}

@media screen and (max-width: 430px) {
  .invitatain {
    padding: 0 1rem;
  }
}
@media screen and (max-width: 414px) {
  .filter-mate {
    display: none;
  }
  .invitatain {
    padding: 0 2rem 1rem 2rem;
  }
  .choose-room {
    column-gap: 1rem;
  }
  .choose-room {
    margin: 0;
    padding: 1rem 0 0 0;
    align-items: center;
  }
  .filter-type {
    padding-top: 1em;
    max-width: 220px;
    gap: 0.8rem;
  }
  .filter-btn {
    width: 80px;
    padding: 0.3em;
  }
  .room img {
    padding: 0.5em;
    width: 2.6em;
  }
  .room a {
    display: block;
    font-size: 7px;
  }
}
</style>

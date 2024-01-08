<!-- popularSection -->
<template>
  <div
    class="grid-container px-4 gap-2 max-[576px]:grid-cols-2 sm:frid-cols-3 md:p-0"
  >
    <div
      v-for="(item, index) in filteredGridData"
      :key="index"
      class="grid-item"
    >
      <div
        class="image-container"
        @touchstart="handleTouchStart($event, item)"
        @touchmove="handleTouchMove($event, item)"
      >
        <router-link :to="{ name: 'hotel', params: { id: item._id } }">
          <Galleria
            v-model:visible="displayBasic"
            :value="getPreloadedImages(item)"
            :numVisible="5"
            containerStyle="max-width: 640px; position: relative;"
            :showThumbnails="false"
            :showIndicators="true"
            :changeItemOnIndicatorHover="true"
            :showIndicatorsOnItem="true"
            :indicatorsPosition="position"
            v-model:activeIndex.sync="item.activeIndex"
          >
            <template v-slot:item="{ item }">
              <img :src="item" :alt="item && item.alt ? item.alt : ''" />
            </template>
          </Galleria>
        </router-link>

        <i
          v-if="item.activeIndex > 0 || isRightArrowClicked"
          class="left-arrow bi bi-arrow-left-circle-fill text-white"
          @click="prev(item)"
        />
        <i
          class="right-arrow bi bi-arrow-right-circle-fill text-white"
          @click="next(item)"
        />
        <svg
          :id="`your-svg-id-${index}`"
          @click="changeFill(index)"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          aria-hidden="true"
          role="presentation"
          focusable="false"
          style="
            position: absolute;
            transform: translateY(-50%);
            top: 12%;
            right: 5%;
            display: block;
            fill: rgba(0, 0, 0, 0.5);
            height: 24px;
            width: 24px;
            stroke: #fff;
            stroke-width: 2;
            overflow: visible;
            cursor: pointer;
            z-index: 1;
          "
        >
          <path
            d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05a6.98 6.98 0 0 0-9.9 0A6.98 6.98 0 0 0 2 11c0 7 7 12.27 14 17z"
          ></path>
        </svg>
      </div>
      <div class="details-container px-2">
        <div>
          <div v-if="item.starall" class="rating flex gap-1">
            <div v-for="starIndex in 10" :key="starIndex">
              <i
                :class="getStarIconClass(starIndex, item.starall)"
                :style="getStarIconStyle(starIndex, item.starall)"
              ></i>
            </div>
          </div>
          <div v-else-if="item.starall === 0" class="rating flex gap-1">
            <div v-for="starIndex in 10" :key="starIndex">
              <i class="pi pi-star text-gray-400"></i>
            </div>
          </div>
          <div v-else class="text-sm text-gray-600">ยังไม่มีรีวิว</div>
        </div>
        <h2 class="text-lg font-semibold pt-1 m-0">{{ item.name }}</h2>
        <p class="text-base my-1">{{ item.description }}</p>
        <p class="text-base font-semibold m-0 max-[414px]:my-2">
          ฿ {{ item.price.toLocaleString() }} คืน
        </p>
      </div>
    </div>
        <i class="pi pi-arrow-circle-up text-2xl bg-white ransition-all cursor-pointer" v-show="showScrollButton" @click="scrollToTop" style="position: fixed; bottom: 20px; right: 20px; z-index: 99999; border-radius: 20px;">
        </i>
    <!-- <div class="footer-box w-full bg-sky-300">
      <Footer></Footer>
    </div> -->
  </div>
</template>

<script>
import axios from "axios";
import { onMounted, reactive, ref } from "vue";
import Footer from "@/components/Footer/footer.vue";

export default {
  components: {
    Footer,
  },
  props: {
    filterValue: Object,
  },
  data() {
    const state = reactive({showScrollButton: false,});
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
    const displayBasic = ref(true);
    const originalGridData = ref([]);
    const gridData = ref([]);
    const position = "bottom";
    const searchTerm = ref("");
    const getroom = async () => {
    const Response = await axios.get(`${process.env.VUE_APP_API}room/`);
    console.log(Response.data);

    // กรองข้อมูลที่ได้จาก API response
    const filteredstatus = Response.data.filter(
    (item) => item.statusbooking === true &&
    item.status === true &&
    (item.starall !== undefined && item.starall !== null || item.starall === 0 || item.starall === undefined)
    );
    console.log(filteredstatus);

    // ทำการ map และตั้งค่า activeIndex
    this.originalGridData = filteredstatus.map((item) => ({
      ...item,
      activeIndex: 0,
    }));

    // เรียงลำดับตาม starall จากมากไปน้อย
    this.originalGridData.sort((a, b) => {
      if (a.starall === undefined || a.starall === null) return 1;
      if (b.starall === undefined || b.starall === null) return -1;
      return b.starall - a.starall;
    });

    // คัดลอกข้อมูลที่ถูกเรียงลำดับเข้าไปใน gridData
    this.gridData = this.originalGridData.slice();};

    onMounted(() => {
      getroom();
      this.$bus.on("search-hotels", this.handleSearchHotels);
    });
    // next(item) ฟังก์ชันถูกเรียกเมื่อผู้ใช้คลิกที่ลูกศร "ถัดไป" หรือเหตุการณ์ที่บ่งชี้ไปที่ "ถัดไป"
    const next = (item) => {
      // เพิ่มค่า activeIndex เพื่อแสดงรูปถัดไปในลำดับ
      item.activeIndex = (item.activeIndex + 1) % item.image.length;
      
      // ตั้งค่า isRightArrowClicked เป็น false เพื่อระบุว่าปุ่ม "ก่อนหน้า" ไม่ได้ถูกคลิก
      this.isRightArrowClicked = false;
    };

    // prev(item) ฟังก์ชันถูกเรียกเมื่อผู้ใช้คลิกที่ลูกศร "ก่อนหน้า" หรือเหตุการณ์ที่บ่งชี้ไปที่ "ก่อนหน้า"
    const prev = (item) => {
      // ลดค่า activeIndex เพื่อแสดงรูปก่อนหน้าในลำดับ
      item.activeIndex = (item.activeIndex - 1 + item.image.length) % item.image.length;
      
      // ตั้งค่า isRightArrowClicked เป็น false เพื่อระบุว่าปุ่ม "ก่อนหน้า" ได้ถูกคลิก
      this.isRightArrowClicked = false; // ตั้งค่า isRightArrowClicked เป็น false เมื่อคลิกที่ปุ่ม "ก่อนหน้า"
    };
    return {
      showScrollButton: false,
      displayBasic,
      gridData,
      position,
      searchTerm,
      next,
      prev,
      isRightArrowClicked: false,
      originalGridData,
    };
  },
  mounted() {
  window.addEventListener("scroll", this.handleScroll);
},
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {

        scrollToTop() {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      },
      handleScroll() {
        this.showScrollButton = window.scrollY > 60;
      },
    mounted() {
      window.addEventListener("scroll", this.handleScroll);
    },
    beforeDestroy() {
      window.removeEventListener("scroll", this.handleScroll);
    },

    handleTouchStart(event, item) {
      this.touchStartX = event.touches[0].clientX;
    },

    // สไลด์หน้าจอตัวหรองสำหรับจอมือถือ
    handleTouchMove(event, item) {
      this.touchEndX = event.touches[0].clientX;
      const deltaX = this.touchEndX - this.touchStartX;
      const threshold = 50;

      if (deltaX > threshold) {
        this.prev(item);
      } else if (deltaX < -threshold) {
        this.next(item);
      }
    },

    //ดาวที่ไม่มีคะแนน
    getStarIconClass(starIndex, starCount) {
      return {
        pi: true,
        "pi-star-fill": starIndex <= starCount,
        "pi-star text-gray-400": starIndex > starCount,
      };
    },

    //ดาวที่มีคะแนน
    getStarIconStyle(starIndex, starCount) {
      return starIndex <= starCount ? { color: "#fdc500" } : {};
    },

    //ปักหมุดห้องที่สนใจ
    changeFill(index) {
      // ค้นหาองค์ประกอบ SVG ด้วย ID
      const svgElement = document.getElementById(`your-svg-id-${index}`);

      // ค้นหาองค์ประกอบ path ภายใน SVG
      const pathElement = svgElement.querySelector("path");

      // สลับสีเต็มรูปแบบระหว่างค่าสีสองค่า
      const newColor =
        pathElement.style.fill === "rgb(247, 37, 133)"
          ? "rgba(0, 0, 0, 0.5)"
          : "rgb(247, 37, 133)";

      // เปลี่ยนสีเต็มรูปแบบด้วยการเปลี่ยนสีที่ไล่ลงมา
      pathElement.style.transition = "fill 0.5s";
      pathElement.style.fill = newColor;

      // เพิ่ม setTimeout เพื่อลบคุณสมบัติการเปลี่ยนสีหลังจากที่เสร็จสิ้น
      setTimeout(() => {
        pathElement.style.transition = "";

        // นำ Grid Item ที่ถูกคลิกขึ้นไปอยู่บนสุดของ Grid Container
        const parent = svgElement.closest(".grid-item"); // ให้แก้ไขตรงนี้
        const gridContainer = parent.closest(".grid-container"); // ให้แก้ไขตรงนี้

        // ตรวจสอบว่า Grid Item ถูกคลิกมีใน Grid Container หรือไม่
        const gridItemIndex = Array.from(gridContainer.children).indexOf(
          parent
        );
        if (gridItemIndex !== -1) {
          // นำ Grid Item ที่ถูกคลิกขึ้นไปอยู่บนสุดของ Grid Container
          gridContainer.insertBefore(parent, gridContainer.firstChild);
        }
      }, 500);
    },

    getPreloadedImages(item) {
  const preloadedImages = item.image.map(
    (imageId) => `https://drive.google.com/uc?export=view&id=${imageId}`
  );

  console.log('Preloaded Images:', preloadedImages);

  return preloadedImages;
},

    getImage(item) {
      if (typeof item === "string") {
        return `https://drive.google.com/uc?export=view&id=${item}`;
      } else if (Array.isArray(item) && item.length > 0) {
        return item.map(
          (imageId) => `https://drive.google.com/uc?export=view&id=${imageId}`
        );
      } else {
        return "";
      }
    },
    handleSearchHotels(searchTerm) {
      this.searchTerm = searchTerm;
    },
    handleFilterChange(filterValue) {
      if (!filterValue) {
        this.gridData = [...this.originalGridData];
        return;
      }
      if (filterValue.filterType === "icon") {
        this.gridData = this.originalGridData.filter((item) => {
          if (filterValue.roomType === "") {
            return (this.gridData = [...this.originalGridData]);
          }
          return item.type.name === filterValue.roomType;
        });
      } else if (filterValue.filterType === "highLevel") {
        this.gridData = this.originalGridData.filter((item) => {
          if (
            filterValue.beds === 0 ||
            filterValue.bedroom === 0 ||
            filterValue.guests === 0 ||
            filterValue.bathroom === 0
          ) {
            return (this.gridData = [...this.originalGridData]);
          }
          const meetsRoomTypeCondition =
            filterValue.roomType === null ||
            item.type.name === filterValue.roomType;
          const meetsGuestsCondition =
            filterValue.guests === null ||
            (filterValue.guests === 7
              ? item.guests >= 7
              : item.guests === filterValue.guests);
          const meetsBedroomsCondition =
            filterValue.bedrooms === null ||
            (filterValue.bedrooms === 7
              ? item.bedroom >= 7
              : item.bedroom === filterValue.bedrooms);
          const meetsBedsCondition =
            filterValue.beds === null ||
            (filterValue.beds === 7
              ? item.bed >= 7
              : item.bed === filterValue.beds);

          const meetsBathroomsCondition =
            filterValue.bathrooms === null ||
            (filterValue.bathrooms === 7
              ? item.bathroom >= 7
              : item.bathroom === filterValue.bathrooms);
          const meetsProvinceCondition =
            filterValue.province === null ||
            item.province === filterValue.province;
          const meetsAmphureCondition =
            filterValue.amphure === null ||
            item.amphure === filterValue.amphure;

          return (
            meetsRoomTypeCondition &&
            meetsGuestsCondition &&
            meetsBedroomsCondition &&
            meetsBedsCondition &&
            meetsBathroomsCondition &&
            meetsProvinceCondition &&
            meetsAmphureCondition
          );
        });
      } else {
        this.gridData = [...this.originalGridData];
      }
    },
  },
  computed: {
    filteredGridData() {
      return this.gridData.filter((item) => {
        const lowerCaseName = item.name.toLowerCase();
        const lowerCaseSearchTerm = this.searchTerm.toLowerCase();
        return lowerCaseName.includes(lowerCaseSearchTerm);
      });
      // .slice(0,12);
    },
  },
  watch: {
    searchTerm: {
      handler(newTerm) {
        console.log("Search term changed:", newTerm);
      },
    },
    filterValue: {
      handler(newVal) {
        console.log("😡", newVal);
        this.handleFilterChange(newVal);
      },
      deep: true,
    },
  },
  beforeUnmount() {
    this.$bus.off("search-hotels", this.handleSearchHotels);
  },
};
</script>

<style scope>
.left-arrow,
.right-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 2rem;
  color: white;
  border-radius: 50%;
  padding: 0.5rem;
  cursor: pointer;
  transition: background-color 0.5s, opacity 0.5s;
  opacity: 0;
}
.image-container:hover .left-arrow,
.image-container:hover .right-arrow {
  opacity: 1;
}
.left-arrow {
  left: 0;
}
.right-arrow {
  right: 0;
}
.p-galleria-item {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}

.p-galleria.p-galleria-indicator-onitem .p-galleria-indicators {
  background: none;
}

.p-galleria.p-galleria-indicator-onitem .p-galleria-indicators button {
  width: 8px;
  height: 8px;
}

.grid-container {
  /* width: 100%; */
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.5rem;
  /* height: 100vh; */
}
.grid-item {
  padding: 1rem;
}

.image-container {
  position: relative;
  height: 70%;
}
.image-container svg {
  font-size: 2rem;
}
.image-container img {
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 1rem;
}
.details-container {
  margin-top: 1rem;
}
@media screen and (max-width: 1536px) {
  .grid-container {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media screen and (max-width: 1440px) {
  .grid-container {
    grid-template-columns: repeat(4, 1fr);
  }
  .image-container img {
    width: 100%;
  }
}

@media screen and (max-width: 1280px) {
  .grid-container {
    grid-template-columns: repeat(4, 1fr);
  }

  .image-container img {
    height: 200px;
    object-fit: cover;
    border-radius: 1.5rem;
  }
}

@media screen and (max-width: 992px) {
  .grid-container {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media screen and (max-width: 768px) {
  .grid-container {
    grid-template-columns: repeat(2, 1fr);
  }
  .image-container img {
    width: 100%;
  }
}

@media screen and (max-width: 640px) {
  .grid-container {
    grid-template-columns: repeat(2, 1fr);
  }

  .p-galleria-item {
    justify-content: start;
  }

  .image-container {
    margin-bottom: 1rem;
  }

  .image-container img {
    width: 100%;
  }
}

/* @media screen and (max-width: 576px) {
  .grid-container {
    grid-template-columns: repeat(1, 1fr);
  }

  .image-container img {
    width: 100%;
  }
} */
/* @media screen and (max-width: 430px) {
  .grid-container {
    grid-template-columns: repeat(1, 1fr);
  }

  .image-container img {
    width: 100%;
  }
} */

@media screen and (max-width: 578px) {
  .rating {
    display: flex;
    text-align: center;
    justify-content: center;
  }
  .grid-container {
    grid-template-columns: repeat(1, 1fr);
  }
  .p-galleria-item {
    touch-action: pan-x;
    width: 100%;
    justify-content: center;
  }

  .image-container {
    margin-bottom: 1rem;
  }

  .grid-item {
    text-align: center;
    padding: 0.5rem;
  }

  .image-container img {
    width: 100%;
    height: 250px;
  }
}
@media screen and (max-width: 414px) {
  .rating {
    display: flex;
    text-align: center;
    justify-content: center;
  }
  .grid-container {
    grid-template-columns: repeat(1, 1fr);
  }
  .p-galleria-item {
    touch-action: pan-x;
    width: 100%;
    justify-content: center;
  }

  .image-container {
    margin-bottom: 1rem;
  }

  .grid-item {
    text-align: center;
    padding: 0.5rem;
  }

  .image-container img {
    width: 100%;
    height: 250px;
  }
}
@media screen and (max-width: 321px) {
  .grid-container {
    grid-template-columns: repeat(1, 180px);
  }
  .image-container img {
    width: 100%;
  }
  .rating {
    justify-content: center;
  }
}
</style>

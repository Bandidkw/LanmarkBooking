<!-- popularSection -->
<template>
  <div class="grid-container px-4 gap-2 max-[576px]:grid-cols-2 sm:frid-cols-3">
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
            :activeIndex.sync="item.activeIndex"
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
        <div class="flex gap-1">
          <div v-for="starIndex in 10" :key="starIndex">
            <i
              :class="getStarIconClass(starIndex, item.starall)"
              :style="getStarIconStyle(starIndex, item.starall)"
            ></i>
          </div>
        </div>
        <h2 class="text-lg font-semibold pt-1 m-0">{{ item.name }}</h2>
        <p class="text-base my-1">{{ item.description }}</p>
        <p class="text-base font-semibold m-0 max-[414px]:my-2">
          ฿ {{ item.price.toLocaleString() }} คืน
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { onMounted, ref } from "vue";

export default {
  props: {
    filterValue: String,
  },
  data() {
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
      const filteredstatus = Response.data.filter(
        (item) => item.statusbooking === true && item.status === true
      );
      console.log(filteredstatus);
      this.originalGridData = shuffleArray(
        filteredstatus.map((item) => ({ ...item, activeIndex: 0 }))
      );
      this.gridData = [...this.originalGridData];
    };
    onMounted(() => {
      getroom();
      this.$bus.on("search-hotels", this.handleSearchHotels);
    });
    const next = (item) => {
      item.activeIndex = (item.activeIndex + 1) % item.image.length;
      this.isRightArrowClicked = false;
    };
    const prev = (item) => {
      item.activeIndex =
        (item.activeIndex - 1 + item.image.length) % item.image.length;
      this.isRightArrowClicked = false; // Set isRightArrowClicked to false when clicking the "prev" button
    };

    return {
      displayBasic,
      gridData,
      position,
      searchTerm,
      next,
      prev,
      isRightArrowClicked: false,
      originalGridData,
      shuffleArray,
    };
  },
  methods: {
    handleTouchStart(event, item) {
      this.touchStartX = event.touches[0].clientX;
    },

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
    getStarIconClass(starIndex, starCount) {
      return {
        pi: true,
        "pi-star-fill": starIndex <= starCount,
        "pi-star": starIndex > starCount,
      };
    },
    getStarIconStyle(starIndex, starCount) {
      return starIndex <= starCount ? { color: "#fdc500" } : {};
    },
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
      return (
        item.image
          // .slice(0, 5)
          .map(
            (imageId) => `https://drive.google.com/uc?export=view&id=${imageId}`
          )
      );
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

      this.gridData = this.originalGridData.filter((item) => {
        return item.type.name.toLowerCase() === filterValue.toLowerCase();
      });
    },
  },
  computed: {
    filteredGridData() {
      return this.gridData.filter((item) => {
        const lowerCaseName = item.name.toLowerCase();
        const lowerCaseSearchTerm = this.searchTerm.toLowerCase();
        return lowerCaseName.includes(lowerCaseSearchTerm);
      });
    },
  },
  watch: {
    searchTerm: {
      handler(newTerm) {
        console.log("Search term changed:", newTerm);
      },
    },
    filterValue(newValue) {
      this.handleFilterChange(newValue);
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
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.5rem;
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
    grid-template-columns: repeat(3, 1fr);
  }
}

@media screen and (max-width: 640px) {
  .grid-container {
    grid-template-columns: repeat(3, 1fr);
  }

  .p-galleria-item {
    justify-content: start;
  }

  .image-container {
    margin-bottom: 1rem;
  }

  .image-container img {
    width: 150px;
    height: 150px;
  }
}

@media screen and (max-width: 430px) {
  .grid-container {
    grid-template-columns: repeat(2, 1fr);
  }

  .image-container img {
    width: 150px;
    height: 150px;
  }
}

@media screen and (max-width: 414px) {
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
</style>

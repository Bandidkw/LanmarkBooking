<template>
  <div class="grid-container px-4 gap-2 max-[576px]:grid-cols-2 sm:frid-cols-3">
    <div
      v-for="(item, index) in filteredGridData"
      :key="index"
      class="grid-item"
    >
      <div class="image-container">
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
          class="left-arrow bi bi-arrow-left-circle-fill text-white"
          @click="prev(item)"
        />
        <i
          class="right-arrow bi bi-arrow-right-circle-fill text-white"
          @click="next(item)"
        />
      </div>
      <div class="details-container px-2">
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
  data() {
    const displayBasic = ref(true);
    const gridData = ref([]);
    const position = "bottom";
    const searchTerm = ref("");

    const getroom = async () => {
      const Response = await axios.get(`${process.env.VUE_APP_API}room/`);
      const filteredstatus = Response.data.filter(
        (item) => item.statusbooking === true && item.status === true
      );
      this.gridData = filteredstatus.map((item) => ({
        ...item,
        activeIndex: 0,
      })); // Initialize activeIndex for each item
    };

    onMounted(() => {
      getroom();
      // Listen for the search-hotels event
      this.$bus.on("search-hotels", this.handleSearchHotels);
    });

    const next = (item) => {
      item.activeIndex = (item.activeIndex + 1) % item.image.length;
    };

    const prev = (item) => {
      item.activeIndex =
        (item.activeIndex - 1 + item.image.length) % item.image.length;
    };

    return {
      displayBasic,
      gridData,
      position,
      searchTerm,
      next,
      prev,
    };
  },
  methods: {
    getPreloadedImages(item) {
      return item.image.map(
        (imageId) => `https://drive.google.com/uc?export=view&id=${imageId}`
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
      // Your existing code for getImage
    },
    // New method to handle search-hotels event
    handleSearchHotels(searchTerm) {
      this.searchTerm = searchTerm;
    },
  },
  computed: {
    // Use a computed property to filter the data based on the search term
    filteredGridData() {
      return this.gridData.filter((item) => {
        const lowerCaseName = item.name.toLowerCase();
        const lowerCaseSearchTerm = this.searchTerm.toLowerCase();
        return lowerCaseName.includes(lowerCaseSearchTerm);
      });
    },
  },
  watch: {
    // Watch for changes in the search term and update the filtered data accordingly
    searchTerm: {
      handler(newTerm) {
        console.log("Search term changed:", newTerm);
      },
      immediate: true, // Trigger the watcher immediately on component mount
    },
  },
  beforeUnmount() {
    // Clean up the event listener when the component is about to be destroyed
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
  transition: background-color 0.3s;
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
  padding: 0 1rem;
}

.image-container {
  position: relative;
  height: 70%;
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
    width: 200px;
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

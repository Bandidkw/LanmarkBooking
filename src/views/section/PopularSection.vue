<template>
   <div class="grid-container">

      <div v-for="(item, index) in gridData" :key="index" class="grid-item">
        <router-link :to="{ name: 'hotel', params: { id: item._id } }">
        <div class="image-container">
          <img class="w-full"  v-if="Array.isArray(item.image) && item.image.length > 0"
                :src="getImage(item.image)"
                alt="Gallery Image" />
          <div v-else>ไม่มีรูปภาพ</div>
          <!-- <i class="bi bi-suit-heart favor"></i> -->
          <i class="bi bi-arrow-right-circle-fill next hover:scale-110"></i>
        </div>
        </router-link>
        <div class="details-container">
          <h2 class="text-xl m-0 font-semibold">{{ item.name }}</h2>
          <p class="text-base my-1">{{ item.description }}</p>
          <p class="text-base font-bold">ราคา: {{ item.price }} บาท/คืน</p>
        </div>
      </div>
    </div>
</template>
  
<script>

import axios from "axios";
import { onMounted,ref} from "vue";
  export default {
    
    data() {
      const gridData = ref([])
      const getroom = async (_id) => {
        const Response = await axios.get(`${process.env.VUE_APP_API}room/`);
        const filteredstatus = Response.data.filter(item => item.statusbooking === true && item.status === true); 
        this.gridData = filteredstatus
      }
      onMounted(() => {
        getroom();
      });
      return {
        gridData,
        currentImageIndex: 0
      };
    },
    methods:{
      getImage(item){
      if (typeof item === 'string') {
        return `https://drive.google.com/uc?export=view&id=${item}`;
      } else if (Array.isArray(item) && item.length > 0) {
        const firstImageId = item[0];
        return `https://drive.google.com/uc?export=view&id=${firstImageId}`;
      } else {
        return "";
      }
    }
    },
  };
  </script>
  
  <style scoped>



  .grid-container {
    display: grid;
    grid-template-columns: repeat(6,1fr);
    grid-template-rows: repeat(4,350px);
    gap: 0.5rem;
  }
  .grid-item {
    padding: 16px;
  }
  .image-container {
  position: relative;
  height: 70%;
}
.image-container .favor{
  font-size: 1.3rem;
  color: white;
  position: absolute;
  top: 10%;
  right: 5%;
}
.image-container .next{
  transition: all 0.2s ease-in-out;
  opacity: 0;
  position: absolute;
  color: #fff;
  font-size: 1.8rem;
  right: 5%;
  top: 42%;
}

.image-container:hover .next{
  opacity: 1;
}
.image-container img{
    width: 100%;
    height: 100%;
    border-radius: 1.5rem;
}
  .details-container {
    margin-top: 1rem;
  }

@media screen and (max-width:1440px) {
  .grid-container {
    grid-template-columns: repeat(4,1fr);
  }
}


@media screen and (max-width:1280px) {
    .grid-container {
    grid-template-columns: repeat(4,1fr);
  }
  }
@media screen and (max-width:992px) {
    .grid-container {
    grid-template-columns: repeat(3,1fr);
    }
  } 
@media screen and (max-width:768) {
    .grid-container {
    grid-template-columns: repeat(2,1fr);
    }
  }
@media screen and (max-width:576px) {
    .grid-container {
    grid-template-columns: repeat(1,1fr);
    }
  }
  </style>
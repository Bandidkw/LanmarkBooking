<template>
   <div class="grid-container">

      <div v-for="(item, index) in gridData" :key="index" class="grid-item">
        <router-link :to="{ name: 'hotel', params: { id: item._id } }">
        <div class="image-container">
          <img  v-if="Array.isArray(item.image) && item.image.length > 0"
                :src="getImage(item.image)"
                alt="Gallery Image" />
          <div v-else>ไม่มีรูปภาพ</div>
        <i class="bi bi-arrow-right-circle-fill hidden"></i>
        </div>
        </router-link>
        <div class="details-container">
          <h2>{{ item.name }}</h2>
          <p>{{ item.description }}</p>
          <p>Price: {{ item.price }} บาท</p>
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
    grid-template-rows: repeat(1,400px);
    gap: 1rem;
  }
  .grid-item {
    padding: 16px;
  }
  .image-container {
  position: relative;
  height: 50%;
}
.image-container img{
    width: 100%;
    height: 100%;
}

.button-container {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(-50%, -50%);
}
.button-container i{
    opacity: 0;
    font-size: 1.5rem;
    color: #c7c7c7;
    transition: all 0.2s ease-in-out;
}
.image-container img{
    border-radius: 1.5rem;
}
.image-container:hover .hidden{
    opacity: 1;
    cursor: pointer;
    color: #fff;
}
  
  .details-container {
    margin-top: 1rem;
  }
  .details-container h2{
    font-size: 1.2rem;
  }
  .details-container p{
    font-size: 0.8rem;
    font-weight: 300;
  }

@media screen and (max-width:1200px) {
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
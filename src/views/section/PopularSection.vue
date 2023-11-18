<template>
   <div class="grid-container">
      <div v-for="(item, index) in gridData" :key="index" class="grid-item">
        <router-link :to="{ name: 'hotel', params: { id: index } }">
        <div class="image-container">
        <img :src="item.image[currentImageIndex]" alt="Gallery Image" />
        <i class="bi bi-arrow-right-circle-fill hidden"></i>
        </div>
        </router-link>
        <div class="details-container">
          <h2>{{ item.name }}</h2>
          <p>{{ item.details }}</p>
          <p>Date: {{ item.date }}</p>
          <p>Price: {{ item.price }} ฿</p>
        </div>
      </div>
    </div>
</template>
  
<script>
  export default {
    data() {
      return {
        gridData:[
        {
            name: 'Hotel A',
            details: 'Luxurious hotel with amazing amenities.',
            date: '2023-11-15',
            price: 1500,
            image: [
                'images/hotel-room/room01.jpg',
                'images/hotel-room/room02.jpg',
                'images/hotel-room/room03.jpg',
            ],
          },
          {
            name: 'Hotel B',
            details: 'Cozy boutique hotel in the heart of the city.',
            date: '2023-11-15',
            price: 2500,
            image: [
                'images/hotel-room/room02.jpg',
                'images/hotel-room/room01.jpg',
                'images/hotel-room/room03.jpg',
            ],
          },
          {
            name: 'Hotel C',
            details: 'Experience the epitome of luxury at our 5-star hotel with breathtaking views and unparalleled service.',
            date: '2023-11-16',
            price: 5000,
            image: [
                'images/hotel-room/room03.jpg',
                'images/hotel-room/room02.jpg',
                'images/hotel-room/room01.jpg',
            ],
          },
          {
            name: 'Hotel D',
            details: 'Charm meets comfort in our boutique hotel located in the heart of the city. Perfect for urban explorers.',
            date: '2023-11-16',
            price: 3000,
            image: [
                'images/hotel-room/room05.jpg',
                'images/hotel-room/room02.jpg',
                'images/hotel-room/room03.jpg',
            ],
          },
          {
            name: 'Hotel E',
            details: 'Escape to our seaside resort and indulge in a serene atmosphere with stunning ocean views and pristine beaches.',
            date: '2023-11-17',
            price: 4500,
            image: [
                'images/hotel-room/room06.jpg',
                'images/hotel-room/room02.jpg',
                'images/hotel-room/room03.jpg',
            ],
          },
          {
            name: 'Hotel F',
            details: 'Embrace nature at our mountain lodge retreat. Surrounded by lush greenery and majestic mountain views.',
            date: '2023-11-18',
            price: 3500,
            image: [
                'images/hotel-room/room04.jpg',
                'images/hotel-room/room02.jpg',
                'images/hotel-room/room03.jpg',
            ],
          },
        ],
        currentImageIndex: 0
      };
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
<template>
    <div class="image-gallery">
      <div class="image-container" :style="{ transform: `translateX(${translateValue}px)` }">
        <!-- แสดงรูปภาพทั้งหมด -->
        <div v-for="(image, index) in images" :key="index" class="image-item">
          <img :src="image" alt="Gallery Image">
        </div>
      </div>
  
      <!-- ปุ่มเลื่อนดูรูป -->
      <button @click="prevImage" class="nav-button">Previous</button>
      <button @click="nextImage" class="nav-button">Next</button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
        images: {
      type: Array,
      default: () => [
        'https://via.placeholder.com/300',
        'https://via.placeholder.com/300',
        'https://via.placeholder.com/300'
      ]
    }
    },
    data() {
      return {
        currentIndex: 0, // คำนวณดัชนีของรูปภาพปัจจุบัน
        translateValue: 0 // คำนวณค่า transform เพื่อเลื่อนรูป
      };
    },
    methods: {
      prevImage() {
        // เลื่อนไปที่รูปก่อนหน้า
        if (this.currentIndex > 0) {
          this.currentIndex--;
          this.translateValue += this.getImageWidth();
        }
      },
      nextImage() {
        // เลื่อนไปที่รูปถัดไป
        if (this.currentIndex < this.images.length - 1) {
          this.currentIndex++;
          this.translateValue -= this.getImageWidth();
        }
      },
      getImageWidth() {
        // คำนวณความกว้างของแต่ละรูปภาพ
        const imageContainer = this.$el.querySelector('.image-item');
        return imageContainer.clientWidth;
      }
    }
  };
  </script>
  
  <style scoped>
  .image-gallery {
    position: relative;
    overflow: hidden;
    width: 300px; /* ปรับขนาดตามที่ต้องการ */
    margin: 20px;
  }
  
  .image-container {
    display: flex;
    transition: transform 0.5s ease-in-out;
  }
  
  .image-item {
    flex: 0 0 auto;
  }
  
  .nav-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: #3498db;
    color: #fff;
    border: none;
    padding: 10px;
    cursor: pointer;
  }
  
  .nav-button:hover {
    background-color: #2980b9;
  }
  </style>
  
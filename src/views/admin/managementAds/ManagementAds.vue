<template>
  <div class="image-page mt-4 mb-4">
    <div v-for="(image, index) in images" :key="index">
      <div class="image-preview">
        <i
          class="delete-icon bi bi-x-circle-fill"
          @click="deleteImage(index)"
        ></i>
        <img :src="image" alt="Preview" />
      </div>
    </div>
  </div>
  <div class="footer">
    <div class="add-image-box">
      <input
        id="files"
        type="file"
        @change="chooseImg"
        accept="image/png, image/jpeg, image/jpg"
      />
      <Button @click="addImage" label="เพิ่มโฆษณา" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [
        "https://www.apple.com/v/airpods-pro/i/images/overview/battery_magsafe__b8uyauldcub6_large_2x.jpg",
        "https://www.apple.com/v/airpods-pro/i/images/overview/battery_magsafe__b8uyauldcub6_large_2x.jpg",
        "https://www.apple.com/v/airpods-pro/i/images/overview/battery_magsafe__b8uyauldcub6_large_2x.jpg",
        "https://www.apple.com/v/airpods-pro/i/images/overview/battery_magsafe__b8uyauldcub6_large_2x.jpg",
        "https://www.apple.com/v/airpods-pro/i/images/overview/battery_magsafe__b8uyauldcub6_large_2x.jpg",
        "https://www.apple.com/v/airpods-pro/i/images/overview/battery_magsafe__b8uyauldcub6_large_2x.jpg",
        "https://www.apple.com/v/airpods-pro/i/images/overview/battery_magsafe__b8uyauldcub6_large_2x.jpg",
        "https://www.apple.com/v/airpods-pro/i/images/overview/battery_magsafe__b8uyauldcub6_large_2x.jpg",
        "https://www.apple.com/v/airpods-pro/i/images/overview/battery_magsafe__b8uyauldcub6_large_2x.jpg",
        "https://www.apple.com/v/airpods-pro/i/images/overview/battery_magsafe__b8uyauldcub6_large_2x.jpg",
        "https://www.apple.com/v/airpods-pro/i/images/overview/battery_magsafe__b8uyauldcub6_large_2x.jpg",
        "https://www.apple.com/v/airpods-pro/i/images/overview/battery_magsafe__b8uyauldcub6_large_2x.jpg",
        "https://www.apple.com/v/airpods-pro/i/images/overview/battery_magsafe__b8uyauldcub6_large_2x.jpg",
        "https://www.apple.com/v/airpods-pro/i/images/overview/battery_magsafe__b8uyauldcub6_large_2x.jpg",
        "https://www.apple.com/v/airpods-pro/i/images/overview/battery_magsafe__b8uyauldcub6_large_2x.jpg",
        "https://www.apple.com/v/airpods-pro/i/images/overview/battery_magsafe__b8uyauldcub6_large_2x.jpg",
        "https://www.apple.com/v/airpods-pro/i/images/overview/battery_magsafe__b8uyauldcub6_large_2x.jpg",
        "https://www.apple.com/v/airpods-pro/i/images/overview/battery_magsafe__b8uyauldcub6_large_2x.jpg",
        "https://www.apple.com/v/airpods-pro/i/images/overview/battery_magsafe__b8uyauldcub6_large_2x.jpg",
        "https://www.apple.com/v/airpods-pro/i/images/overview/battery_magsafe__b8uyauldcub6_large_2x.jpg",
        // ... (other image URLs)
      ],
      imagePreview: null,
      filepic: null,
    };
  },
  methods: {
    deleteImage(index) {
      this.images.splice(index, 1);
    },
    chooseImg(event) {
      if (this.filepic) {
        this.deleteImage();
      }

      const file = event.target.files[0];

      if (file) {
        this.filepic = file;
        const reader = new FileReader();

        reader.onload = (e) => {
          this.imagePreview = e.target.result;
        };

        reader.readAsDataURL(file);
      }
    },
    addImage() {
      if (this.filepic) {
        this.images.push(this.imagePreview);
        this.imagePreview = null;
        this.filepic = null;
      }
    },
  },
};
</script>

<style scoped>
.image-page {
  margin: 4rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 4rem;
}

img {
  height: 100%;
  width: 100%;
  border-radius: 2rem;
}

.image-preview {
  position: relative;
  object-fit: cover;
  margin: 0.5rem;
}

.delete-icon {
  position: absolute;
  top: 5%;
  right: 5%;
  font-size: 1.5rem;
  color: #fff;
  cursor: pointer;
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background-color: #f0f0f0;
}

.add-image-box {
  display: flex;
  align-items: center;
}

.add-image-box input {
  margin-right: 1rem;
}

.add-image-box button {
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
}
</style>

<template>
  <div class="image-page">
    <div class="image-container" v-for="(image, index) in images" :key="index">
      <div class="image-preview">
        <i
          class="delete-icon bi bi-x-circle-fill"
          @click="deleteImage(index)"
        ></i>
        <img :src="image" class="rounded" alt="Preview" />
      </div>
    </div>
  </div>
  <div class="footer">
    <div class="add-image-box">
      <input
        type="file"
        @change="chooseImg"
        accept="image/png, image/jpeg, image/jpg"
      />
      <Button @click="addImage">Add Image</Button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [], // Array to store image URLs
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
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 74vh;
  gap: 2rem;
}

.image-preview {
  position: relative;
  display: flex;
}

.image-preview img {
  width: 200px;
  height: 200px;
  object-fit: cover;
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
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
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

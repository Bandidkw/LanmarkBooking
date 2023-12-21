<template>
  <!-- Manage Ads Section -->
  <div class="w-full">
    <div>
      <p class="section-header">MANAGE ADS</p>
      <div class="flex gap-1 mt-4 mb-4 overflow-x-auto max-w-screen-lg mx-auto">
        <!-- Existing image display -->
        <div
          v-for="(image, index) in images"
          :key="index"
          class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2"
        >
          <div class="image-preview">
            <i
              class="delete-icon bi bi-x-circle-fill"
              @click="deleteImage(index)"
            ></i>
            <img :src="image" alt="Ad Preview" class="w-full h-full" />
          </div>
        </div>
      </div>

      <!-- Add image form -->
      <div class="add-image-box">
        <label for="adFiles" class="upload-label">Upload Ad Image:</label>
        <input
          id="adFiles"
          type="file"
          @change="chooseImg"
          accept="image/png, image/jpeg, image/jpg"
          class="upload-input"
        />
        <Button label="Add Ad" @click="addImage" />
      </div>
    </div>
    <!-- Manage Background Section -->
    <div>
      <p class="section-header">MANAGE BACKGROUND</p>
      <div class="flex gap-1 mt-4 mb-4 overflow-x-auto max-w-screen-lg mx-auto">
        <!-- Existing background image display -->
        <div
          v-for="(image, index) in backgroundImages"
          :key="index"
          class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2"
        >
          <div class="image-preview">
            <i
              class="delete-icon bi bi-x-circle-fill"
              @click="deleteBackgroundImage(index)"
            ></i>
            <img :src="image" alt="Background Preview" class="w-full h-full" />
          </div>
        </div>
      </div>
    </div>

    <!-- Add background image form -->
    <div class="add-image-box">
      <label for="backgroundFiles" class="upload-label"
        >Upload Background Image:</label
      >
      <input
        id="backgroundFiles"
        type="file"
        @change="chooseBackgroundImage"
        accept="image/png, image/jpeg, image/jpg"
        class="upload-input"
      />
      <Button label="Add Background" @click="addBackgroundImage" />
    </div>
  </div>
</template>

<style scoped>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
.teststyle {
  display: flex;
}
.section-header {
  background-color: #ddd;
  text-align: center;
  padding: 10px;
  font-weight: bold;
}

img {
  height: 200px;
  width: 200px;
  border-radius: 16px;
  border: 1px solid #ddd; /* Added border */
  transition: border 0.3s ease; /* Added transition for smoother effect */
}

.image-preview {
  position: relative;
  overflow: hidden;
  height: 200px;
  width: 200px;
}

.image-preview:hover img {
  border: 1px solid #007bff; /* Border color on hover */
}

.delete-icon {
  position: absolute;
  top: 2%;
  right: 2%;
  font-size: 1.5rem;
  color: white;
  cursor: pointer;
}

.add-image-box {
  margin: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.upload-label {
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.upload-input {
  margin-bottom: 1rem;
}

.upload-input,
button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
}

.add-image-box button {
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
}

.upload-input {
  border: 1px solid #ddd; /* Added border to the upload input */
  border-radius: 4px;
  padding: 8px;
  transition: border 0.3s ease; /* Added transition for smoother effect */
}

.upload-input:hover {
  border: 1px solid #007bff; /* Border color on hover */
}
</style>
<script>
export default {
  data() {
    return {
      images: [
        "https://i.pinimg.com/564x/85/ed/d7/85edd7bc5d79eb83cbc2db777370dc85.jpg",
        "https://i.pinimg.com/564x/85/ed/d7/85edd7bc5d79eb83cbc2db777370dc85.jpg",
        "https://i.pinimg.com/564x/85/ed/d7/85edd7bc5d79eb83cbc2db777370dc85.jpg",
        "https://i.pinimg.com/564x/85/ed/d7/85edd7bc5d79eb83cbc2db777370dc85.jpg",
        "https://i.pinimg.com/564x/85/ed/d7/85edd7bc5d79eb83cbc2db777370dc85.jpg",
      ],
      imagePreview: null,
      filepic: null,
      ///// background /////
      backgroundImages: [
        "https://i.pinimg.com/564x/39/b7/22/39b722ce609425783da1b1fead14bc24.jpg",
        "https://i.pinimg.com/564x/39/b7/22/39b722ce609425783da1b1fead14bc24.jpg",
        "https://i.pinimg.com/564x/39/b7/22/39b722ce609425783da1b1fead14bc24.jpg",
        "https://i.pinimg.com/564x/39/b7/22/39b722ce609425783da1b1fead14bc24.jpg",
        "https://i.pinimg.com/564x/39/b7/22/39b722ce609425783da1b1fead14bc24.jpg",
      ],
      backgroundPreview: null,
      backgroundFilepic: null,
    };
  },
  methods: {
    // Manage Ads Section
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

    // Manage Background Section
    deleteBackgroundImage(index) {
      this.backgroundImages.splice(index, 1);
    },
    chooseBackgroundImage(event) {
      if (this.backgroundFilepic) {
        this.deleteBackgroundImage();
      }

      const file = event.target.files[0];

      if (file) {
        this.backgroundFilepic = file;
        const reader = new FileReader();

        reader.onload = (e) => {
          this.backgroundPreview = e.target.result;
        };

        reader.readAsDataURL(file);
      }
    },
    addBackgroundImage() {
      if (this.backgroundFilepic) {
        this.backgroundImages.push(this.backgroundPreview);
        this.backgroundPreview = null;
        this.backgroundFilepic = null;
      }
    },
  },
};
</script>

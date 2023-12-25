<template>
  <div>
    <i class="pi pi-image cursor-pointer icon-style" @click="getdata" />

    <Dialog
      v-model:visible="sidebar"
      header="แก้ไขรูปภาพ"
      modal
      :style="{ width: '50rem' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
      <div class="flex gap-1 mt-4 mb-4 overflow-x-auto max-w-screen-lg mx-auto">
        <div
          v-for="(image, index) in images"
          :key="index"
          class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2"
        >
          <div class="image-preview">
            <i
              class="delete-icon bi bi-x-circle-fill"
              @click="deleteImage(image)"
            ></i>
            <img
              :src="getImage(image)"
              alt="Ad Preview"
              class="w-full h-full"
            />
          </div>
        </div>
      </div>
      <div class="flex justify-content-center">
        <FileUpload
          mode="basic"
          name="demo[]"
          type="file"
          url="/api/upload"
          accept="image/*"
          id="fileinput"
          ref="fileinput"
          :maxFileSize="1000000"
          @change="onUpload"
          :auto="true"
          chooseLabel="เพิ่มรูปภาพ"
        />
      </div>
    </Dialog>
  </div>
</template>
<script>
import axios from "axios";
export default {
  props: {
    data: Object,
  },
  data() {
    const id = this.data._id;
    console.log(id, "ad");
    return {
      images: [""],
      uploadimage: [""],
      sidebar: false,
      id,
    };
  },
  methods: {
    async getdata() {
      // this.images = this.data.image;
      this.sidebar = true;
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_API}room/${this.id}`,
          {
            headers: { token: localStorage.getItem("token") },
          }
        );
        console.log(response, "test");
        this.images = response.data?.image;
      } catch (error) {
        console.log(error);
      }
    },

    onUpload() {
      const input = this.$refs.fileinput;
      const selectedFiles = Array.from(input.files);
      console.log("Selected Files:", selectedFiles);
      this.uploadimage = selectedFiles;

      for (const image of this.uploadimage) {
        console.log("Uploading image:", image);
        this.uploadImage(image);
      }
    },

    async uploadImage(image) {
      console.log("Uploading image:", image);
      const formData = new FormData();
      formData.append("imgCollection", image);

      try {
        const upimage = await axios.post(
          `${process.env.VUE_APP_API}room/picture/${this.id}`,
          formData,
          { headers: { token: localStorage.getItem("token") } }
        );
        console.log("Upload Image Response:", upimage);
        if (upimage.data) {
          console.log("Success: Image uploaded");
          this.getdata();
        } else {
          console.error("Error: Data is missing in the API response.");
        }
      } catch (error) {
        console.error("Error uploading picture:", error);
      }
    },

    async deleteImage(image) {
      try {
        const response = await axios.delete(
          `${process.env.VUE_APP_API}room/picture/${this.id}/${image}`,
          {
            headers: { token: localStorage.getItem("token") },
          }
        );
        console.log(response, "success delete ");
        this.getdata();
      } catch (error) {
        console.log(error);
      }
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
  },
};
</script>
<style scoped>
.image-preview {
  position: relative;
  overflow: hidden;
  height: 200px;
  width: 200px;
  border-radius: 1rem;
}

.delete-icon {
  position: absolute;
  top: 2%;
  right: 2%;
  font-size: 1.5rem;
  color: white;
  cursor: pointer;
}
</style>

<template>
  <div class="card flex justify-content-center">
    <Galleria v-model:visible="displayBasic" :value="image" :responsiveOptions="responsiveOptions" :numVisible="9"
      containerStyle="max-width: 50%" :circular="true" :fullScreen="true" :showItemNavigators="true">
      <template v-slot:item="{ item }">
        <img :src="getImage(item)" :alt="item.alt" style="width: 80%; display: block" />
      </template>
      <template v-slot:thumbnail="{ item }">
        <img :src="getImage(item)" :alt="item.alt" style=" display: block ;width:50px ;height:50px " />
      </template>
    </Galleria>

    <Button label="รูปภาพ" class="hover:bg-blue-700" style="background-color: #3bb2f6; border:none" icon="pi pi-eye
    " @click="displayBasicFunc" />
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  props: {
    data: Object,
  },
  setup() {
    const responsiveOptions = ref([
      {
        breakpoint: "1500px",
        numVisible: 5,
      },
      {
        breakpoint: "1024px",
        numVisible: 3,
      },
      {
        breakpoint: "768px",
        numVisible: 2,
      },
      {
        breakpoint: "560px",
        numVisible: 1,
      },
    ]);

    return {
      responsiveOptions,
    };
  },
  data() {
    return {
      image: [''],
      displayBasic: false,
    };
  },
  methods: {
    async displayBasicFunc() {
      try {
        this.image = this.data.image;
        if (this.image && this.image.length > 0) {
          this.displayBasic = true;
        } else {
          console.log("No images to display.");
        }
      } catch (error) {
        console.error(error, "error");
      }
    },
    getImage(item) {
      if (typeof item === "string") {
        return `https://drive.google.com/uc?export=view&id=${item}`;
      } else if (Array.isArray(item) && item.length > 0) {
        return item.map((imageId) => `https://drive.google.com/uc?export=view&id=${imageId}`);
      } else {
        return "";
      }
    },
  },
};
</script>

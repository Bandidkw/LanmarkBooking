<template>
    <Button @click="getEmployee" icon="pi pi-list" class="p-button-purple" :label="title" :loading="loading" />

 
</template>

<script>
//import { ref, onMounted, watchEffect } from 'vue';
//import axios from 'axios';
export default {
  props: {
    shop_id:String,
    data:Object,
    title: String,
  },
  data:()=>({
    loading: false,
    sidebar: false,
  }),
  methods:{
    
  }
};

</script>

<style scoped>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
</style>
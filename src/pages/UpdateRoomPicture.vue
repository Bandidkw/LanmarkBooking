<template>
  <div class="content">
    <div class="row">
      <div class="col-md-8">
          <UpdatePictureForm />
      </div>
      <div class="col-md-4">
        <img class="mb-2" src="/images/hotel.jpg" />
        <img src="/images/nba_bus.jpg" />
      </div>
    </div>
  </div>
</template>

<script>
import UpdatePictureForm from "./CreateRoom/UpdatePictureForm.vue";
export default {
  components: {
    UpdatePictureForm,
  },
};
</script>

<style scoped>
</style>

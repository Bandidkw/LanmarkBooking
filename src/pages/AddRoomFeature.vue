<template>
  <div class="content">
    <div class="row">
      <div class="col-md-8">
        <CreateRoomForm :model="model" />
      </div>
      <div class="col-md-4">
        <img class="mb-2" src="/images/hotel.jpg" />
        <img src="/images/nba_bus.jpg" />
      </div>
    </div>
  </div>
</template>
<script>
import CreateRoomForm from "./CreateRoom/AddRoomFeatureForm.vue";

export default {
  components: {
    CreateRoomForm,
  },
  data() {
    return {
      model: {
        id: "",
      },
    };
  },
};
</script>

<style scoped></style>
1

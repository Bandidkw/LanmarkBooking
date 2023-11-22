<template>
  <div class="flex flex-col px-40">

  <div class="container px-20 py-4">
    <div class="px-40 flex justify-between">
      <h1 class="text-2xl">{{ hotel.name }}</h1>
      <router-link to="/">กลับหน้าแรก</router-link>
    </div>
  </div>
  <div v-if="large" class="img-grid px-36">
    <!-- รูปภาพใหญ่ -->
    <img class="w-full" :src="hotel.images.large" alt="Large Image" />

    <!-- รูปภาพเล็ก -->
    <div class="small-images">
      <img
        v-for="(image, index) in hotel.images.small"
        :key="index"
        :src="image"
        alt="Small Image"
      />
    </div>

    <!-- </div> -->
  </div>
  <!-- eslint-disable-next-line vue/no-multiple-template-root -->
  <div class="flex pt-4 px-36 justify-between">
    <div class="w-3/6">
      <div class="details m-0 p-2 border-b-2 border-b-sky-400">
        <h1 class="text-2xl font-bold">{{ hotel.name }}</h1>
        <p>{{ hotel.desciption }}</p>
        <p>{{ hotel.review }}</p>
        <!-- รายละเอียดเพิ่มเติม -->
      </div>
      <div
        class="host-info flex h-24 gap-x-6 py-4 w-full border-b-2 border-b-sky-400"
      >
        <div class="host-img">
          <img
            class="w-full h-full rounded-full"
            src="/images/host-img/person.jpg"
            alt=""
          />
        </div>
        <div class="host-detail flex flex-col justify-center">
          <h3 class="font-bold">โฮสต์โดย ............</h3>
          <p>เจ้าของที่พักดีเด่นให้เช่าที่พักมา ... ปี</p>
        </div>
      </div>
      <div class="flex flex-col py-4 h-56 gap-y-4 border-b-2 border-b-sky-400">
        <div class="flex gap-x-6 h-12">
          <div class="icon-box">
            <i class="bi bi-save text-2xl"></i>
          </div>
          <div>
            <p class="text-base font-bold">เจ้าของที่พักดีเด่น</p>
            <p class="text-base">เจ้าของที่พักที่มีประสบการณ์และได้คะแนนสูง</p>
          </div>
        </div>
        <div class="flex gap-x-6">
          <div class="icon-box">
            <i class="bi bi-clock-history text-2xl"></i>
          </div>
          <div class="text-detail">
            <p class="text-base font-bold">ประสบการณ์การเช็คอินดีเยี่ยม</p>
            <p class="text-base">
              ผู้เข้าพัก 92%
              จากจำนวนผู้เข้าพักล่าสุดได้ให้คะแนนขั้นตอนการเช็คอินที่ระดับ 5 ดาว
            </p>
          </div>
        </div>
        <div class="flex gap-x-6">
          <div class="icon-box">
            <i class="bi bi-calendar-x text-2xl"></i>
          </div>
          <div>
            <p class="text-base font-bold">ยกเลิกฟรีก่อนวันที่ ........</p>
          </div>
        </div>
      </div>
      <div class="hotel-info h-64 border-b-2 border-b-sky-400 pt-5 pb-12">
        <div class="hotel-info-box">
          <p class="text-base text-justify p-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut,
            architecto ut placeat temporibus natus doloremque commodi quo dolor
            quia in delectus deleniti provident molestias cum amet consequatur
            esse quos, dolore ab modi inventore! Earum, distinctio consectetur?
            Beatae qui fugit, non aspernatur illo sit officiis obcaecati quo,
            repellendus velit magnam aliquam?
          </p>
        </div>
        <div class="flex more-btn p-2 cursor-pointer">
          <span>เพิ่มเติม</span>
          <i class="bi bi-chevron-double-right"></i>
        </div>
      </div>
      <div class="sleep-place h-[253px] py-12">
        <h2 class="pb-6">สถานที่นอน</h2>
        <div
          class="flex flex-col gap-y-1 sleep-box border-2 border-black rounded-2xl w-[207px] h-[143px] p-4"
        >
          <div class="gap-x-3 flex">
            <i class="bi bi-usb-mini text-2xl"></i>
            <i class="bi bi-usb-micro text-2xl"></i>
          </div>
          <div>
            <p class="font-bold">ห้องนอน</p>
          </div>
          <div>
            <p>1 เตียงนอน 1 ฟูก</p>
          </div>
        </div>
      </div>
    </div>

  </div>
</div>
</template>

<script>

export default {
  props: ["id"],
  components: {

  },
  computed: {
    hotel() {
      const hotelId = this.$route.params.id;
      const hotels = [
      {
          id: 0,
          name: "Hotel A Detail",
          details: "Luxurious hotel with amazing amenities.",
          date: "2023-11-15",
          desciption: "3 คน 1 เตียง 1 ห้องนอน 1 ห้องน้ำ",
          price: 1500,
          review: "รีวิว",
          images: {
            large: "/images/hotel-room/room01.jpg",
            small: [
              "/images/hotel-room/room02.jpg",
              "/images/hotel-room/room03.jpg",
              "/images/hotel-room/room04.jpg",
              "/images/hotel-room/room05.jpg",
            ],
          },
        },
        {
          id: 1,
          name: "Hotel B",
          details: "Cozy boutique hotel in the heart of the city.",
          date: "2023-11-15",
          price: 2500,
          images: {
            large: "/images/hotel-room/room02.jpg",
            small: [
              "/images/hotel-room/room05.jpg",
              "/images/hotel-room/room04.jpg",
              "/images/hotel-room/room03.jpg",
              "/images/hotel-room/room02.jpg",
            ],
          },
        },
        {
          id: 2,
          name: "Hotel C",
          details:
            "Experience the epitome of luxury at our 5-star hotel with breathtaking views and unparalleled service.",
          date: "2023-11-16",
          price: 5000,
          images: {
            large: "/images/hotel-room/room03.jpg",
            small: [
              "/images/hotel-room/room02.jpg",
              "/images/hotel-room/room03.jpg",
              "/images/hotel-room/room06.jpg",
              "/images/hotel-room/room04.jpg",
            ],
          },
        },
        {
          id: 3,
          name: "Hotel D",
          details:
            "Charm meets comfort in our boutique hotel located in the heart of the city. Perfect for urban explorers.",
          date: "2023-11-16",
          price: 3000,
          images: {
            large: "/images/hotel-room/room04.jpg",
            small: [
              "/images/hotel-room/room03.jpg",
              "/images/hotel-room/room01.jpg",
              "/images/hotel-room/room04.jpg",
              "/images/hotel-room/room06.jpg",
            ],
          },
        },
        {
          id: 4,
          name: "Hotel E",
          details:
            "Escape to our seaside resort and indulge in a serene atmosphere with stunning ocean views and pristine beaches.",
          date: "2023-11-17",
          price: 4500,
          images: {
            large: "/images/hotel-room/room05.jpg",
            small: [
              "/images/hotel-room/room05.jpg",
              "/images/hotel-room/room03.jpg",
              "/images/hotel-room/room01.jpg",
              "/images/hotel-room/room04.jpg",
            ],
          },
        },
        {
          id: 5,
          name: "Hotel F",
          details:
            "Embrace nature at our mountain lodge retreat. Surrounded by lush greenery and majestic mountain views.",
          date: "2023-11-18",
          price: 3500,
          images: {
            large: "/images/hotel-room/room06.jpg",
            small: [
              "/images/hotel-room/room03.jpg",
              "/images/hotel-room/room04.jpg",
              "/images/hotel-room/room01.jpg",
              "/images/hotel-room/room05.jpg",
            ],
          },
        },
      ]
      const selectedHotel = hotels.find((hotel) => hotel.id == hotelId);

      return selectedHotel || null;
    },
    },
};
</script>

<style>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
.detail-container {
  padding: 0 5rem;
  width: 100%;
  height: 100vh;
}
.img-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(1, 500px);
}
.img-grid img {
  padding: 0.5rem;
  height: 100%;
}
.small-box {
  display: grid;
}
.small-images {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 250px);
}

.small-images img {
  padding: 0.5rem;
  width: 100%;
  height: 100%;
}
.details {
  margin-top: 20px;
}
.icon-box {
  padding-left: 0.6rem;
  display: flex;
  justify-content: center;
}
</style>

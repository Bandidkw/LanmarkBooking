<template>
  <div class="container flex flex-col px-40 white-container">
    <div class="container px-20 py-4">
      <div class="px-40 text-center head-info">
        <h1 class="text-2xl">{{ roomdata.name }}</h1>
      </div>
      <!-- <div class="flex flex-col justify-content-start">
        <Rating v-model="value" :stars="10" />
      </div> -->
    </div>
    <div class="image-box py-2 w-full h-[31.25rem] flex gap-x-2">
      <div class="w-2/4 large-box">
        <img
          v-if="roomdata && roomdata.image && roomdata.image.length > 0"
          class="w-full h-full rounded-s-2xl"
          :src="getImage(roomdata.image)"
          alt="Large Image"
        />
        <!-- ถ้าไม่มีรูปภาพ -->
        <div
          v-else
          class="w-full h-full flex items-center justify-center bg-gray-300 rounded-s-2xl"
        >
          <p class="text-xl font-semibold">ไม่มีรูปภาพ</p>
          <!-- แสดงข้อมูลรูปภาพ (หากต้องการ) -->
        </div>
      </div>
      <!-- ตรวจสอบว่ามีรูปภาพหรือไม่ และแสดงรูปภาพทีละรูป -->
      <div
        v-if="roomdata && roomdata.image && roomdata.image.length > 0"
        class="w-2/4 m-0 small-box grid grid-cols-2 grid-rows-2 gap-2"
      >
        <!-- ตรวจสอบและแสดงรูปภาพทีละรูป -->
        <img
          v-if="roomdata.image.length > 1"
          class="w-full h-full"
          :src="getImage(roomdata.image?.[1])"
          alt=""
        />
        <!-- ถ้าไม่มีรูปภาพ -->
        <div
          v-else
          class="w-full h-full flex items-center justify-center bg-gray-300"
        >
          <p class="text-xl font-semibold">ไม่มีรูปภาพ</p>
        </div>
        <!-- ตรวจสอบและแสดงรูปภาพทีละรูป -->
        <img
          v-if="roomdata.image.length > 2"
          class="w-full h-full rounded-tr-2xl"
          :src="getImage(roomdata.image?.[2])"
          alt=""
        />
        <!-- ถ้าไม่มีรูปภาพ -->
        <div
          v-else
          class="w-full h-full flex items-center justify-center bg-gray-300 rounded-tr-2xl"
        >
          <p class="text-xl font-semibold">ไม่มีรูปภาพ</p>
        </div>
        <!-- ตรวจสอบและแสดงรูปภาพทีละรูป -->
        <img
          v-if="roomdata.image.length > 3"
          class="w-full h-full"
          :src="getImage(roomdata.image?.[3])"
          alt=""
        />
        <!-- ถ้าไม่มีรูปภาพ -->
        <div
          v-else
          class="w-full h-full flex items-center justify-center bg-gray-300"
        >
          <p class="text-xl font-semibold">ไม่มีรูปภาพ</p>
        </div>
        <!-- ตรวจสอบและแสดงรูปภาพทีละรูป -->
        <img
          v-if="roomdata.image.length > 4"
          class="w-full h-full rounded-br-2xl"
          :src="getImage(roomdata.image?.[4])"
          alt=""
        />
        <!-- ถ้าไม่มีรูปภาพ -->
        <div
          v-else
          class="w-full h-full flex items-center justify-center bg-gray-300 rounded-br-2xl"
        >
          <p class="text-xl font-semibold">ไม่มีรูปภาพ</p>
        </div>
      </div>
    </div>
    <div
      class="flex pt-4 px-5 justify-between border h-[850px] rounded-2xl gap-x-8 max-[430px]:flex-col max-[430px]:h-auto max-[414px]:flex-col max-[414px]:h-auto"
    >
      <!-- รายละเอียด -->
      <div class="w-1/2 max-[414px]:w-full max-[430px]:w-full">
        <div class="details m-0 p-2 border-b-2 border-[#3b82f6]">
          <div class="flex justify-between mb-4">
            <h1 class="text-2xl font-bold">{{ roomdata.name }}</h1>
            <div class="flex flex-col justify-content-start">
              <p class="text-base font-semibold">รีวิว {{ averageRating }}</p>
            </div>
          </div>
          <p>
            {{ roomdata.guests }} คน || {{ roomdata.bedroom }} ห้องนอน ||
            {{ roomdata.bed }} เตียง || {{ roomdata.bathroom }} ห้องน้ำ
          </p>
          <!-- รายละเอียดเพิ่มเติม -->
        </div>
        <div
          class="host-info flex h-24 gap-x-6 py-4 w-full border-b-2 border-[#3b82f6] max-[430px]:justify-between max-[414px]:py-2 max-[414px]:px-4 max-[414px]:justify-between"
        >
          <div class="host-img">
            <img
              class="w-full h-full rounded-full"
              src="/images/host-img/person.jpg"
              alt=""
            />
          </div>
          <div class="host-detail flex flex-col justify-center">
            <h3 class="font-bold">โฮสต์โดย {{ roomdata.partner_id?.name }}</h3>
          </div>
        </div>
        <div class="hotel-info h-64 border-b-2 border-[#3b82f6] pt-5 pb-12">
          <div class="hotel-info-box">
            <p class="text-base text-justify p-2">
              {{ roomdata.description }}
            </p>
          </div>
        </div>
        <div
          class="sleep-place h-[253px] py-12 max-[414px]:py-4 max-[430px]:py-4"
        >
          <h2 class="pb-3">สถานที่นอน</h2>
          <div
            class="flex flex-col gap-y-1 sleep-box border-2 border-black rounded-2xl w-[207px] h-[143px]"
          >
            <div class="gap-x-3 flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                aria-hidden="true"
                role="presentation"
                focusable="false"
                style="
                  display: block;
                  height: 24px;
                  width: 24px;
                  fill: currentcolor;
                "
              >
                <path
                  d="M28 2a2 2 0 0 1 2 1.85v9.99l1.85 5.54a3 3 0 0 1 .11.46l.03.24.01.24V30h-2v-2H2v2H0v-9.68a3 3 0 0 1 .09-.71l.06-.23L2 13.84V4a2 2 0 0 1 1.7-1.98L3.85 2H4zm2 20H2v4h28zm-1.39-6H3.4l-1.34 4h27.9zM28 4H4v10h2v-4a2 2 0 0 1 1.85-2H24a2 2 0 0 1 2 1.85V14h2zm-13 6H8v4h7zm9 0h-7v4h7z"
                ></path>
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                aria-hidden="true"
                role="presentation"
                focusable="false"
                style="
                  display: block;
                  height: 24px;
                  width: 24px;
                  fill: currentcolor;
                "
              >
                <path
                  d="M28 2a2 2 0 0 1 2 1.85v9.99l1.85 5.54a3 3 0 0 1 .11.46l.03.24.01.24V30h-2v-2H2v2H0v-9.68a3 3 0 0 1 .09-.71l.06-.23L2 13.84V4a2 2 0 0 1 1.7-1.98L3.85 2H4zm2 20H2v4h28zm-1.39-6H3.4l-1.34 4h27.9zM28 4H4v10h2v-4a2 2 0 0 1 1.85-2H24a2 2 0 0 1 2 1.85V14h2zm-13 6H8v4h7zm9 0h-7v4h7z"
                ></path>
              </svg>
            </div>
            <div>
              <p class="font-bold">ห้องนอน</p>
            </div>
            <div>
              <p>
                {{ roomdata.bedroom }} เตียงนอน {{ roomdata.bathroom }} ห้องน้ำ
              </p>
            </div>
          </div>
          <div class="hotel-info-b border-t-2 mt-3 border-[#3b82f6]">
            พิกัด :
            <p>
              {{ roomdata.address }} ตำบล: {{ roomdata.tambon }} อำเภอ:
              {{ roomdata.amphure }} จังหวัด: {{ roomdata.province }}
            </p>
          </div>
        </div>
      </div>
      <div
        class="reserve-box w-1/2 text-center border-2 rounded-2xl h-[350px] shadow-md max-[430px]:w-full max-[430px]:my-4 max-[414px]:w-full max-[414px]:my-4"
      >
        <div class="rounded">
          <div class="w-full md:w-1/2 mb-6 md:mb-0 mt-3">
            <label
              class="block uppercase tracking-wide text-gray-700 text-base font-bold mb-2"
              for="grid-first-name"
            >
              เลือกวันจอง - วันสิ้นสุดการจอง
            </label>
            <Calendar
              v-model="selectedDate"
              dateFormat="dd/mm/yy"
              selectionMode="range"
              :manualInput="false"
              :numberOfMonths="2"
              showIcon
              class="border p-2 rounded bg-white"
              :minDate="minSelectableDate"
              :disabled-dates="disabledDates"
            />
          </div>
          <div class="w-full md:w-1/2 mb-6 md:mb-0 mt-3">
            <label
              class="block uppercase tracking-wide text-gray-700 text-base font-bold mb-2"
              for="grid-first-name"
            >
              ราคา : {{ price.toLocaleString() }} บาท
            </label>
          </div>
          <div class="mx-auto w-60 my-3 booking-box">
            <button
              @click="visible = true"
              class="booking-btn px-4 py-2 bg-blue-500 text-white text-center hover:bg-blue-700 rounded w-full"
              type="button"
            >
              จอง
            </button>
          </div>
        </div>
      </div>
      <Dialog
        v-model:visible="visible"
        maximizable
        modal
        header="จองห้อง"
        :style="{ width: '50rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
      >
        <p>
          วันที่เริ่มจอง {{ formatDate(selectedDate[0]) }} ถึงวันที่
          {{ formatDate(selectedDate[1]) }}
        </p>
        <p>ราคา : {{ price.toLocaleString() }} บาท</p>
        <div class="flex align-items-center gap-2 mb-3 mt-3">
          <i class="bi bi-credit-card-fill"> </i>
          <Checkbox v-model="credit" name="credit" value="credit" />
        </div>
        <div class="flex align-items-center gap-2">
          <i class="bi bi-qr-code-scan"> </i>
          <Checkbox v-model="qrcode" name="qrcode" value="qrcode" />
        </div>
        <div v-show="qrcode">
          <img
            src="data:image/png;base64,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"
            alt=""
          />
          <FileUpload
            mode="basic"
            name="demo[]"
            url="/api/upload"
            accept="image/*"
            customUpload
            @uploader="customBase64Uploader"
          />
        </div>

        <div class="mx-auto w-60 my-3 booking-box">
          <button
            @click="addbooking"
            class="booking-btn px-4 py-2 bg-blue-500 text-white text-center hover:bg-blue-700 rounded w-full"
            type="button"
          >
            จอง
          </button>
        </div>
      </Dialog>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Rating from "primevue/rating";

import { onMounted, ref } from "vue";
import Swal from "sweetalert2";
onMounted(() => {
  getroom();
});

export default {
  components: {
    Rating,
  },
  props: ["id"],
  data() {
    const roomdata = ref([]);
    const visible = ref(false);
    const value = ref(null);
    const credit = ref(false);
    const qrcode = ref(false);

    const room_id = this.$route.params.id;
    const getroom = async (_id) => {
      try {
        const id = this.$route.params.id;
        const response = await axios.get(
          `${process.env.VUE_APP_API}room/${id}`
        );
        this.roomdata = response.data;

        // ตรวจสอบค่า rating และตั้งค่าให้กับ value
        if (this.roomdata.rating) {
          this.value = this.roomdata.rating;
        }

        this.price = this.roomdata.price;
      } catch (error) {
        console.error("Error fetching room data:", error);
        // จัดการข้อผิดพลาด, เช่นแสดงข้อความสำหรับผู้ใช้
      }
    };
    const customBase64Uploader = async (event) => {
      const file = event.files[0];
      const reader = new FileReader();
      let blob = await fetch(file.objectURL).then((r) => r.blob()); //blob:url

      reader.readAsDataURL(blob);

      reader.onloadend = function () {
        const base64data = reader.result;
      };
    };
    onMounted(() => {
      getroom();
      // this.isLoggedIn = checkLoginStatus();
    });
    return {
      value,
      room_id,
      selectedDate: "",
      roomdata,
      price: "0",
      minSelectableDate: new Date(),
      //โค้ดปิดวัน
      disabledDates: [new Date(2023, 10, 29), new Date(2023, 10, 30)],
      visible,
      credit,
      qrcode,
      customBase64Uploader,
      // isLoggedIn: false,
    };
  },

  watch: {
    selectedDate: {
      handler(date) {
        console.log("ใช้");
        if (this.selectedDate[0]) {
          this.price = this.roomdata.price;
        }
        if (this.selectedDate[1]) {
          const startDate = new Date(this.selectedDate[0]);
          const endDate = new Date(this.selectedDate[1]);
          // คำนวณจำนวนวัน
          const timeDiff = endDate.getTime() - startDate.getTime();
          const nights = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
          this.price = this.roomdata.price * (nights + 1);
        }
      },
    },
  },
  methods: {
    async addbooking() {
      try {
        console.log(this.selectedDate);
        if (localStorage.getItem("token") != null) {
          if (this.selectedDate != "") {
            const response = await axios.post(
              `${process.env.VUE_APP_API}booking/`,
              {
                room_id: this.room_id,
                date_from: this.selectedDate[0],
                date_to: this.selectedDate[1],
                price: this.price,
              },
              {
                headers: {
                  token: localStorage.getItem("token"),
                },
              }
            );
            if (response.data.status === true) {
              Swal.fire({
                icon: "success",
                title: "จองสำเร็จ",
                text: response.data.message,
              });
              await this.$router.push("/bookingmember");
            } else {
              await Swal.fire({
                icon: "error",
                title: "เกิดข้อผิดพลาด",
                text: response.data.message,
              });
            }
          } else {
            await Swal.fire({
              icon: "error",
              title: "กรุณาเลือกวัน",
              text: "กรุณาวันที่คุณต้องการจอง",
            });
          }
        } else {
          await Swal.fire({
            icon: "error",
            title: "กรุณาล็อคอิน",
            text: "ก่อนจะจองกรุณาล็อคอินก่อน",
          });
        }
      } catch (error) {
        await Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด",
          text: error,
        });
      }
    },
    getImage(item) {
      if (typeof item === "string") {
        return `https://drive.google.com/uc?export=view&id=${item}`;
      } else if (Array.isArray(item) && item.length > 0) {
        const firstImageId = item[0];
        return `https://drive.google.com/uc?export=view&id=${firstImageId}`;
      } else {
        return "";
      }
    },
    formatDate(dateString) {
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        // hour: "numeric",
        // minute: "numeric",
        // second: "numeric",
      };
      const formattedDate = new Date(dateString).toLocaleDateString(
        "th-TH",
        options
      );
      return formattedDate;
    },
  },
  computed: {
    averageRating() {
      if (this.value && this.value.length > 0) {
        const sum = this.value.reduce((total, rating) => total + rating, 0);
        const average = sum / this.value.length;
        return average.toFixed(1);
      } else {
        return "N/A";
      }
    },
  },
};
</script>

<style scoped>
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
  /* grid-template-rows: repeat(1, 500px); */
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

.p-calendar-w-btn .p-datepicker-trigger {
  padding: 0.8rem;
  color: #fff;
  border-top-left-radius: 0;
  background-color: #3b82f6;
  border-bottom-left-radius: 0;
}

.icon-box {
  padding-left: 0.6rem;
  display: flex;
  justify-content: center;
}

/* ปฏิทิน */
.custom-event-marker {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #e74c3c;
  opacity: 0.5;
}

.sleep-box {
  padding: 1rem;
}

.booked {
  background-color: #e74c3c;
}

.available {
  background-color: #2ecc71;
}

.hotel-info-b {
  padding: 1.25rem 0;
}
.reserve-box {
  box-shadow: 0px 1px 10px 2px #3b82f6;
}

@media screen and (max-width: 1024px) {
  .white-container {
    padding: 0 5rem;
  }
}

@media screen and (max-width: 430px) {
  .container {
    padding: 0 1rem;
  }

  .head-info {
    padding: 0;
  }

  .image-box {
    row-gap: 0.5rem;
    height: auto;
    flex-direction: column;
  }

  .large-box {
    grid-gap: 0.5rem;
    width: 100%;
  }

  .large-box img {
    border-radius: 0;
    margin: 0;
    padding: 0;
  }

  .small-box {
    width: 100%;
    height: 100%;
  }

  .small-box img {
    border-radius: 0;
  }

  .booking-box {
    margin: 0;
    width: auto;
  }

  .booking-btn {
    margin: 0;
    padding: 0;
  }

  .hotel-box {
    height: auto;
  }

  .hotel-info {
    height: fit-content;
  }

  .sleep-box {
    padding: 0.5rem;
    width: 100%;
    height: auto;
  }
  .hotel-info-b {
    margin-top: 1rem;
  }
}
@media screen and (max-width: 414px) {
  .container {
    padding: 0 1rem;
  }

  .head-info {
    padding: 0;
  }

  .image-box {
    row-gap: 0.5rem;
    height: auto;
    flex-direction: column;
  }

  .large-box {
    grid-gap: 0.5rem;
    width: 100%;
  }

  .large-box img {
    border-radius: 0;
    margin: 0;
    padding: 0;
  }

  .small-box {
    width: 100%;
    height: 100%;
  }

  .small-box img {
    border-radius: 0;
  }

  .booking-box {
    margin: 0;
    width: auto;
  }

  .booking-btn {
    margin: 0;
    padding: 0;
  }

  .hotel-box {
    height: auto;
  }

  .hotel-info {
    height: fit-content;
  }

  .sleep-box {
    padding: 0.5rem;
    width: 100%;
    height: auto;
  }
  .hotel-info-b {
    margin-top: 1rem;
  }
}
</style>

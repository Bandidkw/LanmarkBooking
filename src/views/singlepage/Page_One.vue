<template>
  <div class="container flex flex-col px-40 white-container">
    <div class="container px-20 py-4">
      <div class="px-40 text-center head-info">
        <h1 class="text-2xl">{{ roomdata.name }}</h1>
      </div>
    </div>
    <div
      class="image-box py-2 w-full h-[31.25rem] flex gap-x-2"
      style="position: relative"
    >
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
      <div
        class="flex items-center justify-center rounded-[10px] gap-x-1 p-2"
        style="
          padding: 0.3rem;
          background: white;
          right: 15px;
          bottom: 15px;
          position: absolute;
        "
      >
      <i class="pi pi-clone"></i>
        <button @click="openImagePopup" class="text-sm font-normal">
          แสดงรูปทั้งหมด
        </button>
      </div>

      <!-- Popup แสดงรูปภาพ -->

      <div
        v-if="popupVisible"
        @click="closeModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] scroll-auto"
      >
        <div
          class="w-2/4 h-3/4 bg-white py-4 px-4 rounded-lg relative scroll-auto"
          style="overflow: auto"
        >
          <!-- ปุ่มปิด Popup -->
          <Button
            @click="closeImagePopup"
            class="top-1 right-1 absolute rounded-[50%] p-1"
            style="width: 1.5rem; height: 1.5rem"
            icon="bi bi-x-circle-fill"
          />

          <!-- รูปภาพทั้งหมดใน Popup -->
          <div>
            <img
              v-for="(img, index) in roomdata.image"
              :key="index"
              :src="getImage(img)"
              alt="Room Image"
              class="w-full h-auto mt-2 rounded-lg"
            />
          </div>
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
          class="host-info flex h-28 gap-x-6 py-4 w-full border-b-2 border-[#3b82f6] max-[430px]:justify-between max-[414px]:py-2 max-[414px]:px-4 max-[414px]:justify-between"
        >
          <div>
            <img
              class="w-16 h-16 rounded-full object-cover overflow-hidden"
              :src="getImage(roomdata?.partner_id?.image)"
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
      <div class="w-1/2 flex flex-col gap-y-16">
        <div
          class="reserve-box w-full text-center border-2 rounded-2xl h-[350px] shadow-md max-[430px]:w-full max-[430px]:my-4 max-[414px]:w-full max-[414px]:my-4"
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
              >
                <template #date="slotProps">
                  <strong
                    v-if="isDateInCombinedRange(slotProps.date)"
                    style="text-decoration: line-through; color: red"
                  >
                    {{ slotProps.date.day }}
                  </strong>
                </template>
              </Calendar>
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
              <Button
                @click="visible = true"
                class="booking-btn px-4 py-2 rounded-xl bg-blue-500 text-white text-center hover:bg-blue-700 rounded w-full"
                type="button"
                :disabled="!selectedDate"
                label="จอง"
              />
            </div>
          </div>
        </div>
        <div
          class="card reserve-box w-full border-2 rounded-2xl h-[350px] shadow-md max-[430px]:w-full max-[430px]:my-4 max-[414px]:w-full max-[414px]:my-4 overflow-y-scroll"
        >
          <Card>
            <template #title> Mockup Review </template>
            <template #content>
              <div
                v-for="(item, index) in review"
                :key="index"
                class="review-item border-b pb-4 mb-4"
              >
                <div class="flex items-center mb-2">
                  <span v-for="i in item.star" :key="i" class="text-yellow-500"
                    >&#9733;</span
                  >
                </div>
                <div>
                  <p class="font-bold">{{ item.name }}</p>
                  <p class="text-gray-600">{{ item.description }}</p>
                </div>
              </div>
            </template>
          </Card>
        </div>
      </div>
      <Dialog
        v-model:visible="visible"
        maximizable
        modal
        header="จองห้อง"
        :style="{ width: '35rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
      >
        <p class="text-lg text-center mb-2">
          <span class="font-semibold">วันที่เริ่มจอง:</span>
          <span>{{ formatDate(selectedDate[0]) }}</span>
          <span class="mx-2">ถึง</span>
          <span>{{ formatDate(selectedDate[1]) }}</span>
        </p>

        <p class="text-md text-center font-semibold">
          <span>ราคา: </span>
          <span class="text-primary">{{ price.toLocaleString() }}</span>
          <span> บาท</span>
        </p>
        <div class="flex align-items-center gap-2 mb-3 mt-5">
          <i class="bi bi-credit-card-fill"> </i>
          <label class="text-sm" for="credit">: จ่ายผ่านบัตรเครดิต</label>
          <Checkbox
            v-model="credit"
            :binary="true"
            @change="handleCheckboxChange('credit')"
          />
        </div>
        <div class="flex align-items-center gap-2">
          <i class="bi bi-qr-code-scan"> </i>
          <label class="text-sm" for="qrcode">: จ่ายผ่านการสแกน QR CODE</label>
          <Checkbox
            v-model="qrcode"
            :binary="true"
            @change="handleCheckboxChange('qrcode')"
          />
        </div>
        <div class="mt-4 flex justify-content-center">
          <img
            v-show="qrcode"
            :src="getImage(imageQrCode)"
            style="width: 200px"
          />
        </div>

        <div class="mx-auto w-60 my-3 booking-box">
          <Button
            @click="addbooking"
            label="จอง"
            class="booking-btn px-4 py-2 bg-blue-500 rounded-xl text-white text-center hover:bg-blue-700 rounded w-full"
            type="button"
            :disabled="isButtonDisabled"
          />
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
import { User } from "../../service/user";

export default {
  components: {
    Rating,
  },
  props: ["id"],
  data() {
    const user = new User();
    const roomdata = ref([]);
    const imageQrCode = ref([]);
    const visible = ref(false);
    const value = ref(null);
    const credit = ref(false);
    const qrcode = ref(false);
    const room_id = this.$route.params.id;
    const review = ref([
      { star: 0, name: "John Doe", description: "Bad experience!" },
      { star: 2, name: "John Doe", description: "Bad experience!" },
      { star: 5, name: "John Doe", description: "Bad experience!" },
      { star: 6, name: "John Doe", description: "Bad experience!" },
      { star: 9, name: "John Doe", description: "Bad experience!" },
      { star: 10, name: "John Doe", description: "Bad experience!" },
      { star: 7, name: "John Doe", description: "Bad experience!" },
      { star: 3, name: "John Doe", description: "Bad experience!" },
    ]);

    // ฟังก์ชันสำหรับดึงข้อมูลห้องพัก
    const getroom = async (_id) => {
      try {
        const id = this.$route.params.id;
        const response = await axios.get(
          `${process.env.VUE_APP_API}room/${id}`
        );
        this.roomdata = response.data;
        this.imageQrCode = response.data.partner_id.image_bank;
        this.allImages = response.data.image.map((img) => {
          return `https://drive.google.com/uc?export=view&id=${img}`;
        });
        if (this.roomdata.rating) {
          this.value = this.roomdata.rating;
        }
        this.price = this.roomdata.price;
      } catch (error) {
        console.error("Error fetching room data:", error);
      }
    };

    const combinedDates = ref([]);

    const isDateInCombinedRange = (date) => {
      const currentDate = new Date(date.year, date.month, date.day);
      for (const combinedDateRange of combinedDates.value) {
        const [startDate, endDate] = combinedDateRange.split(" - ");
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);

        if (currentDate >= startDateObj && currentDate <= endDateObj) {
          return true;
        }
      }
      return false;
    };

    const validateDate = async () => {
      try {
        const id = this.$route.params.id;
        const result = await user.GetBooking();
        const matchingBookings = result.data.filter(
          (item) => item.room_id && item.room_id._id === id
        );

        if (matchingBookings.length > 0) {
          const Dates = matchingBookings.map((booking) => {
            const dateFrom = new Date(booking.date_from);
            const dateTo = new Date(booking.date_to);

            return `${
              dateFrom.getMonth() + 1
            }/${dateFrom.getDate()}/${dateFrom.getFullYear()} - ${
              dateTo.getMonth() + 1
            }/${dateTo.getDate()}/${dateTo.getFullYear()}`;
          });

          combinedDates.value = Dates;
        } else {
          console.log("No bookings found for room_id:", id);
        }
      } catch (error) {
        console.error("Error validating date:", error);
      }
    };

    // const getReview = async (_id) => {
    //   try {
    //     const res = await axios.get(
    //       `${process.env.VUE_APP_API}review/byid/${_id}`
    //     );
    //     this.review = res.data;
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };

    const addbooking = async () => {
      try {
        if (localStorage.getItem("token") != null) {
          console.log("วันที่เริ่มจอง:", this.selectedDate[0]);
          console.log("จองถึงวันที่:", this.selectedDate[1]);
          if (this.credit === true) {
            // ทำการจองพร้อมการชำระเงิน
            const response = await axios.post(
              `${process.env.VUE_APP_API}newbooking/bookingandpayment/`,
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
            if (response) {
              Swal.fire({
                icon: "success",
                title: "จองสำเร็จ",
                text: response.data.message,
              });
              await this.$router.push("/bookingmember");
            } else {
              // แสดงข้อความผิดพลาด
              await Swal.fire({
                icon: "error",
                title: "เกิดข้อผิดพลาด",
                text: response.data.message,
              });
            }
          } else {
            // ทำการจองโดยปกติ
            const response = await axios.post(
              `${process.env.VUE_APP_API}newbooking/`,
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
              // แสดงข้อความผิดพลาด
              await Swal.fire({
                icon: "error",
                title: "เกิดข้อผิดพลาด",
                text: response.data.message,
              });
            }
          }
        } else {
          // แสดงข้อความให้ผู้ใช้ล็อคอินก่อนจอง
          await Swal.fire({
            icon: "error",
            title: "กรุณาล็อคอิน",
            text: "ก่อนจะจองกรุณาล็อคอินก่อน",
          });
        }
      } catch (error) {
        // แสดงข้อความผิดพลาด
        await Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด",
          text: error,
        });
      }
    };

    // เมื่อ Component ถูกติดตั้ง ให้ดึงข้อมูลห้องและรีวิว
    onMounted(() => {
      getroom();
      // getReview();
      validateDate();
    });

    // คืนค่าข้อมูลที่จะถูกใช้ใน Template
    return {
      allImages: [],
      value,
      room_id,
      selectedDate: "",
      roomdata,
      price: "0",
      minSelectableDate: new Date(),
      disabledDates: [new Date(2023, 10, 29), new Date(2023, 10, 30)],
      visible,
      credit,
      qrcode,
      addbooking,
      imageQrCode,
      review,
      combinedDates,
      isDateInCombinedRange,
      popupVisible: false,
      popupImage: null,
    };
  },
  watch: {
    selectedDate: {
      handler(date) {
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
    closeModal(event) {
      if (event.target.classList.contains("bg-black")) {
        this.closeImagePopup();
      }
    },

    openImagePopup() {
  console.log("Show all images:", this.roomdata.image);
  // เปิด Popup แสดงรูปภาพ
  this.popupVisible = true;
  // กำหนดรูปภาพที่จะแสดงใน Popup
  this.popupImage = this.allImages;
  console.log(this.popupImage, "test image");
},
    closeImagePopup() {
      this.popupVisible = false;
      this.popupImage = null;
    },
    handleCheckboxChange(checkboxName) {
      if (checkboxName === "credit" && this.qrcode) {
        this.qrcode = false;
      } else if (checkboxName === "qrcode" && this.credit) {
        this.credit = false;
      }
    },
    chooseImg(event) {
      this.imagePreview = event.files[0].objectURL;
      this.SlipImage = event.files[0];
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
      };
      const formattedDate = new Date(dateString).toLocaleDateString(
        "th-TH",
        options
      );
      return formattedDate;
    },
  },
  // Computed properties ที่ใช้คำนวณค่าเฉลี่ยของรีวิวและสถานะปุ่ม
  computed: {
    averageRating() {
      if (this.value && this.value.length > 0) {
        const sum = this.value.reduce((total, rating) => total + rating, 0);
        const average = sum / this.value.length;
        return average.toFixed(1);
      } else {
        return "ยังไม่มีคะแนน";
      }
    },
    isButtonDisabled() {
      return !(this.qrcode || this.credit);
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

<template>
  <div class="grid px-10 mt-3 ml-5 mr-5 w-full">
    <Loading :loading="loading" />
    <div class="col-12 lg:col-12 border">
      <div class="text-center font-bold text-4xl">ข้อมูลการจองห้อง</div>
      <div class="text-right my-5"></div>

      <DataTable
        :value="Filter"
        :paginator="true"
        :rows="20"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rowsPerPageOptions="[5, 10, 25, 50, 75, 100]"
        currentPageReportTemplate="แสดง {first} ถึง {last} จาก {totalRecords} สินค้าทั้งหมด"
        responsiveLayout="stack"
      >
        <!-- ตรวจสอบว่ามีข้อมูลสินค้าหรือไม่ -->

        <template #empty>
          <p class="font-italic text-center text-5xl" style="color: #bd1616">
            ไม่พบข้อมูลการจอง
          </p>
        </template>
        <template #header>
          <div class="flex justify-content-end">
            <div class="mx-2">
              <Dropdown
                v-model="selectstatus"
                :options="statusdata"
                optionLabel="name"
                optionValue="name"
                placeholder="เลือกสถานะการค้นหา"
              />
            </div>

            <div class="p-input-icon-left">
              <i class="pi pi-search" />
              <InputText
                v-model="searchall"
                placeholder="ค้นหา"
                class="bg-white-500 border"
                style="height: 48px"
              />
            </div>
          </div>
        </template>

        <Column
          field="room_id.name"
          header="ห้องพัก"
          style="width: 10%"
          :headerStyle="{ color: headerTextColor }"
        >
        </Column>
        <Column
          header="วันที่จะจอง"
          style="width: 10%"
          :headerStyle="{ color: headerTextColor }"
        >
          <template #body="{ data }">
            {{
              new Date(data.date_from).toLocaleDateString("th-TH", {
                timeZone: "Asia/Bangkok",
                day: "numeric",
                month: "numeric",
                year: "numeric",
              })
            }}
            -
            {{
              new Date(data.date_to).toLocaleDateString("th-TH", {
                timeZone: "Asia/Bangkok",
                day: "numeric",
                month: "numeric",
                year: "numeric",
              })
            }}
          </template>
        </Column>
        <Column
          header="จำนวนคืน"
          style="width: 10%"
          :headerStyle="{ color: headerTextColor }"
        >
          <template #body="{ data }">
            {{ calculateNightStay(data.date_from, data.date_to) }}
          </template>
        </Column>
        <Column
          field="price"
          header="ราคา"
          style="width: 10%"
          :headerStyle="{ color: headerTextColor }"
        ></Column>
        <Column
          class="text-center"
          header="สถานะอนุมัติ"
          style="width: 15%"
          :headerStyle="{ color: headerTextColor }"
        >
          <template #body="{ data }">
            <div
              class="lg:w-10 xl:w-6 bg-orange-100 text-orange-600 font-normal border-2 border-orange-300 text-center"
              style="width: 40%; border-radius: 1rem; padding: 0.5rem"
              v-if="data.status.slice(-1)[0].statusbooking === 'รออนุมัติห้อง'"
            >
              <div>
                {{ data.status.slice(-1)[0].statusbooking }}
              </div>
            </div>
            <div
              class="lg:w-10 xl:w-6 bg-orange-100 text-orange-600 font-normal border-2 border-orange-300 text-center"
              style="width: 40%; border-radius: 1rem; padding: 0.5rem"
              v-if="data.status.slice(-1)[0].statusbooking === 'รอชำระเงิน'"
            >
              <div>
                {{ data.status.slice(-1)[0].statusbooking }}
              </div>
            </div>
            <div
              class="lg:w-10 xl:w-7 bg-blue-100 text-blue-600 font-normal border-2 border-blue-300 text-center"
              style="width: 40%; border-radius: 1rem; padding: 0.5rem"
              v-if="
                data.status.slice(-1)[0].statusbooking === 'ยีนยันการชำระเงิน'
              "
            >
              <div>
                {{ data.status.slice(-1)[0].statusbooking }}
              </div>
            </div>
            <div
              class="lg:w-10 xl:w-6 bg-green-100 text-green-600 font-normal border-2 border-green-300 text-center"
              style="width: 40%; border-radius: 1rem; padding: 0.5rem"
              v-if="data.status.slice(-1)[0].statusbooking === 'จองห้องสำเร็จ'"
            >
              <div>
                {{ data.status.slice(-1)[0].statusbooking }}
              </div>
            </div>
            <div
              class="lg:w-10 xl:w-6 bg-red-100 text-red-600 font-normal border-2 border-red-300 text-center"
              style="width: 40%; border-radius: 1rem; padding: 0.5rem"
              v-if="data.status.slice(-1)[0].statusbooking === 'ไม่อนุมัติห้อง'"
            >
              <div>
                {{ data.status.slice(-1)[0].statusbooking }}
              </div>
            </div>
            <div
              class="lg:w-10 xl:w-5 bg-red-100 text-red-600 font-normal border-2 border-red-300 text-center"
              style="width: 40%; border-radius: 1rem; padding: 0.5rem"
              v-if="
                data.status.slice(-1)[0].statusbooking === 'ชำระเงินไม่สำเร็จ'
              "
            >
              <div>
                {{ data.status.slice(-1)[0].statusbooking }}
              </div>
            </div>
            <!-- ให้แสดงค่า statusapprove ของแต่ละ Item ใน Column -->
          </template>
        </Column>
        <Column
          header="ชำระภายใน"
          style="width: 10%"
          :headerStyle="{ color: headerTextColor }"
        >
          <template #body="{ data }">
            {{ calculateTimeDifference(data.updatedAt) }}
          </template>
        </Column>
        <Column
          header="รายละเอียด"
          style="width: 10%"
          :headerStyle="{ color: headerTextColor }"
        >
          <template #body="{ data }">
            <Button
              outlined
              icon="pi pi-info-circle"
              @click="showPartnerDetail(data)"
            />
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
  <Dialog
    v-model:visible="DetailPartner"
    header="ข้อมูลรายละเอียด"
    modal
    :style="{ width: '50rem', 'z-index': 500 }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <div class="grid">
      <div class="col-12 md:col-12">
        <div class="col-12">
          <p>ชื่อผู้จอง:</p>
          <InputText
            v-model="membername"
            class="w-full text-black-950 font-bold"
            style="color: #000"
            disabled
          />
        </div>
        <div class="col-12">
          <p>ห้อง :</p>
          <InputText
            v-model="roomname"
            class="w-full text-black-950 font-bold"
            style="color: #000"
            disabled
          />
        </div>
        <div class="col-12">
          <p>วันที่จะจอง :</p>
          <InputText
            v-model="datebooking"
            class="w-full text-black-950 font-bold"
            style="color: #000"
            disabled
          />
        </div>
        <div class="col-12">
          <p>ราคา :</p>
          <InputText
            v-model="price"
            class="w-full text-black-950 font-bold"
            style="color: #000"
            disabled
          />
        </div>
        <div
          class="col-12"
          v-if="
            databooking.status[databooking.status.length - 1].statusbooking ===
            'รอชำระเงิน'
          "
        >
          <p>ส่งหลักฐานการชำระเงิน</p>
          <div class="image-container">
            <div
              class="text-center"
              style="display: flex; flex-direction: column; align-items: center"
            >
              <div class="image-preview">
                <i
                  class="delete-icon bi bi-x-circle-fill"
                  style="z-index: 100; font-size: 1.5rem; color: #fff"
                  @click="deleteImage"
                  v-if="imagePreview !== null"
                ></i>
                <Image
                  :src="imagePreview"
                  v-if="imagePreview !== null"
                  :preview="true"
                  class="rounded"
                />
              </div>
              <FileUpload
                mode="basic"
                chooseLabel="เลือกรูปหลักฐานชำระเงิน"
                :auto="true"
                @uploader="chooseImg"
                :customUpload="true"
                accept="image/png, image/jpeg, image/jpg"
                :maxFileSize="2097152"
                nvalidFileSizeMessage="ขนาดรูปภาพจะต้องไม่เกิน 2 mb"
                :disabled="isDisabled"
              />
              <p><em>(ขนาดจะต้องเป็น 1:1)</em></p>
            </div>
          </div>
        </div>
      </div>

      <div class="col-12 md:col-12 text-center">
        <div
          v-if="
            databooking.status[databooking.status.length - 1].statusbooking ===
            'รอชำระเงิน'
          "
        >
          <Button
            @click="addpayment(databooking._id)"
            :loading="buttonloading"
            :disabled="!filepic"
            rounded
            label="ชำระเงิน"
            icon="pi pi-wallet"
          />
        </div>
      </div>
    </div>
  </Dialog>
</template>

<script>
import axios from "axios";
import { onMounted, ref, watch } from "vue";
import Swal from "sweetalert2";
import Loading from "../../../components/Loading.vue";
import { onUnmounted } from "vue";

export default {
  components: {
    Loading,
  },
  created() {
    document.title = "ข้อมูล partner";
  },
  setup() {
    const fetchData = async () => {
      try {
        const Response = await axios.get(
          `${process.env.VUE_APP_API}booking/member/`,
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        if (Response.data.status === true) {
          item_product.value = Response.data.data.reverse();
          // console.log(Response.data.data);
          item_product.value.forEach((item) => {
            if (calculateTimeDifference(item.updatedAt) === "0 : 0 : 0") {
              this.deleteBooking(item._id);
            }
          });
        } else {
          console.error("ข้อมูลขาดหายในการตอบสนอง API.");
        }
      } catch (error) {
        console.error(error);
      }
    };
    const pollingInterval = 1000;
    const startPolling = () => {
      setInterval(async () => {
        await fetchData();
        updateExpiredStatus();
      }, pollingInterval);
      // console.log("Fetching data...");
    };
    const updateTimes = () => {
      item_product.value.forEach((item) => {
        item.calculatedTimeDifference = calculateTimeDifference(item.updatedAt);
      });
    };
    const updateExpiredStatus = () => {
      item_product.value.forEach((item) => {
        if (
          item.status.slice(-1)[0].statusbooking === "รอชำระเงิน" &&
          calculateTimeDifference(item.updatedAt) === "เกินกำหนดการชำระ"
        ) {
          // อัปเดตสถานะเป็น "ไม่อนุมัติห้อง"
          item.status.push({
            statusbooking: "ไม่อนุมัติห้อง",
            timestamp: new Date(),
          });
        }
      });
    };
    let data_id = ref("");
    let membername = ref("");
    let roomname = ref("");
    let datebooking = ref("");
    let price = ref("");
    let databooking = ref("");
    let imagePreview = ref(null);
    let statusbooking = ref();
    const DetailPartner = ref(false);
    const buttonloading = ref(false);
    const loading = ref(true);
    const searchall = ref("");
    const selectstatus = ref("");
    const statusdata = ref([
      { name: "เลือกสถานะการค้นหา" },
      { name: "รออนุมัติห้อง" },
      { name: "จองห้องสำเร็จ" },
      { name: "ไม่อนุมัติห้อง" },
      { name: "รอชำระเงิน" },
    ]);
    const item_product = ref([]);
    const successMessageVisible = ref(true);
    const getData = async () => {
      try {
        const Response = await axios.get(
          `${process.env.VUE_APP_API}booking/member/`,
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );

        if (Response.data.status === true) {
          item_product.value = Response.data.data.reverse();
          loading.value = false;
          // console.log(Response.data.data);
        } else {
          console.error("Data is missing in the API response.");
        }
      } catch (error) {
        console.error(error);
      }
    };

    const showPartnerDetail = async (data) => {
      DetailPartner.value = true;
      data_id.value = data._id;
      membername.value = data.member_id.name;
      roomname.value = data.room_id.name;
      datebooking.value =
        new Date(data.date_from).toLocaleDateString("th-TH", {
          timeZone: "Asia/Bangkok",
          day: "numeric",
          month: "numeric",
          year: "numeric",
        }) +
        " - " +
        new Date(data.date_to).toLocaleDateString("th-TH", {
          timeZone: "Asia/Bangkok",
          day: "numeric",
          month: "numeric",
          year: "numeric",
        });
      price.value = data.price;
      databooking.value = data;
    };
    const calculateTimeDifference = (updatedAt, selectstatus) => {
      if (selectstatus === "จองห้องสำเร็จ") {
        return "0"; // ไม่นับเวลาถอยหลัง
      }
      const updatedAtDate = new Date(updatedAt);
      const paymentDueTime = 24 * 60 * 60 * 1000;
      const currentTime = new Date();
      const timeDifference = paymentDueTime - (currentTime - updatedAtDate);

      if (timeDifference <= 0) {
        return "เกินกำหนดการชำระ";
      }

      const hours = Math.floor(timeDifference / (60 * 60 * 1000));
      const minutes = Math.floor(
        (timeDifference % (60 * 60 * 1000)) / (60 * 1000)
      );
      const seconds = Math.floor((timeDifference % (60 * 1000)) / 1000);

      return ` ${hours} : ${minutes} : ${seconds} `;
    };

    onMounted(() => {
      getData(); // ดึงข้อมูลเริ่มต้น
      startPolling();
      // อัพเดทต่างหากเวลาทุกวินาที
      const intervalId = setInterval(updateTimes, 1000);

      // ทำความสะอาด interval เมื่อคอมโพเนนต์ถูกยกเลิก
      onUnmounted(() => {
        clearInterval(intervalId);
      });
    });

    return {
      startPolling,
      pollingInterval,
      statusbooking,
      item_product,
      getData,
      // partnerDetail,
      showPartnerDetail,
      DetailPartner,
      data_id,
      membername,
      roomname,
      datebooking,
      price,
      databooking,
      filepic: "",
      imagePreview,
      loading,
      searchall,
      statusdata,
      selectstatus,
      successMessageVisible,
      buttonloading,
      calculateTimeDifference,
      headerTextColor: "rgb(156 163 175)",
    };
  },

  methods: {
    async deleteBooking(id) {
      try {
        const response = await axios.delete(
          `${process.env.VUE_APP_API}newbooking/${id}`,
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        if (response.data.status === true) {
          // ลบข้อมูลจาก data หรือทำการ Fetch ข้อมูลใหม่
          this.getData();
          console.log("Booking deleted successfully");
        } else {
          console.error("Failed to delete booking:", response.data.message);
        }
      } catch (error) {
        console.error("Error deleting booking:", error);
      }
    },
    calculateNightStay(dateFrom, dateTo) {
      const startDate = new Date(dateFrom);
      const endDate = new Date(dateTo);
      const timeDiff = endDate.getTime() - startDate.getTime();
      const nights = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
      return `${nights + 1} คืน`;
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
    deleteImage() {
      // console.log("Deleting image");
      this.imagePreview = null;
      this.filepic = null;
    },
    chooseImg(event) {
      // console.log("Choosing image");

      if (this.filepic) {
        // console.log("Clearing existing file");
        this.deleteImage();
      }

      this.imagePreview = event.files[0].objectURL;
      this.filepic = event.files[0];

      // console.log("Image chosen:", this.filepic);
    },
    async addpayment(id) {
      if (this.filepic != "") {
        this.buttonloading = true;
        try {
          const formData = new FormData();
          formData.append("slip_image", this.filepic);
          const response = await axios.put(
            `${process.env.VUE_APP_API}booking/paymentBooking/${id}`,
            formData,
            {
              headers: {
                token: localStorage.getItem("token"),
              },
            }
          );
          if (response.data.status === true) {
            this.DetailPartner = false;
            this.buttonloading = false;

            Swal.fire({
              icon: "success",
              title: "ส่งหลักฐานชำระเงินสำเร็จ",
              text: response.data.message,
            });
            this.getData();
            this.filepic = null;
            this.imagePreview = null;
          } else {
            this.DetailPartner = false;
            this.buttonloading = false;

            await Swal.fire({
              icon: "error",
              title: "เกิดข้อผิดพลาด",
              text: "ไม่สามารถเพิ่มข้อมูลได้",
            });
            this.DetailPartner = true;
          }
        } catch (error) {
          this.DetailPartner = false;
          this.buttonloading = false;

          await Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาด",
            text: error,
          });
          this.DetailPartner = true;
        }
      } else {
        this.DetailPartner = false;
        this.buttonloading = false;

        await Swal.fire({
          icon: "error",
          title: "เพิ่มหลักฐานการชำระเงิน",
          text: "กรุณาเพิ่มหลักฐานการชำระเงิน",
        });
        this.DetailPartner = true;
      }
    },
  },
  computed: {
    Filter() {
      if (this.selectstatus && this.selectstatus !== "เลือกสถานะการค้นหา") {
        const searchTerm = this.searchall.toLowerCase();
        const selectstatus = this.selectstatus.toLowerCase();
        return this.item_product.filter((item) => {
          const isInStatus =
            (selectstatus === "รออนุมัติห้อง" &&
              item.status.slice(-1)[0].statusbooking === "รออนุมัติห้อง") ||
            (selectstatus === "จองห้องสำเร็จ" &&
              item.status.slice(-1)[0].statusbooking === "จองห้องสำเร็จ") ||
            (selectstatus === "ไม่อนุมัติห้อง" &&
              item.status.slice(-1)[0].statusbooking === "ไม่อนุมัติห้อง") ||
            (selectstatus === "รอชำระเงิน" &&
              item.status.slice(-1)[0].statusbooking === "รอชำระเงิน");

          const matchesSearch =
            (item.room_id &&
              item.room_id.name.toLowerCase().includes(searchTerm)) ||
            String(item.price).includes(searchTerm);

          const bookingSearchFrom =
            item.booking_id && item.booking_id.date_from.includes(searchTerm);
          const bookingSearchTo =
            item.booking_id && item.booking_id.date_to.includes(searchTerm);

          return (
            isInStatus &&
            (matchesSearch || bookingSearchFrom || bookingSearchTo)
          );
        });
      } else if (this.searchall) {
        const searchTerm = this.searchall.toLowerCase();
        return this.item_product.filter((item) => {
          return (
            (item.room_id &&
              item.room_id.name.toLowerCase().includes(searchTerm)) ||
            item.date_from.includes(searchTerm) ||
            item.date_to.includes(searchTerm) ||
            String(item.price).includes(searchTerm)
          );
        });
      } else {
        return this.item_product;
      }
    },
  },
};
</script>

<style scoped>
.image-preview {
  position: relative;
  width: 250px;
  height: 250px;
  margin-bottom: 1rem;
}
.image-preview Image {
  width: 100%;
}

.delete-icon {
  position: absolute;
  top: 5%;
  right: 5%;
  border: none;
  cursor: pointer;
}
</style>

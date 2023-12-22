<template>
  <div class="grid px-10 mt-3 ml-5 mr-5 w-full">
    <Loading :loading="loading" />
    <div class="col-12 lg:col-12 border">
      <div class="text-center font-bold text-4xl">เช็คอิน - เช็คเอาท์</div>
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
          field="booking_id.room_id.name"
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
              new Date(data.booking_id.date_from).toLocaleDateString("th-TH", {
                timeZone: "Asia/Bangkok",
                day: "numeric",
                month: "numeric",
                year: "numeric",
              })
            }}
            -
            {{
              new Date(data.booking_id.date_to).toLocaleDateString("th-TH", {
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
            {{
              calculateNightStay(
                data.booking_id.date_from,
                data.booking_id.date_to
              )
            }}
          </template>
        </Column>
        <Column
          header="วันที่จะจอง"
          style="width: 10%"
          :headerStyle="{ color: headerTextColor }"
        >
          <template #body="{ data }">
            <div
              v-if="data.check_in_date == null && data.check_out_date == null"
            >
              ยังไม่เช็คอิน
            </div>
            <div
              v-else-if="
                data.check_in_date != null && data.check_out_date != null
              "
            >
              {{
                new Date(data.check_in_date).toLocaleString("th-TH", {
                  timeZone: "Asia/Bangkok",
                })
              }}
              -
              {{
                new Date(data.check_out_date).toLocaleString("th-TH", {
                  timeZone: "Asia/Bangkok",
                })
              }}
            </div>
            <div v-else-if="data.check_in_date != null">
              {{
                new Date(data.check_in_date).toLocaleString("th-TH", {
                  timeZone: "Asia/Bangkok",
                  day: "numeric",
                  month: "numeric",
                  year: "numeric",
                })
              }}
            </div>
            <div v-else-if="data.check_out_date != null"></div>
          </template>
        </Column>
        <Column
          class="text-center"
          header="สถานะอนุมัติ"
          style="width: 20%"
          :headerStyle="{ color: headerTextColor }"
        >
          <template #body="{ data }">
            <div
              class="lg:w-10 xl:w-5 bg-blue-100 text-blue-600 font-normal border-2 border-blue-300 text-center"
              style="width: 40%; border-radius: 1rem; padding: 0.5rem"
              v-if="data.check_in_date != null && data.check_out_date != null"
            >
              <div>เช็คอิน-เช็คเอาท์แล้ว</div>
            </div>
            <div
              class="lg:w-10 xl:w-5 bg-green-100 text-green-600 font-normal border-2 border-green-300 text-center"
              style="width: 40%; border-radius: 1rem; padding: 0.5rem"
              v-else-if="data.check_in_date != null"
            >
              <div>เช็คอินแล้ว</div>
            </div>
            <div
              class="lg:w-10 xl:w-5 bg-orange-100 text-orange-600 font-normal border-2 border-orange-300 text-center"
              style="width: 40%; border-radius: 1rem; padding: 0.5rem"
              v-else-if="data.check_in_date === null"
            >
              <div>ยังไม่ได้เช็คอิน</div>
            </div>
          </template>
        </Column>
        <!-- <Column header="เช็คอิน - เช็คเอาท์" style="width: 10%"> -->
        <Column style="width: 10%" :headerStyle="{ color: headerTextColor }">
          <template #body="{ data }">
            <Button
              @click="showPartnerDetail(data)"
              icon="bi bi-clipboard2-check"
              outlined
            />
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
  <!-- Rating Modal -->
  <Dialog
    v-if="ratingModalVisible"
    header="ให้คะแนนที่พัก"
    v-model:visible="ratingModalVisible"
    modal
  >
    <div class="text-center p-4">
      <!-- ใช้ PrimeVue Rating component -->
      <form class="flex flex-column gap-2">
        <Rating v-model="ratingValue" class="mb-4" :stars="10" :max="10" />
        <span class="p-float-label">
          <Textarea id="value" v-model="detail" rows="4" cols="30" />
          <label for="value">อธิบายเพิ่มเติม (ไม่บังคับ)</label>
        </span>
        <Button
          icon="bi bi-star"
          rounded
          label="ส่งข้อมูล"
          @click="putcheckout(databooking)"
        />
      </form>
    </div>
  </Dialog>
  <Dialog
    v-if="DetailPartner"
    v-model:visible="DetailPartner"
    modal
    :style="{ width: '50rem', 'z-index': 500 }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <div class="grid">
      <div class="col-12 text-center">
        <h2>เช็คอิน - เช็คเอาท์</h2>
      </div>
    </div>
    <div class="grid">
      <div class="col-12 md:col-12 text-center">
        <div
          v-if="
            databooking.check_in_date != null &&
            databooking.check_out_date === null
          "
        >
          <Button
            @click="putcheckout2"
            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-2"
            >เช็คเอาท์</Button
          >
        </div>
        <div v-else-if="databooking.check_in_date === null">
          <Button
            @click="putcheckin(databooking._id)"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2"
            >เช็คอิน</Button
          >
        </div>
      </div>
    </div>
  </Dialog>
</template>

<script>
import axios from "axios";
import { onMounted, ref } from "vue";
import Swal from "sweetalert2";
import Loading from "../../../components/Loading.vue";
import { User } from "../../../service/user";

export default {
  components: {
    Loading,
  },

  created() {
    document.title = "ข้อมูล partner";
  },

  setup() {
    const user = new User();
    const DetailPartner = ref(false);
    const ratingModalVisible = ref(false);
    const ratingValue = ref(0);
    let detail = ref("");

    const showRatingModal = () => {
      ratingModalVisible.value = true;
      DetailPartner.value = false;
    };
    const putcheckout2 = () => {
      DetailPartner.value = false;
      showRatingModal();
    };
    const putcheckout = async (data) => {
      try {
        const _id = data._id;
        const booking_id = data.booking_id._id;
        const response = await axios.put(
          `${process.env.VUE_APP_API}checkin/checkout/${_id}`,
          {},
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );

        const res = await axios.post(
          `${process.env.VUE_APP_API}review/`,
          {
            booking_id: booking_id,
            star: ratingValue.value,
            detail: detail.value,
          },
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        if (response.data.status === true) {
          DetailPartner.value = false;
          showRatingModal();
          Swal.fire({
            icon: "success",
            title: "เช็คเอาท์สำเร็จ",
            // text: response.data.message,
          });
          getData(); // ใช้ getData() โดยตรง
        } else {
          DetailPartner.value = false;
          await Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาด",
            text: "ไม่สามารถเพิ่มข้อมูลได้",
          });
          DetailPartner.value = true;
        }
      } catch (error) {
        console.error("AxiosError:", error);
        DetailPartner.value = false;
        await Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด",
          text: error,
        });
        DetailPartner.value = true;
      }
      ratingModalVisible.value = false;
      DetailPartner.value = false;
    };

    // const partnerDetail = ref(null);
    let data_id = ref("");
    let membername = ref("");
    let roomname = ref("");
    let datebooking = ref("");
    let price = ref("");
    let databooking = ref("");
    let imagePreview = ref(null);
    const loading = ref(true);
    const searchall = ref("");
    const selectstatus = ref("");
    const statusdata = ref([
      { name: "เลือกสถานะการค้นหา" },
      { name: "ยังไม่ได้เช็คอิน" },
      { name: "เช็คอินแล้ว" },
      { name: "เช็คอิน-เช็คเอาท์แล้ว" },
    ]);

    const item_product = ref([]);
    const getData = async () => {
      try {
        const Response = await axios.get(
          `${process.env.VUE_APP_API}checkin/member/`,
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        if (Response.data.status === true) {
          item_product.value = Response.data.data.reverse();
          loading.value = false;
        } else {
          console.error("Data is missing in the API response.");
        }
      } catch (error) {
        console.error(error);
      }
    };
    const showPartnerDetail = async (data) => {
      DetailPartner.value = true;
      databooking.value = data;
    };

    onMounted(() => {
      getData();
    });
    return {
      putcheckout2,
      putcheckout,
      ratingModalVisible,
      ratingValue,
      showRatingModal,
      item_product,
      getData,
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
      detail,
      user,
      headerTextColor: "rgb(156 163 175)",
    };
  },
  methods: {
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
    //-------------- checkout----------------
    // async putcheckout1(id) {
    //   try {
    //     const response = await axios.put(
    //       `${process.env.VUE_APP_API}checkin/checkout/${id}`,
    //       {},
    //       {
    //         headers: {
    //           token: localStorage.getItem("token"),
    //         },
    //       }
    //     );
    //     if (response.data.status === true) {
    //       DetailPartner.value = false;
    //       showRatingModal();
    //       Swal.fire({
    //         icon: "success",
    //         title: "เช็คเอาท์สำเร็จ",
    //         text: response.data.message,
    //       });
    //       getData();
    //     } else {
    //       DetailPartner.value = false;
    //       await Swal.fire({
    //         icon: "error",
    //         title: "เกิดข้อผิดพลาด",
    //         text: "ไม่สามารถเพิ่มข้อมูลได้",
    //       });
    //       DetailPartner.value = true;
    //     }
    //   } catch (error) {
    //     console.error("AxiosError:", error);
    //     DetailPartner.value = false;
    //     await Swal.fire({
    //       icon: "error",
    //       title: "เกิดข้อผิดพลาด",
    //       text: error,
    //     });
    //     DetailPartner.value = true;
    //   }
    //   ratingModalVisible.value = false;
    //   DetailPartner.value = false;
    //   console.log("คะแนนที่ให้:", ratingValue.value, DetailPartner);
    // },
    async putcheckin(id) {
      try {
        const response = await axios.put(
          `${process.env.VUE_APP_API}checkin/checkin/${id}`,
          {},
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        if (response.data.status === true) {
          this.DetailPartner = false;
          Swal.fire({
            icon: "success",
            title: "เช็คอินสำเร็จ",
            text: response.data.message,
          });
          this.getData();
        } else {
          this.DetailPartner = false;
          await Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาด",
            text: "ไม่สามารถเพิ่มข้อมูลได้",
          });
          this.DetailPartner = true;
        }
      } catch (error) {
        this.DetailPartner = false;
        await Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด",
          text: error,
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
            (selectstatus === "ยังไม่ได้เช็คอิน" && !item.check_in_date) ||
            (selectstatus === "เช็คอินแล้ว" &&
              item.check_in_date &&
              !item.check_out_date) ||
            (selectstatus === "เช็คอิน-เช็คเอาท์แล้ว" &&
              item.check_in_date &&
              item.check_out_date);

          const matchesSearch =
            item.booking_id &&
            item.booking_id.room_id &&
            item.booking_id.room_id.name.toLowerCase().includes(searchTerm);

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
            (item.booking_id &&
              item.booking_id.room_id &&
              item.booking_id.room_id.name
                .toLowerCase()
                .includes(searchTerm)) ||
            (item.booking_id &&
              item.booking_id.date_from.includes(searchTerm)) ||
            (item.booking_id && item.booking_id.date_to.includes(searchTerm))
          );
        });
      } else {
        return this.item_product;
      }
    },
  },
};
</script>

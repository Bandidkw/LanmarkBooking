<template>
  <div class="grid px-10 mt-3 ml-5 mr-5 w-full">
    <Loading :loading="loading" />
    <div class="col-12 lg:col-12 border">
      <div class="text-center font-bold text-4xl">ข้อมูลอนุมัติการชำระเงิน</div>
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
            ไม่มีข้อมูลการจอง
          </p>
        </template>
        <template #header>
          <div class="flex justify-content-end">
            <span class="p-input-icon-left">
              <i class="pi pi-search" />
              <InputText
                v-model="searchall"
                placeholder="ค้นหา"
                class="bg-white-500 border"
                style="height: 48px"
              />
            </span>
          </div>
        </template>

        <Column
          field="booking_id.member_id.name"
          header="ชื่อผู้จอง"
          :headerStyle="{ color: headerTextColor }"
        ></Column>

        <Column
          field="booking_id.room_id.name"
          header="ห้องพัก"
          :headerStyle="{ color: headerTextColor }"
        >
        </Column>
        <Column header="วันที่จะจอง" :headerStyle="{ color: headerTextColor }">
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
        <Column header="จำนวนคืน" :headerStyle="{ color: headerTextColor }">
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
          field="booking_id.price"
          header="ราคา"
          :headerStyle="{ color: headerTextColor }"
        ></Column>
        <Column :headerStyle="{ color: headerTextColor }">
          <template #header="{ data }">
            <div
              style="
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
              "
            >
              สถานะ
            </div>
          </template>
          <template #body="{ data }">
            <div
              class="w-full bg-orange-100 text-orange-600 font-normal border-2 border-orange-300 text-center"
              style="border-radius: 1rem; padding: 0.5rem"
              v-if="data.payment_status === 'รอดำเนินการ'"
            >
              <div>
                {{ data.payment_status }}
              </div>
            </div>
            <div
              class="w-full bg-green-100 text-green-600 font-normal border-2 border-green-300 text-center"
              style="border-radius: 1rem; padding: 0.5rem"
              v-if="data.payment_status === 'โอนเรียบร้อย'"
            >
              <div>
                {{ data.payment_status }}
              </div>
            </div>
          </template>
        </Column>
        <Column header="รายละเอียด" :headerStyle="{ color: headerTextColor }">
          <template #body="{ data }">
            <Button
              @click="showPartnerDetail(data)"
              outlined
              icon="pi pi-info-circle"
            />
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
  <Dialog
    header="ข้อมูลรายละเอียด"
    v-model:visible="DetailPartner"
    modal
    :style="{ width: '50rem' }"
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
        <div class="col-12 text-center">
          <p>สลิปการโอนเงิน</p>
          <div v-if="slip_image != [] || slip_image != ''">
            <Image
              :src="getImage(slip_image)"
              width="200"
              preview
              name="image"
            />
          </div>
          <div v-else>ไม่มีรูปภาพ</div>
        </div>
      </div>
      <div
        v-if="isPaymentPending"
        class="col-12 md:col-12 flex justify-content-center gap-4"
      >
        <Button
          @click="approvepartner()"
          severity="success"
          outlined
          class="hover:bg-green-600 hover:text-white"
          >อนุมัติ</Button
        >
        <Button
          @click="unapprovepartner()"
          severity="danger"
          outlined
          class="hover:bg-red-500 hover:text-white"
          >ไม่อนุมัติ</Button
        >
      </div>
    </div>
  </Dialog>
</template>

<script>
import axios from "axios";
import { onMounted, ref } from "vue";
import Swal from "sweetalert2";
import Loading from "../../../components/Loading.vue";
export default {
  components: { Loading },

  created() {
    document.title = "ข้อมูล partner";
  },

  setup() {
    // const partnerDetail = ref(null);
    const searchall = ref("");
    const DetailPartner = ref(false);
    let data_id = ref("");
    let membername = ref("");
    let roomname = ref("");
    let datebooking = ref("");
    let price = ref("");
    let slip_image = ref("");
    let payment_id = ref("");
    const item_product = ref([]);
    const item_payment = ref([]);
    const loading = ref(true);

    const getData = async () => {
      try {
        const Response = await axios.get(
          `${process.env.VUE_APP_API}newbooking/payment`,
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        if (Response.data.status === true) {
          loading.value = false;
          const filterbooking_id = Response.data.payment.filter(
            (item) =>
              item.booking_id != null &&
              item.booking_id.member_id != null &&
              item.booking_id.room_id &&
              item.booking_id.room_id.partner_id != null &&
              item.booking_id.room_id.type != null
          );

          item_product.value = filterbooking_id.reverse();
        } else {
          console.error("Data is missing in the API response.");
        }
      } catch (error) {
        console.error(error);
      }
    };
    const approvepartner = async () => {
      try {
        const pay_id = payment_id.value;
        const response = await axios.put(
          `${process.env.VUE_APP_API}newbooking/confirmBookingPayment/${pay_id}`,
          {},
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        if (response.data) {
          // แสดงข้อความสำเร็จ (ตัวเลือก)
          DetailPartner.value = false;
          Swal.fire({
            icon: "success",
            title: "อนุมัติการชำระเงินแล้ว",
          });

          getData();
        } else {
          DetailPartner.value = false;
          await Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาด",
            text: "ไม่สามารถทำตามข้อมูลได้",
          });
        }
      } catch (error) {
        DetailPartner.value = false;
        await Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด",
          text: error,
        });
      }
    };
    const unapprovepartner = async () => {
      try {
        const pay_id = payment_id.value;
        const response = await axios.put(
          `${process.env.VUE_APP_API}newbooking/Unconfirmbookingpayment/${pay_id}`,
          {},
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        if (response.data) {
          // แสดงข้อความสำเร็จ (ตัวเลือก)
          DetailPartner.value = false;
          Swal.fire({
            icon: "success",
            title: "ไม่อนุมัติการชำระเงิน",
          });
          getData();
        } else {
          DetailPartner.value = false;
          await Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาด",
            text: "ไม่สามารถทำตามข้อมูลได้",
          });
        }
      } catch (error) {
        DetailPartner.value = false;
        await Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด",
          text: "ไม่สามารถทำตามข้อมูลได้",
        });
      }
    };
    const showPartnerDetail = async (data) => {
      DetailPartner.value = true;
      payment_id.value = data._id;
      item_payment.value = data.payment_status;
      data_id.value = data.booking_id._id;
      membername.value = data.booking_id.member_id.name;
      roomname.value = data.booking_id.room_id.name;
      datebooking.value =
        new Date(data.booking_id.date_from).toLocaleDateString("th-TH", {
          timeZone: "Asia/Bangkok",
          day: "numeric",
          month: "numeric",
          year: "numeric",
        }) +
        " - " +
        new Date(data.booking_id.date_to).toLocaleDateString("th-TH", {
          timeZone: "Asia/Bangkok",
          day: "numeric",
          month: "numeric",
          year: "numeric",
        });
      price.value = data.booking_id.price;
      slip_image.value = data.slip_image;
    };

    onMounted(() => {
      getData();
    });

    return {
      item_product,
      getData,
      approvepartner,
      unapprovepartner,
      // partnerDetail,
      showPartnerDetail,
      DetailPartner,
      data_id,
      membername,
      roomname,
      datebooking,
      price,
      slip_image,
      item_payment,
      payment_id,
      loading,
      searchall,
      nextSibling: "",
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
  },
  computed: {
    isPaymentPending() {
      return this.item_payment === "รอดำเนินการ";
    },
    Filter() {
      if (this.searchall) {
        const searchTerm = this.searchall.toLowerCase();

        return this.item_product.filter((item) => {
          const dateFrom = new Date(
            item.booking_id.date_from
          ).toLocaleDateString("th-TH", {
            timeZone: "Asia/Bangkok",
            day: "numeric",
            month: "numeric",
            year: "numeric",
          });
          const dateTo = new Date(item.booking_id.date_to).toLocaleDateString(
            "th-TH",
            {
              timeZone: "Asia/Bangkok",
              day: "numeric",
              month: "numeric",
              year: "numeric",
            }
          );
          return (
            item.booking_id.member_id.name.toLowerCase().includes(searchTerm) ||
            item.booking_id.room_id.name.toLowerCase().includes(searchTerm) ||
            dateFrom.includes(searchTerm) ||
            dateTo.includes(searchTerm) ||
            String(item.booking_id.price).includes(searchTerm)
          );
        });
      } else {
        return this.item_product;
      }
    },
  },
};
</script>

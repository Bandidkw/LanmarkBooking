<template>
  <div class="grid px-10 mt-3 ml-5 mr-5 w-full">
    <Loading :loading="loading" />
    <div class="col-12 lg:col-12 border">
      <div class="text-center font-bold text-4xl">ข้อมูลอนุมัติการจองห้อง</div>
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
                class="bg-white-500 p-2 m-1 pl-5 border"
              />
            </span>
          </div>
        </template>

        <Column
          field="member_id.name"
          header="ชื่อผู้จอง"
          style="width: 20%"
        ></Column>
        <Column field="room_id.name" header="ห้องพัก" style="width: 10%">
        </Column>
        <Column header="วันที่จะจอง" style="width: 10%">
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
        <Column header="จำนวนคืน" style="width: 10%">
          <template #body="{ data }">
            {{ calculateNightStay(data.date_from, data.date_to) }}
          </template>
        </Column>
        <Column field="price" header="ราคา" style="width: 10%"></Column>
        <Column header="รายละเอียด" style="width: 10%">
          <template #body="{ data }">
            <Button
              @click="showPartnerDetail(data)"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2"
              >รายละเอียด</Button
            >
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
  <Dialog
    v-model:visible="DetailPartner"
    modal
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <div class="grid">
      <div class="col-12 text-center">
        <h2>ข้อมูลรายละเอียด</h2>
      </div>
    </div>
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
      </div>
      <div class="col-12 md:col-12 text-center">
        <Button
          @click="approvepartner(data_id)"
          class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mx-2 boeder-none"
          >อนุมัติ</Button
        >
        <Button
          @click="unapprovepartner(data_id)"
          class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
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

    const item_product = ref([]);
    const loading = ref(true);
    const getData = async () => {
      console.log(DetailPartner, "status dialog before click button ");

      try {
        const Response = await axios.get(
          `${process.env.VUE_APP_API}booking/partner/`,
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );

        if (Response.data.status === true) {
          const datafindstatus = Response.data.data.filter(
            (item) =>
              item.status[item.status.length - 1].statusbooking ===
              "รออนุมัติห้อง"
          );
          item_product.value = datafindstatus.reverse();
          loading.value = false;

          console.log(Response.data.data);
        } else {
          console.error("Data is missing in the API response.");
        }
      } catch (error) {
        console.error(error);
      }
    };
    const approvepartner = async (_id) => {
      try {
        const response = await axios.put(
          `${process.env.VUE_APP_API}booking/AcceptBooking/${_id}`,
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
            title: "อนุมัติผู้ใช้partner",
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
    const unapprovepartner = async (_id) => {
      try {
        const response = await axios.put(
          `${process.env.VUE_APP_API}booking/UnacceptBooking/${_id}`,
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
            title: "ไม่อนุมัติผู้ใช้partner",
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
      loading,
      searchall,
    };
  },

  name: "ApprovePartner",

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
    Filter() {
      if (this.searchall) {
        const searchTerm = this.searchall.toLowerCase();
        return this.item_product.filter((item) => {
          return (
            (item.member_id &&
              item.member_id.name.toLowerCase().includes(searchTerm)) ||
            (item.room_id &&
              item.room_id.name.toLowerCase().includes(searchTerm)) ||
            (item.date_from && item.date_from.includes(searchTerm)) ||
            (item.date_to && item.date_to.includes(searchTerm)) ||
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

<template>
  <div class="grid px-10 mt-3 ml-5 mr-5 w-full">
    <Loading :loading="loading" />
    <div class="col-12 lg:col-12 border">
      <div class="text-center text-2xl mb-8">ข้อมูลห้อง</div>
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
            ไม่พบข้อมูลสินค้า
          </p>
        </template>
        <template #header>
          <div class="grid grid-cols-2 justify-content-between">
            <div class="flex" style="align-items: center">
              <p class="w-40 text-center text-sm m-0 mr-4">
                เปิด-ปิดการจองห้องทั้งหมด:
                {{ reservationEnabled ? "เปิด" : "ปิด" }}
              </p>
              <InputSwitch
                v-model="reservationEnabled"
                @click="changeallstatus()"
              />
            </div>

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
          </div>
        </template>

        <Column style="width: 5%">
          <template #body="{ data }">
            <div class="card flex justify-center mt-2">
              <InputSwitch
                v-model="data.statusbooking"
                @change="handleStatusChange(data._id, data.statusbooking)"
              />
            </div>
          </template>
        </Column>
        <Column
          field="name"
          header="ชื่อ"
          style="width: 5%"
          class="text-column"
          :headerStyle="{ color: headerTextColor }"
        ></Column>
        <Column
          field="image"
          header="Picture"
          style="width: 15%"
          :headerStyle="{ color: headerTextColor }"
        >
          <template #body="{ data }">
            <img
              v-if="Array.isArray(data.image) && data.image.length > 0"
              :src="getImage(data.image)"
              alt="ID Card"
              width="200"
              style="max-width: 100%; height: auto"
              :headerStyle="{ color: headerTextColor }"
            />
            <div v-else>ไม่มีรูปภาพ</div>
          </template>
        </Column>
        <Column
          field="statusbooking"
          header="คำอธิบาย"
          style="width: 17%"
          :headerStyle="{ color: headerTextColor }"
        >
          <template class="flex justify-content-center" #body="{ data }">
            <div
              v-if="data.statusbooking === true"
              class="lg:w-10 xl:w-5 bg-green-100 text-green-600 font-normal border-2 border-green-300 text-center"
              style="border-radius: 1rem; padding: 0.5rem"
            >
              เปิดการจอง
            </div>
            <div
              v-else
              class="lg:w-10 xl:w-5 bg-red-100 text-red-600 font-normal border-2 border-red-300 text-center"
              style="border-radius: 1rem; padding: 0.5rem"
            >
              ปิดการจอง
            </div>
          </template>
        </Column>
        <!-- <Column field="address" class="" header="ที่อยู่" style="width: 10%;" /> -->
        <Column
          field="phone_number"
          header="เบอร์โทรติดต่อ"
          style="width: 10%"
          :headerStyle="{ color: headerTextColor }"
        />
        <Column
          field="price"
          class=""
          header="ราคา"
          style="width: 10%"
          :headerStyle="{ color: headerTextColor }"
        />

        <Column :exportable="false" style="width: 16%">
          <template #body="item">
            <div class="flex justify-content-between">
              <Gallery :data="item.data" />

              <div class="xl:flex mx-2" v-if="item.data.status === true">
                <EditHotel :data="item.data" />
              </div>
              <div class="xl:flex mx-2">
                <i
                  class="pi pi-trash cursor-pointer icon-style"
                  @click="deleteProduct(item.data._id)"
                />
              </div>
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { onMounted, watch, ref } from "vue";
import Swal from "sweetalert2";
import EditHotel from "./EditHotel.vue";
import Gallery from "../../../components/Gallery.vue";
import Loading from "../../../components/Loading.vue";
export default {
  components: {
    EditHotel,
    Gallery,
    Loading,
  },

  created() {
    document.title = "จัดการข้อมูลห้อง";
  },

  setup() {
    const Modal = ref(false);
    const searchall = ref("");
    const item_product = ref([]);
    const reservationEnabled = ref(false);
    const loading = ref(true);
    const selectstatus = ref("");
    const statusdata = ref([
      { name: "เลือกสถานะการค้นหา" },
      { name: "เปิดการจอง" },
      { name: "ปิดการจอง" },
    ]);

    const getData = async () => {
      try {
        const productResponse = await axios.get(
          `${process.env.VUE_APP_API}room/partner/`,
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        if (productResponse.data && productResponse.data) {
          item_product.value = productResponse.data;
          loading.value = false;
          console.log(productResponse.data);
          reservationEnabled.value = productResponse.data[0].statusbooking;
        } else {
          console.error("Data is missing in the API response.");
        }
      } catch (error) {
        console.error(error);
      }
    };

    const deleteProduct = async (_id) => {
      try {
        const { value: deletehotel } = await Swal.fire({
          title: "ต้องการลบหรือไม่",
          text: "คุณต้องการลบรายการนี้หรือไม่",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          cancelButtonText: "ยกเลิก",
          confirmButtonText: "ยืนยันลบ",
          input: "text",
          inputLabel: "สาเหตุที่ต้องการลบ",
          inputPlaceholder: "กรุณากรอกสาเหตุ",
          inputValidator: (value) => {
            if (!value) {
              return "กรุณากรอกสาเหตุที่ต้องการลบ";
            }
          },
        });

        if (deletehotel) {
          const response = await axios.delete(
            `${process.env.VUE_APP_API}room/${_id}`,
            {
              headers: {
                token: localStorage.getItem("token"),
              },
            }
          );

          if (response.data) {
            getData();
            await Swal.fire({
              icon: "success",
              title: "ลบรายการสำเร็จ",
            });
          } else {
            await Swal.fire({
              icon: "error",
              title: "เกิดข้อผิดพลาด",
              text: "ไม่สามารถแก้ไขข้อมูลได้",
            });
          }
        }
      } catch (error) {
        await Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด",
          text: "ไม่สามารถลบข้อมูลได้",
        });
      }
    };

    onMounted(() => {
      getData();
    });

    const handleStatusChange = async (_id, newStatus) => {
      try {
        // Update the statusbooking for the corresponding item
        if (newStatus == true) {
          const updatedItem = item_product.value.find(
            (item) => item._id === _id
          );
          if (updatedItem) {
            updatedItem.statusbooking = newStatus;
            // Update the statusbooking on the server
            const response = await axios.put(
              `${process.env.VUE_APP_API}room/openstatusbyid/${_id}`,
              { statusbooking: newStatus },
              {
                headers: {
                  token: localStorage.getItem("token"),
                },
              }
            );

            if (!response.data) {
              getData();
              throw new Error("Failed to update statusbooking on the server");
            }
          } else {
            throw new Error("Item not found in the local data");
          }
        } else {
          const updatedItem = item_product.value.find(
            (item) => item._id === _id
          );
          if (updatedItem) {
            updatedItem.statusbooking = newStatus;
            // Update the statusbooking on the server
            const response = await axios.put(
              `${process.env.VUE_APP_API}room/closestatusbyid/${_id}`,
              { statusbooking: newStatus },
              {
                headers: {
                  token: localStorage.getItem("token"),
                },
              }
            );

            if (!response.data) {
              getData();
              throw new Error("Failed to update statusbooking on the server");
            }
          } else {
            throw new Error("Item not found in the local data");
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    return {
      reservationEnabled,
      item_product,
      getData,
      deleteProduct,
      handleStatusChange,
      loading,
      searchall,
      statusdata,
      selectstatus,
      headerTextColor: "rgb(156 163 175)",
      Modal,
    };
  },

  methods: {
    async changeallstatus() {
      const status = !this.reservationEnabled;
      if (status === true) {
        await axios.put(
          `${process.env.VUE_APP_API}room/openstatus/`,
          {},
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        this.getData();
      } else {
        await axios.put(
          `${process.env.VUE_APP_API}room/closestatus/`,
          {},
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );

        this.getData();
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

    //------------------------ เปิด-ปิดการจองห้อง------------------//
    // toggleReservationStatus() {
    //   console.log("hello")
    // this.reservationEnabled = !this.reservationEnabled;
    // if (this.reservationEnabled) {
    //   console.log("Open");
    //   fetchData();

    // } else {
    //   console.log("Off");
    //   collectData();
    // }
    // },
  },
  computed: {
    Filter() {
      if (this.selectstatus && this.selectstatus != "เลือกสถานะการค้นหา") {
        const searchTerm = this.searchall.toLowerCase();
        const selectstatus = this.selectstatus.toLowerCase();
        return this.item_product.filter((item) => {
          return (
            item.statusbooking === (selectstatus === "เปิดการจอง") &&
            ((item.name && item.name.toLowerCase().includes(searchTerm)) ||
              (item.telephone && item.telephone.includes(searchTerm)) ||
              (item.price && String(item.price).includes(searchTerm)))
          );
        });
      } else if (this.searchall) {
        const searchTerm = this.searchall.toLowerCase();
        return this.item_product.filter((item) => {
          return (
            item.name.toLowerCase().includes(searchTerm) ||
            item.phone_number.includes(searchTerm) ||
            String(item.price).includes(searchTerm)
          );
        });
      } else {
        return this.item_product;
      }
    },
  },

  name: "ManageRoom",
};
</script>
<style scope>
.icon-style {
  transition: all 0.2s ease-in-out;
}
.icon-style:hover {
  color: #3b82f6;
}
@media (min-width: 640px) {
  .delete-button {
    margin: 0;
    width: 120px;
    margin-top: 0.5rem;
    display: flex;
    justify-content: center;
  }
}

@media (min-width: 1280px) {
  .delete-button {
    margin: 0;
    display: flex;
  }
}
</style>

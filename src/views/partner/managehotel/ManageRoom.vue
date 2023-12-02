<template>
  <div class="grid px-10 mt-3 ml-5 mr-5 w-full">
    <div class="col-12 lg:col-12 border">
      <div class="text-center text-2xl">ข้อมูลห้อง</div>
      <div class="flex px-4 w-full item-center p-4" style="flex-direction: column; align-items: center;">
        <div class="flex justify-center">
          <p class="w-40 text-center text-2xl text-bold m-0">สถานะ: {{ reservationEnabled ? 'เปิด' : 'ปิด' }}</p>
        </div>
        <div class="card flex justify-center mt-2">
          <InputSwitch v-model="reservationEnabled" @click="changeallstatus()" />
        </div>
      </div>
      <DataTable :value="Array.isArray(item_product) ? item_product : []" :paginator="true" :rows="20"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rowsPerPageOptions="[5, 10, 25, 50, 75, 100]"
        currentPageReportTemplate="แสดง {first} ถึง {last} จาก {totalRecords} สินค้าทั้งหมด" responsiveLayout="stack">
        <!-- ตรวจสอบว่ามีข้อมูลสินค้าหรือไม่ -->
        <template #empty>
          <p class="font-italic text-center text-5xl" style="color: #bd1616">
            ไม่พบข้อมูลสินค้า
          </p>
        </template>

        <Column header="STATUS" style="width: 5% ; ">
          <template #body='{ data }'>
            <div class="card flex justify-center mt-2">
              <InputSwitch v-model="data.statusbooking" @change="handleStatusChange(data._id, data.statusbooking)" />
            </div>
          </template>
        </Column>
        <Column field="name" header="ชื่อ" style="width: 5% ; "></Column>
        <Column field="image" header="Picture" style="width: 15%">
          <template #body="{ data }">
            <img v-if="Array.isArray(data.image) && data.image.length > 0" :src="getImage(data.image)" alt="ID Card"
              width="200" style="max-width: 100%; height: auto" />
            <div v-else>ไม่มีรูปภาพ</div>
          </template>
        </Column>
        <Column field="statusbooking" header="คำอธิบาย" style="width: 17%;">
          <template class="flex justify-content-center" #body="{ data }">
            <div v-if="data.statusbooking === true" class="lg:w-10 xl:w-5 bg-green-500 text-white text-center"
              style="border-radius: 1rem; padding: 0.5rem;">เปิดการจอง</div>
            <div v-else class="lg:w-10 xl:w-5 bg-red-500 text-white text-center"
              style=" border-radius: 1rem; padding: 0.5rem;">ปิดการจอง</div>
          </template>
        </Column>
        <!-- <Column field="address" class="" header="ที่อยู่" style="width: 10%;" /> -->
        <Column field="phone_number" class="" header="เบอร์โทรติดต่อ" style="width: 10%;" />
        <Column field="price" class="" header="ราคา" style="width: 10%;" />
        <Column header="รูปภาพ" style="width: 5%">
          <template #body="item">
            <Gallery :data="item.data" />
          </template>
        </Column>
        <Column :exportable="false" header="เพิ่มเติม" style="width: 16%;">
          <template #body="item">
            <div class="xl:flex mx-2 " v-if="item.data.status === true">
              <EditHotel title="แก้ไขข้อมูล" :data="item.data" />
            </div>
            <div v-else class="xl:flex mx-2 ">
              <Button disabled class="delete-button bg-gray-500 border-0  text-white font-bold py-2 px-4 rounded">
                รออนุมัติ
              </Button>
            </div>
            <div class="xl:flex mx-2">
              <Button @click="deleteProduct(item.data._id)"
                class="delete-button bg-red-500 border-0 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                style="background-color: #C21010">
                ลบ
              </Button>
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
import Gallery from "../../../components/Gallery.vue"
export default {
  components: {
    EditHotel,
    Gallery
  },


  created() {
    document.title = "จัดการข้อมูลห้อง";
  },


  setup() {
    const item_product = ref([]);
    const reservationEnabled = ref(false);

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

          console.log(productResponse.data)
          reservationEnabled.value = productResponse.data[0].statusbooking

        } else {
          console.error("Data is missing in the API response.");
        }
      } catch (error) {
        console.error(error);
      }
    };


    const deleteProduct = async (_id) => {
      try {
        const response = await axios.delete(
          `${process.env.VUE_APP_API}room/${_id}`,
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        if (response.data) {
          // หากการลบสำเร็จ อัปเดตข้อมูล
          getData()
          // แสดงข้อความสำเร็จ (ตัวเลือก)
          Swal.fire({
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
          const updatedItem = item_product.value.find(item => item._id === _id);
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
              getData()
              throw new Error("Failed to update statusbooking on the server");
            }
          } else {
            throw new Error("Item not found in the local data");
          }
        }
        else {
          const updatedItem = item_product.value.find(item => item._id === _id);
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
              getData()
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
    };
  },


  methods: {
    async changeallstatus() {
      const status = !this.reservationEnabled
      if (status === true) {
        await axios.put(`${process.env.VUE_APP_API}room/openstatus/`, {},
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          })
        this.getData()
      }
      else {
        await axios.put(`${process.env.VUE_APP_API}room/closestatus/`, {},
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          })

        this.getData()
      }
    },
    getImage(item) {
      if (typeof item === 'string') {
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


  name: 'ManageRoom',
};

</script>
<style scoped>
@media (min-width: 640px) {
  .delete-button {
    margin: 0;
    width: 120px;
    margin-top: .5rem;
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


<template>
  <div class="grid px-10 mt-3 ml-5 mr-5">
    <div class="col-12 lg:col-12 border">
      <div class="text-center text-2xl">ข้อมูลห้อง</div>
      <div class="flex px-4 w-full item-center p-4" style="flex-direction: column; align-items: center;">
        <div class="flex justify-center">
          <p class="w-40 text-center text-2xl text-bold m-0">สถานะ: {{ reservationEnabled ? 'เปิด' : 'ปิด' }}</p>
        </div>
        <div class="card flex justify-center mt-2">
          <InputSwitch v-model="reservationEnabled" />
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

        <Column field="name" header="ชื่อ" style="width: 10%;"></Column>
        <Column field="image" header="Picture" style="width: 10%">
          <template #body="{ data }">
            <img v-if="Array.isArray(data.image) && data.image.length > 0" :src="getImage(data.image)" alt="ID Card"
              width="200" style="max-width: 100%; height: auto" />
            <div v-else>ไม่มีรูปภาพ</div>
          </template>
        </Column>
        <Column field="statusbooking" header="คำอธิบาย" style="width: 10%;">
          <template #body="{ data }">
            <div v-if="data.statusbooking === true" class=" bg-green-500 text-white text-center"
              style="width: 40%; border-radius: 1rem; padding: 0.5rem;">เปิดการจอง</div>
            <div v-else class=" bg-red-500 text-white text-center"
              style=" width: 40%; border-radius: 1rem; padding: 0.5rem;">ปิดการจอง</div>
          </template>

        </Column>
        <Column field="address" class="" header="ที่อยู่" style="width: 10%;"> </Column>
        <Column field="phone_number" class="" header="เบอร์โทรติดต่อ" style="width: 10%;"> </Column>
        <Column field="price" class="" header="ราคา" style="width: 5%;">

        </Column>
        <Column :exportable="false" header="เพิ่มเติม" style="width: 15%">

          <template #body="item">

            <div v-if="item.data.status === true">
              <EditHotel title="แก้ไขข้อมูล" :data="item.data" />
              <Button @click="deleteProduct(item.data._id)"
                class="bg-red-500 border-0 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                style="background-color: #C21010">ลบ</Button>
            </div>
            <div v-else>
              กรุณารออนุมัติจาก admin
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

export default {
  components: {
    EditHotel,
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
            title: "ลบสินค้าสำเร็จ",
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


    watch(
      () => reservationEnabled.value,
      async (newValue) => {
        try {
          if (newValue == true) {
            await axios.put(`${process.env.VUE_APP_API}room/openstatus/`, {},
              {
                headers: {
                  token: localStorage.getItem("token"),
                },
              })

            getData()
          } else {
            await axios.put(`${process.env.VUE_APP_API}room/closestatus/`, {},
              {
                headers: {
                  token: localStorage.getItem("token"),
                },
              })

            getData()
          }
        }
        catch (error) {

        }

      }
    );




    return {
      reservationEnabled,
      item_product,
      getData,
      deleteProduct,
    };
  },


  methods: {

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


<template>
    <div class="grid px-10 mt-3 ml-5 mr-5" >
      <div class="col-12 lg:col-12 border">
        <div class="text-center text-2xl">ข้อมูลห้อง</div>
        <div class="text-right my-5">
        </div>
        <DataTable
        :value="Array.isArray(item_product) ? item_product : []"
        :paginator="true"
        :rows="20"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rowsPerPageOptions="[5, 10, 25, 50, 75, 100]"
        currentPageReportTemplate="แสดง {first} ถึง {last} จาก {totalRecords} สินค้าทั้งหมด"
        responsiveLayout="stack">
        <!-- ตรวจสอบว่ามีข้อมูลสินค้าหรือไม่ -->
        <template #empty>
          <p class="font-italic text-center text-5xl" style="color: #bd1616">
            ไม่พบข้อมูลสินค้า
          </p>
        </template>

        <Column field="name" header="ชื่อ" style="width: 10%;"></Column>
        <Column field="image" header="Picture" style="width: 10%">
            <template #body="{ data }">
              <img
                v-if="Array.isArray(data.image) && data.image.length > 0"
                :src="getImage(data.image)"
                alt="ID Card"
                width="200"
                style="max-width: 100%; height: auto"
              />
              
              <div v-else>ไม่มีรูปภาพ</div>
            </template>
          </Column>
        <Column field="description" class="" header="คำอธิบาย" style="width: 15%;"> </Column>
        <Column field="address" class="" header="ที่อยู่" style="width: 10%;"> </Column>
        <Column field="phone_number" class="" header="เบอร์โทรติดต่อ" style="width: 10%;"> </Column>
        <Column field="price" class="" header="ราคา" style="width: 5%;"> </Column>
        <Column
          :exportable="false"
          class=""
          header="ลบข้อมูล"
          style="width: 5%"
        >

          <template #body="item">
            <!-- <updateadmin title="แก้ไขข้อมูล" :admin_id="item.data._id" :data="item.data"/> -->
            <Button
            @click="deleteProduct(item.data._id)"
              class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"

              style="background-color: #C21010"
              >ลบ</Button>
             
          </template>
        </Column>
        <Column header="เปิด-ปิด"
        style="width: 5%;">
        </Column>
        <div class="flex justify-end px-8 py-2">
          <label class="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" v-model="reservationEnabled" value="" class="sr-only peer" checked @click="toggleReservationStatus">
          <div class="w-[2.8rem] h-6 bg-gray-200 rounded-full peer dark:peer-focus:ring-emerald-500 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-4 peer-checked:after:border-emerald-400 peer-checked:bg-emerald-400 peer-checked:bg-emerald-400 after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-400">
          </div>
        </label>
      </div>
      </DataTable>
      </div>
    </div>
</template>

<script>
 import axios from "axios";
 import { onMounted, ref } from "vue";
 import Swal from "sweetalert2";
 import updateadmin from '@/views/admin/manageadmin/EditAdmin.vue'

export default {
  components: {
    updateadmin
  },
  created() {
    document.title = "จัดการข้อมูล admin";
  },
  setup() {
    const item_product = ref([]);
    const reservationEnabled = ref(true);
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
    return {
      item_product,
      getData,
      deleteProduct,
      reservationEnabled,
    };
  },
  methods: {
    getImage(item){
        if (typeof item === 'string') {
          return `https://drive.google.com/uc?export=view&id=${item}`;
        } else if (Array.isArray(item) && item.length > 0) {
          const firstImageId = item[0];
          return `https://drive.google.com/uc?export=view&id=${firstImageId}`;
        } else {
          return "";
        }
  },
  toggleReservationStatus() {
    this.reservationEnabled = !this.reservationEnabled;
    if (this.reservationEnabled) {
      console.log("Open");
      this.fetchData()
      //ระบบการจองถูกเปิด
    } else {
      console.log("Off")
      this.collectData()
      //ระบบการจองถูกปิด
    }
  },
  async fetchData() {
    try {
      const response = await axios.put(
          `${process.env.VUE_APP_API}room/openstatus/`,
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
      this.dataFromApi = response.data; // นำข้อมูลที่ได้มาเก็บไว้ในตัวแปร
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  },
  async collectData() {
    try {
      const response = await axios.get(
          `${process.env.VUE_APP_API}room/closestatus/`,
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
      this.dataFromApi = response.data; // นำข้อมูลที่ได้มาเก็บไว้ในตัวแปร
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  },
},
  name: 'ManageRoom',
  };

</script>


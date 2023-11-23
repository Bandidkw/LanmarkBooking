<template>
  <div class="grid px-10 mt-3 ml-5 mr-5">
    <div class="col-12 lg:col-12 border">
      <div class="text-center font-bold text-4xl">ข้อมูลอนุมัติpartner</div>
      <div class="text-right my-5"></div>

      <DataTable
        :value="Array.isArray(item_product) ? item_product : []"
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

        <Column
          field="telephone"
          header="เบอร์โทรศัพท์"
          style="width: 10%"
        ></Column>
        <Column field="imge_idcard" header="Picture" style="width: 10%">
          <template #body="{ data }">
            <img
              v-if="Array.isArray(data.image_idcard) && data.image_idcard.length > 0"
              :src="getImage(data.image_idcard)"
              alt="ID Card"
              style="max-width: 100%; height: auto"
            />
            
            <div v-else>ไม่มีรูปภาพ</div>
          </template>
        </Column>
        <Column field="name" class="" header="ชื่อ" style="width: 10%">
        </Column>
        <Column class="" header="สถานะอนุมัติ" style="width: 10%">
          <template #body="{ data }">
            <div class="w-2/4" style="background-color: #dad7cd; width: 35%; border-radius: 1rem; padding: 0.5rem;" v-if="data.approve.slice(-1)[0].statusapprove === 'รออนุมัติ'">
              <div class="font-bold" style="color: #ff7315;">
                {{ data.approve.slice(-1)[0].statusapprove }}
              </div>
            </div>
            <div class="w-2/4" style="background-color: #dad7cd; width: 27%; border-radius: 1rem; padding: 0.5rem;" v-if="data.approve.slice(-1)[0].statusapprove === 'อนุมัติ'">
              <div class="text-green-500 font-bold">
                {{ data.approve.slice(-1)[0].statusapprove }}
              </div>
            </div>
            <div style="background-color: #dad7cd; width: 35%; border-radius: 1rem; padding: 0.5rem;" v-if="data.approve.slice(-1)[0].statusapprove === 'ไม่อนุมัติ'"
            >
              <div class="text-red-500 font-bold">
                {{ data.approve.slice(-1)[0].statusapprove }}
              </div>
            </div>
            <!-- ให้แสดงค่า statusapprove ของแต่ละ Item ใน Column -->
          </template>
        </Column>
        <Column header="รายละเอียด"
        style="width: 10%;">
        <template #body="{ data }">
          <Button
                @click="showPartnerDetail(data)"
                class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mx-2">รายละเอียด</Button>
                <div class="grid px-10 mt-3 ml-5 mr-5">
    <!-- Modal -->
    <div v-if="selectedPartner" class="fixed inset-0 overflow-y-auto">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <!-- Background overlay, show/hide based on modal state. -->
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <!-- Modal Panel -->
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <!-- Modal Header -->
          <div class="bg-gray-200 px-4 py-2">
            <h3 class="text-lg font-semibold leading-6 text-gray-900">Partner Details</h3>
            <button @click="closeModal" class="text-gray-700 hover:text-gray-900 focus:outline-none focus:text-gray-900">
              &times;
            </button>
          </div>
  <!-- Modal Body -->
  <div class="px-4 py-4">
    <div v-if="selectedPartner">
      <p>ชื่อ: {{ selectedPartner.name }}</p>
      <p>เบอร์โทร: {{ selectedPartner.telephone }}</p>
      <!-- เพิ่มข้อมูลเพิ่มเติมตามที่คุณต้องการแสดง -->

      <div v-if="partnerDetail">
        <p>ข้อมูลจาก API {{ partnerDetail.someProperty }}</p>
      </div>
    </div>
  </div>
        </div>
      </div>
    </div>
  </div>
        </template>
        
        </Column>

        <Column class="" header="เพิ่มเติม" style="width: 10%">
          <template #body="{ data }">
            <!-- ให้แสดงค่า statusapprove ของแต่ละ Item ใน Column -->
            <div v-if="data.approve.slice(-1)[0].statusapprove === 'รออนุมัติ'">
              <!-- กรณีรอการอนุมัติ -->
              <Button
                @click="approvepartner(data._id)"
                class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mx-2 boeder-none"
                >อนุมัติ</Button>
              <Button
                @click="unapprovepartner(data._id)"
                class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >ไม่อนุมัติ</Button
              >
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { onMounted, ref } from "vue";
import Swal from "sweetalert2";

export default {

  components: {},

  created() {
    document.title = "ข้อมูล partner";
  },

  setup() {
    const partnerDetail = ref(null);
    const item_product = ref([]);
    const getData = async () => {
      try {
        const productResponse = await axios.get(
          `${process.env.VUE_APP_API}partner/`,
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );

        if (productResponse.data && productResponse.data) {
          item_product.value = productResponse.data.data.reverse();

          console.log(productResponse.data.data);
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
          `${process.env.VUE_APP_API}partner/approve/${_id}`,
          {},
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        if (response.data) {
          // แสดงข้อความสำเร็จ (ตัวเลือก)
          Swal.fire({
            icon: "success",
            title: "อนุมัติผู้ใช้partner",
          });
          getData();
        } else {
          await Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาด",
            text: "ไม่สามารถทำตามข้อมูลได้",
          });
        }
      } catch (error) {
        await Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด",
          text: "ไม่สามารถทำตามข้อมูลได้",
        });
      }
    };
    const unapprovepartner = async (_id) => {
      try {
        const response = await axios.put(
          `${process.env.VUE_APP_API}partner/unapprove/${_id}`,
          {},
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        if (response.data) {
          // แสดงข้อความสำเร็จ (ตัวเลือก)
          Swal.fire({
            icon: "success",
            title: "ไม่อนุมัติผู้ใช้partner",
          });
          getData();
        } else {
          await Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาด",
            text: "ไม่สามารถทำตามข้อมูลได้",
          });
        }
      } catch (error) {
        await Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด",
          text: "ไม่สามารถทำตามข้อมูลได้",
        });
      }
    };
    const showPartnerDetail = async (_id) =>{
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_API}partner/${_id}`,
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        partnerDetail.value = response.data;
        this.selectedPartner = data;
      }
      catch (error){
        console.error("Error fetching partner details:",error);
        Swal.fire({
          icon:"error",
          title:"เกิดข้อผิดพลาด",
          text:"ไม่สามารถดึงข้อมูลได้",
        });
      }
    };

    onMounted(() => {
      getData();
    });

    return {
      item_product,
      getData,
      approvepartner,
      unapprovepartner,
      partnerDetail,
      showPartnerDetail,
      selectedPartner: null,
    };
  },

  name: "ApprovePartner",

  methods:{
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
  showUserDetails(partner) {
      this.selectedPartner = partner;
      console.log("hello")
    },

    closeModal() {
      this.selectedPartner = null;
    },
  },
};
</script>

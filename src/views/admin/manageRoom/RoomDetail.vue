<template>
  <div class="grid px-10 mt-3 ml-5 mr-5 w-full">
    <Loading :loading="loading" />
    <div class="col-12 lg:col-12 border">
      <h1 class="text-center">ประเภทห้อง</h1>
      <div class="text-right my-5">
        <!-- <router-link to="/addroomtype" @click="isAddTypeModalOpen = true">
            <Button  label="เพิ่มประเภทห้อง" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" />
                                                                                                              </router-link> -->
        <AddRoomtype @typeAdded="getData" />
      </div>
      <div v-if="isAddTypeModalOpen" class="modal-styles flex flex-col">
        <h1>Modal</h1>
        <input type="text" />
        <!-- โค้ดอื่น ๆ ของ Modal -->
        <button @click="closeAddTypeModal">ปิด</button>
      </div>
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
            ไม่พบข้อมูล
          </p>
        </template>

        <Column field="name" header="ชื่อ" class="xl:w-2/4"></Column>
        <Column field="description" class="xl:w-2/4" header="รายละเอียด">
        </Column>

        <Column
          :exportable="false"
          class="lg:w-4 xl:w-3 2xl:w-0"
          header="เพิ่มเติม"
        >
          <template #body="item">
            <updatetype
              :data="item.data"
              title="แก้ไขประเภทที่พัก"
              @typeAdded="getData"
            />
            <Button
              @click="deleteProduct(item.data._id)"
              class="bg-red-500 hover:bg-red-700 border-none text-white font-bold py-2 px-4 rounded"
              style="background-color: #c21010"
              >ลบ</Button
            >
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
import updatetype from "@/views/admin/manageRoom/EditRoom.vue";
import AddRoomtype from "./AddRoomtype.vue";
import Loading from "../../../components/Loading.vue";
export default {
  props: ["isAddTypeModalOpen"],
  components: {
    updatetype,
    AddRoomtype,
    Loading,
  },
  created() {
    document.title = "จัดการประเภทห้อง";
  },
  setup() {
    const item_product = ref([]);
    const isAddTypeModalOpen = ref(false);
    const loading = ref(true);
    const getData = async () => {
      try {
        const productResponse = await axios.get(
          `${process.env.VUE_APP_API}room/type`,
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
          `${process.env.VUE_APP_API}room/type/${_id}`,
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );

        if (response.data) {
          // หากการลบสำเร็จ อัปเดตข้อมูล
          getData();
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
      isAddTypeModalOpen,
      loading,
    };
  },
  name: "RoomDetail",
  methods: {
    closeAddTypeModal() {
      this.isAddTypeModalOpen, false;
    },
  },
};
</script>

<style>
.modal-styles {
  flex-direction: column;
  align-items: center;
}
</style>

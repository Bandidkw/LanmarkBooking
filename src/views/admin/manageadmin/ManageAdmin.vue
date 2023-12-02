<template>
  <div class="grid px-10 mt-3 ml-5 mr-5 w-full containter">
    <Loading :loading="loading" />
    <div class="col-12 lg:col-12 border">
      <div class="text-center font-bold text-4xl">จัดการข้อมูล admin</div>
      <div class="text-right my-5">
        <router-link to="/addadmin">
          <Button
            label="เพิ่มข้อมูลadmin"
            class="bg-blue-500 border-none hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          />
        </router-link>
      </div>

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
          <div class="flex justify-content-end">
            <span class="p-input-icon-left">
              <i class="pi pi-search" />
              <InputText
                v-model="searchall"
                placeholder="ค้นหา"
                class="bg-white-500 p-2 pl-5 border"
              />
            </span>
          </div>
        </template>

        <Column
          field="telephone"
          header="เบอร์โทรศัพท์"
          sortable
          style="width: 20%"
        ></Column>
        <Column field="name" class="" header="ชื่อ" sortable style="width: 10%"></Column>
        <Column
          :exportable="false"
          class=""
          header="เพิ่มเติม"
          style="width: 10%"
        >
          <template #body="item">
            <updateadmin title="แก้ไขข้อมูล" :data="item.data" />
            <Button
              @click="deleteProduct(item.data._id)"
              class="bg-red-500 hover:bg-red-700 text-white font-bold border-none py-2 px-4 rounded"
              style="background-color: #c21010"
              >ลบ</Button>
            
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
import updateadmin from "@/views/admin/manageadmin/EditAdmin.vue";
import Loading from "../../../components/Loading.vue";

export default {
  components: {
    updateadmin,
    Loading,
  },
  created() {
    document.title = "จัดการข้อมูล admin";
  },
  setup() {
    const item_product = ref([]);
    const searchall = ref('');
    const loading = ref(true);
    const getData = async () => {
      try {
        const productResponse = await axios.get(
          `${process.env.VUE_APP_API}admin/`,
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );

        if (productResponse.data && productResponse.data) {
          item_product.value = productResponse.data.data;
          loading.value = false;
          console.log(productResponse.data.data);
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
          `${process.env.VUE_APP_API}admin/${_id}`,
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
      loading,
      searchall,
    };
  },
  computed: {
  Filter() {
    if (this.searchall) {
        const searchTerm = this.searchall.toLowerCase();
        return this.item_product.filter(item => {
          // ใช้ includes() เพื่อตรวจสอบว่าคำที่ค้นหาอยู่ในชื่อหรือเบอร์โทรศัพท์หรือไม่
          return (
            item.name.toLowerCase().includes(searchTerm) ||
            item.telephone.includes(searchTerm)
          );
        });
      } else {
        return this.item_product;
      }
  },
},

  name: "ManageAdmin",
};
</script>
<style scoped>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
</style>

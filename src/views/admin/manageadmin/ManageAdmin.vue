<template>
  <div class="grid px-10 mt-3 ml-5 mr-5 w-full containter">
    <Loading :loading="loading" />
    <div class="col-12 lg:col-12 border">
      <div class="text-center font-bold text-4xl">จัดการข้อมูล admin</div>
      <div class="text-right my-5">
        <router-link to="/addadmin">
          <Button
            label="เพิ่มข้อมูล admin"
            severity="secondary"
            icon="pi pi-user-plus"
            text
            raised
            class="hover:text-blue-500 rounded-xl font-bold py-2.5 px-4"
          />
        </router-link>
      </div>

      <DataTable
        :value="Filter"
        :paginator="true"
        :rows="20"
        selectionMode="single"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rowsPerPageOptions="[5, 10, 25, 50, 75, 100]"
        currentPageReportTemplate="แสดง {first} ถึง {last} จาก {totalRecords} สินค้าทั้งหมด"
        responsiveLayout="stack"
      >
        <!-- ตรวจสอบว่ามีข้อมูลสินค้าหรือไม่ -->
        <template #empty>
          <p
            class="font-italic text-center text-5xl text-center"
            style="color: #bd1616"
          >
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
                class="bg-white-500 border"
                style="height: 48px"
              />
            </span>
          </div>
        </template>

        <Column
          field="telephone"
          header="เบอร์โทรศัพท์"
          style="width: 20%; cursor: default"
          :headerStyle="{ color: headerTextColor }"
        ></Column>
        <Column
          field="name"
          class=""
          header="ชื่อ"
          style="width: 10%; cursor: default"
          :headerStyle="{ color: headerTextColor }"
        ></Column>
        <Column
          :exportable="false"
          style="width: 10%; cursor: default"
          :headerStyle="{ color: headerTextColor }"
        >
          <template #body="item">
            <div class="flex justify-content-around gap-6">
              <updateadmin :data="item.data" />
              <i
                class="pi pi-trash cursor-pointer icon-style"
                @click="deleteProduct(item.data._id)"
              />
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
    const searchall = ref("");
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
        console.log("admin : ");
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
            `${process.env.VUE_APP_API}admin/${_id}`,
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
    return {
      item_product,
      getData,
      deleteProduct,
      loading,
      searchall,
      headerTextColor: "rgb(156 163 175)",
    };
  },
  computed: {
    Filter() {
      if (this.searchall) {
        const searchTerm = this.searchall.toLowerCase();
        return this.item_product.filter((item) => {
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
<style scope>
.icon-style {
  transition: all 0.2s ease-in-out;
}
.icon-style:hover {
  color: #3b82f6;
}
</style>

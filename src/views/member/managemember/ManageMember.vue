<template>
  <div class="grid px-10 mt-3 ml-5 mr-5 w-full">
    <Loading :loading="loading" />
    <div class="col-12 lg:col-12 border">
      <div class="text-center font-bold text-4xl">ข้อมูล member</div>
      <div class="text-right my-5"></div>

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
                class="bg-white-500 border"
                style="height: 48px"
              />
            </span>
          </div>
        </template>

        <Column
          field="telephone"
          sortable
          header="เบอร์โทรศัพท์"
          style="width: 20%; cursor: default"
          :headerStyle="{ color: headerTextColor }"
        ></Column>
        <Column
          field="name"
          header="ชื่อ"
          sortable
          style="width: 10%; cursor: default"
          :headerStyle="{ color: headerTextColor }"
        >
        </Column>
        <Column
          field="firstname"
          header="ชื่อจริง"
          sortable
          style="width: 10%; cursor: default"
          :headerStyle="{ color: headerTextColor }"
        >
        </Column>
        <Column
          field="lastname"
          header="นามสกุล"
          sortable
          style="width: 10%; cursor: default"
          :headerStyle="{ color: headerTextColor }"
        >
        </Column>
        <Column
          field="email"
          header="อีเมล"
          sortable
          style="width: 10%; cursor: default"
          :headerStyle="{ color: headerTextColor }"
        >
        </Column>
        <!-- <Column :exportable="false" style="width: 10%; cursor: default">
          <template #body="item">
            <i
              class="pi pi-trash cursor-pointer icon-style"
              @click="deleteProduct(item.data._id)"
            />
          </template>
        </Column> -->
      </DataTable>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { onMounted, ref } from "vue";
import Swal from "sweetalert2";
import Loading from "../../../components/Loading.vue";

export default {
  components: {
    Loading,
  },
  created() {
    document.title = "ข้อมูล Member";
  },
  setup() {
    const item_product = ref([]);
    const loading = ref(true);
    const searchall = ref("");
    const getData = async () => {
      try {
        const productResponse = await axios.get(
          `${process.env.VUE_APP_API}member/`,
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

    // const deleteProduct = async (_id) => {
    //   try {
    //     console.log("kim");
    //     const { value: deletehotel } = await Swal.fire({
    //       title: "ต้องการลบหรือไม่",
    //       text: "คุณต้องการลบรายการนี้หรือไม่",
    //       icon: "warning",
    //       showCancelButton: true,
    //       confirmButtonColor: "#3085d6",
    //       cancelButtonColor: "#d33",
    //       cancelButtonText: "ยกเลิก",
    //       confirmButtonText: "ยืนยันลบ",
    //       // input: "text",
    //       // inputLabel: "สาเหตุที่ต้องการลบ",
    //       // inputPlaceholder: "กรุณากรอกสาเหตุ",
    //       // inputValidator: (value) => {
    //       //   if (!value) {
    //       //     return "กรุณากรอกสาเหตุที่ต้องการลบ";
    //       //   }
    //       // },
    //     });

    //     if (deletehotel) {
    //       console.log("kim1");

    //       const response = await axios.delete(
    //         `${process.env.VUE_APP_API}member/${_id}`,
    //         {
    //           headers: {
    //             token: localStorage.getItem("token"),
    //           },
    //         }
    //       );

    //       if (response.data) {
    //         console.log("kim2");

    //         getData();
    //         await Swal.fire({
    //           icon: "success",
    //           title: "ลบรายการสำเร็จ",
    //         });
    //       } else {
    //         console.log("kim3");

    //         await Swal.fire({
    //           icon: "error",
    //           title: "เกิดข้อผิดพลาด",
    //           text: "ไม่สามารถแก้ไขข้อมูลได้",
    //         });
    //       }
    //     }
    //   } catch (error) {
    //     console.log("kim4");

    //     await Swal.fire({
    //       icon: "error",
    //       title: "เกิดข้อผิดพลาด",
    //       text: "ไม่สามารถลบข้อมูลได้",
    //     });
    //   }
    // };
    onMounted(() => {
      getData();
    });
    return {
      item_product,
      getData,
      // deleteProduct,
      loading,
      searchall,
      headerTextColor: "rgb(156 163 175)",
    };
  },
  computed: {
    Filter() {
      if (this.searchall) {
        //ค้นหาด้วยคำ
        const searchTerm = this.searchall.toLowerCase();
        return this.item_product.filter((item) => {
          // ใช้ includes() เพื่อตรวจสอบว่าคำที่ค้นหาอยู่ในชื่อหรือเบอร์โทรศัพท์หรือไม่
          return (
            item.name.toLowerCase().includes(searchTerm) ||
            item.telephone.includes(searchTerm) ||
            item.firstname.toLowerCase().includes(searchTerm) ||
            item.lastname.toLowerCase().includes(searchTerm) ||
            item.email.toLowerCase().includes(searchTerm)
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

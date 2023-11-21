<template>
    <div class="grid px-10 mt-3 ml-5 mr-5" >
      <div class="col-12 lg:col-12 border">
        <div class="text-center text-2xl">สถานะห้อง</div>
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
        <Column field="description" class="" header="คำอธิบาย" style="width: 10%;"> </Column>
        <Column field="address" class="" header="ที่อยู่" style="width: 10%;"> </Column>
        <Column field="phone_number" class="" header="เบอร์โทรติดต่อ" style="width: 10%;"> </Column>
        <Column field="price" class="" header="ราคา" style="width: 5%;"> </Column>
        <Column
        field=""
        class=""
        header="ปิด-เปิด"
        style="width: 5%">
        </Column>
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
    const getData = async () => {
      try {
        const productResponse = await axios.get(
          `${process.env.VUE_APP_API}room`,
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
          `${process.env.VUE_APP_API}admin/${_id}`,
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

    };

  },
    name: 'ReserveRoom',
  };
  
</script>


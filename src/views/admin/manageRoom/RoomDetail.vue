
<template>
    <div class="grid px-10 mt-3 ml-5 mr-5" >
      <div class="col-12 lg:col-12 border">
        <div class="text-center text-2xl">รายละเอียดห้อง</div>
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
            ไม่พบข้อมูล
          </p>
        </template>

        <Column field="name" header="รีสอร์ท" style="width: 20%;"></Column>
        <Column field="description" class="" header="รีสอร์ท" style="width: 20%;"> </Column>
        <Column
          :exportable="false"
          class=""
          header="ลบ"
          style="width: 10%"
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
          `${process.env.VUE_APP_API}room/type/`,
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
          `${process.env.VUE_APP_API}room/type/${_id}`,
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
    name: 'RoomDetail',
  };
</script>
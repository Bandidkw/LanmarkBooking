
<template>
    <div class="grid px-10 mt-3 ml-5 mr-5" >
      <div class="col-12 lg:col-12 border">
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

        <Column field="telephone" header="เบอร์โทรศัพท์" style="width: 20%;"></Column>
        <Column field="name" class="" header="ชื่อ" style="width: 10%;"> </Column>
        <Column
          :exportable="false"
          class=""
          header="เพิ่มเติม"
          style="width: 10%"
        >
          <template #body="item">
            <Button
              class="border-none"
              style="background-color: #ff7315"
              >แก้ไข</Button
            >
            <Button
            @click="deleteProduct(item.data._id)"
              class="border-none ml-2"
              style="background-color: #C21010"
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

export default {
  components: {

  },
  created() {
    document.title = "จัดการข้อมูล admin";
  },
  setup() {
    const item_product = ref([]);
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
          console.log(productResponse.data.data)
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
          console.log("ลบข้อมูลไม่สำเร็จ");
        }
      } catch (error) {
        console.error(error);
        // แสดงข้อความผิดพลาด (ตัวเลือก)
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
    name: 'ManageAdmin',
  };
</script>

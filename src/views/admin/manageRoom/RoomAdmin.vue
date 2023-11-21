
<template>
    <div class="grid px-10 mt-3 ml-5 mr-5" >
      <div class="col-12 lg:col-12 border">
        <div class="text-center font-bold text-4xl">ข้อมูลห้อง</div>
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

        <Column field="image" header="Picture" style="width: 20%">
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
        <Column field="name" header="ชื่อ" style="width: 20%;"></Column>
        <Column field="type.name" header="ประเภทโรงแรม" style="width: 20%;"></Column>
        <Column field="price" header="ราคาต่อคืน" style="width: 20%;"></Column>
      
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
    document.title = "ข้อมูลโรงแรม";
  },
  setup() {
    const item_product = ref([]);
    const getData = async () => {
      try {
        const productResponse = await axios.get(
          `${process.env.VUE_APP_API}room/`,
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
            title: "ลบข้อมูลpartnerสำเร็จ",
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
      }
    },
  };
</script>


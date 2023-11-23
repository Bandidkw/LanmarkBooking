<template>
  <div class="grid px-10 mt-3 ml-5 mr-5">
    <div class="col-12 lg:col-12 border">
      <div class="text-center font-bold text-4xl">ข้อมูลอนุมัติการเพิ่มห้อง</div>
      <div class="text-right my-5"></div>

      <DataTable :value="Array.isArray(item_product) ? item_product : []" :paginator="true" :rows="20"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rowsPerPageOptions="[5, 10, 25, 50, 75, 100]"
        currentPageReportTemplate="แสดง {first} ถึง {last} จาก {totalRecords} สินค้าทั้งหมด" responsiveLayout="stack">
        <!-- ตรวจสอบว่ามีข้อมูลสินค้าหรือไม่ -->

        <template #empty>
          <p class="font-italic text-center text-5xl" style="color: #bd1616">
            ไม่พบข้อมูลสินค้า
          </p>
        </template>

        <Column field="partner_id.name" header="ชื่อ partner" style="width: 20%"></Column>
        <Column field="image" header="Picture" style="width: 10%">
          <template #body="{ data }">
            <img v-if="Array.isArray(data.image) && data.image.length > 0" :src="getImage(data.image)" alt="ID Card"
              width="200" style="max-width: 100%; height: auto" />

            <div v-else>ไม่มีรูปภาพ</div>
          </template>
        </Column>
        <Column field="name" class="" header="ชื่อ" style="width: 10%">
        </Column>
        <Column class="" header="สถานะอนุมัติ" style="width: 10%">
          <template #body="{ data }">
            <div class="w-2/4 bg-orange-500" style=" width: 35%; border-radius: 1rem; padding: 0.5rem;"
              v-if="data.approve.slice(-1)[0].statusapprove === 'รออนุมัติ'">
              <div class="font-bold" style="color: #fff;">
                {{ data.approve.slice(-1)[0].statusapprove }}
              </div>
            </div>
            <div class="w-2/4 bg-green-500" style=" width: 27%; border-radius: 1rem; padding: 0.5rem;"
              v-if="data.approve.slice(-1)[0].statusapprove === 'อนุมัติ'">
              <div class="text-white font-bold">
                {{ data.approve.slice(-1)[0].statusapprove }}
              </div>
            </div>
            <div class="bg-red-500" style=" width: 35%; border-radius: 1rem; padding: 0.5rem;"
              v-if="data.approve.slice(-1)[0].statusapprove === 'ไม่อนุมัติ'">
              <div class="text-white font-bold">
                {{ data.approve.slice(-1)[0].statusapprove }}
              </div>
            </div>
            <!-- ให้แสดงค่า statusapprove ของแต่ละ Item ใน Column -->
          </template>
        </Column>
        <Column header="รายละเอียด" style="width: 10%;">
          <template #body>
            <Button @click="unapproveroom(data._id)"
              class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">รายละเอียด</Button>
          </template>
        </Column>

        <Column class="" header="เพิ่มเติม" style="width: 10%">
          <template #body="{ data }">
            <!-- ให้แสดงค่า statusapprove ของแต่ละ Item ใน Column -->
            <div v-if="data.approve.slice(-1)[0].statusapprove === 'รออนุมัติ'">
              <!-- กรณีรอการอนุมัติ -->
              <Button @click="approveroom(data._id)"
                class="bg-green-500 border-black hover:bg-green-700 text-white font-bold py-2 px-4 rounded mx-2">อนุมัติ</Button>
              <Button @click="unapproveroom(data._id)"
                class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">ไม่อนุมัติ</Button>
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
    document.title = "ข้อมูลอนุมัติห้อง";
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
          item_product.value = productResponse.data.reverse();

          console.log(productResponse.data.data);
        } else {
          console.error("Data is missing in the API response.");
        }
      } catch (error) {
        console.error(error);
      }
    };
    const approveroom = async (_id) => {
      try {
        const response = await axios.put(
          `${process.env.VUE_APP_API}room/approve/${_id}`,
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
            title: "อนุมัติห้องสำเร็จแล้ว",
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
    const unapproveroom = async (_id) => {
      try {
        const response = await axios.put(
          `${process.env.VUE_APP_API}room/unapprove/${_id}`,
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
            title: "ไม่อนุมัติห้องสำเร็จแล้ว",
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

    onMounted(() => {
      getData();
    });
    return {
      item_product,
      getData,
      approveroom,
      unapproveroom,
    };
  },
  methods: {
    getImage(item) {
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
  
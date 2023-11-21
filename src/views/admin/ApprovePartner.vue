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
          style="width: 20%"
        ></Column>
        <Column field="imge_idcard" header="Picture" style="width: 10%">
          <template #body="{ data }">
            <img
              v-if="data.image_idcard"
              :src="data.image_idcard"
              alt="ID Card"
              style="max-width: 100%; height: auto"
            />
            <div v-else>No Image Available</div>
          </template>
        </Column>
        <Column field="name" class="" header="ชื่อ" style="width: 10%">
        </Column>
        <Column class="" header="สถานะอนุมัติ" style="width: 10%">
          <template #body="{ data }">
            <div v-if="data.approve.slice(-1)[0].statusapprove === 'รออนุมัติ'">
              <div class="font-bold" style="color: #ff7315">
                {{ data.approve.slice(-1)[0].statusapprove }}
              </div>
            </div>
            <div v-if="data.approve.slice(-1)[0].statusapprove === 'อนุมัติ'">
              <div class="text-green-500 font-bold">
                {{ data.approve.slice(-1)[0].statusapprove }}
              </div>
            </div>
            <div
              v-if="data.approve.slice(-1)[0].statusapprove === 'ไม่อนุมัติ'"
            >
              <div class="text-red-500 font-bold">
                {{ data.approve.slice(-1)[0].statusapprove }}
              </div>
            </div>
            <!-- ให้แสดงค่า statusapprove ของแต่ละ Item ใน Column -->
          </template>
        </Column>

        <Column class="" header="เพิ่มเติม" style="width: 10%">
          <template #body="{ data }">
            <!-- ให้แสดงค่า statusapprove ของแต่ละ Item ใน Column -->
            <div v-if="data.approve.slice(-1)[0].statusapprove === 'รออนุมัติ'">
              <!-- กรณีรอการอนุมัติ -->
              <Button
                @click="approvepartner(data._id)"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2"
                style="background-color: #c21010"
                >อนุมัติ</Button
              >
              <Button
                @click="unapprovepartner(data._id)"
                class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                style="background-color: #c21010"
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
    onMounted(() => {
      getData();
    });
    return {
      item_product,
      getData,
      approvepartner,
      unapprovepartner,
    };
  },
  name: "ApprovePartner",
};
</script>

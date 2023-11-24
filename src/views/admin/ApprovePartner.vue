<template>
  <div class="grid px-10 mt-3 ml-5 mr-5">
    <div class="col-12 lg:col-12 border">
      <div class="text-center font-bold text-4xl">ข้อมูลอนุมัติpartner</div>
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

        <Column field="telephone" header="เบอร์โทรศัพท์" style="width: 14%"></Column>
        <Column field="name" class="" header="ชื่อ" style="width: 14%">
        </Column>
        <Column class="" header="สถานะอนุมัติ" style="width: 14%">
          <template #body="{ data }">
            <div class="w-2/4 bg-orange-500 flex justify-content-center"
              style=" width: 35%; border-radius: 1rem; padding: 0.5rem;"
              v-if="data.approve.slice(-1)[0].statusapprove === 'รออนุมัติ'">
              <div class="font-bold" style="color: #fff;">
                {{ data.approve.slice(-1)[0].statusapprove }}
              </div>
            </div>
            <div class="w-2/4 bg-green-500 flex justify-content-center"
              style=" width: 35%; border-radius: 1rem; padding: 0.5rem;"
              v-if="data.approve.slice(-1)[0].statusapprove === 'อนุมัติ'">
              <div class="text-white font-bold">
                {{ data.approve.slice(-1)[0].statusapprove }}
              </div>
            </div>
            <div class="bg-red-500 flex justify-content-center" style=" width: 35%; border-radius: 1rem; padding: 0.5rem;"
              v-if="data.approve.slice(-1)[0].statusapprove === 'ไม่อนุมัติ'">
              <div class="text-white font-bold">
                {{ data.approve.slice(-1)[0].statusapprove }}
              </div>
            </div>
            <!-- ให้แสดงค่า statusapprove ของแต่ละ Item ใน Column -->
          </template>
        </Column>
        <Column header="รายละเอียด" style="width: 10%;">
          <template #body="{ data }">
            <Button @click="showPartnerDetail(data)"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2">รายละเอียด</Button>

          </template>

        </Column>

        <Column style="width: 10%">
          <template #body="{ data }">
            <!-- ให้แสดงค่า statusapprove ของแต่ละ Item ใน Column -->
            <div class="flex justify-content-center" v-if="data.approve.slice(-1)[0].statusapprove === 'รออนุมัติ'">
              <!-- กรณีรอการอนุมัติ -->
              <Button @click="approvepartner(data._id)"
                class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mx-2 boeder-none">อนุมัติ</Button>
              <Button @click="unapprovepartner(data._id)"
                class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">ไม่อนุมัติ</Button>
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
  <Dialog v-model:visible="DetailPartner" modal :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <div class="grid">
      <div class="col-12 text-center">
        <h2>แก้ไขข้อมูล Partner</h2>
      </div>
    </div>
    <div class="grid">
      <div class="col-12 md:col-12">
        <form>
          <div class="col-12 flex justify-content-center">
            <img v-if="image" :src="getImage(image)" alt="ID Card" style="  max-width: 50%; height: 50%" />
            <div v-else>ไม่มีรูปภาพ</div>
          </div>
          <div class="col-12">
            <p> ID Card:</p>
            <InputText v-model="idcard" class="w-full text-black-950 font-bold" style="color:#000" disabled />
          </div>
          <div class="col-12">
            <p> First Name :</p>
            <InputText v-model="name" class="w-full text-black-950 font-bold" style="color:#000" disabled />
          </div>
          <div class="col-12">
            <p>Phone : </p>
            <InputText v-model="phone" class="w-full text-black-950 font-bold " style="color:#000" disabled />
          </div>


        </form>
      </div>
    </div>
  </Dialog>
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
    // const partnerDetail = ref(null);
    const DetailPartner = ref(false);
    const image = ref(null);
    const name = ref("");
    const phone = ref("");
    const idcard = ref("");

    const item_product = ref([]);
    const getData = async () => {
      console.log(DetailPartner, "status dialog before click button ");

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

    const showPartnerDetail = async (data) => {

      DetailPartner.value = true;
      image.value = data.image_idcard
      name.value = data.name
      phone.value = data.telephone
      console.log(data)
      console.log(data.idcard)
      idcard.value = data.idcard
    }

    onMounted(() => {
      getData();
    });

    return {
      item_product,
      getData,
      approvepartner,
      unapprovepartner,
      // partnerDetail,
      showPartnerDetail,
      DetailPartner,
      name,
      image,
      phone,
      idcard

    };
  },

  name: "ApprovePartner",

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
    },
  },
};
</script>

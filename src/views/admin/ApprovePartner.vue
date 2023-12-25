<template>
  <div class="grid px-10 mt-3 ml-5 mr-5 w-full">
    <Loading :loading="loading" />
    <div class="col-12 lg:col-12 border">
      <div class="text-center font-bold text-4xl">ข้อมูลอนุมัติpartner</div>
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
          <p
            class="font-italic text-center text-5xl text-center"
            style="color: #bd1616"
          >
            ไม่พบข้อมูลสินค้า
          </p>
        </template>
        <template #header>
          <div class="flex justify-content-end">
            <div class="mx-2">
              <Dropdown
                v-model="selectstatus"
                :options="statusdata"
                optionLabel="name"
                optionValue="name"
                placeholder="เลือกสถานะการค้นหา"
              />
            </div>

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
          style="width: 14%; cursor: default"
          :headerStyle="{ color: headerTextColor }"
        ></Column>
        <Column
          field="name"
          class=""
          header="ชื่อ"
          style="width: 14%; cursor: default"
          :headerStyle="{ color: headerTextColor }"
        >
        </Column>
        <Column
          header="สถานะอนุมัติ"
          style="width: 14%; cursor: default"
          :headerStyle="{ color: headerTextColor }"
        >
          <template #body="{ data }">
            <div
              class="lg:w-10 xl:w-5 bg-orange-100 text-orange-600 font-normal border-2 border-orange-300 text-center"
              style="border-radius: 1rem; padding: 0.5rem"
              v-if="data.approve.slice(-1)[0].statusapprove === 'รออนุมัติ'"
            >
              <div>
                {{ data.approve.slice(-1)[0].statusapprove }}
              </div>
            </div>
            <div
              class="lg:w-10 xl:w-5 bg-green-100 text-green-600 font-normal border-2 border-green-300 text-center"
              style="border-radius: 1rem; padding: 0.5rem"
              v-if="data.approve.slice(-1)[0].statusapprove === 'อนุมัติ'"
            >
              <div>
                {{ data.approve.slice(-1)[0].statusapprove }}
              </div>
            </div>
            <div
              class="lg:w-10 xl:w-5 bg-red-100 text-red-600 font-normal border-2 border-red-300 text-center"
              style="border-radius: 1rem; padding: 0.5rem"
              v-if="data.approve.slice(-1)[0].statusapprove === 'ไม่อนุมัติ'"
            >
              <div>
                {{ data.approve.slice(-1)[0].statusapprove }}
              </div>
            </div>
            <!-- ให้แสดงค่า statusapprove ของแต่ละ Item ใน Column -->
          </template>
        </Column>
        <Column style="width: 10%; cursor: default">
          <template #body="{ data }">
            <div
              class="flex justify-content-around gap-6"
              style="align-items: center"
            >
              <Button
                outlined
                icon="pi pi-info-circle"
                @click="showPartnerDetail(data)"
              />
              <div
                v-if="data.approve.slice(-1)[0].statusapprove === 'รออนุมัติ'"
                class="flex gap-3"
              >
                <Button
                  class="hover:bg-green-400 hover:text-white"
                  text
                  raised
                  icon="pi pi-check hover:text-white"
                  severity="success "
                  @click="approvepartner(data._id)"
                />
                <Button
                  class="hover:bg-red-400 hover:text-white"
                  icon="pi pi-times hover:text-white"
                  text
                  raised
                  severity="danger"
                  @click="unapprovepartner(data._id)"
                />
              </div>
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
  <Dialog
    v-model:visible="DetailPartner"
    header="แก้ไขข้อมูล Partner"
    modal
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <div class="grid">
      <div class="col-12 md:col-12">
        <form>
          <div class="col-12 flex justify-content-center">
            <img
              v-if="image"
              :src="getImage(image)"
              alt="ID Card"
              style="max-width: 50%; height: 50%"
            />
            <div v-else>ไม่มีรูปภาพ</div>
          </div>
          <div class="col-12">
            <p>ID Card:</p>
            <InputText
              v-model="idcard"
              class="w-full text-black-950 font-bold"
              style="color: #000"
              disabled
            />
          </div>
          <div class="col-12">
            <p>First Name :</p>
            <InputText
              v-model="name"
              class="w-full text-black-950 font-bold"
              style="color: #000"
              disabled
            />
          </div>
          <div class="col-12">
            <p>Phone :</p>
            <InputText
              v-model="phone"
              class="w-full text-black-950 font-bold"
              style="color: #000"
              disabled
            />
          </div>
          <div class="col-12">
            <p>email :</p>
            <InputText
              v-model="email"
              class="w-full text-black-950 font-bold"
              style="color: #000"
              disabled
            />
          </div>
          <div class="col-12 flex justify-content-center">
            <img
              v-if="image_bank"
              :src="getImage(image_bank)"
              alt="ID Card"
              style="max-width: 50%; height: 50%"
            />
            <div v-else>ไม่มีรูปภาพ</div>
          </div>
          <div class="col-12">
            <p>ธนาคาร :</p>
            <InputText
              v-model="bank"
              class="w-full text-black-950 font-bold"
              style="color: #000"
              disabled
            />
          </div>
          <div class="col-12">
            <p>เลขบัญชี :</p>
            <InputText
              v-model="numberbank"
              class="w-full text-black-950 font-bold"
              style="color: #000"
              disabled
            />
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
import Loading from "../../components/Loading.vue";

export default {
  components: {
    Loading,
  },

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
    const email = ref("");
    const bank = ref("");
    const numberbank = ref("");
    const image_bank = ref("");
    const loading = ref(true);
    const searchall = ref("");
    const item_product = ref([]);
    const statusdata = ref([
      { name: "เลือกสถานะการค้นหา" },
      { name: "อนุมัติ" },
      { name: "รออนุมัติ" },
      { name: "ไม่อนุมัติ" },
    ]);
    const selectstatus = ref("");
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
          loading.value = false;
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
          text: error,
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
      image.value = data.image_idcard;
      name.value = data.name;
      phone.value = data.telephone;
      console.log(data);
      console.log(data.idcard);
      idcard.value = data.idcard;
      email.value = data.email;
      bank.value = data.bank;
      numberbank.value = data.numberbank;
      image_bank.value = data.image_bank;
    };

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
      idcard,
      email,
      bank,
      numberbank,
      image_bank,
      loading,
      searchall,
      statusdata,
      selectstatus,
      headerTextColor: "rgb(156 163 175)",
    };
  },

  name: "ApprovePartner",

  methods: {
    getImage(item) {
      if (typeof item === "string") {
        return `https://drive.google.com/uc?export=view&id=${item}`;
      } else if (Array.isArray(item) && item.length > 0) {
        const firstImageId = item[0];
        return `https://drive.google.com/uc?export=view&id=${firstImageId}`;
      } else {
        return "";
      }
    },
  },
  computed: {
    Filter() {
      if (this.selectstatus && this.selectstatus != "เลือกสถานะการค้นหา") {
        // ค้นหาสถานะ
        const searchTerm = this.searchall.toLowerCase();
        const selectstatus = this.selectstatus.toLowerCase();
        return this.item_product.filter((item) => {
          return (
            item.approve.slice(-1)[0].statusapprove === selectstatus &&
            (item.name.toLowerCase().includes(searchTerm) ||
              item.telephone.includes(searchTerm))
          );
        });
      } else if (this.searchall) {
        //ค้นหาด้วยคำ
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

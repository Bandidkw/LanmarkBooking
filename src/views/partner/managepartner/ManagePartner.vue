<template>
  <div class="grid px-10 mt-3 ml-5 mr-5 w-full">
    <Loading :loading="loading" />
    <div class="col-12 lg:col-12 border">
      <div class="text-center font-bold text-4xl">ข้อมูล partner</div>
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
        >
        </Column>
        <Column :exportable="false" style="width: 10%; cursor: default">
          <template #body="item">
            <div
              class="flex justify-content-around"
              style="align-items: center"
            >
              <Button
                outlined
                icon="pi pi-info-circle"
                @click="showPartnerDetail(item.data)"
              />
              <p style="font-size: 7px">
                เอาไว้ลบพาร์ทเนอร์ (จริงๆไม่สามารถลบได้)
              </p>
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
import Loading from "../../../components/Loading.vue";

export default {
  components: {
    Loading,
  },
  created() {
    document.title = "ข้อมูล partner";
  },
  setup() {
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
            `${process.env.VUE_APP_API}partner/${_id}`,
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
    const showPartnerDetail = async (item) => {
      DetailPartner.value = true;
      image.value = item.image_idcard;
      name.value = item.name;
      phone.value = item.telephone;
      idcard.value = item.idcard;
      email.value = item.email;
      bank.value = item.bank;
      numberbank.value = item.numberbank;
      image_bank.value = item.image_bank;
    };
    onMounted(() => {
      getData();
    });
    return {
      item_product,
      getData,
      deleteProduct,
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
      headerTextColor: "rgb(156 163 175)",
    };
  },
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
      if (this.searchall) {
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

  name: "ManagePartner",
};
</script>

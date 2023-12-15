<template>
  <div class="grid px-10 mt-3 ml-5 mr-5 w-full">
    <Loading :loading="loading" />
    <div class="col-12 lg:col-12 border">
      <div class="text-center font-bold text-4xl">
        ข้อมูลอนุมัติการเพิ่มห้อง
      </div>
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
          field="partner_id.name"
          header="ชื่อ partner"
          style="width: 10%; cursor: default"
          :headerStyle="{ color: headerTextColor }"
        ></Column>
        <Column
          field="image"
          header="Picture"
          style="width: 15%; cursor: default"
          :headerStyle="{ color: headerTextColor }"
        >
          <template #body="{ data }">
            <img
              v-if="Array.isArray(data.image) && data.image.length > 0"
              :src="getImage(data.image[0])"
              alt="ID Card"
              width="200"
              style="max-width: 100%; height: auto"
            />

            <div v-else>ไม่มีรูปภาพ</div>
          </template>
        </Column>
        <Column
          field="name"
          class=""
          header="ชื่อ"
          style="width: 10%; cursor: default"
          :headerStyle="{ color: headerTextColor }"
        >
        </Column>
        <Column
          class=""
          header="สถานะอนุมัติ"
          style="width: 15%; cursor: default"
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
              class="flex justify-content-around"
              style="align-items: center"
            >
              <Button
                outlined
                icon="pi pi-info-circle"
                @click="detailRoom(data)"
              />
              <div
                class="flex gap-3"
                v-if="data.approve.slice(-1)[0].statusapprove === 'รออนุมัติ'"
              >
                <Button
                  class="hover:bg-green-400 hover:text-white"
                  text
                  raised
                  icon="pi pi-check hover:text-white"
                  severity="success "
                  @click="approveroom(data._id)"
                />
                <Button
                  class="hover:bg-red-400 hover:text-white"
                  icon="pi pi-times hover:text-white"
                  text
                  raised
                  severity="danger"
                  @click="unapproveroom(data._id)"
                />
              </div>
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
  <Dialog
    v-model:visible="DetailRoom"
    header="ข้อมูลห้อง"
    modal
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <div class="grid">
      <div class="col-12 md:col-12">
        <form>
          <div class="col-12 flex justify-content-center">
            <Galleria
              v-model:visible="displayBasic"
              :value="image"
              :responsiveOptions="responsiveOptions"
              :numVisible="9"
              containerStyle="max-width: 50%"
              :circular="true"
              :showItemNavigators="true"
              :showThumbnailNavigators="false"
            >
              <template v-slot:item="{ item }">
                <img
                  :src="getImage(item)"
                  :alt="item.alt"
                  style="width: 100%; display: block"
                />
              </template>
              <template v-slot:thumbnail="{ item }">
                <img
                  :src="getImage(item)"
                  :alt="item.alt"
                  style="display: block; width: 50px; height: 50px"
                />
              </template>
            </Galleria>
          </div>
          <div class="col-12">
            <p>ชื่อโรงแรม:</p>
            <InputText
              v-model="name"
              class="w-full text-black-950 font-bold"
              style="color: #000"
              disabled
            />
          </div>
          <div class="col-12">
            <p>รายละเอียด:</p>
            <InputText
              v-model="description"
              class="w-full text-black-950 font-bold"
              style="color: #000"
              disabled
            />
          </div>
          <div class="col-12">
            <p>เบอร์โทรศัพท์ :</p>
            <InputText
              v-model="phone_number"
              class="w-full text-black-950 font-bold"
              style="color: #000"
              disabled
            />
          </div>
          <div class="col-12">
            <p>ราคา :</p>
            <InputText
              v-model="price"
              class="w-full text-black-950 font-bold"
              style="color: #000"
              disabled
            />
          </div>
          <div class="col-12">
            <p>ประเภทห้องพัก :</p>
            <InputText
              v-model="type"
              class="w-full text-black-950 font-bold"
              style="color: #000"
              disabled
            />
          </div>
          <div class="col-12">
            <p>จำนวนผู้เข้าพัก :</p>
            <InputText
              v-model="guests"
              class="w-full text-black-950 font-bold"
              style="color: #000"
              disabled
            />
          </div>
          <div class="col-12">
            <p>จำนวนห้องนอน :</p>
            <InputText
              v-model="bedroom"
              class="w-full text-black-950 font-bold"
              style="color: #000"
              disabled
            />
          </div>
          <div class="col-12">
            <p>จำนวนเตียง :</p>
            <InputText
              v-model="bed"
              class="w-full text-black-950 font-bold"
              style="color: #000"
              disabled
            />
          </div>
          <div class="col-12">
            <p>จำนวนห้องน้ำ :</p>
            <InputText
              v-model="bathroom"
              class="w-full text-black-950 font-bold"
              style="color: #000"
              disabled
            />
          </div>
          <div class="col-12">
            <p>Latitude :</p>
            <InputText
              v-model="latitude"
              class="w-full text-black-950 font-bold"
              style="color: #000"
              disabled
            />
          </div>
          <div class="col-12">
            <p>Longitude :</p>
            <InputText
              v-model="longitude"
              class="w-full text-black-950 font-bold"
              style="color: #000"
              disabled
            />
          </div>
          <div class="col-12">
            <p>ที่อยู่ :</p>
            <InputText
              v-model="address"
              class="w-full text-black-950 font-bold"
              style="color: #000"
              disabled
            />
          </div>
          <div class="col-12">
            <p>ตำบล :</p>
            <InputText
              v-model="tambon"
              class="w-full text-black-950 font-bold"
              style="color: #000"
              disabled
            />
          </div>
          <div class="col-12">
            <p>อำเภอ :</p>
            <InputText
              v-model="amphure"
              class="w-full text-black-950 font-bold"
              style="color: #000"
              disabled
            />
          </div>
          <div class="col-12">
            <p>จังหวัด :</p>
            <InputText
              v-model="province"
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
  components: { Loading },
  created() {
    document.title = "ข้อมูลอนุมัติห้อง";
  },
  setup() {
    /////// dialog detail room
    const DetailRoom = ref(false);
    const image = ref(null);
    const name = ref("");
    const description = ref("");
    const phone_number = ref("");
    const price = ref("");
    const type = ref([""]);
    const guests = ref("");
    const bedroom = ref("");
    const bed = ref("");
    const bathroom = ref("");
    const latitude = ref("");
    const longitude = ref("");
    const address = ref("");
    const tambon = ref("");
    const amphure = ref("");
    const province = ref("");
    const displayBasic = ref(true);
    const loading = ref(true);
    const searchall = ref("");
    const statusdata = ref([
      { name: "เลือกสถานะการค้นหา" },
      { name: "อนุมัติ" },
      { name: "รออนุมัติ" },
      { name: "ไม่อนุมัติ" },
    ]);
    const selectstatus = ref("");
    ///////

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
          loading.value = false;

          console.log(productResponse.data, "ขอข้อมูลหน่อยครับ");
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
    const detailRoom = async (data) => {
      try {
        DetailRoom.value = true;
        image.value = data.image;
        name.value = data.name;
        description.value = data.description;
        phone_number.value = data.phone_number;
        price.value = data.price;
        type.value = data.type.name;
        guests.value = data.guests;
        bedroom.value = data.bedroom;
        bed.value = data.bed;
        bathroom.value = data.bathroom;
        latitude.value = data.latitude;
        longitude.value = data.longitude;
        address.value = data.address;
        tambon.value = data.tambon;
        amphure.value = data.amphure;
        province.value = data.province;
      } catch (error) {
        console.error("Error", error);
      }
    };
    const responsiveOptions = ref([
      {
        breakpoint: "1500px",
        numVisible: 5,
      },
      {
        breakpoint: "1024px",
        numVisible: 3,
      },
      {
        breakpoint: "768px",
        numVisible: 2,
      },
      {
        breakpoint: "560px",
        numVisible: 1,
      },
    ]);

    onMounted(() => {
      getData();
    });
    return {
      item_product,
      getData,
      approveroom,
      unapproveroom,
      //// detail room  ////
      DetailRoom,
      detailRoom,
      image,
      name,
      description,
      phone_number,
      price,
      type,
      guests,
      bedroom,
      bed,
      bathroom,
      latitude,
      longitude,
      address,
      tambon,
      amphure,
      province,
      displayBasic,
      responsiveOptions,
      loading,
      searchall,
      statusdata,
      selectstatus,
      headerTextColor: "rgb(156 163 175)",
    };
  },
  methods: {
    getImage(item) {
      if (typeof item === "string") {
        return `https://drive.google.com/uc?export=view&id=${item}`;
      } else if (Array.isArray(item) && item.length > 0) {
        return item.map(
          (imageId) => `https://drive.google.com/uc?export=view&id=${imageId}`
        );
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
              item.partner_id.name.toLowerCase().includes(searchTerm))
          );
        });
      } else if (this.searchall) {
        //ค้นหาด้วยคำ
        const searchTerm = this.searchall.toLowerCase();
        return this.item_product.filter((item) => {
          console.log(item.name.toLowerCase().includes(searchTerm));
          // ใช้ includes() เพื่อตรวจสอบว่าคำที่ค้นหาอยู่ในชื่อหรือเบอร์โทรศัพท์หรือไม่
          return (
            item.name.toLowerCase().includes(searchTerm) ||
            item.partner_id.name.toLowerCase().includes(searchTerm)
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

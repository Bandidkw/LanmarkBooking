<template>
  <div class="grid px-10 mt-3 ml-5 mr-5">
    <div class="col-12 lg:col-12 border">
      <div class="text-center font-bold text-4xl">ข้อมูลการจองห้อง</div>
      <div class="text-right my-5"></div>

      <DataTable :value="Array.isArray(item_product) ? item_product : []" :paginator="true" :rows="20"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rowsPerPageOptions="[5, 10, 25, 50, 75, 100]"
        currentPageReportTemplate="แสดง {first} ถึง {last} จาก {totalRecords} สินค้าทั้งหมด" responsiveLayout="stack">
        <!-- ตรวจสอบว่ามีข้อมูลสินค้าหรือไม่ -->

        <template #empty>
          <p class="font-italic text-center text-5xl" style="color: #bd1616">
            ไม่พบข้อมูลการจอง
          </p>
        </template>

        <Column field="room_id.name"  header="ห้องพัก" style="width: 10%">
        </Column>
        <Column  header="วันที่จะจอง" style="width: 10%">
          <template #body="{data}">
              {{new Date(data.date_from).toLocaleDateString('th-TH',{ timeZone: 'Asia/Bangkok', day: 'numeric', month: 'numeric', year: 'numeric' })}} - 
              {{new Date(data.date_to).toLocaleDateString('th-TH',{ timeZone: 'Asia/Bangkok', day: 'numeric', month: 'numeric', year: 'numeric' })}}
          </template>
        </Column>
         <Column  header="จำนวนคืน" style="width: 10%">
          <template #body="{data}">
           {{ calculateNightStay(data.date_from, data.date_to) }}
          </template>
        </Column>
         <Column field="price"  header="ราคา" style="width: 10%"></Column>
        <Column class="text-center" header="สถานะอนุมัติ" style="width: 20%">
          <template #body="{ data }">

            <div class="w-2/4 bg-orange-500" style=" width: 40%; border-radius: 1rem; padding: 0.5rem;"
              v-if="data.status.slice(-1)[0].statusbooking === 'รออนุมัติห้อง'">
              <div class="font-bold" style="color: #fff;">
                {{ data.status.slice(-1)[0].statusbooking }}
              </div>
            </div>
            <div class="w-2/4 bg-green-500" style=" width: 40%; border-radius: 1rem; padding: 0.5rem;"
              v-if="data.status.slice(-1)[0].statusbooking === 'รอชำระเงิน'">
              <div class="text-white font-bold">
                {{ data.status.slice(-1)[0].statusbooking }}
              </div>
            </div>
            <div class="w-2/4 bg-green-500" style=" width: 40%; border-radius: 1rem; padding: 0.5rem;"
              v-if="data.status.slice(-1)[0].statusbooking === 'ยีนยันการชำระเงิน'">
              <div class="text-white font-bold">
                {{ data.status.slice(-1)[0].statusbooking }}
              </div>
            </div>
            <div class="w-2/4 bg-green-500" style=" width: 40%; border-radius: 1rem; padding: 0.5rem;"
              v-if="data.status.slice(-1)[0].statusbooking === 'จองห้องสำเร็จ'">
              <div class="text-white font-bold">
                {{ data.status.slice(-1)[0].statusbooking }}
              </div>
            </div>
            <div class="bg-red-500" style=" width: 40%; border-radius: 1rem; padding: 0.5rem;"
              v-if="data.status.slice(-1)[0].statusbooking === 'ไม่อนุมัติห้อง'">
              <div class="text-white font-bold">
                {{ data.status.slice(-1)[0].statusbooking }}
              </div>
            </div>
            <div class="bg-red-500" style=" width: 40%; border-radius: 1rem; padding: 0.5rem;"
              v-if="data.status.slice(-1)[0].statusbooking === 'ชำระเงินไม่สำเร็จ'">
              <div class="text-white font-bold">
                {{ data.status.slice(-1)[0].statusbooking }}
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

       
      </DataTable>
    </div>
  </div>
  <Dialog v-model:visible="DetailPartner" modal :style="{ width: '50rem', 'z-index': 500 }"
              :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
              <div class="grid">
                <div class="col-12 text-center">
                  <h2>ข้อมูลรายละเอียด</h2>
                </div>
              </div>
              <div class="grid">
                <div class="col-12 md:col-12">
                    <div class="col-12">
                      <p> ชื่อผู้จอง:</p>
                      <InputText  v-model="membername" class="w-full text-black-950 font-bold"  style="color:#000"  disabled/>
                    </div>
                    <div class="col-12">
                      <p> ห้อง :</p>
                      <InputText v-model="roomname" class="w-full text-black-950 font-bold"  style="color:#000" disabled/>
                    </div>
                    <div class="col-12">
                      <p>วันที่จะจอง : </p>
                      <InputText v-model="datebooking" class="w-full text-black-950 font-bold "  style="color:#000" disabled/>
                    </div>
                    <div class="col-12">
                      <p>ราคา : </p>
                      <InputText v-model="price" class="w-full text-black-950 font-bold "  style="color:#000" disabled/>
                    </div>
                    <div v-if="databooking.status[databooking.status.length-1].statusbooking==='รอชำระเงิน'" class="col-12">
                      <p>ส่งหลักฐานการชำระเงิน</p>
                      <div class="col-12 text-center">
                <Image :src="imagePreview" width="200" v-if="imagePreview !== null" :preview="true" />
                <FileUpload mode="basic" chooseLabel="เลือกรูปหลักฐานชำระเงิน" :auto="true" @uploader="chooseImg"
                    :customUpload="true" accept="image/png, image/jpeg,image/jpg" :fileLimit="1" :maxFileSize="2097152"
                    invalidFileSizeMessage="ขนาดรูปภาพจะต้องไม่เกิน 2 mb" :disabled="isDisabled" />
                <p><em>(ขนาดจะต้องเป็น 1:1)</em></p>
            </div>
                    </div>
                </div>

                <div class="col-12 md:col-12 text-center">
                    <div v-if="databooking.status[databooking.status.length-1].statusbooking==='รอชำระเงิน'">
                         <Button
                            @click="addpayment(databooking._id)"
                            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2"
                          >ชำระเงิน</Button>
                    </div>
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
    let data_id = ref("");
    let membername = ref("");
    let roomname= ref("");
    let datebooking= ref("");
    let price = ref("")
    let databooking = ref("")
    let imagePreview = ref(null)

    const item_product = ref([]);
    const getData = async () => {
      
      try {
        const Response = await axios.get(
          `${process.env.VUE_APP_API}booking/member/`,
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );

        if (Response.data.status === true) {
          item_product.value = Response.data.data.reverse();
          console.log(Response.data.data);
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
          `${process.env.VUE_APP_API}booking/AcceptBooking/${_id}`,
          {},
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        if (response.data) {
          // แสดงข้อความสำเร็จ (ตัวเลือก)
          DetailPartner.value = false;
          Swal.fire({
            icon: "success",
            title: "อนุมัติผู้ใช้partner",
          });

          getData();
        } else {
          DetailPartner.value = false;
          await Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาด",
            text: "ไม่สามารถทำตามข้อมูลได้",
          });
        }
      } catch (error) {
        DetailPartner.value = false;
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
          `${process.env.VUE_APP_API}booking/UnacceptBooking/${_id}`,
          {},
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        if (response.data) {
          // แสดงข้อความสำเร็จ (ตัวเลือก)
          DetailPartner.value = false;
          Swal.fire({
            icon: "success",
            title: "ไม่อนุมัติผู้ใช้partner",
          });
          getData();
        } else {
          DetailPartner.value = false;
          await Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาด",
            text: "ไม่สามารถทำตามข้อมูลได้",
          });
        }
      } catch (error) {
        DetailPartner.value = false;
        await Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด",
          text: "ไม่สามารถทำตามข้อมูลได้",
        });
      }
    };
       const showPartnerDetail = async (data) => {
          DetailPartner.value = true;
          data_id.value = data._id
          membername.value = data.member_id.name
          roomname.value = data.room_id.name
          datebooking.value = new Date(data.date_from).toLocaleDateString('th-TH',{ timeZone: 'Asia/Bangkok', day: 'numeric', month: 'numeric', year: 'numeric' }) +" - "+ new Date(data.date_to).toLocaleDateString('th-TH',{ timeZone: 'Asia/Bangkok', day: 'numeric', month: 'numeric', year: 'numeric' })
          price.value = data.price
          databooking.value = data
      }

    onMounted(() => {
      getData();
    });

    return {
      item_product,
      approvepartner,
      unapprovepartner,
      getData,
      // partnerDetail,
      showPartnerDetail,
      DetailPartner,
      data_id,
      membername,
      roomname,
      datebooking,
      price,
      databooking,
      filepic:"",
      imagePreview,
    };
  },

  methods: {
    calculateNightStay(dateFrom, dateTo) {
      const startDate = new Date(dateFrom);
      const endDate = new Date(dateTo);
      const timeDiff = endDate.getTime() - startDate.getTime();
      const nights = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
      return `${nights} คืน`;
    },
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
    chooseImg(event) {
      this.imagePreview = event.files[0].objectURL;
      this.filepic = event.files[0];
    },
    async addpayment(id){
      if(this.filepic!="")
      {
        try{
              const formData = new FormData();
              formData.append("slip_image",this.filepic);
              const response  = await axios.put(`${process.env.VUE_APP_API}booking/paymentBooking/${id}`,formData,
              {
                headers: {
                  token: localStorage.getItem("token"),
                },
              });
              if(response.data.status === true)
              {
                  this.DetailPartner = false
                  Swal.fire({
                  icon: "success",
                  title: "ส่งหลักฐานชำระเงินสำเร็จ",
                  text: response.data.message,
                });
                this.getData();
              }
              else{
                this.DetailPartner = false
                await Swal.fire({
                  icon: "error",
                  title: "เกิดข้อผิดพลาด",
                  text: "ไม่สามารถเพิ่มข้อมูลได้",
                });
                this.DetailPartner = true
              }
        }catch(error){
          this.DetailPartner = false
          await Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาด",
            text: error,
          });
          this.DetailPartner = true
        }
      }
      else{
        this.DetailPartner = false
        await Swal.fire({
            icon: "error",
            title: "เพิ่มหลักฐานการชำระเงิน",
            text: "กรุณาเพิ่มหลักฐานการชำระเงิน",
          });
          this.DetailPartner = true
      }
    },

  },
};
</script>


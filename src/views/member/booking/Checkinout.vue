<template>
  <div class="grid px-10 mt-3 ml-5 mr-5">
    <div class="col-12 lg:col-12 border">
      <div class="text-center font-bold text-4xl">เช็คอิน - เช็คเอาท์</div>
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

        <Column field="booking_id.room_id.name"  header="ห้องพัก" style="width: 10%">
        </Column>
        <Column  header="วันที่จะจอง" style="width: 10%">
          <template #body="{data}">
              {{new Date(data.booking_id.date_from).toLocaleDateString('th-TH',{ timeZone: 'Asia/Bangkok', day: 'numeric', month: 'numeric', year: 'numeric' })}} - 
              {{new Date(data.booking_id.date_to).toLocaleDateString('th-TH',{ timeZone: 'Asia/Bangkok', day: 'numeric', month: 'numeric', year: 'numeric' })}}
          </template>
        </Column>
         <Column  header="จำนวนคืน" style="width: 10%">
          <template #body="{data}">
           {{ calculateNightStay(data.booking_id.date_from, data.booking_id.date_to) }}
          </template>
        </Column>
        <Column  header="วันที่จะจอง" style="width: 10%">
          <template #body="{data}">
            <div v-if="data.check_in_date == null && data.check_out_date == null">
                 ยังไม่เช็คอิน
            </div>
            <div v-else-if="data.check_in_date != null && data.check_out_date != null">
                {{new Date(data.check_in_date).toLocaleString('th-TH',{ timeZone: 'Asia/Bangkok'})}} -
                {{new Date(data.check_out_date).toLocaleString('th-TH',{ timeZone: 'Asia/Bangkok'})}}
            </div>
            <div v-else-if="data.check_in_date != null">
                {{new Date(data.check_in_date).toLocaleString('th-TH',{ timeZone: 'Asia/Bangkok', day: 'numeric', month: 'numeric', year: 'numeric' })}}
            </div>
            <div v-else-if="data.check_out_date != null">
                 
            </div>
            
          </template>
        </Column>
        <Column class="text-center" header="สถานะอนุมัติ" style="width: 20%">
            <template #body="{ data }">
                <div class="w-2/4 bg-blue-500" style=" width: 40%; border-radius: 1rem; padding: 0.5rem;"
                v-if="data.check_in_date != null && data.check_out_date != null">
                    <div class="font-bold" style="color: #fff;">
                        เช็คอิน-เช็คเอาท์แล้ว
                    </div>
                </div>
                <div class="w-2/4 bg-green-500" style=" width: 40%; border-radius: 1rem; padding: 0.5rem;"
                v-else-if="data.check_in_date != null">
                    <div class="font-bold" style="color: #fff;">
                        เช็คอินแล้ว
                    </div>
                </div>
                <div class="w-2/4 bg-orange-500" style=" width: 40%; border-radius: 1rem; padding: 0.5rem;"
                v-else-if="data.check_in_date === null">
                    <div class="font-bold" style="color: #fff;">
                        ยังไม่ได้เช็คอิน
                    </div>
                </div>
            </template>
        </Column>
        <Column header="เช็คอิน - เช็คเอาท์" style="width: 10%;">
          <template #body="{ data }">
            <Button @click="showPartnerDetail(data)"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2">เช็คอิน - เช็คเอาท์</Button> 
          </template>
        </Column>

       
      </DataTable>
    </div>
  </div>
  <Dialog v-model:visible="DetailPartner" modal :style="{ width: '50rem', 'z-index': 500 }"
              :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
              <div class="grid">
                <div class="col-12 text-center">
                  <h2>เช็คอิน - เช็คเอาท์</h2>
                </div>
              </div>
              <div class="grid">
            
                 <div class="col-12 md:col-12 text-center">
                    
                    <div v-if="databooking.check_in_date != null && databooking.check_out_date === null">
                         <Button
                            @click="putcheckout(databooking._id)"
                            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-2"
                          >เช็คเอาท์</Button>
                    </div>
                    <div v-else-if="databooking.check_in_date === null">
                         <Button
                            @click="putcheckin(databooking._id)"
                            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2"
                          >เช็คอิน</Button>
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
          `${process.env.VUE_APP_API}checkin/member/`,
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
    const showPartnerDetail = async (data) => {
          DetailPartner.value = true;
          databooking.value = data
      }

    onMounted(() => {
      getData();
    });

    return {
      item_product,
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
      return `${nights+1} คืน`;
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
    async putcheckout(id){
         try{
              const response  = await axios.put(`${process.env.VUE_APP_API}checkin/checkout/${id}`,{},
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
                  title: "เช็คเอาท์สำเร็จ",
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
    },
    async putcheckin(id){
        try{
              const response  = await axios.put(`${process.env.VUE_APP_API}checkin/checkin/${id}`,{},
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
                  title: "เช็คอินสำเร็จ",
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
  },
};
</script>


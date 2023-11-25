<template>
  <div class="flex flex-col px-40">
  <div class="container px-20 py-4 ">
    <div class="px-40 text-center ">    
      <h1 class="text-2xl">{{roomdata.name}}</h1>
    </div>
  </div>
  <div class="p-5 w-2/4"> 
    <img class="w-full" :src="getImage(roomdata.image)" alt="Large Image" />
  </div>

  <!-- eslint-disable-next-line vue/no-multiple-template-root -->
  <div class="flex pt-4 px-5 justify-between border h-[850px]">
    <!-- รายละเอียด -->
    <div class="w-1/2">
      <div class="details m-0 p-2 border-b-2 border-b-sky-400">
        <h1 class="text-2xl font-bold">{{ roomdata.name }}</h1>
        <p>{{roomdata.guests}} คน || {{ roomdata.bedroom }} ห้องนอน || {{ roomdata.bed }} เตียง || {{ roomdata.bathroom }} ห้องน้ำ  </p>
        <!-- รายละเอียดเพิ่มเติม -->
      </div>
      <div
        class="host-info flex h-24 gap-x-6 py-4 w-full border-b-2 border-b-sky-400">
        <div class="host-img">
          <img class="w-full h-full rounded-full" src="/images/host-img/person.jpg" alt=""/>
        </div>
        <div class="host-detail flex flex-col justify-center">
          <h3 class="font-bold">โฮสต์โดย {{ roomdata.partner_id?.name }}</h3>
        </div>
      </div>
      <div class="hotel-info h-64 border-b-2 border-b-sky-400 pt-5 pb-12">
        <div class="hotel-info-box">
          <p class="text-base text-justify p-2">
            {{ roomdata.description }}
          </p>
        </div>
      </div>
      <div class="sleep-place h-[253px] py-12">
        <h2 class="pb-3">สถานที่นอน</h2>
        <div
          class="flex flex-col gap-y-1 sleep-box border-2 border-black rounded-2xl w-[207px] h-[143px] p-4"
        >
          <div class="gap-x-3 flex">
            <i class="bi bi-image-alt text-2xl"></i>
            <i class="bi-image-alt text-2xl"></i>
          </div>
          <div>
            <p class="font-bold">ห้องนอน</p>
          </div>
          <div>
            <p>{{ roomdata.bedroom }} เตียงนอน  {{ roomdata.bathroom }} ห้องน้ำ </p>
          </div>
        </div>
        <div class="hotel-info border-t-2  border-t-sky-400 mt-4 py-5">
           พิกัด :
          <p>{{ roomdata.address }}  ตำบล: {{ roomdata.tambon }}  อำเภอ: {{ roomdata.amphure }} จังหวัด: {{  roomdata.province }}</p>
        </div>
         
      </div>
    </div>
    <div class="w-1/2 text-center mx-3 border-2">
       <div class="rounded ">
        
          <div class="w-full md:w-1/2 mb-6 md:mb-0 mt-3">
            <label
              class="block uppercase tracking-wide text-gray-700 text-base font-bold mb-2" for="grid-first-name">
              เลือกวันจอง - วันสิ้นสุดการจอง
            </label>
            <Calendar
              v-model="selectedDate"
              selectionMode="range"
              :manualInput="false"
              :numberOfMonths="2"
              showIcon
              class="border p-2 rounded bg-white"
              :minDate="minSelectableDate"
              :disabled-dates="disabledDates"/>
            
          </div>
          <div class="w-full md:w-1/2 mb-6 md:mb-0 mt-3">
            <label
              class="block uppercase tracking-wide text-gray-700 text-base font-bold mb-2" for="grid-first-name">
              ราคา : {{ price }} บาท
            </label>
          </div>
          <div class="mx-auto w-60  my-3 ">
            <button
              @click="addbooking"
              class="px-4 py-2 bg-blue-500 text-white text-center hover:bg-purple-400 rounded w-full"
              type="button">จอง
            </button>
          </div>
      </div>
  </div>
  </div>
</div>
</template>

<script>
import axios from "axios";

import { onMounted,ref} from "vue";
import Swal from "sweetalert2";
export default {
  props: ["id"],
  data() {
        const roomdata = ref([])
      
        const room_id = this.$route.params.id;
        const getroom = async (_id) => {
        const id = this.$route.params.id;
        const Response = await axios.get(`${process.env.VUE_APP_API}room/${id}`);
        this.roomdata = Response.data   
        this.price = this.roomdata.price
        
      }
      onMounted(() => {
        getroom();
      });
      return {
        room_id,
        selectedDate:"",
        roomdata,
        price:"0",
        minSelectableDate: new Date(),
        //โค้ดปิดวัน
        disabledDates: [
        new Date(2023, 10, 29), 
        new Date(2023,10,30)
      ], 
      };
    },
   watch:{
      selectedDate:{
        handler(date){
          console.log("ใช้")
          if(this.selectedDate[0]){
             this.price = this.roomdata.price
          
          }
          if(this.selectedDate[1])
          {
            const startDate = new Date(this.selectedDate[0]);
            const endDate = new Date(this.selectedDate[1]);
          // คำนวณจำนวนวัน
            const timeDiff = endDate.getTime() - startDate.getTime();
            const nights = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
            this.price = this.roomdata.price * (nights+1)
          }
        }
      }
   },
    methods:{
      async addbooking(){
        try{
            console.log(this.selectedDate)
            if(localStorage.getItem("token")!=null)
            {
              if(this.selectedDate!="")
              {
                  const response  = await axios.post(`${process.env.VUE_APP_API}booking/`,
              {
                room_id:this.room_id,
                date_from:this.selectedDate[0],
                date_to:this.selectedDate[1],
                price:this.price,
              },
              {
                headers: {
                  token: localStorage.getItem("token"),
                },
              });
              if(response.data.status ===true)
              {
                
                Swal.fire({
                  icon: "success",
                  title: "จองสำเร็จ",
                  text: response.data.message,
                });
                  window.location.assign("/bookingmember");
              }
              else{
                 await Swal.fire({
                  icon: "error",
                  title: "เกิดข้อผิดพลาด",
                  text: response.data.message,
                  });
              }
              }else{
                await Swal.fire({
              icon: "error",
              title: "กรุณาเลือกวัน",
              text: "กรุณาวันที่คุณต้องการจอง",
              });
              }
              
            }else{
              await Swal.fire({
              icon: "error",
              title: "กรุณาล็อคอิน",
              text: "ก่อนจะจองกรุณาล็อคอินก่อน",
              });
            }
        }
        catch(error){
           await Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาด",
            text: error,
          });
        }       
      },
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

<style scoped>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
.detail-container {
  padding: 0 5rem;
  width: 100%;
  height: 100vh;
}
.img-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(1, 500px);
}
.img-grid img {
  padding: 0.5rem;
  height: 100%;
}
.small-box {
  display: grid;
}
.small-images {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 250px);
}

.small-images img {
  padding: 0.5rem;
  width: 100%;
  height: 100%;
}
.details {
  margin-top: 20px;
}
.icon-box {
  padding-left: 0.6rem;
  display: flex;
  justify-content: center;
}
/* ปฏิทิน */ 
.custom-event-marker {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #e74c3c;
  opacity: 0.5;
}

.booked {
  background-color: #e74c3c;
}

.available {
  background-color: #2ecc71;
}
</style>

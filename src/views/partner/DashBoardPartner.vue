<template>
    <div class="grid px-10 mt-3">
      <div class="col-12 lg:col-12 border">
        <center><h1>DashBoard Partner</h1></center>
      </div>
    </div>
  <Dialog v-model:visible="sidebar" header="สัญญาการใช้งาน lanmark ของ partner" modal :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
      <div class="grid mt-2 " style="border: 1px solid #ccc;">
        <div class="col-12 md:col-12 text-center">
          <h2>สัญญาการใช้งาน lanmark ของ partner</h2>
        </div>
        <div class="col-12 md:col-12">
           ................................
           ................................
        </div>
      </div>
      <div class="grid mt-5"> 
        <div class="col-12 md:col-12 text-center">
            <Button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mx-2 boeder-none" @click="approve(datacontract._id)">คุณยินยอมสัญญา</Button>
            <Button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" @click="unapprove()">ไม่ยืนยันสัญญา</Button>
        </div>
      </div>
  </Dialog>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
  name: 'DashboardPartner',
  data(){
    return {
      sidebar: false,
      datacontract:""
      }
  },
   mounted() {
    this.getcontract(); // เรียกใช้งาน getcontract เมื่อคอมโพเนนต์ถูกสร้างขึ้น
  },
  methods:{
    async getcontract(){
      try {
        const Response = await axios.get(`${process.env.VUE_APP_API}contract/partner/`,
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          });
          console.log(Response.data.message)
        if (Response.data.status === true) {
          this.datacontract = Response.data.data;
          if(Response.data.data.status===true)
          {
            this.sidebar= false
          }else{
            this.sidebar = true
          }
          console.log(Response.data.data);
        } 
        else if(Response.data.message==="ไม่มีข้อมูล contract"){
          console.log("ยังไม่สร้าง contract")
          await this.addcontract();
        }else {
          console.error("Data is missing in the API response.");
        }
      } catch (error) {
        console.error(error);
      }
    },
    async addcontract(){
      try {
        const Response = await axios.post(`${process.env.VUE_APP_API}contract/`,{},
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          });

        if (Response.data.status === true) {
          this.datacontract = Response.data.data;
          console.log("สร้าง")
          console.log(Response.data.data);
          this.sidebar = true
        } else {
          console.error("Data is missing in the API response.");
        }
      } catch (error) {
        console.error(error);
      }
    },
     async approve(id){
        try {
        const Response = await axios.put(`${process.env.VUE_APP_API}contract/accept/${id}`,{},
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          });

        if (Response.data.status === true) {
            this.sidebar = false
        } else {
          console.error("Data is missing in the API response.");
        }
      } catch (error) {
        console.error(error);
      }
     },
     async unapprove (){
        localStorage.clear();
        this.$store.commit("setLoginDefault");
        this.$router.push("/");
     }
  }
  };
</script>

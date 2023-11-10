<template>
    <div class="content">
        <div class="row">
            <div class="col-12 col-md-8">
                <Card type="nav-tabs" class="text-left">
                    <template slot="header">
            <base-button  type="primary" @click="$router.push('/checkin')" >Check In</base-button>
            <base-button @click="$router.push('/checkout')">Check Out</base-button>
            <div class="row w-100 mt-5 align-items-end">
                <div class="col text-left">
                    <h1 class="py-3">Check Out</h1>
                </div>
                <div class="col">
                    <base-input label="ค้นหา" style="max-width:14rem;float:right" placeholder="ชื่อลูกค้า"/>
                </div>
            </div>
            
            
        </template>
        
                 
                   <base-table
                   :title="table.title"
                    :sub-title="table.subTitle"
                    :data="table.data"
                    :columns="table.columns"
                   >
                   <template slot-scope="{row}">
                       <td>{{new Date(row.checkout).toLocaleDateString('th-TH',{year:'numeric',month:'short',day:'2-digit'})}}</td>
                        <td>{{row.ref_number}}</td>
                        <td>{{row.customer}}</td>   
                        <td>{{row.status}}</td>
                        <td class="td-actions text-right">
                       
                            <div class="checkout-btn">

                                <base-button type="success" size="sm" icon @click="Checkout(row.booking_id,row.customer)" >
                                <i class="tim-icons icon-settings"></i>
                            </base-button>
                            <div v-if="selectId===row.booking_id" class="pop-over">
                                <!-- <p>เช็คเอาท์</p> -->
                            </div>
                        </div>

          </td>
        </template>    
        <template #empty>
            ไม่มีรายการเช็คเอาท์ในวันนี้
        </template>
                </base-table>  
                </Card>
                
                <div v-if="confirm_dialog" id="confirm-checkout" class="confirm">
                    <ConfirmDialog v-if="selectId!==''"
                    :data="{id:selectId}"  
                    @close="(close)=>confirm_dialog=close"
                    @confirm="(data)=>ConfirmCheckOut(data)"
                    >
                    <template #header>
                        <h2 class="text-dark">Checkout</h2>
                        
                    </template>
                    <template #body>
                        ยืนยันการเช็คเอาท์ของลูกค้า คุณ {{ selectCustomer }}
                    </template>
                    
                </ConfirmDialog>
            </div>
        </div>
        <div class="col-12 col-md-4">
                <Card type="nav-tabs">
                    <img src="/images/hotel.jpg"/>
                </Card>
            </div>
        </div>
        
    </div>
</template>
<script>
import { io } from "socket.io-client";
import { Card,BaseInput} from "@/components/index";
import ConfirmDialog from "@/components/Dialogs/ConfirmDialog.vue";
import BaseTable from "@/components/BaseTable";
import { Booking } from "@/functions/bookingservice";
import store from "@/stores"

export default {
    setup(){
        const bookingservice = new Booking();
        const socket = io(process.env.VUE_APP_SOCKET);
        return {
            bookingservice,store,socket
        }
    },
    created(){
      this.socket.on('newbooking',async (data)=>{
 
          console.log(data);
          await this.GetBooking();
        
      })
    },
    components:{
        Card,BaseInput,BaseTable,ConfirmDialog
    },
    data(){
        return {
            hotel_id:null,
            bookings:null,
            table:{
                data:null,
                columns:["วันเช็คเอาท์","Ref Number", "ชื่อลูกค้า", "สถาณะ"],
                title:'เช็คเอาท์ห้องนี้',
                subTitle:'ห้องที่ได้ทำการเช็คอินแล้ว',
            },
            confirm_dialog:false,
            selectCustomer:null,
            selectId:null
        }
    },
    async mounted(){
        this.hotel_id = this.store.state.user.service_id;
        await this.GetBooking();
    },
    methods: {
        Checkout(id,customer){
            this.selectCustomer = customer;
            this.selectId = id;
            this.confirm_dialog = true;
            console.log(this.selectId);
        },
        async ConfirmCheckOut(data){
           
            await this.bookingservice.CheckOut(this.hotel_id,data.data.id).then(async(result)=>{
                if(result){

                    this.$notify({type: 'success', message: `เช็คเอาท์สำเร็จ`})
                    this.confirm_dialog=false;
                    await this.GetBooking();
                }
            })
        },
        popDetail(bookingid){
            this.selectId = bookingid;
        },
        async GetBooking(){
            await this.bookingservice.getBooking(this.hotel_id).then(result =>{

                const situation = ['เช็คอิน','จองแล้ว']
           
           this.bookings=result.data.filter(el=>situation.includes(el.status[el.status.length-1].name) && new Date(el.check_out_date).toLocaleDateString('th-TH',{year:'numeric',month:'numeric',day:'numeric'})<=new Date().toLocaleDateString('th-TH',{year:'numeric',month:'numeric',day:'numeric'}))
     
           this.table.data =this.bookings.map(el=>({
               booking_id:el.booking_id,
               ref_number:el.ref_number,
               customer:el.customer_name,
               checkout:el.check_out_date,
               status:el.status[el.status.length-1].name
           }))
       })
        }
    }
}
</script>
<style  scoped>
.row{
    margin: 0;
}
h1{
    margin: 0;
}
.checkout-btn{
    position: relative;
    
}
.pop-over{
    position: absolute;
    padding: 5px;
   right: 2rem;
   bottom: 0.2rem;
   width: 4rem;
}

</style>
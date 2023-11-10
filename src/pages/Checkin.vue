<template>
    <div class="content">
        <div class="row">
            <div class="col-12 col-md-8">
                <Card type="nav-tabs" class="text-left">
                    <base-button type="primary">Check In</base-button>
                    <base-button @click="$router.push('/checkout')">Check Out</base-button>
                    <h1 class="mt-4">Check In</h1>
                    <base-input v-model="customer.ref_number" label="Booking Ref Number" style="max-width:14rem" @change="error_message=null"/>
                 
                    <div class="flex flex-row">
                     
                        <base-input v-model="customer.customer_tel" type="text" label="เบอร์โทรศัพท์" style="max-width:14rem"/>
                        <base-button type="primary" class="mt-3" @click="VerifyCheckInUser">ตรวจสอบ</base-button>
                        <p class="text-danger mt-3">{{ error_message || null }}</p>
                    </div>

                </Card>
                
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
import { Card } from "@/components/index";
import { BaseInput } from "@/components/index";
import { Booking } from "@/functions/bookingservice";
import store from "@/stores"

export default {
    setup(){
        const bookingservices = new Booking();
        return{
            bookingservices,store
        }
    },
    components:{
        Card,BaseInput
    },
    mounted(){
        this.customer.host_id=this.store.state.user.user_id;
  
    },
    data(){
        return{
            customer:{
                host_id:null,
                ref_number:'',
                customer_tel:'',
            },
            error_message:null,
        }   
    },
    methods:{
         async VerifyCheckInUser(){

            //validate customer
            const checkdata = {
                host_id:this.customer.host_id,
                ref_number:this.customer.ref_number.split(" ").toString(),
                customer_tel:this.customer.customer_tel.split(" ").toString(),
            }
          
            await this.bookingservices.VerifyCheckInUser(checkdata).then(response=>{

                if(response ){
                    if(response.data.data.detail==='OK.'){

                        this.$router.push(`/checkin-otp?id=${response.data.booking_id}&token=${response.data.data.result.token}`)
                    }
                    else{
                        console.log(response.data);
                    }
                }
                else{
                    this.error_message='เลขที่ใบจองหรือหมายเลขโทรศัพท์ไม่ถูกต้อง'
                }
            })
        }
    }
}
</script>
<style scoped>
.menu{
    width: 450px;
}
</style>
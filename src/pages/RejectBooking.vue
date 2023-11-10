<template>
    <div class="content">
        <div class="row">
            <div class="col-md-8">
                <Card>
                    <template slot="header">
                        <div class="row">
                            <div class="col-12 col-sm-6" :class=" 'text-left'">
                                <template>
                                    <h5 class="card-category">ปฏิเสธการจอง</h5>
                                </template>

                                <template>
                                    <h2 class="card-title">Reject Booking</h2>
                                </template>

                            </div>
                           
                        </div>
                       
                            <div class="my-3">
                                <div v-if="!rejected">

                                    <base-input label="เหตุผลของการปฏิเสธ" >
                                    <textarea rows="5" class="w-100" v-model="reason" @focus="err_message=''"></textarea>
                                    <p class="text-danger">{{ err_message }}</p>
                                </base-input>
                                
                                <base-button link type="secondary" @click="back">กลับ</base-button>
                                <base-button  type="primary" @click="RejectBooking">ปฏิเสธการจอง</base-button>
                            </div>
                            <div v-if="rejected">
                                <p>ทำการปฏิเสธการจองเรียบร้อยแล้ว</p>
                                <base-button type="primary">กลับ</base-button>
                            </div>
                            </div>
                       
                    </template>
                </Card>
            </div>
            <div class="col-md-4">
                <img class="mb-3" src="images/hotel.jpg" width="100%">
                <img src="images/nba_bus.jpg" width="100%">
            </div>
        </div>
    </div>
</template>
<script>
import { Card,BaseInput } from "@/components/index";
import { Booking } from "@/functions/bookingservice";
export default {
    setup(){
        const bookingservice = new Booking();
        return {
            bookingservice
        }
    },
    components: {
        Card,BaseInput
    },
    data(){
        return {
            booking_id:'',
            reason:'',
            err_message:'',
            rejected:false,
        }
    },
    mounted(){
        this.booking_id = this.$route.params.id;
    },
    methods:{
        async RejectBooking(){
            //validate reson
            console.log(this.booking_id,this.reason)
            await this.bookingservice.rejectBooking(this.booking_id,this.reason).then(result=>{
                console.log(result);
                if(result.data.message ==='please send reject reason request'){
                    this.err_message = 'กรุณาระบุ เหตุผลของการปฏิเสธ'
                }
                else if(result.data.message ==='not found this booking id'){
                    this.err_message = 'ไม่มี booking นี้ในระบบ'
                }
                else if(result.data.message ==="This booking is already accepting"){
                    this.err_message = 'ไม่สามารถยกเลิก booking ที่ได้ทำการตอบรับแล้ว'
                }
                else if(result.data.message ==="rejected successfully"){
                    this.err_message = 'ไม่สามารถยกเลิก booking ที่ได้ทำการตอบรับแล้ว'
                    this.rejected = true;
                }
            })

        },
        back(){
            this.$router.push('/dashboard')
        }
    }
}
</script>
<template>
    <div class="content">
        <div class="row" v-if="loading">
            <div class="col-md-8">
                <Card >
                    <h3 class="text-left">รายละเอียดใบจอง</h3>
                    <div class="row">
                        <div class="col-md-3 text-left">
                            Ref Number
                        </div>
                        <div class="col-md-9 text-left">{{ booking.ref_number }}</div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-md-3 text-left">
                            วันที่
                        </div>
                        <div class="col-md-9 text-left">{{ new Date(booking.createdAt).toLocaleDateString('th-TH',{day:'numeric',month:'2-digit',year:'numeric'})}}</div>
                    </div>
                    <div class="row">
                        <div class="col-md-3 text-left">
                            ชื่อลูกค้า
                        </div>
                        <div class="col-md-9 text-left">{{ booking.customer_name}}</div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-md-3 text-left">
                            เบอร์โทร
                        </div>
                        <div class="col-md-9 text-left">{{ booking.customer_tel}}</div>
                    </div>
                    <div class="row">
                        <div class="col-md-3 text-left">
                            วันที่ต้องการเช็คอิน
                        </div>
                        <div class="col-md-9 text-left">{{ dateFormat(booking.date_from)}} </div>
                    </div>
                    <div class="row">
                        <div class="col-md-3 text-left">
                            วันที่ต้องการเช็คเอาท์
                        </div>
                        <div class="col-md-9 text-left"> {{ dateFormat(booking.date_to) }}</div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-md-3 text-left">
                            จำนวนผุ้เข้าพัก
                        </div>
                        <div class="col-md-9 text-left">{{ booking.num_guess}} คน</div>
                    </div>
                   
                    <div class="row">
                        <div class="col-md-3 text-left">
                            ห้องพักที่ได้จอง
                        </div>
                        <div class="col-md-9 text-left">
                            <ul>
                                <li v-for="(room,index) in booking.rooms" :key=index>
                               ห้อง {{ room.room.type.name_th }} จำนวน {{ room.amount }} ห้อง ราคา {{ format( room.room.price )}} บาท/ห้อง
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-3 text-left">
                           จำนวนคืนที่พัก
                        </div>
                        <div class="col-md-9 text-left">
                            {{ booking.total_day}} คืน
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-3 text-left">
                           ค่าที่พักรวม
                        </div>
                        <div class="col-md-9 text-left">
                            {{ format( booking.total_price ) }} บาท
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-md-3 text-left"> 
                            สถาณะ
                        </div>
                        <div class="col-md-9 text-left">
                            {{ booking.status[booking.status.length-1].name }}
                        </div>
                    </div>
                    
                </Card>
                <div class="text-left px-3">

                    <base-button  link class="back-button" @click="$router.push('/bookingmanager')">กลับ</base-button>
                    <base-button v-if="booking.status[booking.status.length-1].name ==='รอโรงแรมรับการจอง'" type="success" class="mx-3" @click="AcceptBooking" >ตอบรับการจอง</base-button>
                    <base-button v-if="booking.status[booking.status.length-1].name ==='รอโรงแรมรับการจอง'" type="danger" @click="RejectBooking" >ปฏิเสธการจอง</base-button>
                    
                    <base-button v-if="
                        booking.status[booking.status.length-1].name ==='เช็คอิน' 
                        && dateFormat(booking.date_to) === dateFormat(new Date())" 
                        type="primary"
                        @click="Checkout"
                        >เช็คเอาท์</base-button>
                </div>
            </div>
            <div class="col-md-4">
                <img class="mb-3" src="images/hotel.jpg" width="100%">
                <img src="images/nba_bus.jpg" width="100%">
            </div>
        </div>
    </div>
</template>
<!-- eslint-disable prettier/prettier -->
<script>
import { io } from "socket.io-client";
import { Booking } from "@/functions/bookingservice";
import { Card } from "@/components/index";
import store from '@/stores';
import format from '@/functions/format';

export default {

    setup() {
        const socket = io(process.env.VUE_APP_SOCKET);
        const bookingservice = new Booking();
        return {
            bookingservice,store,socket,format
        }
    },
    components: {
        Card
    },
    created(){
        this.socket.on('bookingUpdate',data=>{
            console.log(data);
        })
    },
    async mounted() {

        this.id = this.$route.params.id;
        this.hotelId = this.store.state.user.service_id;
        await this.bookingservice.getBookingById(this.hotelId, this.id).then(result => {
            if(result && result.status==="ok"){
                // console.log(result);
                this.booking = result.data;
                this.loading = true;
            }
        })
    },
    data() {
        return {
            loading:false,
            hotelId: null,
            id: '',
            booking: null
        }
    },
    methods: {
        dateFormat(date){
            return new Date(date).toLocaleDateString('th-TH',{weekday:'short',day:"numeric",month:"long",year:'numeric'});
        },
        async AcceptBooking(){
  
            await this.bookingservice.acceptBooking(this.hotelId,this.booking._id).then(result => {
                if(result && result.status === 'ok'){
                    this.booking=result.data;
                    this.socket.emit('sendUpdateBooking',{update:'booking'})
                }
            });
        },
        sendIo(){
            this.socket.emit('sendUpdateBooking',{update:'booking'})
        },
        async Checkout(){
            await this.bookingservice.CheckOut(this.hotelId,this.booking._id).then(result => {
                if(result){
                    this.$router.push('/bookingmanager')
                }
            });
        },
        RejectBooking(){
            this.$router.push(`/reject-booking/${this.booking._id}`)
        }
    }

}
</script>
<style scoped>
p{
    color: black;
}

.back-button{
    align-self: start;
}
</style>

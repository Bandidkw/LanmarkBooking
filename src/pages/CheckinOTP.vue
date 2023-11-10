<template>
    <div class="content">
        <div class="row">
            <div class="col-12 col-md-8">
                <Card type="nav-tabs" class="text-left">
                    <h1>Check In</h1>
                    <p>กรุณากรอกหมายเลข OTP</p>
                    <base-input v-model="userData.otp_code" label="OTP" style="width:14rem"/>
                    <base-button type="primary" class="mt-3" @click="confirmOTP">Check in</base-button>
                </Card>
            </div>
        </div>
    </div>
</template>
<script>
import { Card,BaseInput } from "@/components/index";
import { Booking } from "@/functions/bookingservice";
import store from "@/stores"

export default {
    setup(){
        const bookingservice = new Booking();
        return {
            bookingservice,store
        }
    },
    components: {
        Card,BaseInput
    },
    data(){
        return {
            userData:{
                host_id:null,
                booking_id:null,
                token:null,
                otp_code:null,
            }
        }
    },
    mounted(){
        this.userData.host_id = this.store.state.user.user_id;
        this.userData.booking_id = this.$route.query.id;
        this.userData.token = this.$route.query.token;
        console.log(this.userData);
    },
    methods:{
        async confirmOTP(){
    
            await this.bookingservice.ConfirmCheckInUser(this.userData).then(response => {

                if(response.detail==="OK."){
                    this.$router.push(`/bookingdetail/${this.userData.booking_id}`);
                }
            })
        }
    }
}
</script>
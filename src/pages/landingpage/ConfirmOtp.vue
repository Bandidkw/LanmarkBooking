<template>
    <div class="card text-left px-5 py-5 mt-3">
        <h2>ยืนยันรหัส OTP</h2>
        <p>กรุณายืนยันรหัส OTP ที่ได้ส่งให้ทางเบอร์โทรศัพท์ที่ได้ลงทะเบียนก่อนหน้า</p>
        <base-input type="text" label="OTP"/>
        <base-button type="primary" @click="confirmOtp">ยืนยัน</base-button>

        </div>
</template>
<script>
import {BaseInput} from "@/components/index"
export default {
    components:{
        BaseInput
    },
    methods:{
        confirmOtp(){
            this.$router.push('/landingpage/firstlogin');
        }
    }
}
</script>

<style scoped>
.card{
    display: flex;
    width: 100%;
    max-width: 450px;
    justify-content: center;
}

</style>
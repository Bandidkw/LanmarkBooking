<template>
    <div class="card text-left px-5 py-5">
       

        <div class="content">

            <h3>ขอบคุณที่เข้าร่วมกับ NBA Booking Partner</h3>
            
            <p>รายการร้องของผู้ใช้กำลังอยู่ระหว่างการพิจารณา กรุณารอเจ้าหน้าที่ติดต่อกลับ</p>
            <base-button type="primary" class="mt-3" @click="goBack">กลับหน้าแรก</base-button>
        </div>
        </div>
       
</template>
<script>
export default {
    methods:{
        goBack(){
            localStorage.removeItem('token');
            this.$router.push('/');
        }
    }
}
</script>

<style scoped>
.card{
    max-width: fit-content
}

@media screen and (max-width:450px){
    .card {

        height: calc(100vh - 70px);
        border-radius: 0;
    }

}
</style>
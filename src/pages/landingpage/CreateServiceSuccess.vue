<template>
    <div class="card">
        <div class="card-content">
            <div class="message px-3 py-3">

                <h3>ระบบได้รับใบสมัครเรียบร้อยแล้ว</h3>
                <p>กรุณารอเจ้าหน้าที่ติดต่อกลับ หรือ ติดต่อ </p>
                <p>nbadigitalservice call center</p>
            </div>
            <!-- <base-button type="primary" @click="Edit">แก้ไขรายละเอียด</base-button> -->
            <base-button type="primary" @click="back">กลับหน้าแรก</base-button>
        </div>
    </div>
</template>
<script>
import { User } from "@/functions/userservice";
export default {
    setup(){
        const userservice = new User();
        return {
            userservice
        }
    },
    mounted(){
        this.hotelId = this.$route.params.id;
        this.userId = this.$route.query.host;
    },
    data(){
        return {
            hotelId:null,
            userId:null
        }
    },
    methods: {
        // Edit(){
        //     this.$router.push(`/landingpage/hotel-service-update/${this.hotelId}?host=${this.userId}`);
        // },
       async back(){
            await this.userservice.SignOut().then(result=>{
                if(result){
                    localStorage.removeItem('token');
                    this.$router.push('/')
                }
            })
        }
    }
}
</script>
<style scoped>
.card{
    max-width: 450px;
}
.card-content{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding:3rem;

}
.message{
    width: 100%;
}
@media screen and (max-width:450px){
    .card{
        min-height: calc(100vh - 70px);
        border-radius: 0;
        border-top:solid 3px var(--primary);
        align-content: center;
    }
}
</style>
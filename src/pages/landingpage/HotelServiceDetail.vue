<template>
    <div class="card text-left px-5 py-5">
        <h2>รายละเอียดเพิ่มเติม</h2>
<base-input  label="คำอธิบายเกี่ยวกับสถานที่ประกอบการ">
<textarea v-model="updatedata.description" class="form-control"></textarea>
</base-input>
        <base-button  type="primary" @click="addDetail">ไปขั้นตอนต่อไป</base-button>
        </div>
</template>
<script>
import { User } from "@/functions/userservice";
import { Hotel } from "@/functions/hotelservice";
import { BaseInput } from '@/components/index';
export default {
    setup(){
        const userservice = new User();
        const hotelservice = new Hotel();
        return {
            userservice,hotelservice
        }
    },
    components:{
       BaseInput
    },
    mounted(){
        this.hotel_id = this.$route.params.id;
        this.user_id = this.$route.query.host;
    },
   data(){
    return {
        hotel_id:null,
        user_id:null,
        updatedata:{
            description:null
        }
    }
   },    
    methods:{
       async addDetail(){
      
            await this.hotelservice.updateHotel(this.hotel_id,this.user_id,this.updatedata).then(result=>{
              if(result){

                  this.$router.push(`/landingpage/hotel-service-detail2/${this.hotel_id}?host=${this.user_id}`);
                }
            })
        },
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

@media screen and (max-width:450px){
    .card{
        margin: 0;
        min-height: calc(100vh - 70px);
        border-radius: 0;
        border-top:solid 3px var(--primary);
    }
}

</style>
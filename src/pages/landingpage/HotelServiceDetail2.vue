<template>
    <div class="card text-left px-5 py-5 mt-3">
        <h2>รายละเอียดเพิ่มเติม</h2>
        <div class="row">
            <div class="col-12">
                <h4>ไฮไลท์</h4>
                <div class="row">

                    <base-checkbox v-for="(item,index) in highlight" :key="index" class="col-4" v-model="item.check" >
                    {{ item.name }}
                </base-checkbox> 
            </div>
            </div>
            <div class="col-12">
                <h4>เครื่องอำนวยความสะดวก</h4>
                <div class="row">

                    <base-checkbox v-for="(item,index) in amenities" :key="index" class="col-4 " v-model="item.check" >
                    {{ item.name }}
                </base-checkbox> 
            </div>
            </div>
            <div class="col-12">
                <h4>ใบรับรอง</h4>
                <div class="row">

                    <base-checkbox v-for="(item,index) in certificate" :key="index" class="col-6 mb-3" v-model="item.check">
                    {{ item.name }}
                </base-checkbox> 
            </div>
            </div>
            
        </div>
        <base-button type="primary" @click="addDetail">ไปขั้นตอนต่อไป</base-button>
     
        </div>
</template>
<script>

import { Hotel } from '@/functions/hotelservice';

export default {
    setup(){
        const hotelservice = new Hotel();
        return{
            hotelservice
        }
    },

    components:{
       
    },
    mounted(){
        this.userId = this.$route.query.host;
        this.hotelId = this.$route.params.id;
        this.getHighlight();
        this.getAmenities();
        this.getCertificate();
    },
    data(){
        return{
            userId:null,
            hotelId:null,
            highlight:null,
            amenities:null,
            certificate:null
        }
    },
    methods:{
        async getHighlight(){
            await this.hotelservice.getHighlight().then(result=>{

                this.highlight= result.map(el=>({
                                "id":el._id,
                                "name":el.name,
                                "description":el.description,
                                "check":false}));

                                 })
                
        },
        async getAmenities(){
            await this.hotelservice.getAmenities().then(result=>{
                this.amenities= result.map(el=>({
                                "id":el._id,
                                "name":el.name,
                                "description":el.description,
                                "check":false}));
            })
        },
        async getCertificate(){
            await this.hotelservice.getCertificate().then(result=>{
                this.certificate= result.map(el=>({
                                "id":el._id,
                                "name":el.name,
                                "description":el.description,
                                "check":false}));
            })
        },

        async addDetail(){
            const dataupdate = {
                highlight:this.highlight.filter(el=>el.check===true).map(el=>el.id),
                amenities:this.amenities.filter(el=>el.check===true).map(el=>el.id),
                certificate:this.certificate.filter(el=>el.check===true).map(el=>el.id)
            }

            await this.hotelservice.updateHotel(this.hotelId,this.userId,dataupdate).then(result=>{
                if(result){
                   
                    this.$router.push(`/landingpage/create-service-success/`);
                }
            })
        }
    }
}
</script>

<style scoped>
h4{
    margin: 0;
    margin-top: 1.5rem;
    font-style: italic;
}
.card{
    display: flex;
    width: 100%;
    max-width: 450px;
    justify-content: center;

}


</style>
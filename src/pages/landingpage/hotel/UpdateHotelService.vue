<template>
    <div v-if="loading" class="pt-3">
        <h4>รายละเอียดสถานบริการ</h4>
        <base-input label="ประเภท"> ?
            <select class="form-control" @change = "hotel.category_id=setCategory($event)">
                <option v-for="(item, index) in categories" :key="index" :value="item._id">{{ item.name }}</option>
            </select>
        </base-input>
        <base-input v-model="hotel.name" type="text" label="ชื่อโรงแรม" />
        <base-input v-model="hotel.address" type="text" label="ที่อยู่" />
        <div class="row">
            <div class="col-lg-4">
              <base-input type="text" label="ตำบล">
            <select name="tambon" class="form-control" @change="hotel.tambon = setTambon($event)">
                <option v-for="(item, index) in tambon" :key="index" :value="item.id">{{ item.name_th }}</option>
            </select>
        </base-input>  
            </div>
            <div class="col-lg-4">

                <base-input type="text" label="อำเภอ">
            <select name="amphure" class="form-control" @change="hotel.amphure = setAmphure($event)">
                <option v-for="(item, index) in amphure" :key="index" :value="item.id">{{ item.name_th }}</option>
            </select>
        </base-input>
            </div>
            <div class="col-lg-4">

                <base-input type="text" label="จังหวัด">
            <select name="province" class="form-control" @change="hotel.province = setProvince($event)">
                <option v-for="(item, index) in province" :key="index" :value="item.id">{{ item.name_th }}</option>
            </select>
        </base-input>
            </div>
        </div>
        
        
        
        <div class="row">
            <div class="col">
                <base-input v-model="hotel.phone_number[0]" type="tel" label="เบอร์โทรติดต่อ 1" />
            </div>
            <div class="col">
                <base-input v-model="hotel.phone_number[1]" type="tel" label="เบอร์โทรติดต่อ 2" />
            </div>
        </div>
        <base-button link @click="back">กลับ</base-button>
        <base-button type="primary" @click="updateHotel">บันทึก</base-button>
    </div>
</template>

<script>
import { BaseInput } from "@/components/index";
import { User } from "@/functions/userservice";
import { Hotel } from '@/functions/hotelservice';
import { Province } from '@/functions/provinceservice';

export default {
    setup() {
        const userservice = new User();
        const hotelservice = new Hotel();
        const provinceservice = new Province();
        return { hotelservice, provinceservice,userservice }
    },
    components: {
        BaseInput
    },
   async mounted() {
        await this.userservice.Me().then(result=>{
            if(result){

                this.user=result.data;
                this.hotel.host_id=this.user.user_id;
            }
        })
        await this.getCategories();
        this.province = this.provinceservice.getProvince();
        this.amphure = this.province[0].amphure
        this.tambon = this.amphure[0].tambon
        this.loading = true;

        //set initial stats of province;
        this.hotel.province = this.province[0].name_th;
        this.hotel.amphure = this.amphure[0].name_th;
        this.hotel.tambon = this.tambon[0].name_th;

    },
    data() {
        return {
            loading: false,
            user:null,
            province: null,
            amphure: null,
            tambon: null,
            categories: null,
            hotel: {
                host_id:null,
                name: null,
                category_id:null,
                phone_number: [],
                description: null,
                address: null,
                tambon: null,
                amphure: null,
                province : null,
                country: "ไทย",
                latitude: null,
                longitude: null
            }
        }
    },
    methods: {
        async updateHotel() {
         
            await this.hotelservice.updateHotel(this.hotel,this.hotel.host_id).then(result => {
              
                if(result){

                    this.$router.push(`/landingpage/hotel-service-detail/${result.data._id}?host=${this.hotel.host_id}`);
                }
            })
        },
        async getCategories() {
            await this.hotelservice.getCatetory().then(result => {
                this.categories = result;
             
                this.hotel.category_id=result[0]._id;

            })
        },
        setCategory(e){
            if(e.target.options.selectedIndex > -1){
                const data = e.target.options[e.target.options.selectedIndex].value;
                return data;
            }
        },
        setProvince(e) {
            if (e.target.options.selectedIndex > -1) {

                const data = e.target.options[e.target.options.selectedIndex].innerHTML;
                this.amphure = this.province.find(el => el.name_th == data).amphure;
                this.tambon = this.amphure[0].tambon;


                return data;
            }
        },
        setAmphure(e) {
            if (e.target.options.selectedIndex > -1) {
                const data = e.target.options[e.target.options.selectedIndex].innerHTML;
                this.tambon = this.amphure.find(el => el.name_th == data).tambon;


                return data;
            }
        },
        setTambon(e) {
            if (e.target.options.selectedIndex > -1) {

                const data = e.target.options[e.target.options.selectedIndex].innerHTML;

                return data;
            }
        },
        back(){

        }
    }
}
</script>

<style>

@media screen and (min-width: 900px) {
  .card{
    min-width: 650px;

}
}

</style>
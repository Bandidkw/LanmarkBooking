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

<base-input type="text" label="จังหวัด">
<select name="province" class="form-control" @change="hotel.province = setProvince($event)">
<option v-for="(item, index) in province" :key="index" :value="item.id">{{ item.name_th }}</option>
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
              <base-input type="text" label="ตำบล">
            <select name="tambon" class="form-control" @change="hotel.tambon = setTambon($event)">
                <option v-for="(item, index) in tambon" :key="index" :value="item.id">{{ item.name_th }}</option>
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
        <div class="text-center">

            <base-button link @click="back">กลับ</base-button>
            <base-button type="primary" @click="createHotel">บันทึก</base-button>
            <p>
                
                <small class="text-danger">{{ error_message }}</small>
            </p>
        </div>
    </div>
</template>

<script>
import { BaseInput } from "@/components/index";
import { User } from "@/functions/userservice";
import { Hotel } from '@/functions/hotelservice';
import { Province } from '@/functions/provinceservice';
import store from '@/stores'

export default {
    setup() {
        const userservice = new User();
        const hotelservice = new Hotel();
        const provinceservice = new Province();
        return { hotelservice, provinceservice,userservice,store }
    },
    components: {
        BaseInput
    },
   async mounted() {

        this.hotel.host_id=this.store.state.user.user_id;
 
        await this.getCategories();
        this.hotel.category_id = this.categories[0]._id

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
            },
            error_message:null,
        }
    },
    methods: {
        async createHotel() {
            this.error_message=null;
            if(!this.hotel.name){
                this.error_message = 'กรุณากรอกชื่อโรงแรม';
                return;
            }
            if(!this.hotel.address){
                this.error_message = 'กรุณากรอกที่อยู่';
                return;
            }

            await this.hotelservice.createHotel(this.hotel,this.hotel.host_id).then(result => {
    
                if(result && result.status===true){
      
                    this.$router.push(`/landingpage/hotel-service-detail/${result.data._id}?host=${this.hotel.host_id}`);
                }
            })
        },
        async getCategories() {
            await this.hotelservice.getCatetory().then(result => {
                this.categories = result;

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
                this.hotel.amphure = this.amphure[0].name_th;
                this.tambon = this.amphure[0].tambon;
                this.hotel.tambon = this.tambon[0].name_th;


                return data;
            }
        },
        setAmphure(e) {
            if (e.target.options.selectedIndex > -1) {
                const data = e.target.options[e.target.options.selectedIndex].innerHTML;
                this.tambon = this.amphure.find(el => el.name_th == data).tambon;
                this.hotel.tambon = this.tambon[0].name_th;

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

</style>_
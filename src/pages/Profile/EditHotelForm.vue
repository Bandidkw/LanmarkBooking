<!-- eslint-disable prettier/prettier -->
<template>
  <card v-if="model">
    <div class="row">
      <div class="col-md-4 pr-md-1 text-left">
        <base-input label="ชื่อโรงแรม" placeholder="ชื่อโรงแรม" v-model="model.name" disabled>
        </base-input>
      </div>
      <div class="col-md-4 pr-dm-1 text-left">
        <base-input label="ประเภท">
          <select class="form-control" name="category_id" @change="setData($event)">
            <option v-for="(item, index) in category" :key="index" :value="item._id" :selected="item.name === model.category.name">{{
              item.name
            }}</option>
          </select>
        </base-input>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12 text-left">
        <base-input label="ที่อยู่" v-model="model.address" placeholder="ที่อยู่">
        </base-input>
      </div>
    </div>

    <div class="row">
      <div class="col-md-4 pr-md-1 text-left">
        <base-input label="ตำบล">
          <select disabled class="form-control" @change="hotel.tambon = setTambon($event)">
            <option v-for="(item, index) in tambon" :key="index" :value="item.id"
              :selected="item.name_th === model.tambon ? true : false">{{ item.name_th }}</option>
          </select>
        </base-input>
      </div>
      <div class="col-md-4 px-md-1 text-left">
        <base-input label="อำเภอ">
          <select disabled class="form-control" @change="hotel.amphure = setAmphure($event)">
            <option v-for="(item, index) in amphure" :key="index" :value="item.id"
              :selected="item.name_th === model.amphure ? true : false">{{ item.name_th }}</option>
          </select>
        </base-input>
      </div>
      <div class="col-md-4 pl-md-1 text-left">
        <base-input label="จังหวัด">
          <select disabled class="form-control" @change="hotel.province = setProvince($event)">
            <option v-for="(item, index) in province" :key="index" :value="item.id"
              :selected="item.name_th === model.province ? true : false">{{ item.name_th }}</option>
          </select>
        </base-input>
      </div>

    </div>
    <div class="row">
      <div class="col-md-4 pr-md-1 text-left">
        <base-input label="ประเทศ" :value="model.country"  placeholder="Country" disabled>
       
        </base-input>
      </div>

      <div class="col-md-4 px-md-1 text-left">
        <base-input label="เลขไปรษณีย์" placeholder="เลขไปรษณีย์" v-model="hotel.zipcode" disabled> </base-input>
      </div>

    </div>
    <div class="row">
      <div class="col-md-4 pr-md-1 text-left" v-for="(item, index) in model.phone_number" :key="index" >
        <base-input label="เบอร์โทรศัพท์" :value="item" disabled>
        </base-input>
      </div>


    </div>

    <div class="row">

      <div class="col-md-8 text-left">
        <base-input>
          <label>รายละเอียดเกี่ยวกับโรงแรม</label>
          <textarea rows="4" cols="80" class="form-control edit-description " placeholder="Here can be your description"
            v-model="model.description">
                    </textarea>
        </base-input>
      </div>
    </div>
    <!-- Hotel feature -->
    <Card>
      <h4 class="text-left">ลักษณะพิเศษ</h4>
      <div class="row">
        <div class="col-lg-3 col-md-4 text-left mb-3">
          <h5>ไฮไลท์</h5>
          <base-checkbox v-for="(item, index) in highlight" :key="index" v-model="item.check">
            {{ item.name }}
          </base-checkbox>
        </div>
        <div class="col-lg-3 col-md-4 text-left mb-3">
          <h5>เครื่องอำนวยความสะดวก</h5>
          <base-checkbox v-for="(amen, index) in amenities" :key="index" v-model="amen.check">
            {{ amen.name }}
          </base-checkbox>
        </div>
        <div class="col-lg-3 col-md-4 text-left mb-3">
          <h5>ใบรับรอง</h5>
          <base-checkbox v-for="(cert, index) in certificate" :key="index" v-model="cert.check">
            {{ cert.name }}
          </base-checkbox>
        </div>
        <div class="col-lg-3 col-md-4 text-left mb-3">
          <h5>ที่จอดรถ</h5>
          <base-checkbox v-model="hotel.parking">
            ที่จอดรถ
          </base-checkbox>
        </div>
        <!-- <div class="col-md-4 text-left mb-3">
          <h5>สถานที่ไกล้เคียง</h5>
          <base-checkbox v-for="(nearly_place, index) in model.nearly_place" :key="index"
            v-model="model.nearly_place">
            {{ nearly_place.name }}
          </base-checkbox>
        </div> -->
      </div>
    </Card>
    <!-- End hotel feature -->
    <template slot="footer">
      <base-button type="success" fill @click="editHotel">บันทึก</base-button>
      <notifications></notifications>
    </template>
  </card>
</template>
<!-- eslint-disable prettier/prettier -->
<script>
import { Card, BaseInput } from "@/components/index";
import BaseButton from "@/components/BaseButton";
import { Hotel } from "@/functions/hotelservice";
import * as provinceapi from "@/functions/province"

export default {
  setup() {
    const hotelservice = new Hotel();
    return {
      hotelservice
    }
  },
  components: {
    Card,
    BaseInput,
    BaseButton,
  },
  props: {
    model: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  async mounted() {
   
    await this.hotelservice.getCatetory().then(result => {
      this.category = result;
    })

    await this.hotelservice.getAmenities().then(result => {
      this.amenities = result;
    });
    await this.hotelservice.getHighlight().then(result => {
      this.highlight = result;
    });
    await this.hotelservice.getCertificate().then(result => {
      this.certificate = result;
    });

    //checkbox data
    this.province = await provinceapi.default;
    this.amphure = await this.province.find(el => el.name_th === this.model.province).amphure;
    this.tambon = await this.amphure.find(el => el.name_th === this.model.amphure).tambon;
    this.hotel.zipcode = await this.tambon[0].zip_code;

    //set checkbox to init state form all data in collection
    this.amenities = this.amenities.map(el => ({
      id: el._id,
      name: el.name,
      description: el.description,
      check: (this.DefineHotelAmenities(el))
    }));

    this.highlight = this.highlight.map(el => ({
      id: el._id,
      name: el.name,
      description: el.description,
      check: (this.DefineHotelHighlight(el))
    }));

    this.certificate = this.certificate.map(el => ({
      id: el._id,
      name: el.name,
      description: el.description,
      check: (this.DefineHotelCertificate(el))
    }));

    //set init data 

    this.hotel = {
                name: this.model.name,
                category_id: this.model.category._id,
                phone_number: this.model.phone_number,
                description: this.model.description,
                address: this.model.address,
                tambon: this.model.tambon,
                amphure: this.model.amphure,
                province : this.model.province,
                country: this.model.country,
                latitude: this.model.latitude,
                longitude: this.model.longitude,
                amenities: this.model.amenities,
                highlight : this.model.highlight,
                certificate:this.model.certificate,
                nearly_place: this.model.nearly_place,
                special_service:this.model.special_service,
                parking : this.model.parking,
                property_policies: this.model.property_policies,
                other_information : this.model.other_information
      }


  },
  data() {
    return {
      category: [],
      amenities: [],
      highlight: [],
      certificate: [],
      province: [],
      amphure: [],
      tambon: [],
      hotel: {}
    }
  },
  methods: {
    setProvince(e) {
      if (e.target.options.selectedIndex > -1) {

        const data = e.target.options[e.target.options.selectedIndex].innerHTML;
        this.amphure = this.province.find(el => el.name_th== data).amphure;
        this.tambon = this.amphure[0].tambon;
        this.hotel.zipcode = this.tambon[0].zip_code;

        return data;
      }
    },
    setAmphure(e) {
      if (e.target.options.selectedIndex > -1) {
        const data = e.target.options[e.target.options.selectedIndex].innerHTML;
        this.tambon = this.amphure.find(el => el.name_th == data).tambon;
        this.hotel.zipcode = this.tambon[0].zip_code;

        return data;
      }
    },
    setTambon(e) {
      if (e.target.options.selectedIndex > -1) {

        const data = e.target.options[e.target.options.selectedIndex].innerHTML;
        this.hotel.tambon = this.tambon.find(el => el.name_th == data);
        this.hotel.zipcode = this.hotel.tambon.zip_code
        return data;
      }
    },
    setData(e){
      if(e.target.options.selectedIndex > -1){
        const data = e.target.options[e.target.options.selectedIndex].value;
        this.hotel[e.target.name] = data;
      }
    },
    DefineHotelAmenities(amenity) {
      let result=false;

      if (this.model.amenities) {
        result = this.model.amenities.find(el => el._id === amenity._id) ? true : false;
      }
      return result
    },
    DefineHotelHighlight(highlight_item) {
      let result=false;

      if (this.model.highlight) {
        result = this.model.highlight.find(el => el._id === highlight_item._id) ? true : false;
      }
      return result
    },
    DefineHotelCertificate(certificate_item) {
      let result=false;
      if (this.model.certificate) {
        result = this.model.certificate.find(el => el._id === certificate_item._id)? true : false;
      }
      return result;
    },
    editHotel(){
   
      this.hotel.name = this.model.name;
      this.hotel.address = this.model.address;
      this.hotel.description = this.model.description;
      this.hotel.amenities = this.amenities.filter(el=>el.check).map(el=>el.id);
      this.hotel.highlight = this.highlight.filter(el=>el.check).map(el=>el.id);
      this.hotel.certificate = this.certificate.filter(el=>el.check).map(el=>el.id);
      this.hotel.tambon = this.hotel.tambon;
      this.hotel.amphure = this.hotel.amphure;
      this.hotel.province = this.hotel.province;
      this.hotel.zipcode = this.hotel.zipcode;

      this.hotelservice.updateHotel(this.model._id,this.hotel).then(result => {
  
        if(result){
          this.$notify({type:'success',verticalAlign: 'bottom', horizontalAlign: 'center', message: 'บันทึกสำเร็จ'});
        }
        else{
          this.$notify({type:'danger',verticalAlign: 'bottom', horizontalAlign: 'center', message: result.error});
        }
      })
      
    }
  }
}
</script>

<style scoped>
.edit-description {
  color: #344675;
  opacity: 1;
  border: solid 1px rgba(29, 37, 59, 0.5);
  border-radius: 0.4285rem;
}
</style>
  
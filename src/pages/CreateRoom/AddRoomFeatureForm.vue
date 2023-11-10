<!-- eslint-disable prettier/prettier -->
<template>
  <Card>
    <div class="contents">
      <h3>เพิ่มลัษณะพิเศษของห้อง</h3>
      <form>
        <div class="row">
          <div class="col-6 col-md-3">
            <base-input label="เฟอร์นิเจอร์">
              <base-checkbox v-for="(furniture,index) in furnitureType" :key="index" class="mb-3" v-model="furniture.check">
                {{ furniture.name }}
              </base-checkbox>

            </base-input>
          </div>

          <div class="col-6 col-md-3">
            <base-input label="สิ่งอำนวยความสะดวก">
              <base-checkbox v-for="(amenities,index) in amenitiesType" :key="index" class="mb-3" v-model="amenities.check">
                {{ amenities.name }}
              </base-checkbox>
            </base-input>
          </div>

          <div class="col-6 col-md-3">
            <base-input label="รูมเซอร์วิส">
              <base-checkbox v-for="(roomservice,index) in roomserviceType" :key="index" class="mb-3" v-model="roomservice.check">
                {{ roomservice.description }} 
              </base-checkbox>

            </base-input>
          </div>

          <div class="col-6 col-md-3">
            <base-input label="สิ่งบันเทิง">
              <base-checkbox v-for="(entertainment,index) in entertainmentType" :key="index" class="mb-3" v-model="entertainment.check">
                {{ entertainment.name }} 
              </base-checkbox>
            </base-input>
          </div>
        </div>

        <div class="col-12 mt-3">
          <base-button
            link
            type="secondary"
            @click.native="$router.push('/createroom')"
            >กลับ</base-button
          >
          <base-button
            type="primary"
            @click.native="addRoomFeature"
            >ไปขั้นตอนต่อไป</base-button
          >
        </div>
      </form>
    </div>
  </Card>
</template>
<!-- eslint-disable prettier/prettier -->
<script>
import { Card, BaseInput } from "@/components/index";
import { Room } from "@/functions/roomservice";


export default {
  setup(){
    const room = new Room();

    return {
      room
    }
  },
  components: {
    Card,
    BaseInput,
  },
  async mounted(){

    this.hotel_id = this.$route.params.hotelId;
    this.roomid =this.$route.query.id;

    const fur = await this.room.getFurnitureType();
    this.furnitureType = fur.map(el=>({"id":el._id,"name":el.name,"description":el.description,"check":false}));

    const amen = await this.room.getAmenitiesType();
    this.amenitiesType = amen.map(el=>({
      "id":el._id,
      "name":el.name,
      "description":el.description,
      "check":false}));

    const rs = await this.room.getRoomServiceType();
    this.roomserviceType = rs.map(el=>({
      "id":el._id,
      "name":el.name,
      "description":el.description,
      "servicetime":el.service_time,
      "check":false}));

    const en = await this.room.getEntertainmentType();
    this.entertainmentType = en.map(el=>({
      "id":el._id,
      "name":el.name,
      "description":el.description,
      "servicetime":el.service_time,
      "check":false}));

  },
  methods:{
   async addRoomFeature(){
      const fur = this.furnitureType.filter(el=>el.check===true);
      const amen = this.amenitiesType.filter(el=>el.check===true);
      const rs = this.roomserviceType.filter(el=>el.check===true);
      const ent = this.entertainmentType.filter(el=>el.check===true);

      const updateData = {
        furniture:fur.map(el=>el.id),
        amenities:amen.map(el=>el.id),
        room_service:rs.map(el=>el.id),
        entertainment:ent.map(el=>el.id)
      }
    
      await this.room.updateRoom(this.hotel_id,this.roomid,updateData).then((result)=>{
        if(result){
          this.$router.push(`/updateroompicture/${this.hotel_id}/?id=${this.roomid}`);
        }
      });
    }
  },
  props: {
    model: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      hotel_id:null,
      roomid:null,
      furnitureType:null,
      amenitiesType:null,
      roomserviceType:null,
      entertainmentType:null,
    };
  },
};
</script>

<style scoped>
.contents {
  min-height: 90vh;
  text-align: start;
  padding: 1rem;
}

</style>

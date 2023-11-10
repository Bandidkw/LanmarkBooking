<!-- eslint-disable prettier/prettier -->
<template>
  <div class="content">
    <div class="row">
      <div class="col-12">
        <card>
          <template slot="header">
            <h4 class="card-title">Room managemant</h4>
          </template>
          <div class="manager-button text-left">
      <!-- <base-button type="primary" @click="$router.push('/createroom')">สร้างห้อง</base-button> -->
    </div>
          <div class="table-responsive text-left">
            <room-table
              :data="roomdata"
              :columns="table.columns"
              :hotel="hotel_id"
              thead-classes="text-primary"
            >
            </room-table>
          </div>
        </card>
      </div>
    </div>
  </div>
</template>
<!-- eslint-disable prettier/prettier -->
<script>
import { User } from "@/functions/userservice";
import { Card } from "@/components/index";
import {Room} from '@/functions/roomservice';
import RoomTable from "@/components/RoomTable";
import store from "@/stores"

const tableColumns = [
  "ห้อง",
  "เตียง",
  "ราคา",
  "จำนวนผู้เข้าพักสูงสุด",
  "โควต้า",
  "สถาณะ",
];

export default {
  setup(){

    const room = new Room();
    const userservice = new User();


    return {
      room,userservice,store
    }
  },
  components: {
    Card,
    RoomTable,
  },

  async mounted(){

      this.hotel_id = store.state.user.service_id;
    await this.GetRoom();
    
  },
  data() {
    return {
      hotel_id:null,
      roomdata:null,
      table: {
        title: "Simple Table",
        columns: [...tableColumns],
        data: [],
      },
    };
  },
  methods:{
    async GetRoom(){
      await this.room.getHotelRoom(this.hotel_id).then(room=>{
      this.roomdata = room;
    })
    }
  }
};
</script>

<style scoped>
.room-manager {
  display: flex;
  min-width: 80vh;
  background-color: white;
}
</style>

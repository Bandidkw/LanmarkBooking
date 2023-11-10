<template>
  <div class="content" v-if="loading">
    <div class="row">
      <div class="col-12">
        <Card>

     
        <!-- toolbar -->
        <div class="row tool-bar">
          <div class="col justify-content-start">
            <button class="back-forword" @click="backingDay">&lt;&lt;</button>
            <button class="back-forword" @click="forwardDay">>></button>
          </div>
          <div class="col">
            <h2 class="month-display">{{ this_month }}</h2>
          </div>
         
          <div class="col calendar" @mouseenter="calendar=true" @mouseleave="calendar=false" >
          <!-- <button class="back-forword">day</button>
                                <button class="back-forword">week</button> -->
            <button class="back-forword" >เดือน</button>
            <div class="calendar-dialog" v-if="calendar" >

              <CalendarScheduler :data="{first_day:first_day,last_day:last_day}" @datepicker="dateController"/>
            </div>
          </div>
        </div>
        <!-- end tool bar -->
        <div class="scheduler">
          <div>
            <div class="nav">
              <!-- scheduler -->
              <div class="table-scheduler">

                <table>
                  <thead>
                    <tr class="header">
                      <th class="header-1cell">Room</th>
                      <th class="header-cell" v-for="(day, index) in days" :key="index"
                        :style="(dateformat(day) == dateformat(new Date()) || dateformat(day) === dateformat(datepicker)) ? `background-color:violet` : ''">{{
                          dateformat(day)
                        }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="item-row" v-for="(room, index) in room_number" :key="index">
                      <div class="caption">

                        {{ room }}
                      </div>
                      <td class="item-cell" :id="`item-${room}-${index + 1}`" v-for="(cell, index) in body_cell"
                        :key="index">
                        <div v-if="isBooked(cell, room)" class="booked-cell" :style="checkIncell(room)"
                          @mouseenter="popDetail(cell, room)" @mouseleave="popBook.cell = false">

                          {{ isBooked(cell, room).name }}
                          <div class="popBooking px-3 py-3" id="booking-detail"
                            v-if="cell === popBook.cell && room === popBook.room">
                            <p>ห้อง</p>
                            <p>{{ isBooked(cell, room).room }}</p>
                            <p>เข้าพัก</p>
                            <p>{{ new Date(isBooked(cell, room).start_day).toLocaleDateString() }}</p>
                            <p>ถึงวันที</p>
                            <p>{{ new Date(isBooked(cell, room).end_day).toLocaleDateString() }}</p>
                            <div class="btn btn-primary" @click="popMoreDetail(isBooked(cell,room).id)">
                              ดูรายละเอียด


                            </div>

                          </div>

                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!-- end scheduler -->

            </div>
            <div class="dialog" v-if="moreDetail">
              <div class="dialog-detail">
                <template body="item">
                  <Card>
                 <h3 class="mb-4 text-left">รายละเอียดใบจอง</h3> 
                  <div class="dialog-content">
                    
                    <div class="row">
                      <div class="col-md-6 text-left">
                        Ref Number
                      </div>
                      <div class="col-md-6 text-left">{{ booking_detail.ref_number }}</div>
                    </div>
                    <div class="row mb-3">
                      <div class="col-md-6 text-left">
                        วันที่
                      </div>
                      <div class="col-md-6 text-left">{{ new Date(booking_detail.createdAt).toLocaleDateString() }}</div>
                    </div>
                    <div class="row">
                      <div class="col-md-6 text-left">
                        ชื่อลูกค้า
                      </div>
                      <div class="col-md-6 text-left">{{ booking_detail.customer_name }}</div>
                    </div>
                    <div class="row mb-3">
                    <div class="col-md-6 text-left">
                      เบอร์โทร
                    </div>
                    <div class="col-md-6 text-left">{{ booking_detail.customer_tel }}</div>
                  </div>
                  <div class="row">
                    <div class="col-md-6 text-left">
                      วันที่จอง
                    </div>
                    <div class="col-md-6 text-left">{{ new Date(booking_detail.date_from).toLocaleDateString() }} - {{ new Date(booking_detail.date_to).toLocaleDateString() }}
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6 text-left">
                      จำนวนผุ้เข้าพัก
                    </div>
                    <div class="col-md-6 text-left">{{ booking_detail.num_guess }} คน</div>
                  </div>
                  <div class="row mb-6">
                    <div class="col-md-6 text-left">
                      ผู้ติดตามที่อายุต่ำกว่า 6 ปี
                    </div>
                    <div class="col-md-6 text-left">{{ booking_detail.num_children ? booking_detail.num_children + " คน" : 'ไม่มี' }}</div>
                  </div>
                  <div class="row">
                    <div class="col-md-6 text-left">
                      ห้องพักที่ได้จอง
                    </div>
                    <div class="col-md-6 text-left">
                      <ul>
                        <li v-for="(room, index) in booking_detail.room" :key=index>
                          ห้อง {{ room.room_number }} ราคา {{ room.price }} บาท/คืน
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6 text-left">
                      ค่าที่พักรวม
                    </div>
                    <div class="col-md-6 text-left">
                      {{ booking_detail.total_price }} บาท
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-3">
                      
                    </div>
                    <div class="col-md-9">
                      
                    </div>
                  </div>
                </div>
                
              </Card>
            </template>
              <div class="dialog-footer">
                  
                  <base-button class="mx-3 my-3 " type="primary" @click="moreDetail = false">ปิด</base-button>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </Card>
      </div>
    </div>
  </div>
</template>
<script>
import dayjs from "dayjs";
import "dayjs/locale/th";
import { Booking } from "@/functions/bookingservice";
import { Room } from "@/functions/roomservice";
import { DateService } from "@/functions/dateservice";
import { Card } from "@/components/index";
import CalendarScheduler from "@/components/CalendarScheduler";
import store from "@/stores";

export default {
  setup() {
    const bookingservice = new Booking();
    const roomservice = new Room();
    const dateservice = new DateService();


    return {
      bookingservice, roomservice, dateservice,store
    }
  },
  data() {
    return {
      hotel_id: null,
      today: null,
      backing_day: -3,
      first_day: null,
      last_day: null,
      this_month: null,
      days: [],
      rooms: null,
      room_number: null,
      booking: [],
      body_cell: [],
      popBook: '',//bookid
      event: [],
      bookingClass: 'booked-cell',
      months_th: ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม",],
      moreDetail: false,
      booking_detail:null,
      calendar:false,
      loading:false,
      datepicker:null,
    };
  },
  components: {
    Card,CalendarScheduler
  },

  async mounted() {
    this.hotel_id = this.store.state.user.service_id;
    this.today = await this.dateservice.getToday();

    //get all booking data;
    await this.bookingservice.getBooking(this.hotel_id).then(result => {
      console.log(result.data);
      this.booking = result.data;
    });

    //get all rooms
    await this.roomservice.getHotelRoom(this.hotel_id).then(result => {
      if (result) {

        this.rooms = result;
        this.room_number = result.map(el => (el.room_number));
        for (let room of this.rooms) {
          for (let booking of room.bookings) {

            const data = {
              id: booking.booking_id,
              room: room.room_number,
              name: (this.booking.find(el => el._id === booking.booking_id).customer_name),
              start_day: booking.date_from,
              end_day: booking.date_to
            }
            this.event.push(data);
          }
        }

        this.loading = true;
      }
    
    });

    const today = new Date(this.today.date);
    this.today = today
    this.first_day = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() + this.backing_day);
    this.last_day = new Date(this.today.getFullYear(), this.today.getMonth() + 1, 0);
    this.this_month = this.months_th[this.today.getMonth()];

    this.days = this.computedDay();
    this.EventCell();

    document.addEventListener('datepicker',this.dateController);

  },

  methods: {
    dateformat(day) {
      const result = dayjs(day).format("DD/MM");
      return result;
    },
    isBooked(day, room) {
      
      const booked = this.event.find(event => event.room === room &&  dayjs(day).format() >= dayjs(new Date(event.start_day)).format()  && dayjs(day).format() <= dayjs(new Date(event.end_day)).format());

      if (booked) {
        return { id: booked.id, name: booked.name, room: booked.room, start_day: booked.start_day, end_day: booked.end_day };
      }
      else {

        return "";
      }
    },
    popDetail(day, room) {
      this.popBook = { cell: day, room: room }
    },
    forwardDay() {
      this.backing_day += 1;
      this.first_day = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() + this.backing_day);
      this.days = this.computedDay();
      this.EventCell();

    },
    backingDay() {
      this.backing_day -= 1;
      this.first_day = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() + this.backing_day);
      this.days = this.computedDay();
      this.EventCell();
     
     
    },
    computedDay() {
      const container = [];
      for (let i = 0; i < 14; i++) {
        container.push(new Date(this.first_day.getTime() + (i * 24 * 60 * 60 * 1000)).toDateString());
      }

      return container;
    },
    EventCell() {
      //set header cell array

      this.body_cell = [];
      for (var i = 0; i < 14; i++) {
        const currentDay = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() + i + this.backing_day);
        this.body_cell.push(currentDay);
      }

    },
    checkIncell(room) {
      const result = this.rooms.find(el => el.room_number === room);

      if (result.checkin_status === "checked in") {
        return "background-color:#47e409"
      }
      else if (result.checkin_status === "checked out") {
        return "background-color:#gray"
      }
      else {
        return "background-color:#11cdef"
      }
    },
    popMoreDetail(id) {

      this.booking_detail = this.booking.find(el => el._id === id);
  
      this.moreDetail = true;
    },
    dateController(event) {
      this.backing_day=-3;
      if (event.selectedDate !== null) {

        if ((new Date(this.today).toLocaleDateString() !== new Date(event.selectedDate).toLocaleDateString())) {
          this.today = new Date(event.selectedDate);
          console.log('today',this.today);
          this.first_day = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() + this.backing_day);
        }
          this.days = this.computedDay();
          this.EventCell();
      }
    }
  },
  
};
</script>

<style lang="scss" scoped>

.scheduler {
  min-height: 80vh;
  width: 100%;
  overflow-y: auto;
  overflow-x: auto;
}

.nav {
  display: flex;
  background-color: #f4f5f7;
}

.tool-bar {
  display: flex;
  color: var(--primary);
  width: 100%;
}

.back-forword {
  color: white;
  font-weight: 600;
  background-color: #11cdef;
  border: 0;

}

.month-display {
  font-size: x-large;
  color: #11cdef;
}

.title {
  display: flex;
  padding: 1rem;
  width: 7rem;
}

.header-1cell {
  color: white;
  background-color: #11cdef;
  width: 10rem;
}

.header-cell {
  background-color: #2bffc6;
  padding: 0.5rem 1rem 0.5rem 1rem;
  border-right: solid 1px #f4f5f7;
}

.table-scheduler {
  max-height: 60vh;
}


table {
  width: 100%;
  white-space: nowrap;
  border: none;
  border-collapse: separate;
  border-spacing: 0;
  table-layout: fixed;
}

table th {
  padding: 0.5rem 1rem;
}

table thead th {
  font-weight: 400;
  padding: 3px;
  position: sticky;
  top: 0;
  z-index: 1;
  width: 6rem;
}

table td {
  padding: 0;
  text-align: center;
  background-color: #ebebeb;
  border-bottom: solid 1px #f4f5f7;
  border-right: solid 1px #f4f5f7;
}

.item-cell {
  text-align: center;
  background-color: #ebebeb;
  border-bottom: solid 1px #f4f5f7;
  border-right: solid 1px #f4f5f7;
}

.item-cell-checkin {
  text-align: center;
  background-color: #ebebeb;
  border-bottom: solid 1px #f4f5f7;
  border-right: solid 1px #f4f5f7;
}

.booked-cell {

  cursor: pointer;
  position: relative;
  color: white;
  text-align: center;
  background-color: #09b8e4;
  width: 100%;
  height: 100%;
}

.booking-cell-checkin {
  cursor: pointer;
  position: relative;
  color: white;
  text-align: center;
  background-color: #47e409;
  width: 100%;
  height: 100%;
}

.item-1cell {
  background-color: rgb(239, 222, 255);
  padding: 1rem 1rem 1rem 1rem;
  position: sticky;
}

table tbody th {
  font-weight: 100;
  font-style: italic;
  text-align: left;
  position: relative;
}

table thead th:first-child {
  position: sticky;
  left: 0;
  z-index: 3;
}

table tbody th {
  position: sticky;
  left: 0;
  z-index: 1;
}

.caption {
  text-align: center;
  background-color: rgb(214, 255, 236);
  color: black;
  width: 10rem;
  height: 100%;
  padding: 0.5rem 1rem 0.5rem 1rem;
  border-bottom: solid 1px #f4f5f7;
  position: sticky;
  left: 0;
  z-index: 2;
}

.popBooking {
  background-color: #cff5ff;
  position: absolute;
  top: 21px;
  z-index: 99;

  p {
    color: black;
    text-align: start;
    font-size: smaller;
    margin-left: 0.5rem;
  }
}

.dialog {
  position: fixed;
  background-color: rgba($color: #757575, $alpha: 0.4);
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  color: #222222;
  z-index: 999;
}

.dialog-detail {
  position: relative;
  width: 470px;
  height: 450px;
  left: calc((100vw - 470px)*0.5);
  top: calc((100vh - 450px)*0.5);
  background-color: white;
  padding: 1rem;
  border-radius: 0.3rem;
}

.dialog-content {
  background-color: white;

}
.dialog-footer{
  position: absolute;
  bottom: 1rem;
}
ul{
  padding: 0;
}
li{
  list-style: none;
  margin: 0;
  padding: 0;
}

.calendar{
  position:relative;
  display: block;
  .calendar-dialog{
  position: absolute;
  top: 1.5rem;
  left: 0;
  width: 100%;
  height: 100%;
  z-index:99
}
}

</style>

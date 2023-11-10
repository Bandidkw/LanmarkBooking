<template>
  <div class="content">
    <div class="row">
      <div class="col-12">
        <card type="chart">
          <template slot="header">
            <div class="row">
              <div class="col-sm-6" :class="isRTL ? 'text-right' : 'text-left'">
                <template >
                  <h5 class="card-category">ยอดจองรายปี</h5>
                </template>

                <template>
                  <h2 class="card-title">Performance {{active_year}}</h2>
                </template>
              
              </div>

              
              <div class="col-sm-6">
                <div
                  class="btn-group btn-group-toggle"
                  data-toggle="buttons"
                  :class="isRTL ? 'float-left' : 'float-right'"
                >
                  <template v-if="!isRTL">
                    <label
                      v-for="(option, index) in bigLineChartCategories"
                      :key="option"
                      class="btn btn-success btn-sm btn-simple"
                      style="min-width:5rem"
                      :class="{ active: bigLineChart.activeIndex === index }"
                      :id="index"
                    >
                      <input
                        type="radio"
                        @click="initBigChart(index)"
                        name="options"
                        autocomplete="off"
                        :checked="bigLineChart.activeIndex === index"
                      />
                      {{ option }}
                    </label>
                  </template>
                  <template v-else>
                    <label
                      v-for="(option, index) in bigLineChartCategoriesAr"
                      :key="option"
                      class="btn btn-success btn-sm btn-simple"
                      :class="{ active: bigLineChart.activeIndex === index }"
                      :id="index"
                    >
                      <input
                        type="radio"
                        @click="initBigChart(index)"
                        name="options"
                        autocomplete="off"
                        :checked="bigLineChart.activeIndex === index"
                      />
                      {{ option }}
                    </label>
                  </template>
                </div>
              </div>
            </div>
          </template>
          <line-chart v-if="loading"
            class="chart-area"
            ref="bigChart"
            chart-id="big-line-chart"
            :chart-data="bigLineChart.chartData"
            :gradient-colors="bigLineChart.gradientColors"
            :gradient-stops="bigLineChart.gradientStops"
            :extra-options="bigLineChart.extraOptions"
          >
          </line-chart>
        </card>
      </div>
    </div>

    <!-- weekly chart -->
    <div class="row">
      <div class="col-lg-4" :class="{ 'text-right': isRTL }">
        <card type="chart" cardCol>
          <template slot="header">
            <h5 class="card-category">ยอดใบจองใหม่ใน 7 วันที่ผ่านมา</h5>
            <h3 class="card-title">
              <i class="tim-icons icon-bell-55 text-primary"></i> {{ booking7day }} <small style="color:gray; font-size:small">การจอง</small>
            </h3>
          </template>
          <line-chart v-if="loading"
            class="chart-area"
            chart-id="green-line-chart"
            :chart-data="greenLineChart.chartData"
            :gradient-colors="greenLineChart.gradientColors"
            :gradient-stops="greenLineChart.gradientStops"
            :extra-options="greenLineChart.extraOptions"
          >
          </line-chart>
        </card>
      </div>
      <div class="col-lg-4">
        <card type="chart" cardCol>
          <template slot="header">
            <h5 class="card-category">รายได้สัปดาห์นี้</h5>
            <h3 class="card-title">
              <i class="tim-icons icon-wallet-43 text-info"></i> {{ format(weekly_income) }} <small style="color:gray; font-size:small">บาท</small>
            </h3>
          </template>
          <bar-chart v-if="loading"
            class="chart-area"
            chart-id="blue-bar-chart"
            :chart-data="blueBarChart.chartData"
            :gradient-stops="blueBarChart.gradientStops"
            :extra-options="blueBarChart.extraOptions"
          >
          </bar-chart>
        </card>
      </div>
      <div class="col-lg-4">
        <card type="chart" cardCol>
          <template slot="header">
            <h5 class="card-category">เช็คอินสัปดาห์นี้</h5>
            <h3 class="card-title">
              <i class="tim-icons icon-bulb-63 text-success"></i> {{ room_check_in }} <small style="color:gray; font-size:small">ใบจอง</small>
            </h3>
          </template>
          <line-chart v-if="loading"
            class="chart-area"
            chart-id="purple-line-chart"
            :chart-data="purpleLineChart.chartData"
            :gradient-stops="purpleLineChart.gradientStops"
            :extra-options="purpleLineChart.extraOptions"
          >
          </line-chart>
        </card>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6 col-md-12">
        <card type="tasks">
          <template slot="header">
            <template v-if="!isRTL">
              <h6 class="new-task title d-inline" :style="newtask_active" @click="getNewTask">ข้อความใหม่({{ task }})</h6>
            </template>
            <template v-else>
              <h6 class="title d-inline">الشحنات</h6>
            </template>
            <template v-if="!isRTL">
              <p class="card-category d-inline" :style="todaytask_active" @click="getTodayTask">วันนี้</p>
            </template>
            <drop-down tag="div" :class="isRTL ? 'float-left' : ''">
              <button
                aria-label="Settings menu"
                data-toggle="dropdown"
                class="dropdown-toggle btn-rotate btn btn-link btn-icon"
                :class="isRTL ? 'pl-5' : ''"
              >
                <i class="tim-icons icon-settings-gear-63"></i>
              </button>
              <ul class="dropdown-menu dropdown-menu-right">
                <li class="dropdown-item">ลบที่เลือกทั้งหมด</li>
              </ul>
            </drop-down>
          </template>
          <div v-if="loading" class="table-full-width table-responsive">
            <task-list :today="today"  @task="(data)=>task=data"/>
          </div>
        </card>
      </div>
      <div class="col-lg-6 col-md-12">
        <card type="tasks">
      
            <template slot="header">
              <template>
                
                <h6 class="new-task title d-inline" :style="new_active" @click="tab='รอโรงแรมรับการจอง';new_active='color:black';checkin_active='color:gray';checkout_active='color:gray'">
                  ใบจองมาใหม่({{ bookings.length }})
                </h6>
              </template>
              <template >
              <p class="card-category d-inline" @click="tab='เช็คอินวันนี้';checkin_active='color:black';checkout_active='color:gray';new_active='color:gray'" :style="checkin_active" >เช็คอินวันนี้</p>
            </template>
            <template >
              <p class="card-category d-inline mx-3" @click="tab='เช็คเอาท์วันนี้';checkout_active='color:black';checkin_active='color:gray';new_active='color:gray'" :style="checkout_active">เช็คเอาท์วันนี้</p>
            </template>
            </template>
        
          <div v-if="loading" class="table-full-width table-responsive mt-1">
          <new-booking :bookings="bookings" :tab="tab"/>
          </div>
        </card>
      </div>
    </div>
 
  </div>
</template>
<script>
import { io } from "socket.io-client";
import { Card } from "@/components/index";
import LineChart from "@/components/Charts/LineChart";
import BarChart from "@/components/Charts/BarChart";
import * as chartConfigs from "@/components/Charts/config";
import TaskList from "./Dashboard/TaskList";
import NewBooking from "./Dashboard/NewBooking.vue";
import config from "@/config";
import store from "@/stores";
import { Report } from "@/functions/reportservice"
import format from '@/functions/format';

export default {
  setup(){
    const socket = io(process.env.VUE_APP_SOCKET);
    const reportservice = new Report();
    return {
      reportservice,store,socket,format
    }
  },
  components: {
    Card,
    LineChart,
    BarChart,
    TaskList,
    NewBooking
  },
  data() {
    return {
      hotel_id:null,
      report:null,
      task:0,
      booking7day:0,
      weekly_income:0,
      bookings:[],
      room_check_in:0,
      today:false,
      checkall:false,
      active_year:new Date().getFullYear(),
      tab:'รอโรงแรมรับการจอง',
      new_active:'',
      newtask_active:'',
      todaytask_active:'',
      checkin_active:'',
      checkout_active:'',
      selected:[],
      bigLineChartCategories: ["ปีนี้", "ปีหน้า", "ปีถัดไป"],
      bigLineChartCategoriesAr: ["","",""],
      bigLineChart: {
        allData: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ],
        activeIndex: 0,
        chartData: { datasets: [{}] },
        extraOptions: chartConfigs.purpleChartOptions,
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.4, 0],
        categories: [],
      },
      greenLineChart: {
        extraOptions: chartConfigs.greenChartOptions,
        chartData: {
          labels: new Array(7),
          datasets: [
            {
              label: "จำนวน",
              fill: true,
              borderColor: config.colors.primary,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: config.colors.primary,
              pointBorderColor: "rgba(255,255,255,0)",
              pointHoverBackgroundColor: config.colors.primary,
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: new Array(7),
            },
          ],
        },
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.2, 0],
      },
      blueBarChart: {
        extraOptions: chartConfigs.barChartOptions,
        chartData: {
          labels: new Array(7),
          datasets: [
            {
              label: "รายได้",
              fill: true,
              borderColor: config.colors.info,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              data: [53, 20, 10, 80, 100, 45],
            },
          ],
        },
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.4, 0],
      },
      purpleLineChart: {
        extraOptions: chartConfigs.purpleChartOptions,
        chartData: {
          labels: new Array(7),
          datasets: [
            {
              label: "เช็คอิน",
              fill: true,
              borderColor: config.colors.danger,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: config.colors.danger,
              pointBorderColor: "rgba(255,255,255,0)",
              pointHoverBackgroundColor: config.colors.danger,
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: [90, 27, 60, 12, 80],
            },
          ],
        },
        gradientColors: [
          "rgba(66,134,121,0.15)",
          "rgba(66,134,121,0.0)",
          "rgba(66,134,121,0)",
        ],
        gradientStops: [1, 0.4, 0],
      },
      loading: false
    };
  },
  created(){
      this.socket.on('newbooking',async ()=>{
    
          await this.getReport();
        
          this.initBigChart(0);
    
      })
      
    
    },
  computed: {
    enableRTL() {
      return this.$route.query.enableRTL;
    },
    isRTL() {
      return this.$rtl.isRTL;
    },
 
  },
  async mounted() {
    this.i18n = this.$i18n;
 
    if (this.enableRTL) {
      this.i18n.locale = "ar";
      this.$rtl.enableRTL();
    }

   this.hotel_id = this.store.state.user.service_id;

    await this.getReport();

    this.initBigChart(0);

  },
  methods: {
    initBigChart(index) {
      let chartData = {
        datasets: [
          {
            fill: true,
            borderColor: config.colors.primary,
            borderWidth: 2,
            borderDash: [5],
            borderDashOffset: 1,
            pointBackgroundColor: config.colors.primary,
            pointBorderColor: "rgba(255,255,255,0)",
            pointHoverBackgroundColor: config.colors.primary,
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: this.bigLineChart.allData[index],
          },
        ],
        labels: [
        "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."
        ],
      };
        this.active_year = new Date().getFullYear() + index
        this.$refs.bigChart.updateGradients(chartData);
        this.bigLineChart.chartData = chartData;
        this.bigLineChart.activeIndex = index;
      
    },
    async getReport(){
      await this.reportservice.getBookingReport(this.hotel_id).then(result=>{
      if(result && result.status === 'ok'){
       
        this.bigLineChart.allData[0] = result.data.year;
        this.bigLineChart.allData[1] = result.data.next_year;
        this.bigLineChart.allData[2] = result.data.last_year;
        
        
        //last 7 days
        this.greenLineChart.chartData.labels=result.data.last7day.map(el=>new Date(el.day).toLocaleDateString('th-TH',{month:'short',day:'2-digit',timeZone:'Asia/Bangkok'}));
        this.greenLineChart.chartData.datasets[0].data = result.data.last7day.map(el=>el.count);
        this.booking7day = result.data.last7day.reduce((accumulator, currentValue) => accumulator + currentValue.count,0);

        //blue chart
        const today = new Date();
        const firstday = new Date(today.getFullYear(),today.getMonth(),(today.getDate() - today.getDay()));
    
        
   
        this.blueBarChart.chartData.labels = result.data.last7day.map(el=>new Date(el.day).toLocaleDateString('th-TH',{month:'short',day:'2-digit',timeZone:'Asia/Bangkok'}));
        this.blueBarChart.chartData.datasets[0].data = result.data.last7day.map(el=>el.income);
        this.purpleLineChart.chartData.labels = result.data.last7day.map(el=>new Date(el.day).toLocaleDateString('th-TH',{month:'short',day:'2-digit',timeZone:'Asia/Bangkok'}));
        this.purpleLineChart.chartData.datasets[0].data = result.data.last7day.map(el=>el.checkin);
        this.room_check_in = result.data.last7day.filter(el=>new Date(el.day)>firstday).reduce((total,item)=>total+item.checkin,0);
        this.weekly_income = result.data.last7day.filter(el=>new Date(el.day)>firstday).reduce((total,item)=>total+item.income,0);
        this.bookings = result.data.new_booking;
        this.loading = true;
       
      }
 
    })
    },
    getTodayTask(){
      this.newtask_active='color:gray';
      this.todaytask_active='color:black';
      this.today=true;
    },
    getNewTask(){
      this.newtask_active='color:black';
      this.todaytask_active='color:gray';
      this.today=false;
    },
    selectAll(){
      this.checkall = true;
    },
    
  },
 
  beforeDestroy() {
    if (this.$rtl.isRTL) {
      this.i18n.locale = "en";
      this.$rtl.disableRTL();
    }
  },
};
</script>
<style scoped>
.table-full-width{
  max-height: 410px ;
}
.card-category{
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
}
.card-title{
  user-select: none;
  -webkit-user-select: none;
}
.new-task{
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
}
.dropdown-item{
  cursor: pointer;
}
</style>

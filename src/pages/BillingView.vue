<template >
    <div class="content" >
      <div class="row" >
        <div class="col-12" >
          <card type="chart" >
            <template slot="header" v-if="loading">
              <div class="row">
                <div class="col-sm-6" :class="isRTL ? 'text-right' : 'text-left'">
                  <template >
                    <h5 class="card-category">รายได้รายปี</h5>
                </template>
                
                <template>
                    <h2 class="card-title">Financial {{active_year}}</h2>
                    <h4 class="card-category">ประมาณการรายได้รายปี {{ formateCurrency( estimate_yearly_income ) }} บาท รายได้สะสม ณ ปัจจุบัน {{ formateCurrency( yearly_income ) }} บาท </h4>
                
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
      <div class="row" v-if="loading">
        <div class="col-lg-4" :class="{ 'text-right': isRTL }">
          <card type="chart" cardCol>
            <template slot="header">
              <h5 class="card-category">รายได้ 7 วันที่ผ่านมา</h5>
              <h3 class="card-title">
                <i class="tim-icons icon-bell-55 text-primary"></i> {{ formateCurrency( booking7day )}} <small style="color:gray; font-size:small"> บาท</small>
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
          <card type="chart" cardCol v-if="loading">
            <template slot="header">
              <h5 class="card-category">รายได้เดือนนี้</h5>
              <h3 class="card-title">
                <i class="tim-icons icon-wallet-43 text-info"></i> {{ formateCurrency( monthly_income )  }} <small style="color:gray; font-size:small">บาท</small>
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
          <card type="chart" cardCol v-if="loading">
            <template slot="header">
              <h5 class="card-category">รายได้เฉลี่ยต่อ 7 วัน</h5>
              <h3 class="card-title">
                <i class="tim-icons icon-bulb-63 text-success"></i> {{ formateCurrency( everage ) }} <small style="color:gray; font-size:small">บาท/วัน</small>
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
          <card type="tasks" v-if="loading">
            <template slot="header">
              <template v-if="!isRTL">
                <h6 class="new-task title d-inline" :style="this_month_active?'color:gray':'color:black'" @click="setPreviousBillingPeriod" >รอบบิลล่าสุด({{ previous_month_name }})</h6>
              </template>
              <template v-else>
                <h6 class="title d-inline">الشحنات</h6>
              </template>
              <template v-if="!isRTL">
                <p class="card-category d-inline" :style="this_month_active?'color:black':'color:gray'" @click="setLastBillingPeriod">รอบบิลปัจุบัน</p>
              </template>
              
            </template>
            <div v-if="loading" class="table-full-width table-responsive">
              <InvoiceView  :tableData="invoice_view" :total="invoice_view_total"/>
            </div>
          </card>
        </div>
        <div class="col-lg-6 col-md-12">
          <card type="tasks" v-if="loading">
        
              <template slot="header">
                <template>
                  
                  <h6 class="new-task title d-inline" :style="billing_period==='รายวัน'?'color:black':'color:gray' " @click="billing_period='รายวัน'">
                    รายการสรุปรายได้รายวัน({{ bookings.length }})
                  </h6>
                </template>
              <template >
                <p class="card-category d-inline mx-3" :style="billing_period==='รายเดือน'?'color:black':'color:gray'" @click="billing_period='รายเดือน'" >รายเดือน</p>
              </template>
              </template>
          
            <div v-if="loading" class="table-full-width table-responsive mt-1">
            <billing-list :period="billing_period" :tableData="summary"/>
            </div>
          </card>
        </div>
        <div class="col">
          <card type="tasks"> 
            <template slot="header">
              <template>
                <h6 class="text-left text-dark">รายงานการจ่ายค่าห้อง</h6>
              </template>
            </template>
            <PayInSlip/>
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
  import BillingList from "./Billing/BillingList";
  import InvoiceView from "./Billing/InvoiceView.vue";
  import PayInSlip from './Billing/PayInSlip.vue';
  import config from "@/config";
  import store from "@/stores";
  import { Billing } from "@/functions/billingservice";
  
  
  export default {
    setup(){
      const socket = io(process.env.VUE_APP_SOCKET);
      const billingservice = new Billing();

      const formateCurrency = (value) => {
        return new Intl.NumberFormat('th-TH').format(value);
      }

      return {
        store,socket,billingservice,formateCurrency
      }
    },
    components: {
      Card,
      LineChart,
      BarChart,
      BillingList,
      InvoiceView,
      PayInSlip
    },
    data() {
      return {
        hotel_id:null,
        report:null,
        task:0,
        booking7day:0,
        weekly_income:0,
        weekly_data:[],
        monthly_income :0,
        previous_month_name:new Date(new Date().getFullYear(),new Date().getMonth()-1,1).toLocaleDateString('th-TH',{month:'long'}),

        invoice_view:[],
        invoice_view_total:0,

        this_month:[],
        this_month_total:0,
        this_month_active:false,
        previous_month:[],
        previous_month_total:0,
        yearly_income:0,
        estimate_yearly_income:0,
        everage:0,
        bookings:[],
        billing_period:'รายวัน',
        summary:{},
        summary_day:[],
        summary_month:[],
        room_check_in:0,
        today:false,
        checkall:false,
        active_year:new Date().getFullYear(),
        bigLineChartCategories: ["ปีนี้","ปีที่แล้ว"],
        bigLineChartCategoriesAr: ["A","B",],
        bigLineChart: {
          allData: [
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
                label: "รายได้",
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
                label: "รายได้เฉลี่ย",
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
      await this.getSummary();

      this.invoice_view= this.previous_month,
      this.invoice_view_total = this.previous_month_total

  
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
            }
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
        await this.billingservice.getBillingReport(this.hotel_id).then(result=>{

        if(result){
      
          this.bigLineChart.allData[0] = result.this_year.map(el=>el.total);
          this.bigLineChart.allData[1] = result.last_year.map(el=>el.total);
          this.yearly_income = result.this_year.reduce((total,item)=>total+item.total,0);

          //estimate yearly income
          this. estimate_yearly_income = result.this_year_estimate.reduce((total,item)=>total+item.total,0);

          //this month
          this.this_month = result.lastmonth_billing;
          this.this_month_total = result.lastmonth_billing.reduce((total,item)=>total+item.total_cost,0)
 
          //previous month
          this.previous_month = result.previous_month;
          this.previous_month_total = this.previous_month.reduce((total,item)=>total+item.total_cost,0)
          
          //last 7 days
          this.greenLineChart.chartData.labels=result.last7day.map(el=>new Date(el.date).toLocaleDateString('th-TH',{day:'2-digit',month:'2-digit'})).reverse();
          this.greenLineChart.chartData.datasets[0].data = result.last7day.map(el=>el.income).reverse();
          this.booking7day = result.last7day.reduce((accumulator, currentValue) => accumulator + currentValue.income,0);
          this.weekly_data = result.last7day;
  
          //blue chart

          this.blueBarChart.chartData.labels = result.lastmonth.map(el=>new Date(el.date).toLocaleDateString('th-TH',{day:'2-digit'}));
          this.blueBarChart.chartData.datasets[0].data = result.lastmonth.map(el=>el.income);
          this.monthly_income = result.lastmonth.reduce((total,item)=>total+item.income,0);

          //7 day everage


          this.purpleLineChart.chartData.labels = result.movingeverage.map(el=>new Date(el.date).toLocaleDateString('th-TH',{weekday:'short',day:'2-digit'}));
          this.purpleLineChart.chartData.datasets[0].data = result.movingeverage.map(el=>el.moving_everage.toFixed(0));
          this.everage = result.movingeverage[result.movingeverage.length-1].moving_everage.toFixed(0)
        

          this.loading = true;
         
        }
   
      })
      },
      async getSummary(){
        await this.billingservice.getBillingSummary(this.hotel_id).then(result=>{
  
          if(result){
        
            this.summary=result;

       
          }
        })
      },
      setLastBillingPeriod(){
        this.invoice_view = this.this_month;
        this.invoice_view_total = this.this_month_total;
        this.this_month_active=true;
      },
      setPreviousBillingPeriod(){
      this.invoice_view = this.previous_month;
        this.invoice_view_total = this.previous_month_total;
        this.this_month_active=false;
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
    height: 410px !important;
  }
  .card-category{
    cursor: pointer;
  }
  .new-task{
    cursor: pointer;
  }
  .dropdown-item{
    cursor: pointer;
  }
  </style>
  
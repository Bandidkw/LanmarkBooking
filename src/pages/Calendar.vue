<template>
    <div class="content">
        <div class="row">
            <div class="col-12">
                <card >
                    <template slot="header">
                        <template>
                            
                            <h5 class="card-category">ตารางโควต้า</h5>
                        </template>
                        
                        <template>
                            <h2 class="card-title">Calendar  {{active_year}}</h2>
                            <h4>{{ active_month }}
                            
                            </h4>
                        </template>
                 
                <div class="row w-100">
                    <div class="col">
                        <drop-down tag="div">
     <base-button type="primary" aria-label="Primary" data-toggle="dropdown" size="sm" >
      <i class="tim-icons icon-calendar-60" ></i> ปฏิทิน
     </base-button>
     <ul class="dropdown-menu">
       <li  class="dropdown-item pointer" @click="setThisYear">ปีนี้</li>
       <li  class="dropdown-item pointer" @click="setNextYear">ปีถัดไป</li>
       <div class="dropdown-divider "></div>
       <li  class="dropdown-item pointer" @click="reset">เริ่มใหม่</li>
     </ul>
   </drop-down>
                        
                    </div>
                    <div class="col ">
                        <div class="right">
                         
                            <base-button type="info" size="sm"  @click="backMonth">กลับเดือนก่อนหน้า</base-button>
                            <base-button type="primary" size="sm"  @click="nextMonth">ไปเดือนถัดไป</base-button>
                        </div>
          
                    </div>
                </div>
                
           
                    </template>
                    <template slot="raw-content">

                        <div class="scheduler mt-3">
          <div>
            <div class="nav">
              <!-- scheduler -->
              <div class="table-scheduler">
                        <table class="table">
                            <thead>
                            
                                <tr>

                                    <th class="caption" scope="col" >Rooms Type \ วันที่</th>
                                    <th  
                                    v-for="(item,index) in period" :key="index"
                                    :style="dateFormat2(item.date) === dateFormat2(Date.now())?'background-color:red;color:white':null"
                                    
                                    >{{ dateFormat(item.date) }}</th>
                                </tr>
                                    
                            </thead>
                            <tbody>
                                <tr v-for="(id,index) in calendar" :key="index">

                                <th scope="row" class="caption">{{ id.id }}</th>
                                <td  v-for="(item,index) in id.collection" :key="index">
                                    <p class="quota" :style="item.remainding_quota<=0?full_style:null">

                                        {{ checkFullQuota(item.remainding_quota ) }}
                                    </p>
                                </td>
                              

                                </tr>

                            </tbody>
                        </table>
                        </div>
                        </div>
                        </div>
                        <blockquote class="blockquote text-left">
  <p class="mb-0 ">รายละเอียดตาราง</p>
  <footer class="blockquote-footer">F <cite title="Source Title">ยอดจองเต็ม</cite></footer>
  <footer class="blockquote-footer">10 <cite title="Source Title">ยอดโควต้าคงเหลือ 10 ห้อง</cite></footer>
</blockquote>
                        </div>

                    </template>
              
          
                </card>
            </div>
        </div>
    </div>
</template>
<script>
 import { io } from "socket.io-client";
import { Card } from "@/components/index";
import { Calendar } from "@/functions/calendarservice";

export default {
    setup(){
        const socket = io(process.env.VUE_APP_SOCKET);
        const calendarservice=new Calendar();

        const dateFormat = (date) => {
            return new Date(date).toLocaleDateString('th-TH',{day:'2-digit'})
        }
        //dd/mm/yyyy
        const dateFormat2 = (date) => {
            return new Date(date).toLocaleDateString('th-TH',{day:'2-digit',month:'2-digit',year:'numeric'})
        }

        const checkFullQuota = (quota) =>{
            if(quota<=0){
                return 'F';
            }
            else{
                return quota;
            }
        }

        return {
            calendarservice,dateFormat,socket,checkFullQuota,dateFormat2
        }
    },
    components: {
        Card
    },
    created(){

        this.selected_month= new Date().getMonth();
        this.selected_year= new Date().getFullYear();
        this.active_year = this.selected_year;
        this.setActiveMonth();
        this.socket.on('newbooking',async (data)=>{
 
          console.log(data);
          await this.getCalendar();
        
      })
    },
    data(){
        return {
            active_year: new Date().getFullYear(),
            active_month: '',
            selected_month:0,
            selected_year:0,
            calendar:[],
            period:[],
            full_style:'background:var(--success)',
        }
    },
    computed:{

    },
    async mounted(){
        
        await this.getCalendar()
    },
    methods:{
        async getCalendar(){
            await this.calendarservice.getCalendar(this.selected_year,this.selected_month).then(result=>{
                if(result && result.status==='ok'){

                    this.calendar=result.data;
                    this.period = result.data[0].collection;
                    this.setActiveMonth();
                 
                }
            })
        },
        setActiveMonth(){
            this.active_month = new Date(this.selected_year,this.selected_month,1).toLocaleDateString('th-TH',{month:'long'});
        },
        async nextMonth(){
            this.selected_month=this.selected_month+1;
            if(this.selected_month>=12){
                this.selected_month = 0;
            }
            await this.getCalendar();

        },
        async backMonth(){
            this.selected_month=this.selected_month-1;
            if(this.selected_month<0){
                this.selected_month = 11;
            }
            await this.getCalendar();
        },
        async setThisYear(){
            console.log("setThisYear:");
            this.selected_year=new Date().getFullYear();
            this.active_year  = this.selected_year;
            await this.getCalendar();
        },
        async setNextYear(){
            console.log("setNextYear");
            this.selected_year=this.active_year+1;
            this.active_year = this.selected_year;
            await this.getCalendar();
            console.log(this.selected_year);
        },
        async reset(){
            console.log("reset");
            this.selected_year=new Date().getFullYear();
            this.active_year=this.selected_year;
            await this.getCalendar();
        }
        
    }
}
</script>
<style scoped>
.pointer{
    cursor: pointer;
}
.pointer:hover{
    background-color: var(--primary);
    color:white;
}
.card{
    overflow: hidden;
    padding: 1rem;
}
.scheduler {
  width: 100%;
  overflow-y: auto;
  overflow-x: auto;
}

.nav {
  display: flex;
  width: 100%;
}
.table-scheduler {

  width: 100%;
}

.table{
    width: 100%;
}
.caption {
  text-align: left;
  background-color: white;
  color: black;
  width: 10rem;
  height: 100%;
  padding: 0.5rem 1rem 0.5rem 1rem;
  position: sticky;
  left: 0;
  z-index: 2;
}
.right{
    float: right;
}
.row{
    padding: 0;
    margin: 0;
}
.col{
    padding: 0;
}
.quota{
    color:gray;
    border-radius: 0.3rem;
    
}
.quota:hover{
    background-color: aquamarine;
    cursor: pointer;
}
</style>
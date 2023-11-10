<template>
    <base-table :data="checkinState" thead-classes="text-primary">
      <template slot-scope="{ row }">
        <td class="text-left">
          <p class="title">{{ row.customer_name}}</p>
          <p>วันที่ต้องการเช็คอิน {{ dateformat(row.date_from) }} วันที่ต้องการเช็คเอาท์ {{ dateformat(row.date_to) }}</p>
          <p class="text-muted">{{dateformat(row.createdAt) }} </p>
        </td>
        <td class="text-left">
            <base-button :type="setBtn" size="sm" @click="$router.push(`/bookingdetail/${row._id}`)">{{ tab }}</base-button>
        </td>  
      </template>
      <template #empty>
       <p>ไม่มีรายการคงค้าง</p>
      </template>
    </base-table>
  </template>
  <script>
  import {BaseTable} from "@/components/index"
  export default {
    setup(){

       const dateformat = (date) =>{
           return new Date(date).toLocaleDateString('th-TH',{year:'2-digit',month:'2-digit',day:'2-digit'});

        }
        return{
            dateformat
        }
    },
    components:{
        BaseTable
    },
    props:{
        bookings:Array,
        tab:String,
    },
    data(){
      return {
        btn:'primary'
      }
    },
   
    computed:{
      checkinState(){
        switch (this.tab) {
          case "รอโรงแรมรับการจอง":       
           return this.bookings.filter(el=>el.status[el.status.length-1].name==='รอโรงแรมรับการจอง')

            case "เช็คอินวันนี้":
            
            return this.bookings.filter(el=>el.status[el.status.length-1].name !=='เช็คอิน' && new Date(el.date_from).toLocaleDateString('th-TH',{year:'numeric',month:'2-digit',day:'2-digit'})===new Date().toLocaleDateString('th-TH',{year:'numeric',month:'2-digit',day:'2-digit'}))

            case "เช็คเอาท์วันนี้":
            
            return this.bookings.filter(el=>new Date(el.date_to).toLocaleDateString('th-TH',{year:'numeric',month:'2-digit',day:'2-digit'}) === new Date().toLocaleDateString('th-TH',{year:'numeric',month:'2-digit',day:'2-digit'}) && el.status[el.status.length-1].name !=='เช็คเอาท์' )
        
          default:
            return this.bookings.filter(el=>el.status[el.status.length-1].name==='รอโรงแรมรับการจอง')
        }
      },
      setBtn(){
        switch (this.tab) {
          case "รอโรงแรมรับการจอง":       
          return 'primary'
           

            case "เช็คอินวันนี้":
            
            return'info'

           
            case "เช็คเอาท์วันนี้":
            
            return 'danger'
        
            
          default:
            return 'primary'
        }
      }
    },
    
  };
  </script>
  <style></style>
  
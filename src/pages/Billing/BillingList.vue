<template>
    <base-table :data="BillingPeriod" :columns="columns" thead-classes="text-primary">
    <template slot="columns">
        
          <th class="text-left">วันที่</th>
          <th class="text-center">รายละเอียด</th>
          <th class="text-right">รายได้(บาท)</th>
        
        </template>  
      <template slot-scope="{ row }">
        

          <td class="text-left">
            <p>{{ row.month?row.month: formateDate(row.date) }}</p>
          </td>
          <td class="text-center">
            <p v-for="(item,index) in row.booking" :key="index"> <small> ( {{ item.ref_number }} ราคา {{ formateCurrency( item.total ) }} บาท ) </small></p>
          </td>
          <td class="text-right">{{ formateCurrency( row.total ) }}</td>
      
       
      </template>
    </base-table>
  </template>
  <script>


  import BaseTable from "@/components/BaseTable";


  export default {
    setup(){
    
      const formateDate = (date) =>{
        return new Date(date).toLocaleDateString('th-TH',{year:'numeric',month:'long',day:'2-digit'})
      }

      const formateCurrency = (value) => {
        return new Intl.NumberFormat('th-TH').format(value);
      }
      return {
        formateDate,formateCurrency
      }
    },
    components: {
 
      BaseTable,

    },
    props:{
      period:String,
      tableData:Object
    },
    data(){
      return {
        columns: ["วันที่","รายละเอียด","รายได้",],
        monthly:[],
      }
    },

    created(){
       
      },
  
    computed: {
     BillingPeriod(){
      switch (this.period) {
        case 'รายวัน':

          return this.tableData.period_day
        case 'รายเดือน':

        return this.tableData.period_month;

        default:
          return this.tableData.period_day
      }
     }
     
    },
    async mounted(){
   
    },
    methods:{
        createMonlhly(){
          const this_year = this.tableData.filter(el=>new Date(el.date).getFullYear() === new Date().getFullYear());
          const collection = [];

          const ML = [ 
            "มกราคม", 
            "กุมภาพันธ์", 
            "มีนาคม",
            "เมษายน",
            "พฤษภาคม",
            "มิถุนายน",
            "กรกฎาคม",
            "สิงหาคม",
            "กันยายน",
            "ตุลาคม",
            "พฤศจิกายน",
            "ธันวาคม"
        ];

          for ( let i = 0 ; i< 11 ; i++){
           collection.push({month:ML[i],booking:this_year.filter(el=> new Date(el.date).getMonth() === i).booking})
          }

          console.log(collection);

          return collection;
        }
      }
   
  };
  </script>
  <style scoped>
   li{
    list-style: none;
   }
  </style>
  
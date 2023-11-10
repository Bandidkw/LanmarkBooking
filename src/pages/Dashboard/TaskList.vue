<template>
    <base-table :data="tableData" thead-classes="text-primary">
    <template slot-scope="{ row }">
      <td>
        <base-checkbox v-model="row.selected" name="selected"> </base-checkbox>
      </td>
      <td class="text-left">
        <p class="title" :style="row.done?'color:gray':null">{{ row.title }}</p>
        <p class="text-muted">{{ row.subtitle }} เมื่อเวลา 
          {{ new Date(row.createdAt).toLocaleDateString('th-TH',{year:'numeric',month:'short',day:'2-digit',hour:'numeric',minute:'numeric',second:'numeric'}) }}</p>
        </td>
        <td class="td-actions text-right">
        <drop-down>

          <base-button type="link" artia-label="edit button">
          <i class="tim-icons icon-pencil"></i>
        </base-button>
        <ul class="dropdown-menu dropdown-menu-right">
          <li class="dropdown-item" @click="readTask(row._id)">บันทึกว่าอ่านแล้ว</li>
          <li class="dropdown-item" @click="deleteTask(row._id)">ลบ</li>
        </ul>
      </drop-down>
      
    </td>
  </template>
</base-table>

</template>
<script>
  import { io } from "socket.io-client";
import BaseButton from "@/components/BaseButton";
import BaseTable from "@/components/BaseTable";
import BaseCheckbox from "@/components/BaseCheckbox";
import {Report} from "@/functions/reportservice";
import store from "@/stores"

export default {
  setup(){

    const socket = io(process.env.VUE_APP_SOCKET);
    const reportservice = new Report();
    return {
      reportservice,store,socket
    }
  },
  components: {
    BaseButton,
    BaseTable,
    BaseCheckbox,
  },
  props:{
    today:Boolean,
    checkall:Boolean,
  },
  data(){
    return {
      
      hotel_id:null,
      tasks:[],
      selected:[],
    }
  },
  emits: ['task','selected'],
  created(){
      this.socket.on('newtask',async ()=>{

        await this.getTask();
        
      });
    },
  computed: {

    tableData() {

      if(this.today){

        return this.tasks.filter(el=>new Date(el.createdAt).toLocaleDateString('th-TH',{year:'numeric',month:'2-digit',day:'numeric'})===new Date().toLocaleDateString('th-TH',{year:'numeric',month:'2-digit',day:'numeric'}))
      }else{
        return this.tasks
      }
    },

   
   
  },
  async mounted(){
    this.hotel_id = this.store.state.user.service_id
    await this.getTask();
  },
  methods:{
    async getTask(){
      await this.reportservice.getTask(this.hotel_id).then(result=>{
      
      this.tasks = result.data.reverse();
      this.$emit('task',result.data.filter(el=>el.done===false ).length);
    })
    },
    async deleteTask(id){
      await this.reportservice.deleteTask(this.hotel_id,id).then(()=>{
       
      });
    },
    async readTask(id){
      await this.reportservice.doneTask(this.hotel_id,id).then(()=>{
        
      });
    },
    check(){
      console.log(this.tasks.filter(el=>el.selected===true));
    }
  }
};
</script>
<style scoped>
 li{
  list-style: none;
 }
 .dropdown-item{
  cursor: pointer;
 }
</style>

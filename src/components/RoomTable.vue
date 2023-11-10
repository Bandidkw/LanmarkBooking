<!-- eslint-disable prettier/prettier -->
<template>
  <div>
    
    <table class="table tablesorter" :class="tableClass">
      <thead :class="theadClasses">
        <tr>
          <slot name="columns">
            <th v-for="column in columns" :key="column">{{ column }}</th>
          </slot>
        </tr>
      </thead>

      <tbody :class="tbodyClasses">
        <tr v-for="(item, index) in data" :id="`room-${item._id}`" :key="index" v-on:click="rowClick(item._id)">
          <template>
            <slot :row="item">
              <td>
                {{ item.type.name_th}}
              </td>
              <td>
                {{ item.bed_type.name }}
              </td>
              <td>
                {{ item.price }}
              </td>
              <td>
                {{ item.max_person }}
              </td>
              <td>
                {{ item.quota }}
              </td>
              <td>
              {{ item.status.name }}
            </td>
            <td>
              <base-button type="info" @click="$router.push(`/updateroom/${item._id}`)">แก้ไข</base-button>
            </td>
          </slot>
        
        </template>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<!-- eslint-disable prettier/prettier -->
<script>
import {Room} from "@/functions/roomservice"
export default {
  setup(){
    const room = new Room();
    return {
      room
    }
  },
  name: "room-table",

  props: {
    tableClass: {
      type: String,
      default: "",
    },
    theadClasses: {
      type: String,
      default: "",
    },
    tbodyClasses: {
      type: String,
      default: "",
    },
    data: {
      type: Array,
      default: () => [],
    },
    columns: {
      type: Array,
      default: () => [],
    },
    hotel:String
  },
  methods:{
    async deleteRoom(id){
     
      this.room.deleteRoom(id).then(result => {
        if(result){

          this.$router.push('/roommanager');
        }

      })
    },
    rowClick(id){
      this.$router.push(`/createroomcompleted/${this.hotel}?id=${id}`)
    }
  }
};
</script>

<style scoped>
button {
  background-color: #00f2c3;
  padding: 0.5rem;
  color: white;
  border: none;
  border-radius: 0.2rem;
}
table > tbody > tr:hover {
  cursor: pointer;
  background-color: rgb(238, 238, 238);
}
</style>

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
                <tr v-for="(item, index) in data" :id="`room-${item.room_number}`" :key="index"
                    v-on:click="rowClick(item.booking_id)">
                    <template>
                        <slot :row="item">
                            <td>
                                {{ dateFormat(item.date) }}
                            </td>
                            <td>
                                {{ dateFormat(item.check_in_date) }}
                            </td>
                            <td>
                                {{ dateFormat(item.check_out_date) }}
                            </td>
                            <td>
                                {{ item.ref_number }}
                            </td>
                            <td>
                                {{ item.customer_name }}
                            </td>
       
                            <td>
                                {{ format(item.total_price) }}
                            </td>
                            
                            <td>
                                {{ format(item.total_cost) }}
                            </td>
                            <td>
                                <div class="px-2 text-white rounded" :style="`background-color:${setColor(item.status[item.status.length-1].name)};width:fit-content`">

                                    {{ item.status[item.status.length-1].name }}
                                </div>
                            </td>


                            <td>
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
import { Room } from "@/functions/roomservice"
import format from '@/functions/format';

export default {
    setup() {
        const room = new Room();

        function dateFormat(date) {
            return new Date(date).toLocaleDateString();
        }

        return {
            room, dateFormat,format
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
    },
    data() {
        return {
          
        }
    },
    methods: {

        rowClick(id) {
            this.$router.push(`/bookingdetail/${id}`)
        },
        setColor(status){
            switch (status) {
                case 'รอโรงแรมรับการจอง':
                    
                    return 'var(--info)'
                    case 'จองแล้ว':
                    
                    return 'var(--primary)'

                    case 'เช็คอิน':
                    
                    return 'var(--success)'

                    case 'เช็คเอาท์':
                    
                    return 'gray'

                    case 'โรงแรมปฏิเสธการจอง':
                    
                    return 'var(--danger)'
            
                default:
                    break;
            }
        }
       
    },
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

table>tbody>tr:hover {
    cursor: pointer;
    background-color: rgb(238, 238, 238);
}
</style>
  
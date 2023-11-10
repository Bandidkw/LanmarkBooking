<template>
    <div class="content">
        <div class="row">
            <div class="col-12">
                <Card>
                    <template slot="header">
                        <h2>รายละเอียดการโอน</h2>
                        <p>
                            <ul>
                                <li>
                                    วันที่ : {{ dateFormat(payment_detail.createdAt) }}
                                </li>
                                <li>
                                    เลขที่ใบโอน : {{ payment_detail.payment_number}}
                                </li>
                                <li>
                                    สถาณะ : {{  payment_detail.payment_status }}
                                </li>
                            </ul>
                        </p>
                    </template>
                    <base-table  :data="payment_detail.detail" :columns="columns" thead-classes="text-primary">
                    <template slot="column">
                        <th v-for="(item,index) in columns"  :key="index">{{ item }}</th>

                    </template>
                    <template slot-scope="{row}">
                        <td class="text-left">{{ dateFormat(row.check_out_date) }}</td>
                        <td>{{ row.ref_number }}</td>
                        <td>{{ format(row.total) }}</td>
                    </template>
                    <template #summary>
                        <td></td>
                        <td></td>
                        <td >

                            ยอดรวมทั้งหมด {{ format(payment_detail.total_amount) }} บาท
                        </td>
                    </template>
                </base-table>
                <div class="text-left">
                    <h5 class="text-left">รูปสลิปเงินโอน</h5>
                    <base-button link style="max-width:250px">
                        <a :href="`https://drive.google.com/uc?export=view&id=${payment_detail.slip_image}`" target="_blank" >

                            <img class="image-main mb-2" :src="payment_detail.slip_image?`https://drive.google.com/uc?export=view&id=${payment_detail.slip_image}`:null" />
                        </a>
                    </base-button>
                </div>
                </Card>
            </div>
        </div>
    </div>
</template>
<script>
import {Card} from "@/components/index";
import {Payment} from "@/functions/paymentservice";
import BaseTable from "@/components/BaseTable";
import format from "@/functions/format";

export default {
setup(){

    const paymentservice = new Payment();
    const dateFormat = (date) => {
        return new Date(date).toLocaleDateString('th-TH',{year:'numeric',month:'long',day:'2-digit'})
    }

    return {
        paymentservice,dateFormat,format
    }
    
},
    components: {
        Card,BaseTable
    },
    data(){
        return{

            payment_number:'',
            payment_detail:{},
            columns:['วันที่เช็คเอาท์','Ref Number','รวม(บาท)'],
            
        }
    },
    async mounted(){
        this.payment_number = this.$route.params.id;
        await this.getPaymens();
    },
    methods: {
        async getPaymens(){
            await this.paymentservice.getPaymentSlipByPaymentNumber(this.payment_number).then(result => {
                
                if(result.status === true){

                    this.payment_detail = result.data;
                }
            })
    }
}
}
</script>  
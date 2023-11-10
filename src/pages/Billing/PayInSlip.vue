<template>
    <div>
        
        <base-table :data="payins" :columns="columns" thead-classes="text-primary">
        <template #column>
            <th v-for="(item,index) in columns" :key="index">{{ item }}</th>
           
        </template>
        <template slot-scope="{ row }">
            <td>{{ dateFormat(row.createdAt) }}</td>
            <td>{{ row.payment_number }}</td>
            <td>{{ format(row.total_amount) }}</td>
            <td>
                <base-button link tag="a" :href="`https://drive.google.com/uc?export=view&id=${row.slip_image}`" target="_blank"><i class="tim-icons icon-image-02 text-success"></i></base-button>
            </td>
            <td>
                <base-button link @click="PaymentDetail(row.payment_number)" ><i class="tim-icons icon-notes text-info"></i></base-button>
            </td>
        </template>
    </base-table>
    </div>
</template>
<script>
  import BaseTable from "@/components/BaseTable";
  import { Payment } from "@/functions/paymentservice";
  import  format from "@/functions/format";

  export default {
    setup(){
        const paymentservice = new Payment();
        const dateFormat = (date) =>{
            return new Date(date).toLocaleDateString('th-TH',{year:'numeric',month:'long',day:'2-digit'})
        }
        return {
            paymentservice,format,dateFormat
        }
    },
    components:{
        BaseTable
    },
    data(){
        return {
            payins:null,
            columns:['วันที่','หมายเลข','ราคารวม(บาท)','รูปสลิปใบโอน','รายละเอียด']
        }
    },
    async mounted(){
        await this.getPayinSlip();
    },
    methods:{
        async getPayinSlip(){
            await this.paymentservice.getPaymentSlip().then(result=>{
        
                if(result.status === true){

                    this.payins=result.data
                }
            })
        },
        PaymentDetail(id){
            this.$router.push(`/payment/${id}`)
        }
    }
  }
</script>
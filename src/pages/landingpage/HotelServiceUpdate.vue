<template>
    <div class="card text-left px-5 py-5">
        <h2>แก้ไขบริการของท่าน</h2>
        <base-input label="บริการ">
        <select class="form-control">
            <option selected>บริการห้องพัก</option>
        </select>
    
    </base-input>

        <UpdateHotelService/>
       

        </div>
</template>
<script>
import {BaseInput} from "@/components/index";
import UpdateHotelService from "@/pages/landingpage/hotel/UpdateHotelService.vue";
export default {
    components:{
        BaseInput,UpdateHotelService
    },
    methods:{
       
    }
}
</script>

<style scoped>
.card{
    display: flex;
    margin-top: 1rem;
    width: 100%;
    max-width: 450px;
    justify-content: center;

    
}

@media screen and (max-width:450px){
    .card{
        margin: 0;
        min-height: calc(100vh - 70px);
        border-radius: 0;
    border-top:solid 3px var(--primary);
    }
}

</style>
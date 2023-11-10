<template>
    <div class="card py-5 px-5">
        <div class="content text-left">
            <h3>ลืมรหัสผ่าน</h3>
            <p>กรุณากรอกที่อยู่อีเมลล์ที่ได้ให้ไว้ก่อนหน้า</p>
            <base-input class="mt-3" label="Email" type="email"/>
            <base-button class="mt-3" type="primary">เปลี่ยนรหัสผ่าน</base-button>
        </div>
        
    </div>
</template>

<script>
import { BaseInput} from "@/components/index"

export default {
    components:{
        BaseInput
    }
}
</script>

<style scoped>
.card{
    max-width: 450px !important;
}
.content{
    align-items: center;
    width: 100%;
}
@media screen and (max-width:450px){
    .card{
        margin: 0;
        min-height: calc(100vh - 70px);
        border-radius: 0;
        border-top:solid 3px var(--primary);
        align-items: center;
    }
}
</style>
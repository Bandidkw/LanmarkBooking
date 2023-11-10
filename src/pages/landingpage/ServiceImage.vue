-<template>
    <div class="card text-left px-5 py-5 mt-3">
        <h2>เพิ่มรูปภาพของสถานบริการ</h2>
       <base-input class="image-upload mb-3" style="background-color: aqua; height: 10rem;" type="file">
        <div><i class="tim-icons icon-image-02"></i></div>
        </base-input>
        <base-button type="primary" @click="pinMap">อัพโหลดรูป</base-button>
        <base-button link @click="pinMap">ข้าม</base-button>
        

        </div>
</template>
<script>
import {BaseInput} from '@/components/index';

export default {

    components:{
       BaseInput
    },
    methods:{
        pinMap(){
            this.$router.push('/landingpage/service-image');
        }
    }
}
</script>

<style scoped>
.card{
    display: flex;
    width: 100%;
    max-width: 450px;
    justify-content: center;
}

.image-upload{
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.5rem;
}

.icon-image-02{
    color: white;
    font-size: 2rem;
}

</style>
<template>
    <div class="card text-left px-5 py-5 mt-3">
        <h2>กำหนดพิกัดของสถานบริการ</h2>
       
        <base-button type="primary" @click="pinMap">กำหนดพิกัด</base-button>

        </div>
</template>
<script>

export default {
    components:{
       
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

</style>
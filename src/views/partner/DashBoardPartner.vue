<template>
    <div class="grid px-10 mt-3">
      <div class="col-12 lg:col-12 border">
        <center><h1>DashBoard Partner</h1></center>
      </div>
    </div>
  <Dialog v-model:visible="sidebar" header="สัญญาการใช้งาน lanmark ของ partner" modal :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
      <div class="grid mt-2 " style="border: 1px solid #ccc;">
        <div class="col-12 md:col-12 text-center">
          <h2>สัญญาการใช้งาน lanmark ของ partner</h2>
        </div>
        <div class="col-12 md:col-12">
           ................................
           ................................
        </div>
      </div>
      <div class="grid mt-5"> 
        <div class="col-12 md:col-12 text-center">
            <Button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mx-2 boeder-none" @click="approve()">คุณยินยอมสัญญา</Button>
            <Button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" @click="unapprove()">ไม่ยืนยันสัญญา</Button>
        </div>
      </div>
  </Dialog>
</template>

<script>

export default {
  name: 'DashboardPartner',
  data(){
    return {sidebar: true}
  }
  ,methods:{
     async approve(){
        this.sidebar= false
     },
     async unapprove (){
        localStorage.clear();
        this.$store.commit("setLoginDefault");
        this.$router.push("/");
     }
  }
  };
</script>

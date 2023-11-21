<template>
  <Button @click="getdata" class="hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-2" style="background-color: #ff7315" :label="title" :loading="loading" />

  <!--eslint-disable-next-line vue/no-multiple-template-root -->
  <Dialog v-model:visible="sidebar" modal :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }" >
    <div class="grid">
      <div class="col-12 text-center">
        <h2>แก้ไขข้อมูล admin</h2>
      </div>
    </div>
    <div class="grid">
      <div class="col-12 md:col-12">
          <form class="">
            <div class="col-12">
                <p>เบอร์โทรศัพท์ :  </p>
                <InputText v-model="telephone" name="telephone" placeholder="000-0000-00000" class="w-full" />
            </div>
            <div class="col-12">
                <p>password :(ถ้าไม่ได้ต้องแก้ไม่ต้องใส่)</p>
                <InputText type="password"  class="w-full"  v-model="password" name="password" placeholder="*****" />
            </div>
            <div class="col-12">
                <p> ชื่อ :</p>
                <InputText v-model="name" name="name" placeholder="กรุณากรอกชื่อ" class="w-full" />
            </div>
          </form>
      </div>
    </div>
    <div class="grid">
            <div class="col-12 text-center mt-2">
                <Button label="แก้ไข" @click="editadmin" />
            </div>
        </div>
  </Dialog>
</template>

<script>
import Swal from "sweetalert2";
import axios from 'axios';
export default {
  props: {
    shop_id: String,
    data: Object,
    title: String,
  },
  data: () => ({
    loading: false,
    sidebar: false,
    telephone:'',
    password:'',
    name:'',
  }),
  methods: {
    async getdata() {
      const id = this.data._id;
      this.sidebar = true;
      try{
        const res = await axios.get(`${process.env.VUE_APP_API}admin/${id}`,
          {headers: {token: localStorage.getItem("token"),},}
        );
        this.telephone =res?.data?.data?.telephone
        this.name = res?.data?.data?.name
        
      }catch(error){
        console.log(error)
      }

    },
    async editadmin(){
      if (this.telephone === null || this.telephone === "" ||this.name ==="") {
        this.sidebar = false;
        await Swal.fire({
            icon: "error",
            title: "กรอกข้อมูลไม่ครบ",
            text: "กรุณากรอกข้อมูลให้ครบ",
          });
          this.sidebar = true;
      }else{
        try {
          const id = this.data._id;
          const res = await axios.put(`${process.env.VUE_APP_API}admin/${id}`, {
            telephone: this.telephone,
            password: this.password,
            name:this.name,
            roles:"admin",
            level:"1"
          },{
            headers: {
              token: localStorage.getItem("token"),
            },
          });
          if (res.data) {
            this.sidebar = false;
          await Swal.fire({
            icon: "success",
            title: "แก้ไขข้อมูลสำเร็จ",
            text: "ข้อมูลแก้ไขข้อมูลเรียบร้อย",
          });
          
          } else {
            this.sidebar = false;
            await Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาด",
            text: "ไม่สามารถแก้ไขข้อมูลได้",
          });
          this.sidebar = true;
          }
        }catch(error){
          this.sidebar = false;
            await Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาด",
            text: "ไม่สามารถแก้ไขข้อมูลได้",
          });
          this.sidebar = true;
        }
      }
    }
  }
};

</script>

<style scoped>
  @import "tailwindcss/base";
  @import "tailwindcss/components";
  @import "tailwindcss/utilities";

  @import "@/../node_modules/primeflex/primeflex.css";
</style>
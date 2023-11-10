<template>
    <div class="card text-left px-5 py-5">
        <h2>เข้าสู่ระบบเพื่อลงทะเบียนการให้บริการ</h2>
        <base-input v-model="user.username" type="text" label="เบอร์โทรศัทพ์"/>
        <base-input v-model="user.password" :type="togglePassword()" label="รหัสผ่าน"/>
        <base-checkbox v-model="password_visible">แสดงรหัสผ่าน</base-checkbox>
        <base-button class="mt-3" type="primary" @click="firstLogin">เข้าสู่ระบบ</base-button>
        <small v-if="error" class="error-text mt-3">รหัสผ่านหรือเบอร์โทรศัทพ์ไม่ถูกต้อง</small>
        <!-- <small class="mt-2">ลืมรหัสผ่าน <span style="color:red"><router-link to="/landingpage/forgetpassword">สร้างใหม่</router-link></span></small> -->

        </div>
</template>
<script>
import {BaseInput} from "@/components/index";
import { User } from "@/functions/userservice";

export default {
    setup(){
        const userservice = new User();
        return {
            userservice
        }
    },
    components:{
        BaseInput
    },
    data(){
        return {
            user:{
                username:null,
                password:null
            },
            password_visible:false,
            error:false
        }
    },
    methods:{
       async firstLogin(){
            if(this.user.username===null || this.user.username==='' || this.user.password===null || this.user.password===''){
                this.error=true;
            }
            else{

              await this.userservice.SignIn(this.user).then(result=>{
                    if(result.status === true){
             
                        localStorage.setItem('token',result.accessToken);

                        this.$router.push('/landingpage/create-service/hotel-service');
                    }
                    else{
                        this.error=true;
                    }
                })
            }
        },
        togglePassword(){
            return this.password_visible?"text":"password";
        }
    }
}
</script>

<style scoped>
.card{
    display: flex;
    width: 100%;
    max-width: 400px !important;
    justify-content: center;
}
.error-text{
    color: red;
}

@media screen and (max-width:450px){
    .card{
        margin: 0;
        min-height: calc(100vh - 70px);
        border-radius:0 ;
        border-top:solid 3px var(--primary);
    }
}

</style>
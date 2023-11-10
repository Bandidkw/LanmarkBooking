<template>
    <div class="card text-left px-5 py-5 ">
        <h2>เข้าสู่ระบบ</h2>
        <base-input v-model="user.username" type="text" label="เบอร์โทรศัพท์"/>
        <base-input v-model="user.password" :type="togglePassword()" label="รหัสผ่าน"/>
        <base-checkbox v-model="password_visible ">แสดงรหัสผ่าน</base-checkbox>
        <base-button type="primary" @click="firstLogin">เข้าสู่ระบบ</base-button>
        <err-font v-if="error" class="err-font mt-3">รหัสผ่านหรือเบอร์โทรศัพท์ไม่ถูกต้อง</err-font>
        <small class="mt-2 sm-text">ลืมรหัสผ่าน <span style="color:red"><router-link to="/landingpage/createaccount">สร้างใหม่</router-link></span></small>
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

               await this.userservice.SignIn(this.user).then(async (result)=>{

                    if(result.status === true){
                      localStorage.setItem('token',result.accessToken);
                      await this.userservice.Me().then(result=>{
                        if(result){
                            
                            this.$router.push('/dashboard');
                        }
                      })
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
    margin-top: 10rem;
    border-radius: 20px;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    width: 100%;
    max-width: 450px;
    justify-content: center;
}
.form-control{
    background-color: lightblue;
}
.card h2{
    color: #fff;
}
.card input
.card base-input[label]{
    font-size: 1.5rem;
}
/* .btn-login{
    cursor: pointer;
    height: 2.5rem;
    border: none;
    border-radius: 10px;
    color: #fff;
    background-color: #e14eca;
    transition: 0.2s;
} */
/* .btn-login:hover{
    transform: scale(1.05);
} */
.sm-text{
    color: #fff;
}
.check-pass{
    color: #fff;
    border: #fff 1px solid;
}
@media screen and (max-width:450px){
    .card{
        margin: 0;
        min-height: calc(100vh - 56px);
        border-radius: 0;
        border-top:solid 3px var(--primary) ;

    }
}

</style>
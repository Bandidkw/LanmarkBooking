<template>
    <div class="card text-left px-4 py-4">
    <h2>สร้างบัญชีผู้ใช้</h2>
        <div class="row">
            <div class="col">
                <base-input v-model="user.firstname" type="text" label="ชื่อ"/>
            </div>
            <div class="col">
                <base-input v-model="user.lastname" type="text" label="นามสกุล"/>

            </div>
        </div>
        <base-input v-model="user.email" type="email" label="อีเมลล์"/>
        <base-input v-model="user.telephone" type="tel" label="เบอร์โทรศัทพ์"/>
        <base-input v-model="user.telephone_inviter" type="tel" label="เบอร์โทรศัทพ์ ผู้แนะนำ"/>
        <div class="row">
            <div class="col">
                
                <base-input v-model="user.password" :type="togglePassword()" label="รหัสผ่าน"/>
            </div>
            <div class="col">
                
                <base-input v-model="confirmpassword" :type="togglePassword()" label="ยืนยันรหัสผ่าน"/>
            </div>
        </div>
        <base-checkbox v-model="password_visible" >แสดงรหัสผ่าน</base-checkbox>
        <base-button class="mt-3" type="primary" @click="createUser">สร้าง</base-button>
        <base-button class="mt-3" type="primary" @click="login">มีบัญชีอยู่แล้ว</base-button>
        <p v-if="error_message!==null"><small class="error-message">{{ error_message }}</small></p>
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
                firstname:null,
                lastname:null,
                email:null,
                telephone:null,
                telephone_inviter:null,
                password:null,
                roles:"partner"
            },
            confirmpassword:null,
            password_visible:false,
            error_message:null
        }
    },
    methods:{
        login(){
            this.$router.push("/landingpage/login");
        },
        async createUser(){
            this.error_message = '';

            if(!this.validateEmail()){
                this.error_message = 'กรุณากรอก email ที่ถูกต้อง';
                return;
            }
         

            if(!this.validateTephone()){
                this.error_message = 'เบอร์โทรศัพท์ไม่ถูกต้อง กรุณาระบุเบอร์โทรศัทพ์ 10 ตัวอักษร เช่น 0808008000';
                return;
            };

            if(!this.validatePassword()){
                this.error_message = "รหัสผ่านไม่ปลอดภัย กรุณากำหนดรหัสผ่านมากกว่า 8 ตัวอักษรและประกอบไปด้วยตัวอักษรภาษาอังกฤษพิมพ์เล็กพิมพ์ใหญ่และตัวเลข"
                return ;
            }
            if(this.user.password !== this.confirmpassword){
                this.error_message = 'รหัสผ่านและรหัสยืนยันไม่ตรงกัน'
                return;
            }
            await this.userservice.CreateUser(this.user).then(result=>{
              
                if(result.status === true){
                    this.$router.push(`/landingpage/firstlogin`);
                }
                else{
                    this.error_message = result.message;
                }
            })
        },
        validateEmail(){
           
                return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-]*$/.test(this.user.email);
},
        validateTephone(){
            if(!(/[0-9]/.test(this.user.telephone)) || this.user.telephone.length!=10){
                return false;
            }
            return true;
        },
        validatePassword(){
            const pw = this.user.password;
            return ('ch', (/[A-Z]/.test(pw) && /[a-z]/.test(pw) && /[0-9]/.test(pw)) && pw.length>=8 )
        },
        togglePassword(){

            return this.password_visible?"text":"password";
        }
    },
}
</script>

<style scoped>
.card{
    padding: 1rem;
    margin-top: 5rem;
    border-radius: 20px;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    /* min-height: 100vh; */
    width: 100%;
    max-width: 450px;
    justify-content: center;
}
.card h2{
    color: #fff;
}
.error-message{
    color: red;
}
@media screen and (max-width:450px) {
    .card{
        margin:0;
        width: 100%;
       min-height: calc(100vh - 70px);
       border-radius: 0;
       border-top:solid 3px violet ;
    }
}

</style>
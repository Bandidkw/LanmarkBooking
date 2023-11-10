<template>
    <nav class="top-wep">
        
        <div class="d-none d-md-block">

            <div class="row nav-bar">
                <div class="top-right col text-left logo">
                    <router-link to="/landingpage/invitations">
                        <!-- <h3 style="color: #000;">LANMARK LOGO</h3> -->
                        <img src="/images/logo/lanmark-logo-navbar.png" alt="">
                    </router-link>
                    
                </div>
                <div class="top-right col text-right">
                    <div class="text-co">
                        <a href="#" style="color: #000; font-size: 1rem; margin-right: 10px;">ให้เช่าที่พักกับ Lanmark</a>
                    </div>
                    <!-- <base-button class="admin-button " type="primary">เข้าสู่ระบบ</base-button> -->
                    <!-- <a class="logo-login" href=""><i class="bi bi-person-circle"></i>Login</a> -->
                    <div class="list-acc" @click="login">
                        <i class="bi bi-list"></i>
                        <button class="log-btn"><i class="bi bi-person-fill"></i></button>
                    </div>
                </div>
            </div>
        </div>
        <!-- collapse expend -->
        <div class="d-block d-md-none collapes" >
            <div class="row">
                <div class="col-8">
                    <router-link to="/">
                        <h3 class="mt-2 ml-3 text-left">NBA BOOKING</h3>
                    </router-link>
                </div>
                <div class="col-4 text-right">
                    <div>

                        <base-button link id="button-expend" class="button-expend" @click="menuClick">
                        <span class="material-symbols-outlined text-white" style="z-index: 9999;">
                            menu
                        </span>
                    </base-button>
                   
                </div>
               
                </div>
                <div class="menu-expend" :style="menuExpend?'display:block':'display:none'">
                        <ul class="menu text-left">
                            <li v-for="(item,index) in menuItem" :key="index" class="menu-item">
                                <router-link to="item.link" class="w-100" >
                                    <div class="row text-white">
                                        <div class="col-8 text-left">
                                            <p class="text-dark px-3 py-2">{{ item.label }}</p>
                                        </div>
                                        <div class="col-3 text-right ">
                                            
                                            <span class="material-symbols-outlined text-dark pt-1 ">chevron_right</span>
                                        </div>
                                    </div>
                                </router-link>
                            </li>
                            <li class="menu-item bg-primary btn-login">
                                <div v-if="loading" class="row text-white">
                                        <div v-if="user===null" class="col-8 text-left bg">
                                            <base-button class="mx-2 text-white" link  @click="login">เข้าสู่ระบบ</base-button>
                                        </div>
                                        <div v-else class="col-8 text-left bg">
                                            <base-button class="mx-2 text-white" link  @click="logout">ออกจากระบบ</base-button>
                                        </div>
                                        <div class="col-3 text-right ">
                                            
                                            <span class="material-symbols-outlined text-white pt-2 ">chevron_right</span>
                                        </div>
                                    </div>
                                
                            </li>

                        </ul>
                    </div>
            </div>
        </div>
    </nav>
</template>

<script>
import { User } from '@/functions/userservice';
import store from '@/stores'


export default {
    setup(){
        const userservice = new User();
        return {
            userservice,store
        }
    },
    mounted(){
        this.user = this.store.state.user;

    },
    data(){
        return{
            loading:false,
            user:null,
            menuExpend:false,
            menuItem:[
                {
                    label:'หน้าแรก',
                    link:'/'
                },
                // {
                //     label:"บริการ",
                //     link:'',
                // },
                // {
                //     label:"เงือนไขการใช้บริการ",
                //     link:'',

                // },
                // {
                //     label:"การร้องเรียน",
                //     link:'',

                // },
                // {
                //     label:"ติดต่อ NBA",
                //     link:'',

                // },
            ]
        }
    },
    methods: {
   
        login() {
            this.$router.push("/landingpage/login");
        },
        async logout(){
            await this.userservice.SignOut().then(async (result)=>{
                if(result){
                    
                    localStorage.removeItem('token');
                    this.menuExpend=false;
                    this.user.status=false;
                    this.$router.push('/landingpage');
                }
            })
        },
        menuClick(){
            this.menuExpend = !this.menuExpend;
        }
    },  
}
</script>

<style scoped>
.logo img{
    padding: 5px;
    width: 10rem;
    height: 3rem;
}
.menu{
    background-color: white;
    border-radius: 0.4rem;
}
.nav-bar{
    width: 100%;
    padding: 0 2rem;
    align-items: center;
    height: 5rem;
}

.btn-login{
    border-radius:0 0 0.4rem 0.4rem ;
}
.top-right{
    padding: 0;
}
/* .logo{
    padding-left: 3rem;
} */
/* .login-button{
    margin-right: 3rem;
} */

h3{
    margin: 0;
    padding: 0;
    font-family: 'Noto Sans Thai', sans-serif;
}
nav{
    background-color: #fff;
}

.button-expend{
    color: white;
    z-index: 99999;
}

.collapes{
    position: relative;
}
.menu-expend{
    position: absolute;
    display:none;
    top: 4.2rem;
    right: 0;

}

ul{
    list-style: none;
    padding: 0;
    margin: 0;
}

.menu-item{
    display: flex;
    width: 100%;
}
.menu-item:hover{
    background-color: e14eca;
    color: white;
}
.text-right{
    display: flex;
    align-items: center;
    justify-content: flex-end;
}
.list-acc{
    column-gap: 0.5rem;
    cursor: pointer;
    border-radius: 20px;
    background-color: #acaaaa;
    padding: 3px;
    display: flex;
    align-items: center;
    transition: all 0.2s ease-in-out;
}
.list-acc i{
    font-weight: bolder;
    font-size: 1.5rem;
}
.list-acc:hover{
    box-shadow: 0 0px 5px 0.1px #00bbf9;
}
.log-btn{
    border: none;
    border-radius: 50%;
    display: inline-flex;
    height: 2rem;
    width: 2rem;
    align-items: center;
    justify-content: center;
    transition: 0.2s;
}
.log-btn i{
    font-size: 1.8rem;
}
.log-btn:hover{
    cursor: pointer;
}
/* .log-btn:active{
    border: none;
    background-color: #5dd6ff;
} */
</style>
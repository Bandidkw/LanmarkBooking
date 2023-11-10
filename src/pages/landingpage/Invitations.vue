<template>
<div class="invitation">
    <div class="title">
<!--------------------------- search-box --------------------------->
        <div class="search-box">
            <div class="input-group">
            <div class="search">
                <input type="text" class="form-control" placeholder="ค้นหาที่พักหรือโรงแรม" aria-label="Recipient's username" aria-describedby="basic-addon2">
            </div>
            <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button"><i class="bi bi-search"></i></button>
            </div>
        </div>
        </div>
<!-------------------------- choose-room ----------------------------->
        <div class="choose-room">
            <div class="room">
                <i class="bi bi-house-door"></i>
                <a @click="createAccount">อพาร์ทเม้นท์</a>
            </div>
            <div class="room">
                <i class="bi bi-house"></i>
                <a @click="createAccount">ห้องพักทั่วไป</a>
            </div>
            <div class="room">
                <i class="bi bi-building"></i>
                <a @click="createAccount">คอนโด</a>
            </div>
            <div class="room">
                <i class="bi bi-tsunami"></i>
                <a @click="createAccount">ริมทะเล</a>
            </div>
            <div class="room">
                <i class="bi bi-tree"></i>
                <a @click="createAccount">ป่า-เขา</a>
            </div>
            <div class="room">
                <i class="bi bi-brightness-alt-high"></i>
                <a @click="createAccount">เกาะ</a>
            </div>
            <div class="room">
                <i class="bi bi-houses"></i>
                <a @click="createAccount">คฤหาสน์</a>
            </div>
            <div class="filter">
                <i class="bi bi-sliders"></i>
                <a href="">ตัวกรอง</a>
            </div>
        </div>

<!--------------------------------- popular ------------------------------->

        <div class="img-info">
            <div class="pop">
                <h3 class="pt-3 fw-bold">ที่พัก POPULAR</h3>
                <i class="bi bi-award-fill"></i>
            </div>
            <div class="popular-box">
                <popular/>
            </div>
<!-------------------------------- promotion ------------------------------>
        <div class="pro">
            <h3 class="pt-3 fw-bold">PROMOTION</h3>
            <i class="bi bi-star-fill"></i>
        </div>
        <div class="promo-box">
            <promotion/>
        </div>
<!----------------------------------- review --------------------------------->
<div class="re">
    <h3 class="pt-3 fw-bold">รีวิว</h3>
    <i class="bi bi-chat-dots-fill"></i>
</div>
    <div class="review-box">
        <review/>
        </div>
    </div>
</div>
<!---------------------------------footer  ------------------------------------>
<div class="footer-box">
    <div class="foot-content">
        <div class="footer-left">
            <p>Home</p>
            <p>Sell</p>
            <p>Help & Contact</p>
            <p>Inverter</p>
        </div>
        <div class="footer-center">
            <p>© 2023 Lanmark Hotel</p>
        </div>
        <div class="footer-right">
            <p style="text-align: center;">Download The Free <br> Lanmark App</p>
            <div class="store-app">
                <a href=""><i class="bi bi-apple"></i></a>
                <a href=""><i class="bi bi-google-play"></i></a>
            </div>
        </div>
    </div>
</div>
</div> 
</template>

<script>

import review from './review'
import promotion from './promotion'
import popular from './popular'
// import footer from './LandingPageFooter'

    export default {
  components: {
        promotion,popular,review
    },
        methods:{
        createAccount(){
        this.$router.push('/landingpage/createaccount');
    }
    },
}
</script>

<style scoped>
.invitation{
    padding-top: 3.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 100%;
        /* min-height: calc(100vh - 206px); */
}
.invitation h3{
    font-size: 1.5rem;
    color: #fff;
}
.invitation h2{
    font-size: 2rem;
}
.title {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 3rem 5rem 1rem 5rem;
    background-color: #fff;
    /* height: calc(100vh); */
    width: auto;
    width: 100%;
}
/*-------------------------search-box----------------------------------*/
.search-box{
    /* border-radius: 10px; */
    /* border: #000 1px solid; */
    /* background-color: #fff; */
    box-shadow: 0px 0px 10px -1px rgba(0,0,0,0.3);
    display: flex;
    width: 50%;
    transition: all 0.2s ease-in-out;
}
.search{
    width: 80%;
}
.input-group-append{
    width: 20%;
    border: none;
}
.input-group-append button{
    width: 100%;
}
.input-group{
    margin: 0;
    display: flex;
    justify-content: space-between;
}
.input-group button{
    background-color: #fff;
    border-radius: 0;
    border: none;
    margin: 0;
    transition: all 0.2s ease-in-out;
}
.input-group button i{
    color: #000;
    font-size: 1rem;
    padding: 0;
    transition: all 0.2s ease-in-out;
}
.form-control{
    border-radius: 0;
    height: 100%;
    transition: 0.2s;
}
.input-group button:hover{
    color: #5dd6ff;
}
.form-control:focus{
    border-radius: 0;
    border: none;
    background-color: rgba(123, 235, 255, 0.725);
}
/*---------------------- choose-room ----------------------*/
.popular-box{
    padding: 0;
    margin: 0;
}
.choose-room{
    margin-top: 1rem;
    padding: 10px;
    display: flex;
    align-items: center;
    column-gap: 2rem;
}
/* .search-box:hover{
    transform: scale(1.1);
} */
.room{
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1rem;
}
.room i{
    font-size: 1.2rem;
}
.room a,i{
    color: #252525;
    transition: 0.2s;
}
.room:hover{
    text-shadow: 0px 0px 5px #5dd6ff;
    color: #6b6b6b;
}
.filter{
    cursor: pointer;
    border: #707070 1px solid;
    padding: 8px;
    border-radius: 0.5rem;
    column-gap: 5px;
    color: #707070;
    display:flex;
    transition: all 0.2s ease-in-out;
}
.filter a,i{
    font-size: 1rem;
    color: #252525;
}
.filter:hover{
    background-color: #5dd6ff;
}
/*--------------------------------- img-info -------------------------*/

.img-info{
    border-radius: 1rem;
    padding: 1.5rem 2rem;
    width: 100%;
    background: rgba(255, 255, 255, 0.9);
}
.img-info h3{
    color: #000;
    font-weight: normal;
}
.grid-info{
    display: grid;
    grid-template-columns: repeat(6,1fr);
    grid-template-rows: repeat(1,300px);
    grid-column-gap: 1rem;
}
.img-box{
    border-radius: 10px;
    padding: 5px 10px;
    text-align: left;
    width: 100%;
    /* background-color: rgb(211, 211, 211) */
}
.img-box img{
    width: 100%;
}
.img-box h4,p{
    margin: 0;
    color: #000;
}
/* .img-room {
    border-radius: 10px;
    width: 100%;
    background-color: #fff;
    height: 60%;
}
.img-room img{
    width: 100%;
    height: 100%;
    object-fit: cover;
} */

/*---------------------------- popular ----------------------------*/

.pop{
    display: flex;
    padding: 0;
    align-items: center;
    column-gap: 5px;
    margin-bottom: 1rem;
}
.pop h3{
    margin: 0;
}
.pop i{
    color: #ffbe0b;
    font-size: 1.5rem;
}

/*---------------------------- promo ------------------------------*/

.pro{
    column-gap: 5px;
    display: flex;
    align-items: center;
    padding: 0;
    margin-bottom: 1rem;
}
.pro h3{
    margin: 0;
}
.pro i{
    color: #f77f00;
    font-size: 1.5rem;
}

/*------------------------------- review -------------------------------------*/
.re{
    margin-bottom: 1rem;
    padding: 0;
    display: flex;
    align-items: center;
    column-gap: 5px;
}
.re h3{
    margin: 0;
}
.re i{
    color: #00bbf9;
    font-size: 1.5rem;
}

/*----------------------------------- footer -------------------------------*/

.footer-box{
    width: 100%;
    height: 10rem;
    display: flex;
    /* background-color: #feeafa; */
    /* box-shadow: 0px -2px 17px -7px rgba(0,0,0,0.37); */
}
.foot-content{
    padding: 0 10rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    background-color: #ecf8f8;
    /* -webkit-box-shadow: 0px -2px 17px -7px rgba(0,0,0,0.37);
    -moz-box-shadow: 0px -2px 17px -7px rgba(0,0,0,0.37);
    box-shadow: 0px -2px 17px -7px rgba(0,0,0,0.37); */
}
.footer-left p{
    line-height: 2;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 600;
    text-align: left;
    color: black;
}
.footer-center p{
    color: black;
    padding-top: 6.5rem;
}
.footer-right p{
    font-size: 1rem;
    font-weight: 600;
    text-align: left;
    color: black;
}
.store-app a i{
    color: black;
    font-size: 2rem;
    transition: all 0.2s ease-in-out;
}
.store-app{
    column-gap: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
}
.footer-right,.footer-left p:hover{
    color: #00bbf9;
}
.store-app a i:hover{
    color: #00bbf9;
}
@media screen and (max-width:1200px){
    .con
    .grid-info{
        grid-gap: 1rem;
        grid-template-columns: repeat(4,1fr);
        grid-template-rows: repeat(2,300px);
    }
    .search{
        width: 70%;
    }
    .input-group-append{
    width: 30%;
}
}
@media screen and (max-width: 992px) {
    .search-box{
        display: none;
    }
    .grid-info{
        grid-gap: 1rem;
        grid-template-columns: repeat(4,1fr);
        grid-template-rows: repeat(2,300px);
    }
}

@media screen and (max-width:450px) {
    .invitation{
        width: 100%;
    }
}
    </style>
<template>
    <div class="content">
        
            <div class="col">
                <div class="row align-items-center">
                    <div class="col-2 col-md-2 col-lg-1 justify-content-center " v-for="(item,index) in url" :key="index">
                        <img class="partner-logo"  width="100%" :src="item.url"/>
                    </div>

                </div>
                <!-- <p>298/1 หมู่ที่ 3 ตำบล สันผักหวาน อำเภอ หางดง จังหวัด เชียงใหม่ 50230</p> -->
            </div>
       </div>
</template>
<script>
// import {Card} from "@/components/index";
export default {
    components: {
        // Card
    },
    data() {
        return {
            url: [
                
                {
                    id: 2,
                    url: '/images/hotel_logo/1.jpg'
                },
                {
                    id: 3,
                    url: '/images/hotel_logo/2.jpg'
                },
                {
                    id: 4,
                    url: '/images/hotel_logo/3.jpg'
                },
                {
                    id: 5,
                    url: '/images/hotel_logo/4.jpg'
                },
                {
                    id: 6,
                    url: '/images/hotel_logo/5.png'
                },
                {
                    id: 7,
                    url: '/images/hotel_logo/6.jpg'
                },
                {
                    id: 8,
                    url: '/images/hotel_logo/7.jpg'
                },
                {
                    id: 9,
                    url: '/images/hotel_logo/8.png'
                },
                {
                    id: 10,
                    url: '/images/hotel_logo/9.jpg'
                },
                {
                    id: 11,
                    url: '/images/hotel_logo/10.png'
                },
                {
                    id: 12,
                    url: '/images/hotel_logo/11.png'
                },
                {
                    id: 13,
                    url: '/images/hotel_logo/12.png'
                },
               
            ]
        }
    }
}
</script>
<style lang="scss" scoped>
.partner-logo{
    margin-top:1rem;
    margin-bottom:1rem;
}
.content{
    font-family: 'Noto Sans Thai', sans-serif;
    margin-left: 10rem;
    margin-right: 10rem;
    height: 120px;
    background-color: white;
    border-top-right-radius: 2rem;
    border-top-left-radius: 2rem;
    -webkit-box-shadow: 0px -2px 17px -7px rgba(0,0,0,0.37);
-moz-box-shadow: 0px -2px 17px -7px rgba(0,0,0,0.37);
box-shadow: 0px -2px 17px -7px rgba(0,0,0,0.37);
}
p{
    color:var(--gray-800);
    font-weight: 400;
}
.col{
        padding-top:0.5rem;
        padding-left: 1.5rem;
        padding-right: 1.5rem;
        display: flex;
        align-items:center;   
}
@media screen and (max-width:450px) {
    .content {
        margin-left:2rem !important ;
        margin-right:2rem !important;
        border-top-right-radius: 2rem;
        border-top-left-radius: 2rem;
    }
    .row{
        margin: 0;
    }
    .col-2{

        padding-left: 0.2rem !important;
        padding-right: 0.2rem !important;
    }

    .partner-logo{
       padding: 0.2rem 0 0.2rem 0;
    }
}
@media screen and (max-width: 900px) {
  .content {
    margin-left: 5rem;
    margin-right: 5rem;
  }
}
    
</style>
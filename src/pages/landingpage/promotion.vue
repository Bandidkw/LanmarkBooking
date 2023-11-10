<template>
    <div class="content">
            <div class="promo-grid">
                <div class="img-promo">
                    <div class="grid-img" v-for="(item,index) in url" :key="index">
                        <img class="hotel-logo"  width="100%" :src="item.url"/>
                        <!-- <i class="bi bi-arrow-right-circle-fill hidden" id="icon-next" @click="buttonClicked"></i> -->
                        <div class="promo-details">
                        <h4>Hotel Name</h4>
                        <p>Details</p>
                        <p>Date</p>
                        <p>Price฿</p>
                    </div>
                    </div>
                </div>
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
                    url: '/images/hotel_room/room02.jpg'
                },
                {
                    id: 3,
                    url: '/images/hotel_room/room01.jpg'
                },
                {
                    id: 4,
                    url: '/images/hotel_room/room02.jpg'
                },
                {
                    id: 5,
                    url: '/images/hotel_room/room01.jpg'
                },
                {
                    id: 6,
                    url: '/images/hotel_room/room02.jpg'
                },
                {
                    id: 7,
                    url: '/images/hotel_room/room01.jpg'
                }
            ]
        }
    }
}
</script>
<style lang="scss" scoped>
.content{
    width: 100%;
    // height: 100vh;
    // background-color: rgb(177, 176, 176);
}
p{
    color:var(--gray-800);
    font-weight: 400;
}
.col{
    padding: 0.5rem 1.5rem 0 1.5rem;
    display: flex;
    align-items:center;   
}
.grid-img{
    width: 100%;
    height: 70%;
}
.grid-img img{
    transition: all 0.2s ease-in-out;
}
.grid-img img:hover{
    box-shadow: 0px 0px 10px 3px #5dd6ff;
    transform: translate(-0.5rem, -1ex);
}
.hotel-logo{
    border-radius: 1rem;
}
.img-promo{
    display: grid;
    grid-column-gap: 1rem;
    grid-template-columns: repeat(6,1fr);
    grid-template-rows: repeat(1,300px);
}
.img-promo img{
    width: 100%;
    height: 100%;
}
.promo-details h4,p{
    color: #000;
    margin: 0;
    padding: 0;
}
@media screen and (max-width: 1200px) {
  .content {
    margin: 0;
  }
  .img-promo{
    grid-template-columns: repeat(4,1fr);
    grid-template-rows: repeat(2,300px);
}
}
@media screen and (max-width: 992px) {
  .content {
    margin: 0;
  }
}
@media screen and (max-width:450px) {
    .content {
    margin-left:2rem !important ;
    margin-right:2rem !important;
    border-top-right-radius: 2rem;
    border-top-left-radius: 2rem;
    }
}
</style>
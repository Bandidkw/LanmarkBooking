<template>
    <div class="content">
            <div class="promo-grid">
                <div class="img-promo">
                    <div class="grid-img" v-for="(item,index) in url" :key="index">
                        <img class="hotel-logo" width="100%" :src="item.url"/>
                        <i class="bi bi-arrow-right-circle-fill hidden" id="icon-next" @click="buttonClicked"></i>
                        <!-- <i class="bi bi-arrow-left-circle-fill hidden" id="icon-next" @click="buttonClicked"></i> -->
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
export default {
    data(){
        return{
            // images:[],
            // posts:[{id:1, hovered:0,images:['/images/hotel_room/room01.jpg','/images/hotel_room/room02.jpg','/images/hotel_room/room01.jpg']}]
         url: [
                {
                    id: 2,
                    url: '/images/hotel_room/room01.jpg'
                },
                {
                    id: 3,
                    url: '/images/hotel_room/room02.jpg'
                },
                {
                    id: 4,
                    url: '/images/hotel_room/room01.jpg'
                },
                {
                    id: 5,
                    url: '/images/hotel_room/room02.jpg'
                },
                {
                    id: 6,
                    url: '/images/hotel_room/room01.jpg'
                },
                {
                    id: 7,
                    url: '/images/hotel_room/room02.jpg'
                }
            ]
        }
    
    // components: {
    //     // Card
//     mounted(){
//     this.posts.forEach(p => this.images.push({img: p.images[0]}));
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
.grid-img{
    position: relative;
    width: 100%;
    height: 70%;
}
.grid-img img{
    position: relative;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
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
.img-promo .hidden{
    cursor: pointer;
    color: #cccccc;
    position: absolute;
    font-size: 1.5rem;
    top: 35%;
    right: 10%;
    transform: translate(50%,50%);
    transition: all 0.2s ease-in-out;
}
.img-promo i:hover{
    color: #fff;
}
// .grid-img img:hover{
//     box-shadow: 0px 0px 10px 3px #5dd6ff;
//     // transform: translate(-0.5rem, -1ex);
// }
.img-promo img{
    width: 100%;
    height: 100%;
}
.promo-details h4,p{
    color: #000;
    margin: 0;
    padding: 0;
}
.hidden{
    transition: .5s ease;
    opacity: 0;
    position: absolute;
    top: 50%;
    left: 15%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    text-align: center;
}
.grid-img:hover .hidden{
    opacity: 1;
}
@media screen and (max-width:1200px) {
    .content{
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
    border-radius: 2rem 2rem 0 0;
    // border-top-right-radius: 2rem;
    // border-top-left-radius: 2rem;
    }
}
</style>
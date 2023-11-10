<template>
    <div class="content">
        <Rate :length="5"></Rate>
            <div class="promo-grid">
                <div class="img-promo">
                    <div class="grid-img" v-for="(item,index) in url" :key="index">
                        <img class="hotel-logo"  width="100%" :src="item.url"/>
                        <!-- <i class="bi bi-arrow-right-circle-fill hidden" id="icon-next" @click="buttonClicked"></i> -->
                        <div class="promo-details">
                            <div class="clean">
                                <p>ความสะอาด</p>
                            <star-rating v-bind:increment="1"
                            v-bind:max-rating="10"
                            inactive-color="#000"
                            active-color="#ffb703"
                            v-bind:star-size="20">
                        </star-rating>
                            </div>
                            <div class="price">
                                <p>ความคุ้มราคา</p>
                                <star-rating v-bind:increment="1"
                            v-bind:max-rating="10"
                            inactive-color="#000"
                            active-color="#ffb703"
                            v-bind:star-size="20" >
                        </star-rating>
                            </div>
                            <div class="commu">
                                <p>การสื่อสาร</p>
                                <star-rating v-bind:increment="1"
                            v-bind:max-rating="10"
                            inactive-color="#000"
                            active-color="#ffb703"
                            v-bind:star-size="20" >
                        </star-rating>
                            </div>
                    </div>
                    </div>
                </div>
            </div>
       </div>
</template>
<script>
    export default{
        data(){
            return{
                url:[
                    {
                        id:2,
                        url:'/images/review/01.jpg'
                    },
                    {
                        id:3,
                        url:'/images/review/02.jpg'
                    },
                    {
                        id:4,
                        url:'/images/review/03.jpg'
                    }
                ]
            }
        }
    }
</script>

<style>
.content{
    width: 100%;
}
.grid-img{
    width: 100%;
    height: 70%;
}
/* .grid-img img{
    transition: all 0.2s ease-in-out;
} */
/* .grid-img img:hover{
    box-shadow: 0px 0px 8px 5px #ffc2d1;
    transform: scale(1.05);
} */
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
    object-fit: cover;
    width: 100%;
    height: 80%;
}
.promo-details{
}
.promo-details h4,p{
    color: #000;
    margin: 0;
    padding: 0;
}
.checked {
  color: orange;
}
.clean, .price,.commu{
    line-height: 1.5;
    display: block;
}
.clean p, .price p,.commu p{
    font-size: 1.1rem;
}
@media screen and (max-width:1200px) {
    .content{
        margin: 0;
    }
    .img-promo{
    grid-template-columns: repeat(4,1fr);
}
}
</style>
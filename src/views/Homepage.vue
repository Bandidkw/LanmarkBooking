<!-- Content.vue -->
<template>
    <div class="invitatain">

      <div class="title">

        <!-- ------------------------- search-box ------------------------- -->
        
        <div class="search-box">
            <div class="input-group">
            <div class="search">
                <input type="text" class="form-control" placeholder="ค้นหาที่พักหรือโรงแรม" aria-label="Recipient's username">
            </div>
            <div class="input-group-append">
            <button class="btn-search btn-outline-secondary" type="button"><i class="bi bi-search"></i></button>
            </div>
        </div>
        </div>
      </div>
              <!-------------------------- popular-section --------------------------->
          <div class="poppular-box">
            <h1>Popular</h1>
          <div class="content">
            <div class="promo-grid">
                <div class="img-promo">
                    <div class="grid-img" v-for="(item,index) in url" :key="index">
                        <img class="hotel-logo" width="100%" :src="item.url"/>
                        <i class="bi bi-arrow-right-circle-fill hidden" id="icon-next" @click="nextImage"></i>
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
        </div>
    </div>
    <div>
      <image-gallery :images="galleryImages" />
    </div>
  </template>
  
  <script>
  export default {
    name: 'HomepageMain',
    data(){
        return{
            // images:[],
            // posts:[{id:1, hovered:0,images:['/images/hotel_room/room01.jpg','/images/hotel_room/room02.jpg','/images/hotel_room/room01.jpg']}]
         url: [
                {
                    id: 2,
                    url: '/images/hotel-room/room01.jpg'
                },
                {
                    id: 3,
                    url: '/images/hotel-room/room02.jpg'
                },
                {
                    id: 4,
                    url: '/images/hotel-room/room01.jpg'
                },
                {
                    id: 5,
                    url: '/images/hotel-room/room02.jpg'
                },
                {
                    id: 6,
                    url: '/images/hotel-room/room01.jpg'
                },
                {
                    id: 7,
                    url: '/images/hotel-room/room02.jpg'
                }
            ]
        }
      },
      methods:{
        nextImage() {
      // เลื่อนไปที่รูปถัดไป
      if (this.currentIndex < this.images.length - 1) {
        this.currentIndex++;
        this.translateValue -= this.getImageWidth();
      }
    },
      }
  };
  </script>

  <style scoped>
  .invitatain{
    width: 100%;
    padding: 2rem 5rem;
    display: flex;
    flex-direction: column;
  }
  .title{
    display: flex;
    width: 100%;
    height: 2.5rem;
    justify-content: center;
  }

  /*------------------------- search-box-style -------------------------*/
  .search-box{
    width: 30%;
  }
  .input-group{
    display: flex;
    height: 100%;
  }
  .search{
    width: 80%;
  }
  .search input{
    border-radius: 25px 0 0 25px;
  }
  .input-group-append{
    border: #00bbf9 1px solid;
    border-radius: 0 25px 25px 0;
    width: 20%;
  }
  .input-group-append button{
    border-radius: 0 25px 25px 0;
  }
  .input-group button{
    border: none;
    width: 100%;
    height: 100%;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
  }
  .search input{
    /* border: none; */
    border: #00bbf9 1px solid;
    width: 100%;
    height: 100%;
    padding: 1rem;
    transition: all 0.2s ease-in-out;
  }
  /*---------------------------- hover % focus -------------------------------*/
  .input-group-append button:hover{
    background-color: #00bbf9 ;
    border-radius: 0 25px 25px 0;
  }
  .search input[type=text]:focus{
    border-radius: 25px 0 0 25px;
    outline: none;
    background-color: #7cd7f5;
  }

  /*---------------------------- popular-style ----------------------*/
.poppular-box{
  position: relative;
  z-index: 0;
}

  .content{
    width: 100%;
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
    font-size: 1.8rem;
    top: 30%;
    right: 10%;
    transform: translate(50%,50%);
    transition: all 0.2s ease-in-out;
}
.img-promo i:hover{
    color: #fff;
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
  </style>
<!-- eslint-disable prettier/prettier -->
<template>
    <div class="row image-gallery">
        <Card>

            <div class="col-12 main">
                <div class="image-edit">
                    <img class="image-main mb-2"
                    :src="(imagesrc?`https://drive.google.com/uc?export=view&id=${active_image}` : '/images/hotel.jpg')" />
                    <div class="delete-btn">
                        <drop-down tag="div">
                            <button aria-label="edit" data-toggle="dropdown"
                            class="dropdown-toggle btn-rotate btn btn-default mr-3">
                            <i class="fas fa-edit"></i>
                        </button>
                        <ul class="dropdown-menu">
                            <li class="dropdown-item">
                                <label class="change-image">
                                    เพิ่มรูป
                                    <input type="file" multiple accept="image/*" style="display: none" name="file-upload"
                                    @change="addImage" />
                                </label>
                            </li>
                            <li class="dropdown-item">
                                <label class="change-image">เปลี่ยนรูป
                                    
                                    <input type="file" accept="image/*" style="display: none" name="file-update"
                                    @change="changeImage" />
                                </label>
                            </li>
                            <li class="dropdown-item" @click="deleteImage">ลบรูป</li>
                        </ul>
                    </drop-down>
                </div>
                <div v-if="uploading" class="loader">
                    <div class="lds-ellipsis">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 thumb">
            <div class="mb-2 mr-2" v-for="(image, idx) in hotel.image_url" :key="idx">
                <img class="image-thumb" :src="`https://drive.google.com/uc?export=view&id=${image}`"
                @click="selectImage(idx)" />
            </div>
        </div>
    </Card>
    </div>
</template>
<!-- eslint-disable prettier/prettier -->
<script>
import { Hotel } from "@/functions/hotelservice";
import { Card } from "@/components/index";

export default { 
    setup(){
        const hotelservice = new Hotel();
        return {
            hotelservice
        }
    },
    components:{
        Card
    },    
    mounted(){
        if(this.hotel.image_url.length>0){
            this.imagesrc=true;
        }
        
        this.active_image = this.hotel.image_url[0];
    },
    data() {
            return {

                active_image: 0,
                imagesrc:false,
                uploading:false,
                loading:false,
            }
        },
        props: {
        hotel: Object
    },
    methods: {
        selectImage(index) {
            this.active_image = this.hotel.image_url[index];

        },
        async addImage(event) {
            this.uploading = true;
            const images = event.target.files;
            const formData = new FormData();
            for (let i = 0; i < images.length; i++) {

                formData.append('imgCollection', images[i]);
            }

            await this.hotelservice.uploadHotelPicture(this.hotel._id, formData).then(async (result) => {

                if (result.message === "สร้างรูปภาพเสร็จเเล้ว") {
                    //setimage

                    
                    result.result.forEach(el => {
                        this.hotel.image_url.push(el);
                    });

                    this.active_image = result.result[0];
                    this.uploading = false;
                    this.imagesrc =true;
                }
                else{
                    this.uploading = false;
                }
            })
        },
        async changeImage(event) {
            this.uploading = true;
            const image = event.target.files[0];
            const formData = new FormData();
            formData.append('imgCollection', image)

            await this.hotelservice.ChangeImage(this.hotel._id, this.active_image, formData).then((result) => {

                if (result.load.message === "สร้างรูปภาพเสร็จเเล้ว") {
                    this.hotel.image_url = result.data;
                    this.active_image = result.load.result;
                    this.uploading = false;
                }
            })
        },
        async deleteImage() {
            this.uploading = true;
            await this.hotelservice.deleteHotelPicture(this.hotel._id, this.active_image).then(result => {

                if (result) {
                    this.hotel.image_url = result;
                    this.active_image = this.hotel.image_url[0];
                    this.uploading = false;
                    if(this.hotel.image_url.length<=0){
                        this.imagesrc=false;
                    }
                }
            })
        },
        
    }


}

</script>

<style scoped>
input{
    width: 100%;
}
.main {
    margin: 0;
    padding: 0;
}
.image-gallery {
    margin: 0;
    padding: 0;
}

.image-main {
    width: 100%;
    height: auto;
}

.thumb {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: row;
    overflow-x: auto;
}

.thumb::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 0;
    background-color: #f1f1f1;
}

.thumb::-webkit-scrollbar {
    width: 0.5rem;
    height: 0.5rem;
    background-color: rgb(255, 255, 255);
}

.thumb::-webkit-scrollbar-thumb {
    border-radius: 0;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
    background-color: #00a2ff;
}

.image-thumb {

    min-width: 4rem;
    max-width: 7rem;

}

.image-thumb:hover {
    cursor: pointer;
    border: solid 1px #fdfdfd;
}

.d {
    text-align: start;
}

.room-feature {
    border: solid 1px #acacac;
}

/* edit detail */

.pencil:hover {
    cursor: pointer;
}

.delete-btn {
    position: absolute;
    background-color: transparent;
    border: none;
    color: #ffffff;
    top: 1rem;
    right: 0;
}

.delete-btn:hover {
    cursor: pointer;
    background-color: transparent;
}

.dropdown-item:hover {
    cursor: pointer;
    background-color: #acacac;
    color: #ffffff;
}

.change-image{
    width: 100%;
}

.change-image:hover {
    cursor: pointer;
}

.loader {
    position: absolute;
    top: calc(50% - 40px);
    right: calc(50% - 40px);
    z-index: 99;
}

/* css loader */
.lds-ellipsis {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
}

.lds-ellipsis div {
    position: absolute;
    top: 33px;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: #fff;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
}

.lds-ellipsis div:nth-child(1) {
    left: 8px;
    animation: lds-ellipsis1 0.6s infinite;
}

.lds-ellipsis div:nth-child(2) {
    left: 8px;
    animation: lds-ellipsis2 0.6s infinite;
}

.lds-ellipsis div:nth-child(3) {
    left: 32px;
    animation: lds-ellipsis2 0.6s infinite;
}

.lds-ellipsis div:nth-child(4) {
    left: 56px;
    animation: lds-ellipsis3 0.6s infinite;
}

@keyframes lds-ellipsis1 {
    0% {
        transform: scale(0);
    }

    100% {
        transform: scale(1);
    }
}

@keyframes lds-ellipsis3 {
    0% {
        transform: scale(1);
    }

    100% {
        transform: scale(0);
    }
}

@keyframes lds-ellipsis2 {
    0% {
        transform: translate(0, 0);
    }

    100% {
        transform: translate(24px, 0);
    }
}
</style>

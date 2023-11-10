<!-- eslint-disable prettier/prettier -->

<template>
    <div class="content">
        <div class="row">
            <div class="col-12">
                <h2 class="title">แก้ไขรายละเอียดห้อง</h2>
                
                <div v-if="dataloading" class="content">
                    <div class="row">
                        <div class="col-12 col-md-6">
                            <div class="row image-gallery">
                                <div class=" col-12 main">
                                    <div class="image-edit">

                                        <img class="image-main mb-2"
                                            :src="`https://drive.google.com/uc?export=view&id=${active_image}`" />
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
                                                            <input type="file" multiple accept="image/*"
                                                                style="display:none" name="file-upload"
                                                                @change="addImage" />
                                                        </label>
                                                    </li>
                                                    <li class="dropdown-item">
                                                        <label class="change-image">เปลี่ยนรูป

                                                            <input type="file" accept="image/*" style="display:none"
                                                                name="file-update" @change="changeImage" />
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

                                    <div class="mb-2 mr-2" v-for="(image, idx) in r.imageURl" :key="idx">
                                        <img class="image-thumb"
                                            :src="`https://drive.google.com/uc?export=view&id=${image}`"
                                            @click="selectImage(idx)">
                                    </div>
                                </div>
                            </div>
                            
                            <Card class="room-feature mt-3">

                                <div class="row">
                                    <div  class="col-6">
                                        <h4>เฟอร์นิเจอร์</h4>
                                      <div v-for="(fur, index) in furnitureType" :key="index" class="row ml-2">

                                             <base-checkbox :id="fur.name" class="furniture-list" v-model="fur.check">{{ fur.name }}</base-checkbox>

                                        </div>
                                    </div>
                                    <div  class="col-6">
                                        <h4>เครื่องอำนวยความสะดวก</h4>
                                        <div v-for="(amen, index) in amenitiesType" :key="index" class="row ml-2">
                                            <base-checkbox :id="amen.name"  v-model="amen.check">{{ amen.name }}</base-checkbox>
                                        </div>
                                    </div>
                                    <div  class="col-6">
                                        <h4>รูมเซอร์วิส</h4>
                                        <div v-for="(service, index) in roomServiceType" :key="index" class="row ml-2">
                                            
                                            <base-checkbox :id="service.description"  v-model="service.check">{{ service.description }}</base-checkbox>
                                        </div>
                                    </div>
                                    <div  class="col-6">
                                        <h4>สิ่งบันเทิง</h4>
                                        <div v-for="(ent, index) in roomEntertainmentType" :key="index" class="row ml-2">
                                            <base-checkbox :id="ent.name"  v-model="ent.check">{{ ent.name }}</base-checkbox>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                        <div class="col-12 col-md-6">
                            <form id="edit-form" name="edit-form" @submit="SubmitForm">
                            <Card>
                                <div class="row">
                                    <div class="col-6">

                                        <p><span class="material-symbols-outlined">
                                                meeting_room
                                            </span>เลขที่ห้อง</p>
                                    </div>
                                    <div class="col-6 d">
                                        {{ r.room_number }}
                                    </div>
                                    <div class="col-6">

                                        <p><span class="material-symbols-outlined">
                                                layers
                                            </span>ประเภท</p>
                                    </div>
                                    <div class="col-6 d">
                                        <base-input>
                                            <select disabled class="form-control" name="name_th" @change="roomUpdate.type=setData($event)">
                                                <option v-for="(room, index) in roomType" :key="index" :value="room._id" :selected="(room._id===dataUpdate.type._id?true:false)">
                                                    {{ room.name_th }}</option>
                                            </select>
                                        </base-input>

                                    </div>
                                    <div class="col-6">
                                        <p><span class="material-symbols-outlined">
                                                bed
                                            </span>เตียง </p>
                                    </div>
                                    <div class="col-6 d">
                                        <base-input>
                                            <select disabled class="form-control" name="bed_type" @change="roomUpdate.bed_type=setData($event)">
                                                <option v-for="(bed, index) in bedType" :key="index" :value="bed._id" :selected="(bed._id===dataUpdate.bed_type._id?true:false)">
                                                    {{ bed.name }}</option>
                                            </select>
                                        </base-input>
                                    </div>
                                    <div class="col-6">
                                        <p><span class="material-symbols-outlined">
                                                bathtub
                                            </span>ลักษณะห้องน้ำ </p>
                                    </div>
                                    <div class="col-6 d">
                                        <base-input>
                                            <select disabled class="form-control" name="bath_type" @change="roomUpdate.bath_type=setData($event)">
                                                <option v-for="(bath, index) in bathType" :key="index" :value="bath._id" :selected="(bath._id===dataUpdate.bath_type._id?true:false)">
                                                    {{ bath.name }}</option>
                                            </select>
                                        </base-input>
                                    </div>
                                    <div class="col-6">
                                        <p><span class="material-symbols-outlined">
                                                ac_unit
                                            </span>เครื่องปรับอากาศ </p>
                                    </div>
                                    <div class="col-6 d">
                                        <base-input>
                                            <select disabled class="form-control" name="aircondition" @change="roomUpdate.aircondition=setData($event)">
                                                <option v-for="(air, index) in airType" :key="index" :value="air._id" :selected="(air._id===dataUpdate.aircondition._id?true:false)">
                                                    {{ air.name }}</option>
                                            </select>
                                        </base-input>
                                    </div>
                                    <div class="col-6">
                                        <p><span class="material-symbols-outlined">
                                                smoke_free
                                            </span>เขตปลอดบุหรี่ </p>
                                    </div>
                                    <div class="col-6 d">
                                        <base-input>
                                            <select class="form-control" id="smoke_type" name="smoke_type" @change="roomUpdate.smoke_type=setData($event)">
                                                <option value="true" :selected="(dataUpdate.smoke_type==true?true:false)">เขตปลอดบุหรี่</option>
                                                <option value="false" :selected="(dataUpdate.smoke_type==true?true:false)">อนุญาติให้สูบบุหรี่</option>
                                            </select>
                                        </base-input>
                                    </div>
                                    <div class="col-6">
                                        <p><span class="material-symbols-outlined">
                                                magic_tether
                                            </span>อินเตอร์เน็ตไร้สาย </p>
                                    </div>
                                    <div class="col-6 d">
                                        <base-input>
                                            <select class="form-control" name="wifi" @change="roomUpdate.wifi=setData($event)">
                                                <option value="true" :selected="(dataUpdate.wifi==true?true:false)">มีบริการ wifi</option>
                                                <option value="false" :selected="(dataUpdate.wifi==true?true:false)">ไม่มีบริการอินเตอร์เน็ตไร้สาย</option>
                                            </select>
                                        </base-input>
                                    </div>
                                    <div class="col-6">
                                        <p><span class="material-symbols-outlined">
                                                shield_person
                                            </span>ระบบรักษาความปลอดภัย </p>
                                    </div>
                                    <div class="col-6 d">
                                        <base-input>
                                            <select class="form-control" name="security" @change="roomUpdate.security=setData($event)">
                                                <option v-for="(security, index) in securityType" :key="index" :value="security._id" :selected="(security._id===dataUpdate.security._id?true:false)">
                                                    {{ security.name }}</option>
                                            </select>
                                        </base-input>
                                    </div>
                                    <div class="col-6">
                                        <p><span class="material-symbols-outlined">
                                                filter_hdr
                                            </span>วิวและบรรยากาศ </p>
                                    </div>
                                    <div class="col-6 d">
                                        <base-input>
                                            <select class="form-control"  name="view_type" @change="roomUpdate.view_type=setData($event)">
                                                <option v-for="(view, index) in viewType" :key="index" :value="view._id" :selected="(view._id===dataUpdate.view_type._id?true:false)">
                                                    {{ view.name }}</option>
                                            </select>
                                        </base-input>
                                    </div>
                                    <div class="col-6">
                                        <p><span class="material-symbols-outlined">
                                                fit_width
                                            </span>ขนาด </p>
                                    </div>
                                    <div class="col-6 d">
                                        <!-- {{ r.size }} ตรม. -->
                                        <base-input :value="roomUpdate.size!=null?roomUpdate.size:dataUpdate.size" name="size" @input="roomUpdate.size = Number(setInputData($event))"/>
                                    </div>
                                    <div class="col-6">
                                        <p><span class="material-symbols-outlined">
                                                diversity_1
                                            </span>จำนวนผู้เข้าพักสูงสุด </p>
                                    </div>
                                    <div class="col-6 d">   
                                        <base-input disabled :value ="roomUpdate.max_person!=null?roomUpdate.max_person:dataUpdate.max_person" name="max_person" @input="roomUpdate.max_person=Number(setInputData($event))"/>
                                    </div>
                                    <div class="col-6">
                                        <p><span class="material-symbols-outlined">
child_care
</span>เด็กเล็กพักฟรี</p>
                                    </div>
                                    <div class="col-6 d">   
                                        <base-input>
                                            <select disabled class="form-control" name="children" @change="roomUpdate.children=setData($event)">
                                                <option value="true" :selected="(dataUpdate.children==true?true:false)">เด็กพักฟรี</option>
                                                <option value="false" :selected="(dataUpdate.children==true?true:false)">มีค่าบริการสำหรับเด็ก</option>
                                            </select>
                                        </base-input>
                                    </div>
                                    <div class="col-6">
                                        <p><span class="material-symbols-outlined">
                                                assistant
                                            </span>รายละเอียดเพิ่มเติม </p>
                                    </div>
                                    <div class="col-6 d">
                                      
                                        <base-input :value = "roomUpdate.detail!=null?roomUpdate.detail:dataUpdate.detail" name="detail" @input="roomUpdate.detail=setInputData($event)"/>
                                    </div>
                                    <div class="col-6">
                                        <p><span class="material-symbols-outlined">
                                                sell
                                            </span>ราคา </p>
                                    </div>
                                    <div class="col-6 d">
                                        <base-input :value="r.price" name="price" disabled />
                                    </div>
                                    <div class="col-6">
                                        <p><span class="material-symbols-outlined">
                                                sell
                                            </span>ราคา NBA </p>
                                    </div>
                                    <div class="col-6 d">
                                        <base-input :value="r.cost" name="price" disabled />
                                    </div>
                                    <div class="col-6">
                                        <p><span class="material-symbols-outlined">
                                                sell
                                            </span>โควต้า </p>
                                    </div>
                                    <div class="col-6 d">
                                        <base-input :value="roomUpdate.quota!=null?roomUpdate.quota:dataUpdate.quota" name="quota" @input="roomUpdate.quota = Number(setInputData($event))"/>
                                    </div>
                                    <div class="col-6">
                                        <p><span class="material-symbols-outlined">
                                                add_task
                                            </span>สถาณะ </p>
                                    </div>
                                    <div class="col-6 d">
                                        <base-input>
                                            <select class="form-control" name="status" @change="roomUpdate.status=setData($event)">
                                                <option v-for="(status, index) in statusType" :key="index" :value="status._id" :selected="(status._id===dataUpdate.status._id?true:false)">
                                                    {{ status.name }}</option>
                                            </select>
                                        </base-input>
                                    </div>
                                </div>
                                <base-button type="default" class="my-5"
                                    @click="$router.push('/roommanager')">กลับหน้าแรก</base-button>
                                <button type="submit" id="submit-form" class="btn btn-primary">แก้ไขรายละเอียดห้อง</button>
                            </Card>
                        </form>
                        </div>
                    </div>
                </div>
            
            </div>
        </div>
    </div>
</template>
<!-- eslint-disable prettier/prettier -->
<script>
import { Room } from "@/functions/roomservice";
import { Card, BaseInput } from "@/components/index";
import resizeImage from "@/functions/resizeimage"

export default {
    setup() {
        const room = new Room();

        return {
            room, resizeImage
        }
    },
    components: {
        Card, BaseInput
    },
    async mounted() {
        this.hotel_id = this.$route.params.hotelId;
       this.id= this.$route.query.id;

        //get room type
        await this.room.getRoomType().then(result => {
            this.roomType = result;

        });

        await this.room.getBedType().then((result) => {
            this.bedType = result;
        })

        await this.room.getAirconditionType().then((result) => {
            this.airType = result;
        })

        await this.room.getBathType().then((result) => {
            this.bathType = result;
        })

        await this.room.getViewType().then((result) => {
            this.viewType = result;

        })

        await this.room.getSecurityType().then((result) =>{
            this.securityType = result;
        })

        await this.room.getRoomStatusType().then((result) => {
            this.statusType = result;
        })

        await this.room.getFurnitureType().then((result)=>{
            // this.furnitureType = result;
            this.furnitureType = result
           
        })

        await this.room.getAmenitiesType().then((result)=>{
            // this.amenitiesType = result;
            this.amenitiesType = result
          
        })

        await this.room.getRoomServiceType().then((result)=>{
            this.roomServiceType = result
        })

        await this.room.getEntertainmentType().then((result)=>{
            // this.roomEntertainmentType = result;

                this.roomEntertainmentType = result
            
        })

        await this.room.getRoomById(this.hotel_id,this.id).then(result => {
            this.dataloading=false;
            if (result) {
        
                this.r = result;
                this.loading = true;
                this.active_image = this.r.imageURl[0];
                this.dataUpdate = this.r;
           
                //set initial data
                this.roomUpdate.furniture = this.r.furniture.map(el=>el._id);
                this.roomUpdate.amenities = this.r.amenities.map(el=>el._id);
                this.roomUpdate.room_service = this.r.room_service.map(el=>el._id);
                this.roomUpdate.entertainment = this.r.entertainment.map(el=>el._id);

                //set checkbox to init state
               this.furnitureType = this.furnitureType.map(el=>({
                    id:el._id,
                    name:el.name,
                    description:el.description,
                    check:(this.DefineRoomFurniture(el))
                }))

                this.amenitiesType =  this.amenitiesType.map(el=>({
                    id:el._id,
                    name:el.name,
                    description:el.description,
                    check:(this.DefineRoomAmenities(el))
                }))

                this.roomServiceType = this.roomServiceType.map(el=>({
                    id:el._id,
                    name:el.name,
                    description:el.description,
                    servicetime:el.service_time,
                    check:(this.DefineRoomService(el))
                }))

                this.roomEntertainmentType = this.roomEntertainmentType.map(el=>({
                    id:el._id,
                    name:el.name,
                    description:el.description,
                    servicetime:el.service_time,
                    check:(this.DefineRoomEntertainment(el))
                }))

                this.dataloading = true;
            }
        });
    },
    methods: {
        selectImage(index) {
            this.active_image = this.r.imageURl[index];

        },
        async addImage(event) {
            this.uploading = true;
            const images = event.target.files;
            const formData = new FormData();
            for (let i = 0; i < images.length; i++) {

                formData.append('imgCollection', images[i]);
            }

            await this.room.uploadRoomPicture(this.id, formData).then(async (result) => {

                if (result.message === "สร้างรูปภาพเสร็จเเล้ว") {
                    //setimage

                    result.result.forEach(el => {
                        this.r.imageURl.push(el);
                    });

                    this.active_image = result.result[0];
                    this.uploading = false;
                }
            })
        },
        async changeImage(event) {
            this.uploading = true;
            const image = event.target.files[0];
            const formData = new FormData();
            formData.append('imgCollection', image)

            await this.room.ChangeImage(this.id, this.active_image, formData).then((result) => {

                if (result.load.message === "สร้างรูปภาพเสร็จเเล้ว") {
                    this.r.imageURl = result.data;
                    this.active_image = result.load.result;
                    this.uploading = false;
                }
            })
        },
        async deleteImage() {
            this.uploading = true;
            await this.room.deleteRoomPicture(this.id, this.active_image).then(result => {

                if (result) {
                    this.r.imageURl = result;
                    this.active_image = this.r.imageURl[0];
                    this.uploading = false;
                }
            })
        },
        setData(e){
            if(e.target.options.selectedIndex > -1) {
          
            const data =e.target.options[e.target.options.selectedIndex].value;
         
            return data;
        }
    },
    setInputData(e){
        
        return e;
    },

    DefineRoomFurniture(furniture){

        let result;

        if(this.r.furniture){
             result =  this.r.furniture.find(el => el._id===furniture._id)?true:false;
        }
   

      return result
    },
    DefineRoomService(roomservice){
        let result;
        if(this.r.room_service){

            result =  this.r.room_service.find(el => el._id===roomservice._id)?true:false;
        }

      return result;
    },
    DefineRoomAmenities(amenities){
        let result;
        if(this.r.amenities){

             result = this.r.amenities.find(el => el._id===amenities._id)?true:false;
        }
      return result;
    },
    DefineRoomEntertainment(entertainment){
        let result;
        if(this.r.entertainment){
            result = this.r.entertainment.find(el => el._id===entertainment._id)?true:false;
        }
      return result;
    },
    async SubmitForm(e){
        e.preventDefault();

        const furUpdate = [];
        const amenitiesUpdate = [];
        const roomserviceUpdate = [];
        const entertainmentUpdate = [];

        this.furnitureType.forEach(el=>{
            if(el.check){
                furUpdate.push(el.id);
            }
        });
        this.roomUpdate.furniture=furUpdate;

        this.amenitiesType.forEach(el=>{
            if(el.check){
                amenitiesUpdate.push(el.id);
            }
        })
        this.roomUpdate.amenities=amenitiesUpdate;

        this.roomServiceType.forEach(el=>{
            if(el.check){
                roomserviceUpdate.push(el.id);
            }
        })
        this.roomUpdate.room_service=roomserviceUpdate;

        this.roomEntertainmentType.forEach(el=>{
            if(el.check){
                entertainmentUpdate.push(el.id);
            }
            this.roomUpdate.entertainment=entertainmentUpdate;
        })
        
    
       await this.room.updateRoom(this.hotel_id,this.id,this.roomUpdate).then(result=>{
            if(result){
                this.$router.push(`/createroomcompleted/${this.hotel_id}?id=${this.id}`)
            }
        })
       
    }
    },
    data() {
        return {
            dataloading:false,
            id: "",
            hotel_id:'',
            loading: false,
            uploading: false,
            r: [],
            active_image: '',
            roomType: null,
            bedType: null,
            bathType: null,
            airType: null,
            viewType: null,
            securityType:null,
            furnitureType: [],
            amenitiesType: [],
            roomServiceType: [],
            roomEntertainmentType: [],
            statusType: null,
            dataUpdate: {},
            amenitiesUPdate:[],
            roomUpdate:{
                
            "detail":null, //string
            "quota":null,
            "size" : null,  //number
            "bed_type": null, //id
            "max_person":null, //number
            "children" : null, //id 
            "view_type" : null, //id
            "bath_type" : null, //id
            "smoke_type" : null, //string true or false
            "furniture" : null, //id array
            "room_service" : null, //id array
            "amenities" : null, //id array
            "wifi" : null, //string true or false
            "entertainment" :null,//id array
            "security" : null, //id
            "promotions" : null,
            "status": null //id

            }
        }
    }
}
</script>

<style lang="scss" scoped>
h4 {
    color: black;
    text-align: start;
    margin-top: 1rem;
}

span {
    margin-right: 1rem;
}

.image-gallery {
    margin: 0;
    padding: 0;
}

.title {
    color: rgb(0, 101, 160);
    text-align: start;
}

p {
    color: black;
    text-align: start;
}

.main {
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
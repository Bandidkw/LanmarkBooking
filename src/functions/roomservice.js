/* eslint-disable prettier/prettier */
export class Room {

  context;
  baseUrl = process.env.VUE_APP_API;
  token = localStorage.getItem('token');

  constructor(context) {
    this.context = context;
  }

  async createRoom(hotelId,data) {
    let room;
    const initdata = {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "token":this.token
       },
      credentials: 'include',
      body: JSON.stringify(data),
    };
    await fetch(`${this.baseUrl}room/hotel/${hotelId}`, initdata)
      .then((response) => response.json())
      .then((result) => room = result)
      .catch((err) => room = err);

      return room;
  }

  //get room by id;
  async getRoomById(hotelId,roomId){
    let room;
    const initdata = {
      method: "GET",
      headers: { 
        "token" :this.token
       },
      credentials:'include',
    }
    await fetch(`${this.baseUrl}room/hotel/${hotelId}/${roomId}`, initdata)
    .then((response) => room = response.json())
    .then((result) => room = result)
    .then((err)=>room=err);

    return room;
  }

  //update room by id

  async updateRoom(hotelId,roomId,data){
   
    let room;

    const initdata = {
      method:"PATCH",
      headers: { 
        "Content-Type": "application/json" ,
        "token" : this.token
      },
      credentials: 'include',
      body: JSON.stringify(data),
      redirect:'follow'
    }
    await fetch(`${this.baseUrl}room/hotel/${hotelId}/${roomId}/update`, initdata)
      .then((response) => response.json())
      .then((result) => room = result)
      .catch((err) => room = err);

      return room;
  }
  //delete room by id
  async deleteRoom(id){
    let room;
   
    const initdata = {
      method: "DELETE",
      headers: { 
        "Content-Type": "application/json",
        "token" : this.token
       },
      credentials: 'include',
    };
    await fetch(`${this.baseUrl}room/${id}`, initdata)
     .then((response) => response.json())
     .then((result) => room = result)
     .catch((err) => room = err);
     return room;
    }

  //get all room by hotel id <= wait create api
  async getHotelRoom(id){
    let room;
      const initdata = {
        method:"GET",
        headers: { 
          "Content-Type": "application/json" ,
          "token" : this.token
        },
        credentials: 'include',
      }
      await fetch(`${this.baseUrl}room/hotel/${id}`, initdata)
      .then((response) => response.json())
      .then((result) => room = result)
      .catch((err) => room = err);

    return room;
  }


  //get all room Types
  async getRoomType(){
    let data;
    const initdata = {
      method: "GET",
      headers: { 
        "Content-Type": "application/json",
        "token" : this.token
       },
      credentials: 'include',
    };
    await fetch(this.baseUrl + "room/type",initdata)
      .then((response) => response.json())
      .then(async (result) => data =result )
      .catch((err) =>{
        data = err
      });
      return data;

  }

   //get all room Bed Types
   async getBedType(){
    let data;
    const initdata = {
      method: "GET",
      headers: { 
        "Content-Type": "application/json",
        "token":this.token
    },
      credentials: 'include',
    };
    await fetch(this.baseUrl + "room/bedtype",initdata)
      .then((response) => response.json())
      .then((result) => data=result)
      .catch((err) => data=err);

      return data;
  }

  //get aircondition type
  async getAirconditionType(){
    let data;
    const initdata = {
      method: "GET",
      headers: { 
        "Content-Type": "application/json",
        "token":this.token
    },
      credential: true,
    };
    await fetch(this.baseUrl + "room/aircondition",initdata)
     .then((response) => response.json())
     .then((result) => data=result)
     .catch((err) => data=err);
    return data;
    }

  //get all room Bath Types
  async getBathType(){
    let data;
    const initdata = {
      method: "GET",
      headers: { 
        "Content-Type": "application/json",
        "token":this.token
    },
      credentials: 'include',
    };
    await fetch(this.baseUrl + "room/bathtype",initdata)
      .then((response) => response.json())
      .then((result) => data=result)
      .catch((err) => data=err);

      return data;
  }

  //get all room furniture
  async getFurnitureType(){
    let data;
    const initdata = {
      method: "GET",
      headers: { 
        "Content-Type": "application/json",
        "token":this.token
    },
      credentials: 'include',
    };
    await fetch(this.baseUrl + "room/furnituretype",initdata)
      .then((response) => response.json())
      .then((result) => data=result)
      .catch((err) => data=err);

      return data;
  }

  //get all room amenities
  async getAmenitiesType(){
    let data;
    const initdata = {
      method: "GET",
      headers: { 
        "Content-Type": "application/json",
        "token":this.token
    },
      credentials: 'include',
    };
    await fetch(this.baseUrl + "room/amenities",initdata)
      .then((response) => response.json())
      .then((result) => data=result)
      .catch((err) => data=err);

      return data;
  }

  //get all room entertainment
  async getEntertainmentType(){
    let data;
    const initdata = {
      method: "GET",
      headers: { 
        "Content-Type": "application/json",
        "token":this.token
    },
      credentials: 'include',
    };
    await fetch(this.baseUrl + "room/entertainment",initdata)
      .then((response) => response.json())
      .then((result) => data=result)
      .catch((err) => data=err);

      return data;
  }

  //get all room entertainment
  async getRoomServiceType(){
    let data;
    const initdata = {
      method: "GET",
      headers: { 
        "Content-Type": "application/json",
        "token":this.token
    },
    credentials: 'include',
    };
    await fetch(this.baseUrl + "room/service",initdata)
      .then((response) => response.json())
      .then((result) => data=result)
      .catch((err) => data=err);

      return data;
  }

  //get all room status
  async getRoomStatusType(){
    let data;
    const initdata = {
      method: "GET",
      headers: { 
        "Content-Type": "application/json",
        "token":this.token
    },
    credentials: 'include',
    };
    await fetch(this.baseUrl + "room/status",initdata)
      .then((response) => response.json())
      .then((result) => data=result)
      .catch((err) => data=err);

      return data;
  }

   //get all room view
   async getViewType(){
    let data;
    const initdata = {
      method: "GET",
      headers: { 
        "Content-Type": "application/json",
        "token":this.token
    },
    credentials: 'include',
    };
    await fetch(this.baseUrl + "room/view",initdata)
      .then((response) => response.json())
      .then((result) => data=result)
      .catch((err) => data=err);

      return data;
  }

  //get all room security
  async getSecurityType(){
    let data;

    const initdata = {
      method: "GET",
      headers: { 
        "Content-Type": "application/json",
        "token":this.token
    },
    credentials: 'include',
    };
    await fetch(this.baseUrl + "room/security",initdata)
    .then((response) => response.json())
    .then((result)=>data= result)
    .catch(err=>data=err);

    return data;
  }

  //upload room picture
  /**
 * Represents a book.
 * @constructor
 * @param {string} id - The room id.
 * @param {FormData} formData  - send {'imgCollection',FileList[index]}.
 */
  async uploadRoomPicture(hotelId,roomId,formData){

    let room;
    const initdata ={
      method:"POST",
      headers: {
        'token':this.token
      },
      credentials: "include",
      body:formData,
      redirect:'follow'
    }

   await fetch(`${this.baseUrl}room/hotel/${hotelId}/${roomId}/picture`,initdata)
    .then((response)=>response.json())
    .then((result)=>room=result)
    .catch((err)=>room=err);

    return room;
  }

  async ChangeImage(roomId,pictureId,formData){

    let load;
    let data;

    await this.uploadRoomPicture(roomId,formData).then(result=>{
      load = result;
    });
    if(load.message ==='สร้างรูปภาพเสร็จเเล้ว'){

      //delete old picture
     await this.deleteRoomPicture(roomId,pictureId).then(result=>{
       
        if(result){

          data = result;
        }

      })
    }
    return {load,data};
  }

  //delete room picture
  async deleteRoomPicture(roomId,pictureId){

    let data;

    const initdata = {
      method: "DELETE",
      headers: { 
        "Content-Type": "application/json",
        "token":this.token
    },
    credentials: "include"
    };
    await fetch(`${this.baseUrl}room/${roomId}/picture/${pictureId}`,initdata)
    .then(response=>response.json())
    .then(result => data = result)
    .catch(err => data = err);

    return data;
  }

}

/* eslint-disable prettier/prettier */
export class Hotel {
  context;

  baseUrl = process.env.VUE_APP_API;
  token = localStorage.getItem('token');
  constructor(context) {
    this.context = context;
  }

  //create hotel
  async createHotel(data,userId){
    let hotel;
    const initdata = {
      method:"POST",
      headers: { 
        "Content-Type": "application/json",
        "token":this.token 
      },
      credential: true,
      body:JSON.stringify(data)
    }
    await fetch(`${this.baseUrl}hotel/${userId}`,initdata)
    .then((response) => response.json())
    .then((result)=> hotel= result)
    .catch((error) => hotel = error);
    return hotel;
  }

  //get hotel by id
  async getHotel(id) {
    let hotel;
    const initdata = {
      method: "GET",
      headers: { 
        "Content-Type": "application/json" ,
        "token":this.token,
      },
      credential: true,
    };
    await fetch(this.baseUrl + `hotel/${id}`, initdata)
      .then((response) => response.json())
      .then((result) => (hotel = result))
      .catch((err) => (hotel = err));

    return hotel;
  }

// get hotel category
async getCatetory(){

  let category;

  const initdata = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credential: true,
  };
  await fetch(this.baseUrl + "hotel/category", initdata)
  .then((response) => response.json())
  .then((result) => (category = result))
  .catch((err) => (category = err));

  return category;
}

//get hotel amenities
async getAmenities(){

  let amenities;

  const initdata = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credential: true,
  };

  await fetch(this.baseUrl + "hotel/amenities", initdata)
  .then((response)=>response.json())
  .then((result)=>amenities = result)
  .catch((err)=>amenities=err)

  return amenities;
}

//get hotel highlights
  async getHighlight(){

    let highlight;

    const initdata = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credential: true,
    };

    await fetch(this.baseUrl + "hotel/highlight", initdata)
   .then((response) => response.json())
   .then((result) => (highlight = result))
   .catch((err) => (highlight = err));

    return highlight;
  }

  //get hotel ceritficate
  async getCertificate(){
    let certificate;
    const initdata = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credential: true,
    }

    await fetch(this.baseUrl + "hotel/certificate", initdata)
    .then((response)=>response.json())
    .then((result)=>certificate=result)
    .catch(err=>certificate=err)

    return certificate;
  }


//upload hotel picture
  /**
 * Represents hotel picture.
 * @constructor
 * @param {string} id - The hotel id.
 * @param {FormData} formData  - send {'imgCollection',FileList[index]}.
 */
  async uploadHotelPicture(id,formData){

    let hotel;
    const initdata ={
      method:"POST",
      headers: {
      },
      credential:"include",
      body:formData,
      redirect:'follow'
    }

   await fetch(`${this.baseUrl}hotel/${id}/picture`,initdata)
    .then((response)=>response.json())
    .then((result)=>hotel=result)
    .catch((err)=>hotel=err);

    return hotel;
  }

  async ChangeImage(hotelId,pictureId,formData){

    let load;
    let data;

    await this.uploadHotelPicture(hotelId,formData).then(result=>{
      load = result;
    });
    if(load.message ==='สร้างรูปภาพเสร็จเเล้ว'){

      //delete old picture
     await this.deleteHotelPicture(hotelId,pictureId).then(result=>{
       
        if(result){

          data = result;
        }

      })
    }
    return {load,data};
  }

  //delete hotel picture
  async deleteHotelPicture(hotelId,pictureId){

    let data;

    const initdata = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credential: true,
    };
    await fetch(`${this.baseUrl}hotel/${hotelId}/picture/${pictureId}`,initdata)
    .then(response=>response.json())
    .then(result => data = result)
    .catch(err => data = err);

    return data;
  }

  //update hotel information
  async updateHotel(hotelId,userId,updatedata){
    let data;
    const initdata = {
      method: "PATCH",
      headers: { 
        "Content-Type": "application/json",
        "token":this.token
       },
      body:JSON.stringify(updatedata),
      credential: true,
    }
    await fetch(`${this.baseUrl}hotel/${hotelId}/${userId}`,initdata)
    .then(response => response.json())
    .then(result=>data = result)
    .catch(err=>data = {status:false,error:err})

    return data;
  }

}

import store from "@/stores";

export class Calendar {
    context;
  
    baseUrl = process.env.VUE_APP_API;
    #token = localStorage.getItem('token');
    #hotel = store.state.user.service_id
    constructor(context) {
      this.context = context;
    }

    //get calendar

  async getCalendar(year,month) {
    var data;
    const initdata = {
        method: "GET",
        headers: {
          token:this.#token
        },
        credentials: 'include',
      };

      await fetch(`${this.baseUrl}calendar/${this.#hotel}?year=${year}&month=${month}`,initdata)
      .then(response =>response.json())
      .then(result => data = {status:"ok",data:result})
      .catch(err=>data = {status:false,error:err})

      return data;
  }



}
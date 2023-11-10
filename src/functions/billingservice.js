export class Billing {

    baseUrl = process.env.VUE_APP_API;
    #token = localStorage.getItem('token');

    constructor(context) {
        this.context = context;
    }

    //get billing report
    async getBillingReport(hotel_id){
        var data;
    const initdata = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token:this.#token
        },
        credentials: 'include',
      };

      await fetch(`${this.baseUrl}billing/${hotel_id}`,initdata)
      .then(response =>{
        if(response.status===200){
            
           return response.json()

        }else{
            
            return {status:false,data:response.data};
        }
        })
      .then(result => data = result)
      .catch(err => data = {status:false,error:err});

      return data;
    }

    
    //get summary 
    async getBillingSummary(hotel_id){
      var data;
      const initdata = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token:this.#token
        },
        credentials: 'include',
      };
      
      await fetch(`${this.baseUrl}billing/${hotel_id}/summary`,initdata)
      .then(response =>{
        if(response.status===200){
          
          return response.json()
          
        }else{
          
          return {status:false,data:response.data};
        }
      })
      .then(result => data = result)
      .catch(err => data = {status:false,error:err});
      
      return data;
}

}

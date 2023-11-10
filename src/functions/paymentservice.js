import store from '@/stores'

export class Payment {

    baseUrl = process.env.VUE_APP_API;
    #token = localStorage.getItem('token');
    #service_id = store.state.user.service_id;

    constructor(context) {
        this.context = context;
    }

    //get paymentslip
    async getPaymentSlip(){
        var data;
    const initdata = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token:this.#token
        },
        credentials: 'include',
      };

      await fetch(`${this.baseUrl}payment/${this.#service_id}`,initdata)
      .then(response =>{
        if(response.status===200){
            
           return response.json()

        }else{
            
            return {status:false,data:response.data};
        }
        })
      .then(result => data = {status:true,data:result})
      .catch(err => data = {status:false,error:err});

      return data;
    }

    //get paymentslip by payment_number
    async  getPaymentSlipByPaymentNumber(id){
      var data;
      const initdata = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token:this.#token
          },
          credentials: 'include',
        };
  
        await fetch(`${this.baseUrl}payment/${this.#service_id}/${id}`,initdata)
        .then(response =>{
          if(response.status===200){
              
             return response.json()
  
          }else{
              
              return {status:false,data:response.data};
          }
          })
        .then(result => data = {status:true,data:result})
        .catch(err => data = {status:false,error:err});
  
        return data;
    }

}
export class User {

baseUrl = process.env.VUE_APP_API;
token = localStorage.getItem('token');

constructor(context){
    this.context = context;
  }

    //-------------------------- CreateAccount -----------------------//

    async CreateUser(data){
        
      let user;
      const initdata = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    };
    await fetch(this.baseUrl + "signup", initdata)
      .then((response) => response.json())
      .then((result) => user = result)
      .catch((err) => user = err);

      return user;
    }

    //----------------------- login --------------------------//

    async SignIn(data){
        let user;
        const initdata = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          url:'${this.baseUrl}signin/admin',
          body: JSON.stringify(data),
          credentials: "include",
        };
        await fetch(this.baseUrl + "signin", initdata)
          .then((response) => response.json())
          .then((result) => user = result)
          .catch((err) => user = err);
          this.user = user;
      
          return user;
    }
    //------------------------ logout -------------------------//

    async SignOut(){
      let response;
      const initdata = {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "token":this.token
        },
        credentials: "include"
      };
      await fetch(`${this.baseUrl}users/signout`, initdata)
        .then((response) => response.json())
        .then((result) => response = result)
        .catch((err) => response = err);
  
        return response;
    }

    //Me
    async Me(){
     if(!this.token){
      return {status:false,message:'No Authentication'};
     }

      let user;
        const initdata = {
          method: "POST",
          headers: { 
            "Content-Type": "application/json" ,
            "token":this.token
          },
          credentials: 'include',
        };
        await fetch(this.baseUrl + "users/me", initdata)
          .then(response => response.json())
          .then((result) => user = result)
          .catch((err) => user = err);

          return user;
    }
}
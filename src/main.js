// main.js
import jwtDecode from "jwt-decode";
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import store from "./store";
const app = createApp(App); 
app.use(store);
try {
    const token = localStorage.getItem("token");
    const jwt_decode = jwtDecode(token);
    if(jwt_decode.roles){
        app.use(router);
    }
    
  } catch (err) {
    app.use(router);
  }
app.mount('#app')


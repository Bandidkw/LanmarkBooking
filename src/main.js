// main.js
import {jwtDecode} from "jwt-decode";

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import store from "./store";
import PrimeVue from 'primevue/config';
import "primeicons/primeicons.css";
import "primevue/resources/primevue.min.css"; //core css
import "primevue/resources/themes/lara-light-purple/theme.css"; //theme
// //prime flex
import  "primeflex/primeflex.css";
import "./assets/style.css"
const app = createApp(App); 

////
import Button from "primevue/button";
import Card from 'primevue/card';
import ConfirmationService from "primevue/confirmationservice";
import ConfirmDialog from "primevue/confirmdialog";
import Dialog from "primevue/dialog";
import Dropdown from 'primevue/dropdown';
import InputText from "primevue/inputtext";
import Menubar from 'primevue/menubar';
import Panel from 'primevue/panel';
import ProgressSpinner from "primevue/progressspinner";
import Steps from 'primevue/steps';
import Toast from "primevue/toast";
import ToastService from "primevue/toastservice";

import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup'; 
import DataTable from 'primevue/datatable';
import Row from 'primevue/row'; 

import InputNumber from 'primevue/inputnumber';

import Textarea from 'primevue/textarea';


app.use(PrimeVue);
app.use(ToastService);
app.use(ConfirmationService);
////
app.use(store)
try {
    const token = localStorage.getItem("token");
    const jwt_decode = jwtDecode(token);
    if(jwt_decode.roles=="admin"){
       console.log("admin")
    }
    else if (jwt_decode == "partner"){
      console.log("partner")
    }
    else if (jwt_decode == "member"){
      console.log("member")
    }else{
      console.log("ยังไม่ได้ล็อคอิน")
    }
    
  } catch (err) {
    console.log("test")
  }
  app.use(router);

////
app.component('AppButton', Button);
app.component('AppInputText', InputText);
app.component('AppCard', Card);
app.component('AppDropdown', Dropdown);
app.component('AppSteps', Steps);
app.component('AppMenubar', Menubar);
app.component('AppPanel', Panel);
app.component('AppTextarea', Textarea);
app.component('AppInputNumber', InputNumber);
app.component('AppRow', Row);
app.component('AppColumnGroup', ColumnGroup);
app.component('AppColumn', Column);
app.component('AppDataTable', DataTable);
app.component("AppToast", Toast);
app.component("AppConfirmDialog", ConfirmDialog);
app.component("AppProgressSpinner", ProgressSpinner);
app.component("AppDialog", Dialog);
app.mount('#app')


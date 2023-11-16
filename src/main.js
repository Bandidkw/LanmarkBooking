import jwtDecode from "jwt-decode";
import PrimeVue from 'primevue/config';
import { createApp } from 'vue';
import App from './App.vue';
import './assets/main.css';
//import routerAdmin from './router/admin.js'; // นำมาใช้ Router ที่เราสร้าง
import router from './router/index.js'; // นำมาใช้ Router ที่เราสร้าง

import store from "./store";

import "primeicons/primeicons.css"; //icons
import "primevue/resources/primevue.min.css"; //core css
import "primevue/resources/themes/lara-light-purple/theme.css"; //theme
//prime flex
import "primeflex/primeflex.css";

const app = createApp(App); // สร้างแอปพลิเคชัน Vue ที่เป็นที่ต้องการ

import Button from "primevue/button";
import Calendar from 'primevue/calendar';
import Card from 'primevue/card';
import Chip from 'primevue/chip';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';
import ConfirmationService from "primevue/confirmationservice";
import ConfirmDialog from "primevue/confirmdialog";
import DataTable from 'primevue/datatable';
import Dialog from "primevue/dialog";
import Dropdown from 'primevue/dropdown';
import InputText from "primevue/inputtext";
import Menubar from 'primevue/menubar';
import ProgressSpinner from "primevue/progressspinner";
import Row from 'primevue/row';
import Toast from "primevue/toast";
import ToastService from "primevue/toastservice";

app.use(PrimeVue);
app.use(ToastService);
app.use(ConfirmationService);
app.use(store);

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
app.component('Button', Button);
app.component('InputText', InputText);
app.component('Card', Card);
app.component('Dropdown', Dropdown);
app.component('Menubar', Menubar);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('ColumnGroup', ColumnGroup);
app.component('Row', Row);
app.component('Chip', Chip);
app.component('Calendar', Calendar);
app.component("Toast", Toast);
app.component("ConfirmDialog", ConfirmDialog);
app.component("ProgressSpinner", ProgressSpinner);
app.component("Dialog", Dialog);

app.mount('#app'); // นำแอปพลิเคชัน Vue ลงใน DOM

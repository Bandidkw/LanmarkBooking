<template>
  <b-row>
    <b-col md="auto">
        <div class="card-calendar px-1 py-1">

            <b-calendar
            class="calendar-style"
            v-model="value"
            @context="onContext"
            :date-info-fn="dateClass"
            locale="th-TH"
            ></b-calendar>
        </div>
    </b-col>
   
  </b-row>
</template>

<script>
import { BCalendar,BRow,BCol } from 'bootstrap-vue';
export default {
    setup(props){
        return {
            props
        }
    },
    components:{
        BCalendar,BRow,BCol
    },
    props:{
        data:Object
    },
    mounted(){
        
        this.first_day = new Date(this.props.data.first_day).getTime();
        this.last_day = new Date(this.props.data.last_day).getTime();
       
    },
  data() {
    return {
      value: "",
      context: null,
      first_day:null,
      last_day:null,
    };
  },
  methods: {
    onContext(ctx) {
      this.context = ctx;
      this.$emit('datepicker',this.context);
    },
    dateClass(ymd, date) {
        const day = date.getTime()
        return day >= this.first_day && day <= this.last_day ? 'table-info' : ''
      }
  },
};
</script>

<style lang="scss">
.card-calendar{
    background-color: white;
}
.calendar-style{

padding: 0.2rem;
    .btn{
        background-color: rgb(255, 255, 255);
        color: rgb(6, 8, 10);
    }

}

.btn{
    background-image: none;
}
div>.btn:hover{
    color : white !important;
}

.b-calendar-nav{

    .btn{
        background-color: rgb(14, 179, 255);
        color:white
    }
   
}

.text-muted {
    color: #bbbdbf !important;
}

.b-calendar-grid-body{

    div{

        div{
               .btn-outline-primary{
                background-color: var(--primary) !important;
                color: white;
               }
    }
}
}

</style>
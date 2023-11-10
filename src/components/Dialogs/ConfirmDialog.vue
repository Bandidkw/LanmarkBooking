<template>
    <div class="dialog-container">
        <div class="dialog-content">

            <div class="header-content">

                <slot name="header">
                 
                </slot>
            </div>
         

                <slot name="body">
                    {{ data }}
                </slot>
      
            <div class="footer-content">

                <slot name="footer">
            

                        <base-button link @click="close">ยกเลิก</base-button>
                        <base-button type="primary" @click="confirm">ตกลง</base-button>
               
               
                </slot>
            </div>
        </div>
        </div>
</template>
<script>
export default {
  
    props:{
        data:Object
    },
    emits:['close','confirm'],
    methods:{
        close(){
            this.$emit('close',false);
        },
        confirm(){
            this.$emit('confirm',{confirm:true,data:this.data})
        }
    }
}
</script>
<style scoped>
.dialog-container{
    margin: 0;
    position: absolute;
    top: 0;
    left:0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0,0.3);
    z-index: 2;
}
.dialog-content{
    position: absolute;
    padding: 3rem;
    top: calc(50% - 125px);
    left:calc(50% - 225px);
    background-color: white;
    border-radius: 0.3rem ;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 450px;
    height: 250px;
}
.header-content{
    position: absolute;
    top:3rem;
}
.body-content{
    text-align: center;
}
.footer-content{

    margin: auto;
    position: absolute;
    bottom: 2rem;
    width: 100%;

}
</style>
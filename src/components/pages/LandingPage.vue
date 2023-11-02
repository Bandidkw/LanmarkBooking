<template>
    <div class="body-container">
        <div>
            <NavbarMain class="nav-bar"/>
        </div>
        <div class="view">
            <router-view/>
        </div>
       
        <div class="footer d-none d-md-block">
            <Footer/>
        </div>

    </div>
</template>
<script>
import NavbarMain from "@/components/LandingPage/NavbarMain";
import Footer from "@/components/LandingPage/Footer";

export default {

    components: {
        Footer,NavbarMain
    },
    data(){
        return{
            userlogin:false,
        }
    },
    

}
</script>
<style scoped>
.nav-bar{
    z-index: 999;
}

h1{
    margin: 0;
}
h3 {
    margin: 0;
}

.body-container{
    padding: 0;
    background-image: url("/images/bg-img.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50% 50%;
    overflow: hidden;
    min-height: 100vh;

}
.view{
display:flex;
justify-content: center;
align-items: center;
width:100%;
min-height: calc(100vh - 190px);
z-index: 0;
}

.footer{

    bottom: 0;
    padding: 0;
}

@media screen and (max-width: 650px) {
  h2{
    font-size: 1.2rem;
  }
}

@media screen and (max-width:450px){
    .view{
        min-height: fit-content;
        align-items: start;
    }
}


</style>
<template>
    <div class="body-container">
        <div class="top-wep">
            <NavbarMain class="nav-bar"/>
        </div>
        <div class="view">
            <router-view/>
        </div>
        <!-- <div class="footer">   
            <LandingPageFooter/>
        </div> -->
    </div>
</template>
<script>
import NavbarMain from "@/components/LandingPage/NavbarMain";
// import LandingPageFooter from "@/components/LandingPage/LandingPageFooter";

export default {

    components: {
        // LandingPageFooter,
        NavbarMain
    },
    data(){
        return{
            userlogin:false,
        }
    },
    

}
</script>
<style scoped>
*{
    margin: 0;
    padding: 0;
    text-decoration: none;
    box-sizing: border-box;
}
/* .top-wep{
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
} */
.nav-bar{
    box-shadow: 0px -2px 17px -7px rgba(0,0,0,0.37);
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
}

h1{
    margin: 0;
}
h3 {
    margin: 0;
}

.body-container{
    /* position: relative; */
    padding: 0;
    margin: 0;
    background-color: #fff;
    background-image: url("/images/view3.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50% 50%;
    overflow: hidden;
    min-height: 100vh;
}
.view{
    /* background-color: #fff; */
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width:100%;
    /* min-height: calc(100vh - 190px); */
    z-index: 0;
}

.footer{
    background-color: #fff;
    /* position: fixed; */
    width: 100%;
    /* bottom: 0;
    left: 0; */
    padding: 0.5rem;
}
.body-container i{
    position: absolute;
    background: none;
    bottom: 0;
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
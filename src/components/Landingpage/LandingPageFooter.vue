<template>
    <div class="foot-content">
        <div class="footer-left">
            <p>Home</p>
            <p>Sell</p>
            <p>Help&Contact</p>
            <p>Inverter</p>
        </div>
        <div>
            <p style="color: black; padding-top: 6.5rem;">© 2023 Lanmark Hotel</p>
        </div>
        <div class="footer-right">
            <p>Download The Free Lanmark App</p>
            <div class="store-app">
                <a href=""><i class="bi bi-apple"></i></a>
                <a href=""><i class="bi bi-google-play"></i></a>
            </div>
        </div>
    </div>
</template>
<script></script>
<style scoped>
.foot-content{
    padding: 0 10rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    background-color: white;
    -webkit-box-shadow: 0px -2px 17px -7px rgba(0,0,0,0.37);
    -moz-box-shadow: 0px -2px 17px -7px rgba(0,0,0,0.37);
    box-shadow: 0px -2px 17px -7px rgba(0,0,0,0.37);
}
.footer-left p{
    cursor: pointer;
    font-size: 1rem;
    font-weight: 600;
    text-align: left;
    color: black;
}
.footer-right p{
    line-height: 1;
    font-size: 1rem;
    font-weight: 600;
    text-align: left;
    color: black;
}
.store-app a i{
    color: black;
    font-size: 2rem;
}
.store-app{
    column-gap: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
}
@media screen and (max-width:450px) {
    .content {
    margin-left:2rem !important ;
    margin-right:2rem !important;
    border-top-right-radius: 2rem;
    border-top-left-radius: 2rem;
    }
.row{
    margin: 0;
    }
.col-2{

    padding-left: 0.2rem !important;
    padding-right: 0.2rem !important;
    }
.partner-logo{
    padding: 0.2rem 0;
    }
}
@media screen and (max-width: 900px) {
  .content {
    margin: 0 5rem;
  }
}
</style>
<template>
  <div class="invitation px-3">
    <div class="title">
        <h2 class="card-title">ร่วมเป็นพาร์ทเนอร์กับเรา</h2>
        <h1>พร้อมกับรับสิทธิพิเศษมากมาย</h1>
        <button class="btn btn-primary mt-3" type="primary">สมัครสมาชิก</button>
    </div>
  </div>
</template>

<!---------------- Script-Section ---------------->

<script></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
      .invitation{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        max-width: 800px;
        min-height: calc(100vh - 206px);
    }
    .title {
        border-radius: 25px;
        text-align: center;
        padding: 15rem 0;
        max-width: 600px;
        height: 500px;
        min-height: calc(100vh - 350px);
        background-color: #000;
        background: rgba(0,0,0, 0.4);
        width: auto;
        width: 100%;
        -webkit-box-shadow: 0px 0px 17px 5px rgba(223, 0, 186, 0.37);
        -moz-box-shadow: 0px 0px 317px 5px rgba(223, 0, 186, 0.37);
        box-shadow: 0px 0px 17px 5px rgba(223, 0, 186, 0.37);
    }
    .btn{
        border: #fff 1px solid;
        background: rgba(0,0,0, 0.5);
    }
    .btn:hover{
        color: #fff;
        background-color: #f15bb5;
    }
</style>
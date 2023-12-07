<template >
  <div id="pdf-content" ref="content">
    <!-- <div>
      <Button label="Contract Electronic" icon="pi pi-external-link" @click="sidebar = true" />
    </div> -->

    <Dialog v-model:visible="sidebar" modal :closable="false" :style="{ width: '80%' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
      <template v-slot:header>
        <div style="text-align: center; font-size: 1.5rem; font-weight: bold;">
          สัญญาการใช้งาน lanmark ของ partner
        </div>
      </template>
      <div class="grid mt-2 " style="border: 1px solid #ccc;">
        <div class="col-12 md:col-12 text-center">
          <h2>สัญญาการใช้งาน lanmark ของ partner</h2>
        </div>
        <div class="col-12 md:col-12 px-3">
          <h3 style="text-indent: 1em;">หนังสือสัญญาการเป็นคู่ค้า</h3>
          <p style="text-indent: 2.5em;">หนังสือสัญญาการเป็นคู่ค้าฉบับนี้(ข้อตกลง) กระทำขึ้นเมื่อวันที่ 22 พฤศจิกายน
            พ.ศ.2560</p>
          <p style="text-indent: 2.5em;">1.นายกรวิทย์ บัวครั้น เลขที่บัตรประจำตัวประชาชน 1029000643262 ที่อยู่ 16/330 In
            the memory apartment set รัชดาภิเษก แยก 9-11 แขวงจันเกษม เขตจตุจักร จังหวัดกรุงเทพมหานคร รหัสไปรษณี 10900
            (ต่อไปนี้เรียกว่า คู่ค้าฝ่ายที่ หนึ่ง)</p>
          <p style="text-indent: 2.5em;">(2) นายศุภัคกิตต์ ใจเย็น เลขที่บัตรประจำตัวประชาชน 357990000330 ที่อยู่ 103
            หมู่ที่ 4 ถนนรอบเมืองเชียงใหม่ ตำบลสุ เทพ อำเภอเมืองเชียงใหม่ จังหวัดเชียงใหม่ รหัสไปรษณี 50200
            (ต่อไปนี้เรียกว่า “คู่ค้าฝ่ายที่สอง”)</p>
          <p style="text-indent: 2.5em;">โดยสู้ค่าฝ่ายที่สอง มีความประสงค์ขอที่พัฒนาและดูแลแก้ไขปรับปรุง
            ปัญหาต่างๆเกี่ยวกับเว็บไซด์ของ lanmark.com เข้าร่วมเป็นพันธมิตรทางการค้า ตาม lanmark.com กำหนดขอบเขตหน้าที่
            จนกว่าจะเลิกจ้าง โดยไม่เปิดเผยข้อมูลของ lanmark.com. ให้แก่บุคคลภายนอกโดยไม่ได้รับความยินยอม
            ซึ่งต่อไปในสัญญานี้จะเรียกว่า คู่ค้า โดย คู่ค้า
            จะต้องปฏิบัติ ตามหลักเกณฑ์เงื่อนไข หรือนโยบายที่ ภายใต้ชื่อ lanmark.com กำหนดอย่างเคร่งครัด</p>
          <p style="text-indent: 2.5em;">โดยที่คู่ค้าฝ่ายที่สองเป็นผู้พัฒนาแพลตฟอร์มช้อปปิ้งออนไลน์
            ตามสัญญาจ้างจนกว่าจะบอกเลิกสัญญาภายใต้ชื่อเรียกว่า แลนมาร์กดอทคอม "lanmark.com" ซึ่งเป็นผู้รวบรวม
            สินค้าและบริการต่างๆ</p>
          <!--สัญญา-->
          <h3 style="text-indent: 1em;">คู่สัญญาทั้งสองฝ่ายตกลงทำสัญญานี้เพื่อผูกพันระหว่างกันตามข้อกำหนดและเงื่อนไข
            ดังต่อไปนี้</h3>
          <!---ข้อ 1 -->
          <p style="text-indent: 2.5em;font-weight: bold;"> 1. วัตถุประสงค์และความร่วมมือของคู่สัญญา </p>
          <p style="text-indent: 4em;">1.1 เพื่อให้คู่สัญญา ทราบถึงขอบเขตในการดำเนินงานร่วมกับlanmark.com</p>
          <p style="text-indent: 4em;">1.2 เพื่อให้คู่สัญญาทราบถึงขอบเขตในการปฏิบัติงาน</p>
          <p style="text-indent: 4em;">1.3 เพื่อให้คู่ค้าสัญญา ทราบถึง บทบาท หน้าที่ และข้อจำกัดต่างๆ
            และสิทธิอันพึงมีภายใต้สัญญาฉบับนี้</p>
          <p style="text-indent: 4em;">1.4 เพื่อให้คู่สัญญา ทราบถึงข้อกำหนดและเงื่อนไขต่างๆ ของการปฏิบัติต่อกัน
            ในฐานะคู่สัญญา ฉบับนี้</p>
          <!---ข้อ 2 -->
          <p style="text-indent: 2.5em;font-weight: bold;">2.ขอบเขตการดำเนินงานของคู่ค้า</p>
          <p style="text-indent: 4em;">
            คู่ค้าจะพัฒนาระบบเว็บไซต์ระบบการชำระเงินการอัพเดตเว็ปไซต์เว็ปไซต์ส้มและดูแลเกี่ยวกับปัญหาต่างๆของเว็บไซต์ตามสัญญาจ้างที่ได้ตกลงกันไว้ต่างๆ
          </p>
          <!---ข้อ 3 -->
          <p style="text-indent: 2.5em;font-weight: bold;">3.เงื่อนไขและค่าตอบแทนให้คู่ค้า</p>
          <p style="text-indent: 4em;">ตกลงชำระเงินผ่านบัญชีตามสัญญาจ้างขนของตามลักษณะงานประเภทนั้นๆ</p>
          <!---ข้อ 4 -->
          <p style="text-indent: 2.5em;font-weight: bold;">4.อายุของสัญญาการเป็นคู่ค้า</p>
          <p style="text-indent: 4em;">หนังสือสัญญาการเป็นคู่ค้านี้มีอายุ 150 วัน ซึ่งมีผลบังคับใช้ตั้งแต่ 22 พฤศจิกายน
            และพิจารณาการต่ออายุทุกๆ 150 วัน หลัง หมดสัญญา โดยคู่ค้ามีสิทธิอันพึงบอกเลิกสัญญาได้คราวโตคราวหนึ่ง
            โดยไม่จจำเป็นต้องแจ้งให้ทราบล่วงหน้า</p>
          <!---ข้อ 5 -->
          <p style="text-indent: 2.5em;font-weight: bold;">5.การเปลี่ยนแปลงสัญญา</p>
          <p style="text-indent: 4em;">Lanmark.comขอสงวนสิทธิในการเปลี่ยนแปลงสัญญาตามที่เห็นสมควรโดยlanmark.com
            จะแจ้งเป็นลายลักษณ์อักษรให้ คู่ค้าทราบก่อนเริ่มการเปลี่ยนแปลงไม่น้อยกว่า 30 วัน โดยสัญญาจะมีผลก็ต่อเมื่อ
            ทั้งสองฝ่าย ได้ต่างเห็นชอบและมีการลงนามในสัญญาร่วมกัน ทั้ง "lanmark.com" และ "คู่ค้า” เป็นที่เรียบร้อย</p>
          <!---ข้อ 6 -->
          <p style="text-indent: 2.5em;font-weight: bold;">6.หน้าที่เมื่อคู่ค้าเมื่อสัญญาสิ้นสุดลง</p>
          <p style="text-indent: 4em;">เมื่อคู่ค้าได้รับการแจ้งจากทาง lanmark.com
            ว่าสัญญานี้ได้สิ้นสุดลงไม่ว่าด้วยเหตุผลใด คู่ค้าต้องนำสื่อต่างๆที่เกี่ยวกับคู่ค้า
            ทุกอย่างภายในการบริการของคู่ค้าออกภายใน 7 วัน
            จะถือว่าผู้ค้ามีเจตนาที่จะทำให้ลูกค้าเกิดความสับสน เข้าใจผิด เกี่ยวข้องกับกิจการของ lanmark.com
            ทั้งนี้ไม่เกินกว่ามูลค่าความเสียหายที่เกิดขึ้นจริง และ lanmark.com พิสูจน์ความ เสียหายนั้นได้จริง
            กรณีคู่สัญญาฝ่ายใดฝ่ายหนึ่ง
            ละเมิดข้อตกลงหรือไม่ปฏิบัติตามเงื่อนไขข้อหนึ่งข้อใดในสัญญาการเป็นคู่ค้า
            ฉบับนี้ อีกฝ่ายหนึ่งมีสิทธิบอกเลิกสัญญาและ/หรือมีความเสียหายเกิดขึ้น
            คู่สัญญาฝ่ายที่ผิดเงื่อนไขต้องรับผิดชอบชดใช้ ค่าเสียหายที่เกิดขึ้นเท่ากับความเสียหายที่เกิดขึ้น
          </p>
          <!--- -->
          <h3 style="text-indent: 1em;">เอกสารที่ทางคู่ค้าต้องเตรียมให้กับทางlanmark.com</h3>
          <ul>
            <li>สำเนาบัตรประจำตัวประชาชนของผู้มีอำนาจลงนามพร้อมลงลายมือชื่อรับรองสำเนาถูกต้อง</li>
            <li>สำเนาบัญชีสมุดธนาคารที่จะให้ทางlanmark.com โอนเงินชำระค่าบริการ พร้อมลงลายมือชื่อรับรองสำเนาถูกต้อง</li>
          </ul>
        </div>
      </div>
      <div class="grid mt-5">
        <div class="col-12 md:col-12 text-center">
          <Button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mx-2 boeder-none"
            @click="approve(datacontract._id)">คุณยินยอมสัญญา</Button>
          <Button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            @click="unapprove()">ไม่ยืนยันสัญญา</Button>
            <Button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2 border-none"
      @click="download">Download PDF</Button>
        </div>
      </div>
    </Dialog>
  </div>
</template>
<script>
import jsPDF from 'jspdf' 
import html2canvas from "html2canvas"
export default {
  data() {
    return {
      prop: {
        // datacontract: '',
        id: String,
        id: '',
      },
      sidebar: true,
      // datacontract: ""
    }
  },
  watch: {
    prop: {
      deep: true,
      handler() {
        // ทำให้ addcontract ทำงานทุกครั้งที่มีการเปลี่ยนแปลงใน prop
        this.addcontract();
      }
    }
  },
  // mounted() {
  //   this.getcontract();
  // },
  methods: {
download() {
  const doc = new jsPDF();
  const contentHtml = this.$refs.content.innerHTML;
  doc.fromHTML(contentHtml, 15, 15, {
    width: 170
  });
  doc.save("sample.pdf");
 },

 downloadWithCSS() {
   const doc = new jsPDF();
   /** WITH CSS */
   var canvasElement = document.createElement('canvas');
    html2canvas(this.$refs.content, { canvas: canvasElement 
      }).then(function (canvas) {
    const img = canvas.toDataURL("image/jpeg", 0.8);
    doc.addImage(img,'JPEG',20,20);
    doc.save("sample.pdf");
   });
 },
    async getcontract() {
      try {
        const Response = await axios.get(`${process.env.VUE_APP_API}contract/partner/`,
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          });
        console.log(Response.data.message)
        if (Response.data.status === true) {
          this.datacontract = Response.data.data;
          if (Response.data.data.status === true) {
            this.sidebar = false
          } else {
            this.sidebar = true
          }
          console.log(Response.data.data);
        }
        else if (Response.data.message === "ไม่มีข้อมูล contract") {
          console.log("ยังไม่สร้าง contract")
          await this.addcontract();
        } else {
          console.error("Data is missing in the API response.");
        }
      } catch (error) {
        console.error(error);
      }
    },
    async addcontract() {
  try {
    const Response = await axios.post(`${process.env.VUE_APP_API}contract/`, {},
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

    if (Response.data.status === true) {
      this.datacontract = Response.data.data;
      await this.approve(this.prop.id) // เปลี่ยน id เป็น this.prop.id
      console.log("สร้าง")
      console.log(Response.data.data);
      this.sidebar = true
    } else {
      console.error("Data is missing in the API response.");
    }
  } catch (error) {
    console.error(error);
  }
},

    async approve(id) {
      try {
        const Response = await axios.put(`${process.env.VUE_APP_API}contract/accept/${id}`, {},
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          });

        if (Response.data.status === true) {
          this.sidebar = false
        } else {
          console.error("Data is missing in the API response.");
        }
      } catch (error) {
        console.error(error);
      }
    },
    async unapprove() {

      localStorage.clear();
      this.$store.commit("setLoginDefault");
      this.sidebar = false
      // Swal.fire({
      //   icon: "error",
      //   title: "กรุณายินยอมสัญญาก่อน",
      //   text: "ถ้าคุณไม่ยินยอมสัญญาจะไม่สามารถเข้าใช้งานได้",
      // });
      this.$router.push("/");

    }
  }
}
</script>
<style ></style>
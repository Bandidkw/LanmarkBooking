<template>
  <Dialog
    v-model:visible="sidebar"
    modal
    :closable="false"
    :style="{ width: '80%' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    @show="handleDialogShow"
  >
    <template v-slot:header>
      <div style="text-align: center; font-size: 1.5rem; font-weight: bold">
        สัญญาการใช้งาน lanmark ของ partner
      </div>
    </template>
    <div class="grid mt-2 px-4" style="border: 1px solid #ccc" ref="content" id="contractContent">
      <div class="col-12 md:col-12 text-center">
        <h2>สัญญาการใช้งาน lanmark ของ partner</h2>
      </div>
      <div class="col-12 md:col-12 px-3">
        <!--สัญญา-->
        <h3 style="text-indent: 1em">หนังสือสัญญาการเป็นคู่ค้า</h3>
        <p style="text-indent: 2.5em">
          สัญญาฉบับนี้ทำขึ้นระหว่าง นาย กรวิทย์ บัวครื้น
          บัตรประจำตัวประชาชนเลขที่ 1929900543262 อยู่บ้านที่ 15/330 ตึก the
          memory aparment ซอยรัชดาภิเษก36 แยก9-11 แขวงจันเกษม เขตจัตุจักร
          จังหวัดกรุงเทพมหานคร รหัสไบรษณี 10900 ซึ่งต่อไปนี้ในสัญญานี้จะเรียกว่า
          “landmark.online” ฝ่ายหนึ่ง
        </p>
        <p style="text-indent: 2.5em">
          กับ......ชื่อ.................................
          (รายละเอียดที่พักอย่างละเอียด)หมายเลขโทรศัพท์........จำนวน............ห้อง
          ในวันที่ทำสัญญาฉบับนี้เป็นต้นไป
          ในราคาค่าเช่า................บาท.....(....................................)
          ซึ่งต่อไปนี้ในสัญญานี้จะเรียกว่า“ผู้ให้เช่า”
          ทั้งสองฝ่ายได้อ่านและตกลงกันดังมีข้อความดังต่อไปนี้
        </p>
        <h4 style="text-indent: 2.5em">
          ข้อ 1. ผู้ให้เช่าตกลงประกาศให้เช่าที่พักในแพลตฟอร์ม landmark.online
          โดยให้หักค่าธรรมเนียม 10% (
          สิบเปอร์เซ็นต์)ของยอดเงินการจองจำนวนเงินทั้งหมดที่ 10%
          สำหรับการให้บริการบนแพลตฟอร์มจองที่พักออนไลน์ ในแต่ละคราวการจอง
        </h4>
        <h4 style="text-indent: 2.5em;">
          ข้อ 2. ผู้ให้เช่าตกลงยินยอม
          หากผู้เช่าจองล่วงหน้าโดยไม่ต้องว่างเงินประกันยกเลิกการจองได้ก่อนถึงกำหนดระยะเวลาก่อนวันที่จอง
          ภายใน 24 ช.ม. ผู้ให้เช่ายินยอมและรับความเสี่ยงเสียหายแก่ผู้ให้เช่าเอง
        </h4>
        <h4 style="text-indent: 2.5em">ข้อ 3. ระยะเวลาของสัญญา</h4>
        <p style="text-indent: 2.5em">
          สัญญาฉบับนี้เริ่มต้นมีผลบังคับใช้ตั้งแต่วันที่ 14 ธันวาคม พ.ศ.2566
          สิ้นสุดระยะเวลาของสัญญา วันที่ 14 ธันวาคม พ.ศ.2567
        </p>
        <h4 style="text-indent: 2.5em">ข้อ 4. การชำระเงิน</h4>
        <p style="text-indent: 2.5em">
          4.1 เงินของผู้เช่าจะฝากไว้ที่ landmark.online
          จนกว่าผู้เช่าจะเช็คเฮ้าส์และพักครบกำหนดวันที่เช่าผ่านแพลตฟอร์ม
          lanmark.online แล้วส่งมอบเงินให้แก่ผู้ให้เช่า ภายใน 24
          ช.ม.หลังหักค่าธรรมเนียมบริการไว้ 10%
          ของยอดเงินทั้งหมดของวันที่ผู้เช่าพักเสร็จ ไม่เกินกำหนดระยะเวลา 7 วัน
        </p>
        <p style="text-indent: 2.5em">
          4.2 หากผู้เช่าไม่ได้ใช้บริการชำระเงินให้แก่landmark.online
          ทางแพลตฟอร์มไม่รับผิดชอบความเสียหายที่เกิดขึ้น
        </p>
        <p style="text-indent: 2.5em">
          4.3 หากมีความเสียหายใดๆก่อขึ้นแก่ทรัพย์สินการใช้สอยของที่พักทุกชนิด
          แพลตฟอร์มlanmark.online ไม่รับผิดชอบความเสียหายแก่ที่พักของผู้ให้เช่า
        </p>
        <p style="text-indent: 2.5em">
          4.4
          ผู้ให้เช่ายิมยอมช่วยปกปิดความลับการใช้บริการและข้อมูลส่วนตัวของผู้เช่าในการใช้บริการจองที่พักออนไลน์ทั้งหมดโดยไม่เปิดเผยออกสู่สาธารณะและบุคคลทั่วไป
        </p>
        <p style="text-indent: 2.5em">
          คู่สัญญาทั้งสองฝ่ายได้อ่านข้อความดังที่ปรากฎไว้ดังกล่าวข้างต้นแล้ว
          จึงลงลายมือชื่อไว้เป็นสำคัญ
        </p>
        <!-- ลงนาม -->
        <p style="text-indent: 2.5em; text-align: right">
          ลงชื่อ ....................landmark.online
        </p>
        <p style="text-indent: 2.5em; text-align: right">
          (นายกรวิทย์ บัวครื้น)
        </p>
        <p style="text-indent: 2.5em; text-align: right">
          ลงชื่อ.....................................ผู้ให้เช่า
        </p>
        <p style="text-indent: 2.5em; text-align: right">
          (........................................)
        </p>
        <p style="text-indent: 2.5em; text-align: right">
          ลงชื่อ........................................พยาน
        </p>
        <p style="text-indent: 2.5em; text-align: right">
          (........................................)
        </p>
        <p style="text-indent: 2.5em; text-align: right">
          ลงชื่อ........................................พยาน
        </p>
        <p style="text-indent: 2.5em; text-align: right">
          (........................................)
        </p>
      </div>
    </div>
    <div class="grid mt-5">
      <div class="col-12 md:col-12 flex justify-content-center gap-4">
        <!-- <Button
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mx-2 boeder-none"
            @click="approve(datacontract._id)"
            >คุณยินยอมสัญญา</Button
          > -->
        <Button
          severity="success"
          outlined
          @click="sidebar = false"
          class="hover:bg-green-600 hover:text-white"
          >คุณยินยอมสัญญา</Button
        >
        <Button
          severity="danger"
          outlined
          @click="unapprove()"
          class="hover:bg-red-500 hover:text-white"
          >ไม่ยืนยันสัญญา</Button
        >
        <Button
          
          outlined
          @click="handleDownload"
          class="hover:bg-blue-500 hover:text-white"
        >
          โหลดสัญญา</Button
        >

        <!-- <i class="pi pi-print icon-style cursor-pointer" @click="download" /> -->
      </div>
    </div>
  </Dialog>
  <!-- </div> -->
</template>
<script>
import axios from "axios";
import html2canvas from 'html2canvas';
import mitt from "mitt";

export default {
  data() {
    return {
      bus: mitt(),
      prop: {
        // datacontract: String,
        id: String,
      },
      sidebar: true,
      // datacontract: ""
    };
  },
  watch: {
    prop: {
      deep: true,
      handler() {
        // ทำให้ addcontract ทำงานทุกครั้งที่มีการเปลี่ยนแปลงใน prop
        this.addcontract();
      },
    },
  },
  mounted() {
    this.getcontract();
  },
  created() {
    // ตั้งค่ารับ event bus
    this.$bus.on("contractContent", this.handleDownload);
  },
  methods: {
    
    async handleDownload() {
      // รับ Event และดำเนินการดาวน์โหลดสัญญา
      const content = this.$refs.content;
      const canvas = await html2canvas(content);
      const pdf = canvas.toDataURL("image/pdf");

      const link = document.createElement("a");
      link.href = pdf;
      link.download = "ContractPartner.pdf";
      link.click();
    },
    async getcontract() {
      try {
        const Response = await axios.get(
          `${process.env.VUE_APP_API}contract/partner/`,
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        console.log(Response.data.message);
        if (Response.data.status === true) {
          // this.datacontract = Response.data.data;
          if (Response.data.data.status === true) {
            this.sidebar = false;
          } else {
            this.sidebar = true;
          }
          console.log(Response.data.data);
        } else if (Response.data.message === "ไม่มีข้อมูล contract") {
          console.log("ยังไม่สร้าง contract");
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
        const Response = await axios.post(
          `${process.env.VUE_APP_API}contract/`,
          {},
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );

        if (Response.data.status === true) {
          // this.datacontract = Response.data.data;
          await this.approve(this.prop.id); // เปลี่ยน id เป็น this.prop.id
          console.log("สร้าง");
          console.log(Response.data.data);
          this.sidebar = true;
        } else {
          console.error("Data is missing in the API response.");
        }
      } catch (error) {
        console.error(error);
      }
    },

    async approve(id) {
      try {
        const Response = await axios.put(
          `${process.env.VUE_APP_API}contract/accept/${id}`,
          {},
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );

        if (Response.data.status === true) {
          this.sidebar = false;
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
      this.sidebar = false;
      // Swal.fire({
      //   icon: "error",
      //   title: "กรุณายินยอมสัญญาก่อน",
      //   text: "ถ้าคุณไม่ยินยอมสัญญาจะไม่สามารถเข้าใช้งานได้",
      // });
      this.$router.push("/");
    },
  },
};
</script>
<style></style>

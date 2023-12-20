<template>
  <div>
    <!-- <div>
      <Button label="Contract Electronic" icon="pi pi-external-link" @click="sidebar = true" />
    </div> -->

    <Dialog
      :closable="false"
      v-model:visible="sidebar"
      modal
      :style="{ width: '80%' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
      <template v-slot:header>
        <div style="text-align: center; font-size: 1.5rem; font-weight: bold">
          สัญญาการใช้งาน lanmark.online ของ member
        </div>
      </template>
      <div class="grid mt-2" style="border: 1px solid #ccc">
        <div class="col-12 md:col-12 text-center">
          <h2>สัญญาให้ใช้บริการ</h2>
        </div>
        <div class="col-12 md:col-12 px-3">
          <!--สัญญา-->
          <p style="text-indent: 2.5em">
            สัญญาให้บริการ (“สัญญา”) ฉบับนี้ทำขึ้นระหว่าง lanmark.online ซึ่งตั้งอยู่ที่ 15/330 ตึก thememory apartment
ซอยรัชดาภิเษก 36 แยก 9-11 แขวงจันเกษม เขตจัตุจักร จังหวัดกรุงเทพมหานคร ไปรษณีย์ 10900 ซึ่งต่อไปนี้ในสัญญา
เรียกว่า ผู้ให้บริการจอง ฝ่ายหนึ่ง กับผู้ใช้บริการจองที่พักออนไลน์ในแพลตฟอร์ม lanmark.online ซึ่งต่อไปนี้เรียกว่า
ผู้ใช้บริการจอง ทั้งสองฝ่ายได้อ่านและเข้าใจข้อความข้อตกลงดังนี้
          </p>
          <p style="text-indent: 2.5em; font-weight: bold">
            ข้อ 1. การให้บริการ
          </p>
          <p style="text-indent: 2.5em">
            1.1 ให้บริการเกี่ยวกับที่พักแก่นักเดินทางและนักท่องเที่ยวแก่แขกผู้เข้าพัก
          </p>
          <p style="text-indent: 2.5em">
            1.2 บริการคอลเซนเตอร์ 24 ช.ม.
          </p>
          <p style="text-indent: 2.5em">
            1.3 ผู้จองและผู้รับจองตกลงเมื่อชำระค่าธรรมเนียมแล้ว ห้ามมิให้จำหน่ายสิทธิที่พักให้แก่บุคคลภายนอก ที่มิได้แจ้งชื่อ
เข้าพักแก่ผู้ให้บริการแก่เจ้าของที่พัก
          </p>
          <p style="text-indent: 2.5em">
            1.4 หากผู้จองไม่สามารถเข้าพักได้ภายในวันที่กำหนด ถือว่าผู้จองสละสิทธิ์ในการใช้บริการที่พักดังกล่าว ตามข้อ 1.3 และ
ยินยอมให้ผู้ให้บริการริบเงินจองในฐานเบี้ยปรับ
          </p>
          <p style="text-indent: 2.5em; font-weight: bold">
            ข้อ 2. การจัดที่พัก
          </p>
          <p style="text-indent: 2.5em">
            2.1 เมื่อไม่สามารถจัดห้องพักได้ในกรณีที่เจ้าของที่พักให้บริการแก่ผู้ใช้บริการตกลงยืนยันแจ้งสิทธิ์จองที่พักแล้ว ไม่ว่าด้วย
เหตุใดก็ตามอันมิควรเกิดขึ้นโดยไม่จ าเป็น เจ้าของที่พักจะต้องรับผิดชอบในการเสียสิทธิ์แก่ผู้ใช้บริการและคืนเงินให้แก่
ผู้ใช้บริการพร้อมเบี้ยปรับ
          </p>
          <p style="text-indent: 2.5em">
            สมบูรณ์และมีผลบังคับใช้ได้อยู่ หากปรากฏว่าข้อตกลงข้อใดในสัญญาฉบับนี้ ไม่สมบูรณ์ไม่สามารถใช้บังคับ ก็มิได้
กระทบถึงข้อตกลงข้ออื่นตามสัญญานี้ที่สมบูรณ์และมีผลบังคับใช้ได้อยู่
          </p>
          <!-- เซ็นค์ -->
          <p style="text-indent: 2.5em; text-align: center;">
            ลงชื่อ ....................................................... ผู้ให้บริการจอง
          </p>
          <p style="text-indent: 2.5em; text-align: center;">
            (lanmark.online)
          </p>
          <p style="text-indent: 2.5em; text-align: center;">
            ลงชื่อ ....................................................... ผู้ใช้บริการจอง
          </p>
          <p style="text-indent: 2.5em; text-align: center;">
            (.........................................................)
          </p>
          <p style="text-indent: 2.5em; text-align: center;">
            ลงชื่อ ...................................................พยาน
          </p>
          <p style="text-indent: 2.5em; text-align: center;">
            (.........................................................)
          </p>
          <p style="text-indent: 2.5em; text-align: center;">
            ลงชื่อ ...................................................พยาน
          </p>
          <p style="text-indent: 2.5em; text-align: center;">
            (.........................................................)
          </p>
        </div>
      </div>
      <div class="grid mt-5">
        <div class="col-12 md:col-12 flex justify-content-center gap-4">
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
          <!-- <i class="pi pi-print icon-style cursor-pointer" @click="download" /> -->
        </div>
      </div>
    </Dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      prop: {
        // datacontract: '',
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
  methods: {
    async getcontract() {
      try {
        const Response = await axios.get(
          `${process.env.VUE_APP_API}contract/member/`,
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        console.log(Response.data.message);
        if (Response.data.status === true) {
          this.datacontract = Response.data.data;
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
          this.datacontract = Response.data.data;
          await this.approve(id);
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
          // this.sidebar = false
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

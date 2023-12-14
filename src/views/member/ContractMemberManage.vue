<template>
  <div class="grid px-10 mt-3 ml-5 mr-5 w-full">
    <Loading :loading="loading" />
    <div class="col-12 lg:col-12 border">
      <div class="text-center font-bold text-4xl">สัญญาของpartner</div>
      <div class="text-right my-5"></div>

      <DataTable
        :value="Filter"
        :paginator="true"
        :rows="20"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rowsPerPageOptions="[5, 10, 25, 50, 75, 100]"
        currentPageReportTemplate="แสดง {first} ถึง {last} จาก {totalRecords} สินค้าทั้งหมด"
        responsiveLayout="stack"
      >
        <!-- ตรวจสอบว่ามีข้อมูลสินค้าหรือไม่ -->

        <template #empty>
          <p
            class="font-italic text-center text-5xl text-center"
            style="color: #bd1616"
          >
            ไม่พบข้อมูลสัญญา
          </p>
        </template>
        <template #header>
          <div class="flex justify-content-end">
            <span class="p-input-icon-left">
              <i class="pi pi-search" />
              <InputText
                v-model="searchall"
                placeholder="ค้นหา"
                class="bg-white-500 border"
                style="height: 48px"
              />
            </span>
          </div>
        </template>
        <Column
          field="member_id.name"
          header="ชื่อพาร์ทเนอร์"
          
          style="width: 14%"
          :headerStyle="{ color: headerTextColor }"
        ></Column>
        <Column
          field=""
          class=""
          
          header="เวลาที่ยืนยัน"
          style="width: 14%"
          :headerStyle="{ color: headerTextColor }"
        >
          <template #body="{ data }">
            <div v-if="data.time != null">
              {{
                new Date(data.time).toLocaleString("th-TH", {
                  timeZone: "Asia/Bangkok",
                })
              }}
            </div>
            <div v-else>ยังไม่ได้ยืนยัน</div>
          </template>
        </Column>
        <Column
          class=""
          header="สถานะอนุมัติ"
          style="width: 25%"
          :headerStyle="{ color: headerTextColor }"
        >
          <template #body="{ data }">
            <div
              class="sm:w-8 md:w-6 xl:w-5 bg-red-100 text-red-600 font-normal border-2 border-red-300 text-center"
              style="border-radius: 1rem; padding: 0.5rem"
              v-if="data.status === false"
            >
              <div>ยังไม่ได้ยืนยันสัญญา</div>
            </div>
            <div
              class="sm:w-8 md:w-6 xl:w-5 bg-green-100 text-green-600 font-normal border-2 border-green-300 text-center"
              style="border-radius: 1rem; padding: 0.5rem"
              v-if="data.status === true"
            >
              <div>ได้ยืนยันสัญญาแล้ว</div>
            </div>
            <!-- ให้แสดงค่า statusapprove ของแต่ละ Item ใน Column -->
          </template>
        </Column>
        <Column style="width: 10%">
          <template #body="{ data }">
            <Button
              outlined
              severity="help "
              icon="pi pi-info-circle"
              @click="showPartnerDetail(data)"
            />
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
  <Dialog
    v-model:visible="DetailPartner"
    modal
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <template v-slot:header>
      <div style="text-align: center; font-size: 1.5rem; font-weight: bold">
        สัญญาการใช้งาน lanmark ของ partner
      </div>
    </template>
    <div class="grid mt-2" style="border: 1px solid #ccc">
      <div class="col-12 md:col-12 text-center">
        <h2>สัญญาการใช้งาน lanmark ของ partner</h2>
      </div>
      <div class="col-12 md:col-12 px-3">
        <h3 style="text-indent: 1em">หนังสือสัญญาการเป็นคู่ค้า</h3>
        <p style="text-indent: 2.5em">
          หนังสือสัญญาการเป็นคู่ค้าฉบับนี้(ข้อตกลง) กระทำขึ้นเมื่อวันที่ 22
          พฤศจิกายน พ.ศ.2560
        </p>
        <p style="text-indent: 2.5em">
          1.นายกรวิทย์ บัวครั้น เลขที่บัตรประจำตัวประชาชน 1029000643262 ที่อยู่
          16/330 In the memory apartment set รัชดาภิเษก แยก 9-11 แขวงจันเกษม
          เขตจตุจักร จังหวัดกรุงเทพมหานคร รหัสไปรษณี 10900 (ต่อไปนี้เรียกว่า
          คู่ค้าฝ่ายที่ หนึ่ง)
        </p>
        <p style="text-indent: 2.5em">
          (2) นายศุภัคกิตต์ ใจเย็น เลขที่บัตรประจำตัวประชาชน 357990000330
          ที่อยู่ 103 หมู่ที่ 4 ถนนรอบเมืองเชียงใหม่ ตำบลสุ เทพ
          อำเภอเมืองเชียงใหม่ จังหวัดเชียงใหม่ รหัสไปรษณี 50200
          (ต่อไปนี้เรียกว่า “คู่ค้าฝ่ายที่สอง”)
        </p>
        <p style="text-indent: 2.5em">
          โดยสู้ค่าฝ่ายที่สอง มีความประสงค์ขอที่พัฒนาและดูแลแก้ไขปรับปรุง
          ปัญหาต่างๆเกี่ยวกับเว็บไซด์ของ lanmark.com
          เข้าร่วมเป็นพันธมิตรทางการค้า ตาม lanmark.com กำหนดขอบเขตหน้าที่
          จนกว่าจะเลิกจ้าง โดยไม่เปิดเผยข้อมูลของ lanmark.com.
          ให้แก่บุคคลภายนอกโดยไม่ได้รับความยินยอม ซึ่งต่อไปในสัญญานี้จะเรียกว่า
          คู่ค้า โดย คู่ค้า จะต้องปฏิบัติ ตามหลักเกณฑ์เงื่อนไข หรือนโยบายที่
          ภายใต้ชื่อ lanmark.com กำหนดอย่างเคร่งครัด
        </p>
        <p style="text-indent: 2.5em">
          โดยที่คู่ค้าฝ่ายที่สองเป็นผู้พัฒนาแพลตฟอร์มช้อปปิ้งออนไลน์
          ตามสัญญาจ้างจนกว่าจะบอกเลิกสัญญาภายใต้ชื่อเรียกว่า แลนมาร์กดอทคอม
          "lanmark.com" ซึ่งเป็นผู้รวบรวม สินค้าและบริการต่างๆ
        </p>
        <!--สัญญา-->
        <h3 style="text-indent: 1em">
          คู่สัญญาทั้งสองฝ่ายตกลงทำสัญญานี้เพื่อผูกพันระหว่างกันตามข้อกำหนดและเงื่อนไข
          ดังต่อไปนี้
        </h3>
        <!---ข้อ 1 -->
        <p style="text-indent: 2.5em; font-weight: bold">
          1. วัตถุประสงค์และความร่วมมือของคู่สัญญา
        </p>
        <p style="text-indent: 4em">
          1.1 เพื่อให้คู่สัญญา ทราบถึงขอบเขตในการดำเนินงานร่วมกับlanmark.com
        </p>
        <p style="text-indent: 4em">
          1.2 เพื่อให้คู่สัญญาทราบถึงขอบเขตในการปฏิบัติงาน
        </p>
        <p style="text-indent: 4em">
          1.3 เพื่อให้คู่ค้าสัญญา ทราบถึง บทบาท หน้าที่ และข้อจำกัดต่างๆ
          และสิทธิอันพึงมีภายใต้สัญญาฉบับนี้
        </p>
        <p style="text-indent: 4em">
          1.4 เพื่อให้คู่สัญญา ทราบถึงข้อกำหนดและเงื่อนไขต่างๆ
          ของการปฏิบัติต่อกัน ในฐานะคู่สัญญา ฉบับนี้
        </p>
        <!---ข้อ 2 -->
        <p style="text-indent: 2.5em; font-weight: bold">
          2.ขอบเขตการดำเนินงานของคู่ค้า
        </p>
        <p style="text-indent: 4em">
          คู่ค้าจะพัฒนาระบบเว็บไซต์ระบบการชำระเงินการอัพเดตเว็ปไซต์เว็ปไซต์ส้มและดูแลเกี่ยวกับปัญหาต่างๆของเว็บไซต์ตามสัญญาจ้างที่ได้ตกลงกันไว้ต่างๆ
        </p>
        <!---ข้อ 3 -->
        <p style="text-indent: 2.5em; font-weight: bold">
          3.เงื่อนไขและค่าตอบแทนให้คู่ค้า
        </p>
        <p style="text-indent: 4em">
          ตกลงชำระเงินผ่านบัญชีตามสัญญาจ้างขนของตามลักษณะงานประเภทนั้นๆ
        </p>
        <!---ข้อ 4 -->
        <p style="text-indent: 2.5em; font-weight: bold">
          4.อายุของสัญญาการเป็นคู่ค้า
        </p>
        <p style="text-indent: 4em">
          หนังสือสัญญาการเป็นคู่ค้านี้มีอายุ 150 วัน ซึ่งมีผลบังคับใช้ตั้งแต่ 22
          พฤศจิกายน และพิจารณาการต่ออายุทุกๆ 150 วัน หลัง หมดสัญญา
          โดยคู่ค้ามีสิทธิอันพึงบอกเลิกสัญญาได้คราวโตคราวหนึ่ง
          โดยไม่จจำเป็นต้องแจ้งให้ทราบล่วงหน้า
        </p>
        <!---ข้อ 5 -->
        <p style="text-indent: 2.5em; font-weight: bold">
          5.การเปลี่ยนแปลงสัญญา
        </p>
        <p style="text-indent: 4em">
          Lanmark.comขอสงวนสิทธิในการเปลี่ยนแปลงสัญญาตามที่เห็นสมควรโดยlanmark.com
          จะแจ้งเป็นลายลักษณ์อักษรให้
          คู่ค้าทราบก่อนเริ่มการเปลี่ยนแปลงไม่น้อยกว่า 30 วัน
          โดยสัญญาจะมีผลก็ต่อเมื่อ ทั้งสองฝ่าย
          ได้ต่างเห็นชอบและมีการลงนามในสัญญาร่วมกัน ทั้ง "lanmark.com" และ
          "คู่ค้า” เป็นที่เรียบร้อย
        </p>
        <!---ข้อ 6 -->
        <p style="text-indent: 2.5em; font-weight: bold">
          6.หน้าที่เมื่อคู่ค้าเมื่อสัญญาสิ้นสุดลง
        </p>
        <p style="text-indent: 4em">
          เมื่อคู่ค้าได้รับการแจ้งจากทาง lanmark.com
          ว่าสัญญานี้ได้สิ้นสุดลงไม่ว่าด้วยเหตุผลใด
          คู่ค้าต้องนำสื่อต่างๆที่เกี่ยวกับคู่ค้า
          ทุกอย่างภายในการบริการของคู่ค้าออกภายใน 7 วัน
          จะถือว่าผู้ค้ามีเจตนาที่จะทำให้ลูกค้าเกิดความสับสน เข้าใจผิด
          เกี่ยวข้องกับกิจการของ lanmark.com
          ทั้งนี้ไม่เกินกว่ามูลค่าความเสียหายที่เกิดขึ้นจริง และ lanmark.com
          พิสูจน์ความ เสียหายนั้นได้จริง กรณีคู่สัญญาฝ่ายใดฝ่ายหนึ่ง
          ละเมิดข้อตกลงหรือไม่ปฏิบัติตามเงื่อนไขข้อหนึ่งข้อใดในสัญญาการเป็นคู่ค้า
          ฉบับนี้ อีกฝ่ายหนึ่งมีสิทธิบอกเลิกสัญญาและ/หรือมีความเสียหายเกิดขึ้น
          คู่สัญญาฝ่ายที่ผิดเงื่อนไขต้องรับผิดชอบชดใช้
          ค่าเสียหายที่เกิดขึ้นเท่ากับความเสียหายที่เกิดขึ้น
        </p>
        <!--- -->
        <h3 style="text-indent: 1em">
          เอกสารที่ทางคู่ค้าต้องเตรียมให้กับทางlanmark.com
        </h3>
        <ul class="mb-5">
          <li>
            สำเนาบัตรประจำตัวประชาชนของผู้มีอำนาจลงนามพร้อมลงลายมือชื่อรับรองสำเนาถูกต้อง
          </li>
          <li>
            สำเนาบัญชีสมุดธนาคารที่จะให้ทางlanmark.com โอนเงินชำระค่าบริการ
            พร้อมลงลายมือชื่อรับรองสำเนาถูกต้อง
          </li>
        </ul>

        <div class="grid">
          <div
            class="col-6 text-center"
            style="
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: bold;
            "
          >
            ลงชื่อ ลายเซ็นของ lanmark<br />
            (นาย ..... .......)<br />
            lanmark.com
          </div>
          <div
            class="col-6 text-center"
            style="
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: bold;
            "
          >
            ลงชื่อ {{ Datacontract.signature }}<br />
            ({{ Datacontract.signature }})<br />
            ผู้ลงนามสัญญา
          </div>
        </div>
      </div>
    </div>
  </Dialog>
</template>

<script>
import axios from "axios";
import { onMounted, ref } from "vue";
import Loading from "../../components/Loading.vue";

export default {
  components: {
    Loading,
  },

  created() {
    document.title = "ข้อมูล partner";
  },

  setup() {
    // const partnerDetail = ref(null);
    const DetailPartner = ref(false);
    const Datacontract = ref([]);
    const loading = ref(true);
    const searchall = ref("");
    const item_product = ref([]);
    const getData = async () => {
      console.log(DetailPartner, "status dialog before click button ");

      try {
        const productResponse = await axios.get(
          `${process.env.VUE_APP_API}contractmember/`,
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );

        if (productResponse.data && productResponse.data) {
          item_product.value = productResponse.data.data.reverse();
          loading.value = false;
          console.log(productResponse.data.data);
        } else {
          console.error("Data is missing in the API response.");
        }
      } catch (error) {
        console.error(error);
      }
    };

    const showPartnerDetail = async (data) => {
      DetailPartner.value = true;
      Datacontract.value = data;
      console.log(Datacontract.value);
    };

    onMounted(() => {
      getData();
    });

    return {
      loading,
      item_product,
      getData,
      Datacontract,
      showPartnerDetail,
      DetailPartner,
      searchall,
      headerTextColor: "rgb(156 163 175)",
    };
  },
  name: "contractmembermanage",

  methods: {
    getImage(item) {
      if (typeof item === "string") {
        return `https://drive.google.com/uc?export=view&id=${item}`;
      } else if (Array.isArray(item) && item.length > 0) {
        const firstImageId = item[0];
        return `https://drive.google.com/uc?export=view&id=${firstImageId}`;
      } else {
        return "";
      }
    },
  },
  computed: {
    Filter() {
      if (this.searchall) {
        //ค้นหาด้วยคำ
        const searchTerm = this.searchall.toLowerCase();
        return this.item_product.filter((item) => {
          // ใช้ includes() เพื่อตรวจสอบว่าคำที่ค้นหาอยู่ในชื่อหรือเบอร์โทรศัพท์หรือไม่
          return item.name.toLowerCase().includes(searchTerm);
        });
      } else {
        return this.item_product;
      }
    },
  },
};
</script>

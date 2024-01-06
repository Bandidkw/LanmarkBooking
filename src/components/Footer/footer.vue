<!-- footer.vue -->
<template>
    <div class="flex bg-gray-100 w-full rounded-t-2xl m-0 p-0" style="flex-direction: column;">
        <div class="footer-type flex w-full justify-content-between" style="height: 80%;">
            <div class="flex" style="flex-direction: column;">
            <p class="footer-text font-semibold">การสนับสนุน</p>
            <a href="" class="footer-text">ศูนย์ช่วยเหลือ</a>
            <a href="" class="footer-text">รายงานปัญหา</a>
            </div>
            <div class="flex" style="flex-direction: column;">
            <p class="footer-text font-semibold">การให้เช่าที่พัก</p>
            <p class="footer-text">มาพักที่ Lanmark</p>
            <!-- <p class="footer-text"></p> -->
            </div>
            <div class="flex" style="flex-direction: column;">
            <p class="footer-text font-semibold">Lanmark</p>
            <a href="" class="footer-text">พาร์ทเนอร์</a>
            <a href="" class="footer-text">ติดต่อ Lanmark</a>
            </div>
        </div>
        <div>
          <span class="font-semibold">อีเมล:</span>
          <span class="ml-2">info@lanmark.online</span>
        </div>
        <div>
          <span class="font-semibold">Facebook:</span>
          <span class="ml-2">facebook.com/lanmark</span>
        </div>
        <div>
          <span class="font-semibold">Line:</span>
          <span class="ml-2">@lanmark</span>
        </div>
      </div>
    </div>
  </Dialog>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const contract = ref(false);
    return { contract };
  },
};
</script>

<style>
    .footer-type{
        padding: 1rem 5rem 0 5rem;
    }
    .footer-type a {
        color: black;
        text-decoration: none;
    }
    /* Your styles for the footer go here */
    .footer-text{
        margin: 0;
        padding: 0.3em 0;
    }
    @media screen and (max-width:414px) {
        .footer-type{
        padding: 1rem 1rem 0 1rem;
    }
        .footer-type p,a{
        font-size: 0.7rem;
    }
    }
</style>

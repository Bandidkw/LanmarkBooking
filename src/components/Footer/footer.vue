<!-- footer.vue -->
<template>
    <div class="flex bg-gray-100 w-full rounded-t-2xl m-0 p-0" style="flex-direction: column;">
        <div class="footer-type flex w-full justify-content-between" style="height: 80%;">
            <div>
            <p class="footer-text font-semibold">การสนับสนุน</p>
            <p class="footer-text">ศูนย์ช่วยเหลือ</p>
            <p class="footer-text">รายงานปัญหา</p>
            </div>
            <div>
            <p class="footer-text font-semibold">การให้เช่าที่พัก</p>
            <p class="footer-text">มาพักที่ Lanmark</p>
            <!-- <p class="footer-text"></p> -->
            </div>
            <div>
            <p class="footer-text font-semibold">Lanmark</p>
            <p class="footer-text">พาร์ทเนอร์</p>
            <p class="footer-text">ที่พัก Lanmark.online</p>
            </div>
        </div>
        <div class="w-full">
            <p class="m-0 py-2" style="text-align: center;">© 2023 Lanmark.online</p>
        </div>
        <!-- Your footer content goes here -->
    </div>
</template>

<script>
export default {
    // Footer component logic goes here
}
</script>

<style>
    .footer-type{
        padding: 1rem 5rem 0 5rem;
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
        .footer-type p{
        font-size: 0.7rem;
    }
    }
</style>

<template>
  <div
    class="block w-80 p-4 h-72"
    style="
      border: 1px solid rgb(221, 221, 221);
      border-radius: 12px;
      box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 16px;
    "
  >
    <div class="price m-0 p-2 flex flex-col gap-y-8">
      <h1>Price</h1>
      <div>
        <!-- ปุ่มเช็คอิน -->
        <VueDatePicker
          v-model="date"
          range
          multi-calendars
          placeholder="เช็คอิน-เช็คเอ้าท์"
        />
      </div>
      <div>
        <button
          @click="toggleDropdown"
          class="outline outline-2 outline-offset-2 font-medium rounded-lg px-8 py-2.5 text-center inline-flex items-center"
          type="button"
        >
          Selection
          <svg
            class="w-2.5 h-2.5 ms-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>

        <!-- Dropdown menu -->
        <div
          v-show="isDropdownOpen"
          id="dropdown"
          class="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-45 dark:bg-gray-700"
        >
          <ul
            class="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefaultButton"
          >
            <li @click.prevent="handleListItemClick">
              <a href="#" class="block px-4 py-2">
                <div class="flex justify-between">
                  <p>ABC</p>
                  <div>
                    <button
                      class="hover:bg-gray-100"
                      @click="handleButtonClick"
                    >
                      +
                    </button>
                    <span>0</span>
                    <button
                      class="hover:bg-gray-100"
                      @click="handleButtonClick"
                    >
                      -
                    </button>
                  </div>
                </div>
              </a>
            </li>
            <li @click.prevent="handleListItemClick">
              <a href="#" class="block px-4 py-2">Settings</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { ref, onMounted } from "vue";

const date = ref([new Date(), new Date()]);
export default {
  setup() {
    onMounted(() => {
      const startDate = new Date();
      const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
      date.value = [startDate, endDate];
    });

    return { date };
  },
  data() {
    return {
      isDropdownOpen: false,
    };
  },
  components: { VueDatePicker },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    handleButtonClick() {
      console.log("yes sir");
    },
    handleListItemClick(event) {
      if (this.isDropdownOpen) {
        event.stopPropagation();
      } else {
        console.log("false");
      }
    },
  },
};
</script>
<style scope></style>

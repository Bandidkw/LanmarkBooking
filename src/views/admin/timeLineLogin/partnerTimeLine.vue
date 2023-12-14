<template>
  <div class="grid px-10 mt-3 ml-5 mr-5 w-full containter">
    <Loading :loading="loading" />
    <div class="col-12 lg:col-12 border">
      <div class="text-center font-bold text-4xl">ข้อมูลการล็อคอิน PARTNER</div>
      <div class="text-right my-5"></div>

      <DataTable
        :value="Filter"
        :paginator="true"
        :rows="20"
        selectionMode="single"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rowsPerPageOptions="[5, 10, 25, 50, 75, 100]"
        currentPageReportTemplate="แสดง {first} ถึง {last} จาก {totalRecords} สินค้าทั้งหมด"
        responsiveLayout="stack"
      >
        <template #empty>
          <p
            class="font-italic text-center text-5xl text-center"
            style="color: #bd1616"
          >
            ไม่พบข้อมูล
          </p>
        </template>
        <template #header>
          <div class="flex justify-content-end">
            <Calendar
              v-model="selectdate"
              dateFormat="dd/mm/yy"
              selectionMode="range"
              showIcon
              class="mx-3"
            />
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
          field="partner_id.name"
          header="ชื่อ"
          style="width: 10%; cursor: default"
          :headerStyle="{ color: headerTextColor }"
        ></Column>
        <Column
          field="createdAt"
          header="ไทม์ไลน์การเข้าใช้งาน"
          style="width: 20%; cursor: default"
          :headerStyle="{ color: headerTextColor }"
        >
          <template #body="{ data }">
            {{ formatDate(data.createdAt) }}
          </template>
        </Column>
        <Column
          field="ipaddress"
          header="เลขเครื่องip"
          style="width: 10%; cursor: default"
          :headerStyle="{ color: headerTextColor }"
        ></Column>
      </DataTable>
    </div>
  </div>
</template>
<script>
import { onMounted, ref } from "vue";
import Loading from "../../../components/Loading.vue";
import { Admin } from "../../../router/admin";

export default {
  components: {
    Loading,
  },
  created() {
    document.title = "PartnerTimeLine";
  },
  setup() {
    const admin = new Admin();
    const item_product = ref([""]);
    const searchall = ref("");
    const loading = ref(true);
    const selectdate = ref("");
    const getData = async () => {
      try {
        const result = await admin.GetTimeLinePartner();
        item_product.value = result;
        console.log(item_product.value);
      } catch (error) {
        console.error(error);
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => {
      getData();
    });

    return {
      item_product,
      admin,
      getData,
      loading,
      searchall,
      selectdate,
      headerTextColor: "rgb(156 163 175)",
    };
  },
  methods: {
    formatDate(dateString) {
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      };
      const formattedDate = new Date(dateString).toLocaleDateString(
        "th-TH",
        options
      );
      return formattedDate;
    },
  },
  computed: {
    Filter() {
      if (this.selectdate) {
        const searchTerm = this.searchall.toLowerCase();
        const options = { day: "2-digit", month: "2-digit", year: "numeric" };
        return this.item_product.filter((item) => {
          const itemDate = new Date(item.createdAt);
          const formattedItemDate = itemDate.toLocaleDateString(
            "th-TH",
            options
          );
          if (
            this.selectdate[0] != null &&
            this.selectdate[0] != "" &&
            this.selectdate[1] === null
          ) {
            const startdate = this.selectdate[0].toLocaleDateString(
              "th-TH",
              options
            );
            return (
              formattedItemDate == startdate &&
              (item.admin_id.name.toLowerCase().includes(searchTerm) ||
                item.ipaddress.toLowerCase().includes(searchTerm))
            );
          }
          if (this.selectdate[1] != null && this.selectdate[1] != "") {
            const startdate = this.selectdate[0].toLocaleDateString(
              "th-TH",
              options
            );
            const enddate = this.selectdate[1].toLocaleDateString(
              "th-TH",
              options
            );
            return (
              formattedItemDate >= startdate &&
              formattedItemDate <= enddate &&
              (item.admin_id.name.toLowerCase().includes(searchTerm) ||
                item.ipaddress.toLowerCase().includes(searchTerm))
            );
          }
        });
      } else if (this.searchall) {
        const searchTerm = this.searchall.toLowerCase();
        return this.item_product.filter((item) => {
          return (
            item.admin_id.name.toLowerCase().includes(searchTerm) ||
            item.ipaddress.toLowerCase().includes(searchTerm)
          );
        });
      } else {
        return this.item_product;
      }
    },
  },

  name: "PartnerTimeLine",
};
</script>
<style scope>
.icon-style {
  transition: all 0.2s ease-in-out;
}
.icon-style:hover {
  color: #3b82f6;
}
</style>

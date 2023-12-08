<template>
  <div class="grid px-10 mt-3 ml-5 mr-5 w-full containter">
    <Loading :loading="loading" />
    <div class="col-12 lg:col-12 border">
      <div class="text-center font-bold text-4xl">ADMIN TIMELINE</div>
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
          field="admin_id.name"
          header="ชื่อ"
          sortable
          style="width: 10%; cursor: default"
          :headerStyle="{ color: headerTextColor }"
        ></Column>
        <Column
          field="createdAt"
          header="ไทม์ไลน์การเข้าใช้งาน"
          sortable
          style="width: 20%; cursor: default"
          :headerStyle="{ color: headerTextColor }"
        >
          <template #body="{ data }">
            {{ formatDate(data.createdAt) }}
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>
<script>
import { onMounted, ref } from "vue";
import Loading from "../../../components/Loading.vue";
import { User } from "../../../service/user";

export default {
  components: {
    // updateadmin,
    Loading,
  },
  created() {
    document.title = "AdminTimeLine";
  },
  setup() {
    const user = new User();
    const item_product = ref([]);
    const searchall = ref("");
    const loading = ref(true);

    const getData = async () => {
      try {
        const result = await user.GetTimeLineAdmin();
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
      user,
      getData,
      loading,
      searchall,
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
      if (this.searchall) {
        const searchTerm = this.searchall.toLowerCase();
        return this.item_product.filter((item) => {
          return (
            (item.admin_id &&
              item.admin_id.name.toLowerCase().includes(searchTerm)) ||
            item.createdAt.includes(searchTerm)
          );
        });
      } else {
        return this.item_product;
      }
    },
  },

  name: "AdminTimeLine",
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

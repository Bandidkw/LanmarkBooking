<template>
  <div class="grid px-10 mt-3 ml-5 mr-5 w-full">
    <Loading :loading="loading" />
    <div class="col-12 lg:col-12 border">
      <div class="text-center text-2xl mb-8">MANAGEMENT REVIEW</div>

      <DataTable
        :value="allReview"
        :paginator="true"
        :rows="20"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rowsPerPageOptions="[5, 10, 25, 50, 75, 100]"
        currentPageReportTemplate="แสดง {first} ถึง {last} จาก {totalRecords} สินค้าทั้งหมด"
        responsiveLayout="stack"
      >
        <Column field="booking_id.room_id.name" header="Room Name"></Column>
        <Column field="star" header="Star">
          <template #body="item">
            <i class="bi bi-star-fill text-yellow-500 flex gap-2">
              {{ item.data.star }}
            </i>
          </template>
        </Column>
        <Column field="detail" header="Review Detail"></Column>
        <Column header="Actions">
          <template #body="item">
            <i
              class="pi pi-trash cursor-pointer icon-style"
              @click="deleteReview(item.data._id)"
            />
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script>
import { User } from "../../../service/user";
import { ref, onMounted } from "vue";
import Loading from "../../../components/Loading.vue";

export default {
  components: {
    Loading,
  },
  setup() {
    const user = new User();
    const allReview = ref([]);
    const loading = ref(true);

    const getReview = async () => {
      try {
        const response = await user.GetReview();
        console.log(response.data, "All DATA");
        if (response) {
          allReview.value = response.data;
          loading.value = false;
        }
      } catch (error) {
        console.log(error);
      }
    };

    const deleteReview = async (id) => {
      try {
        const response = await user.DeleteReview(id);
        if (response) {
          await getReview();
        }
      } catch (error) {
        console.log(error);
      }
    };

    onMounted(() => {
      getReview();
    });

    return {
      allReview,
      deleteReview,
    };
  },
};
</script>

<style scoped>
/* Add custom styles as needed */
.datatable {
  margin-top: 20px;
}
</style>

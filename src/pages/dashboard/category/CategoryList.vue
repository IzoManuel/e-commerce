<script setup>
import { ref, onMounted, computed } from "vue";
import DataTable from "@/components/data-table.vue";
import store from "@/store";

/**
 * REACTIVE STATES
 */
const categoryTableHeaders = ref([
  { value: "NAME", key: "name" },
  { value: "SLUG", key: "slug" },
]);
const actions = ref([
  {
    actionFunction: (categoryId) => deleteCategory(categoryId),
    actionLabel: "Delete",
  },
  //{actionFunction: ({id, slug}) => editItem({id, slug}), actionLabel: 'Edit'}
]);

const categories = computed(() => store.getters.categories);

/**
 * FUNCTIONS
 */
function prepareComponent() {
  store.dispatch("getCategories");
}

async function deleteCategory(categoryId) {
  try {
    await store.dispatch("deleteCategory", categoryId);
  } catch (error) {
    console.error(error);
  }
  store.dispatch("getCategories");
}
/**
 * HOOKS
 */
onMounted(() => {
  prepareComponent();
});
</script>
<template>
  <div id="category-list">
    <div class="flex justify-between mb-[16px] items-center">
      <div id="entity-name">
        <h1
          class="text-[1.71429em] leading-[1.16667] text-[#17284d] tracking-[0.01em] font-medium"
        >
          Categories
        </h1>
      </div>
      <div id="add-new">
        <router-link
          :to="{ name: 'CategoryCreate' }"
          class="px-[10px] bg-[#0052cc] text-white h-[37px] flex items-center rounded-[3px] font-medium hover:bg-[#0065ff] text-[14px]"
        >
          New Category
        </router-link>
      </div>
    </div>
    <div id="data-table">
      <DataTable
        :headers="categoryTableHeaders"
        :items="categories"
        :actions="actions"
        :rowRoute="`CategoryUpdate`"
      >
      </DataTable>
    </div>
  </div>
</template>

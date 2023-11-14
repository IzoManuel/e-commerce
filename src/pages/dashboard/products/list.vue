<script setup>
import DataTable from "@/components/data-table.vue";
// import axios from "../../../axios/axios";
import { useRouter } from "vue-router";
import { ref, onMounted, computed } from "vue";
import store from "@/store";
import product from "../../../store/modules/product";
/**
 * REACTIVE STATES
 */
const router = useRouter();
const search = ref("");
const productTableHeaders = ref([
  { value: "NAME", key: "name" },
  { value: "UNIT PRICE", key: "unit_price" },
]);

const actions = ref([
  {
    actionFunction: (productId) => deleteProduct(productId),
    actionLabel: "Delete",
  },
  //{actionFunction: ({id, slug}) => editItem({id, slug}), actionLabel: 'Edit'}
]);
const products = computed(() => store.getters["product/items"]);
const loading = computed(() => store.getters['product/loading']);

const currentPage = ref(1);
const lastPage = computed(() => store.getters['product/lastPage'])
/**
 * FUNCTIONS
 */
function fetchProducts(searchQuery, page) {
  store.dispatch("product/getItems", { endpoint: "products", searchQuery, page });
}

function prepareComponent() {
  fetchProducts();
}

function editItem({ id, slug }) {
  router.push({ name: "ProductUpdate", params: { slug: slug, id: id } });
}

const changePage = (newPage) => {
  currentPage.value = newPage;
  //fetchProducts();
}


async function deleteProduct(productId) {
  try {
    await store.dispatch("product/deleteItem", {
      endpoint: "admin/products",
      itemId: productId,
    });
  } catch (error) {
    console.error(error);
  }
  fetchProducts();
}

/**
 * HOOKS
 */
onMounted(() => {
  prepareComponent();
});
</script>

<template>
  <div id="product-list">
    <div class="flex justify-between mb-[16px] items-center">
      <div id="entity-name">
        <h1
          class="text-[1.71429em] leading-[1.16667] text-[#17284d] tracking-[0.01em] font-medium"
        >
          Products
        </h1>
      </div>
      <div id="add-new">
        <router-link
          :to="{ name: 'ProductCreate' }"
          class="px-[10px] bg-[#0052cc] text-white h-[37px] flex items-center rounded-[3px] font-medium hover:bg-[#0065ff] text-[14px]"
        >
          New Product {{ search }}
        </router-link>
      </div>
    </div>
    <div id="data-table">
      <DataTable
        :headers="productTableHeaders"
        :items="products"
        :loader="loading"
        :actions="actions"
        :rowRoute="`ProductUpdate`"
        :fetchItems="fetchProducts"
        :currentPage="currentPage"
        :totalPages="lastPage"
        @changePage="changePage"
      >
      </DataTable>
    </div>
  </div>
</template>

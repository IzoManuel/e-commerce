<script setup>
import DataTable from "../../../components/data-table.vue";
import axios from "../../../axios/axios";
import { ref, onMounted } from "vue";
import BreadCrumb from '../../../components/bread-crumb.vue'
/**
 * REACTIVE STATES
 */
const products = ref([]);
const productTableHeaders = ref([
  { value: "NAME", key: "name" },
  { value: "ADDED BY", key: "added_by" },
  { value: 'UNIT PRICE', key: 'unit_price'}
]);
const tableLoader = ref(false)
/**
 * FUNCTIONS
 */
function getProducts() {
  tableLoader.value = true;
  axios
    .get("products")
    .then((response) => {
      products.value = response.data.data;
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => (tableLoader.value = false));
}

/**
 * HOOKS
 */
onMounted(()=>{
  getProducts();
})
</script>

<template>
  <div id="product-list">
    <div
      id="bread-crumbs"
    >
    <BreadCrumb :entity="'Products'" :entity-route-name="'ProductIndex'" :action="'list'"></BreadCrumb>
    </div>
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
        :to="{name: 'CreateProduct'}"
          class="px-[10px] bg-[#0052cc] text-white h-[37px] flex items-center rounded-[3px] font-medium hover:bg-[#0065ff] text-[14px]"
        >
          New Product
        </router-link>
      </div>
    </div>
    <div id="data-table">
      <DataTable :headers="productTableHeaders" :items="products" :loader="tableLoader"></DataTable>
    </div>
  </div>
</template>

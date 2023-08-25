<script setup>
import { ref, onMounted, computed } from "vue";
import DataTable from "@/components/data-table.vue";
import store from "@/store";

/**
 * REACTIVE STATES
 */
const customerTableHeaders = ref([
  { value: "NAME", key: "name" },
  { value: "Email", key: "email" },
]);
const actions = ref([
  {
    actionFunction: (customerId) => deleteCustomer(customerId),
    actionLabel: "Delete",
  },
  //{actionFunction: ({id, slug}) => editItem({id, slug}), actionLabel: 'Edit'}
]);

const customers = computed(() => store.getters.customers);
console.log(`CUSTOMERS: ${store.getters.customers}`)
/**
 * FUNCTIONS
 */
function prepareComponent() {
  store.dispatch("getCustomers");
}

async function deleteCustomer(customerId) {
  try {
    await store.dispatch("deleteCustomer", customerId);
  } catch (error) {
    console.error(error);
  }
  store.dispatch("getCustomers");
}
/**
 * HOOKS
 */
onMounted(() => {
  prepareComponent();
});
</script>
<template>
  <div id="customer-list">
    <div class="flex justify-between mb-[16px] items-center">
      <div id="entity-name">
        <h1
          class="text-[1.71429em] leading-[1.16667] text-[#17284d] tracking-[0.01em] font-medium"
        >
          Customers
        </h1>
      </div>
      <div id="add-new">
        <router-link
          :to="{ name: 'CustomerCreate' }"
          class="px-[10px] bg-[#0052cc] text-white h-[37px] flex items-center rounded-[3px] font-medium hover:bg-[#0065ff] text-[14px]"
        >
          New Customer
        </router-link>
      </div>
    </div>
    <div id="data-table">
      <DataTable
        :headers="customerTableHeaders"
        :items="customers"
        :actions="actions"
        :rowRoute="`CustomerUpdate`"
      >
      </DataTable>
    </div>
  </div>
</template>

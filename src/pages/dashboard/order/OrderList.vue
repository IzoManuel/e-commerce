<script setup>
import { ref, onMounted, computed } from "vue";
import DataTable from "@/components/data-table.vue";
import store from "@/store";

/**
 * REACTIVE STATES
 */
const orderTableHeaders = ref([
  { value: "NAME", key: "name" },
  { value: "Email", key: "email" },
]);
const actions = ref([
  {
    actionFunction: (orderId) => deleteOrder(orderId),
    actionLabel: "Delete",
  },
  //{actionFunction: ({id, slug}) => editItem({id, slug}), actionLabel: 'Edit'}
]);

//const orders = computed(() => store.getters.orders);
//console.log(`ORDERS: ${store.getters.orders}`)
const orders = [];
/**
 * FUNCTIONS
 */
function prepareComponent() {
  //store.dispatch("getOrders");
}

async function deleteOrder(orderId) {
  try {
    await store.dispatch("deleteOrder", orderId);
  } catch (error) {
    console.error(error);
  }
  store.dispatch("getOrders");
}
/**
 * HOOKS
 */
onMounted(() => {
  prepareComponent();
});
</script>
<template>
  <div id="order-list">
    <div class="flex justify-between mb-[16px] items-center">
      <div id="entity-name">
        <h1
          class="text-[1.71429em] leading-[1.16667] text-[#17284d] tracking-[0.01em] font-medium"
        >
          Orders
        </h1>
      </div>
      <div id="add-new">
        <router-link
          :to="{ name: 'OrderCreate' }"
          class="px-[10px] bg-[#0052cc] text-white h-[37px] flex items-center rounded-[3px] font-medium hover:bg-[#0065ff] text-[14px]"
        >
          New Order
        </router-link>
      </div>
    </div>
    <div id="data-table">
      <DataTable
        :headers="orderTableHeaders"
        :items="orders"
        :actions="actions"
        :rowRoute="`OrderUpdate`"
      >
      </DataTable>
    </div>
  </div>
</template>

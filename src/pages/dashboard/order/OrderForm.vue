<script setup>
import FormInput from "@/components/form-input.vue";
import { ref, onMounted, computed } from "vue";
import store from "@/store";
import { useRoute } from "vue-router";
import AppButton from "@/components/app-button.vue";
import Popover from "@/components/popover.vue";
import axios from "@/axios/axios";
import Modal from "@/components/modal.vue";

/**
 * REACTIVE STATES
 */

const route = useRoute();
let order = ref({});
const defaultOrder = ref({
  first_name: "Leo",
  last_name: "vinci",
  email: "q@gmail.com",
  country: "Kenya",
  city: "Nairobi",
  postal_code: "22-11",
});
const formError = ref({});
const sections = ref([
  {
    title: "Order Information",
    fields: [
      { label: "First name", id: "first_name", type: "text", required: true },
      { label: "Last name", id: "last_name", type: "text", required: true },
      { label: "email", id: "email", type: "email", required: true },
      { label: "Country", id: "country", type: "text", required: true },
      { label: "City", id: "city", type: "text", required: true },
      { label: "Postal code", id: "postal_code", type: "text", required: true },
      //{ label: "Order Name", id: "name", type: "text", required: true },
    ],
  },
]);
const isNew = route.name === "OrderCreate";
const loader = ref(false);
const createStatusCode = ref(false);
const cart = store.getters.cartItems;
const adminCart = ref([]);
const isModalOpen = ref(false);
const products = computed(() => store.getters.productItems);
const cartItems = ref([]);
const cartItem = ref({});
const selectedProductIds = ref([]);
const dynamicallyAddedFIelds = ref([]);
/**
 * COMPUTED
 */
const orderItem = computed(() => store.getters.orderById(route.params.id));
//const cartItems = computed(() => store.getters.cartItems);

/**
 * FUNCTIONS
 */
// function addProduct() {
//   const itemIds = cartItemFields.value.map((field) = cart)
// }
function handleProductSelect(selectedProductId) {
  selectedProductIds.value.push(selectedProductId);
}

function addDynamicallyAddedField() {
  dynamicallyAddedFIelds.value.push({
    id: dynamicallyAddedFIelds.value.length + 1,
    label: 'Product',
    renderAs: "select",
    required: true,
    options: products,
    multiple: false,
    optionValue: "name",
    optionKey: "id",
  });
}

function fetchSelectedProducts() {
  const selectedProducts = products.map((product) => {
    if (selectedProductIds.includes(product.id)) {
      return product;
    }
  });
  console.log(`PRODUCTS: ${JSON.stringify(selectedProducts)}`);
}

async function createOrder() {
  loader.value = true;
  const formData = new FormData();

  try {
    const response = await axios.post("/admin/orders", {
      cart,
      ...order.value,
    });
    //order.value = response.data.data;
    formError.value = {};
    //createStatusCode.value = response.status;
    //store.dispatch('addOrder', response.data.data);
  } catch (error) {
    if (error.response) {
      formError.value = error.response.data.errors;
    }
  } finally {
    loader.value = false;
    setTimeout(() => {
      createStatusCode.value = false;
    }, 3000);
  }
}

async function updateOrder() {
  loader.value = true;
  const formData = new FormData();

  Object.entries(order.value).forEach(([key, value]) => {
    if (["thumbnail_image"].includes(key)) {
      value.forEach((file) => {
        formData.append(key, file);
      });
    } else {
      formData.append(key, value);
    }
  });

  try {
    const response = await axios.post(
      `/admin/orders/${route.params.id}`,
      formData
    );
    order.value = response.data.data;
    formError.value = {};
    createStatusCode.value = response.status;
  } catch (error) {
    if (error.response) {
      formError.value = error.response.data.errors;
    }
  } finally {
    loader.value = false;
    setTimeout(() => {
      createStatusCode.value = false;
    }, 3000);
  }
}
function onSubmit() {
  if (isNew) {
    createOrder();
  } else {
    updateOrder();
  }
}

function prepareComponent() {
  if (!isNew) {
    order.value = { ...orderItem.value };
  } else {
    order.value = defaultOrder.value;
  }
  store.dispatch("getProductItems");
}

function closeModal() {
  isModalOpen.value = false;
}

function setIsOpen(value) {
  isModalOpen.value = value;
  dynamicallyAddedFIelds.value = [];
}

function openModal() {
  addDynamicallyAddedField();
  isModalOpen.value = true;
}

/**
 * HOOKS
 */
onMounted(() => {
  prepareComponent();
});
</script>

<template>
  <Popover :responseStatus="[200, 201].includes(createStatusCode)"></Popover>
  <Modal
    :isOpen="isModalOpen"
    :modalTitle="`Order Item`"
    :setIsOpen="setIsOpen"
  >
    <template #modalBody>
      <div
        class="mt-[12px]"
        :key="index"
        v-for="(field, index) in dynamicallyAddedFIelds"
      >
        <FormInput
          :label="field.label"
          :type="field.type"
          :id="'product_' + field.id"
          :form-error="formError[field.id]"
          v-model="cartItem[field.id]"
          :render-as="field.renderAs"
          :required="field.required"
          :options="field.renderAs === 'select' ? field.options : []"
          :multiple="field.multiple"
          :option-value="field.optionValue"
          :option-key="field.optionKey"
          :place-holder="field.placeholder"
          class="mb-[20px]"
          @select="handleProductSelect"
        ></FormInput>
      </div>
    </template>
    <template #modalAction>
      <AppButton :label="'New field'" @click="addDynamicallyAddedField"></AppButton>
      <AppButton :label="'Add to cart'"></AppButton>
    </template>
  </Modal>
  <div id="create-order">
    <div class="flex justify-between mb-[16px] items-center">
      <div id="entity-name">
        <h1
          class="text-[1.71429em] leading-[1.16667] text-[#17284d] tracking-[0.01em] font-medium"
        >
          {{ isNew ? "Create" : "Update" }} Order
        </h1>
      </div>
    </div>
    <form id="form" @submit.prevent="onSubmit">
      <div id="grid" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div id="col-left" class="col-span-2">
          <div
            id="order-item"
            class="border rounded-[6px] mb-[25px] col-span-2"
          >
            <div
              id="section-header"
              class="h-[40px] bg bg-[#F4F5F7] rounded-t-[6px] px-[16px] flex items-center mb-[15px]"
            >
              <h1
                class="text-[1em] leading-[1.14286] text-[#42526e]/60 font-semibold tracking-[.003em]"
              >
                Order Item
              </h1>
            </div>
            <div class="px-[16px] flex justify-end pb-4">
              <AppButton
                :label="'Add product(s)'"
                @click="openModal"
              ></AppButton>
            </div>
          </div>
          <div
            v-for="(section, index) in sections"
            :key="index"
            id="order-information"
            class="border rounded-[6px] mb-[25px]"
          >
            <div
              id="section-header"
              class="h-[40px] bg bg-[#F4F5F7] rounded-t-[6px] px-[16px] flex items-center mb-[15px]"
            >
              <h1
                class="text-[1em] leading-[1.14286] text-[#42526e]/60 font-semibold tracking-[.003em]"
              >
                {{ section.title }}
              </h1>
            </div>
            <div class="px-[16px]">
              <FormInput
                :key="index"
                v-for="(field, index) in section.fields"
                :label="field.label"
                :type="field.type"
                :id="field.id"
                :form-error="formError[field.id]"
                v-model="order[field.id]"
                :render-as="field.renderAs"
                :required="field.required"
                :options="field.renderAs === 'select' ? field.options : []"
                :multiple="field.multiple"
                :option-value="field.optionValue"
                :option-key="field.optionKey"
                :place-holder="field.placeholder"
                class="mb-[20px]"
              ></FormInput>
            </div>
          </div>
        </div>
        <div id="col-right"></div>
      </div>
      <div id="submit" class="mt-[20px]">
        <AppButton :label="'Save'" :loader="loader"></AppButton>
      </div>
    </form>
  </div>
</template>

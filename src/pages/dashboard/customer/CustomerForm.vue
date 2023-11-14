<script setup>
import FormInput from "@/components/form-input.vue";
import { ref, onMounted, computed } from "vue";
import store from "@/store";
import { useRoute } from "vue-router";
import AppButton from "@/components/app-button.vue";
import Popover from "@/components/popover.vue";
import axios from "@/axios/axios";

/**
 * REACTIVE STATES
 */
const route = useRoute();
let customer = ref({});
const defaultCustomer = ref({
  email: "@gmail.com",
  name: "Rico",
  password: 12345678,
});
const formError = ref({});
const sections = ref([
  {
    title: "Customer Information",
    fields: [
      { label: "Customer Name", id: "name", type: "text", required: true },
      { label: "Customer Email", id: "email", type: "text", required: true },
      {
        label: "Customer password",
        id: "password",
        type: "password",
        required: true,
      },
    ],
  },
]);
const isNew = route.name === "CustomerCreate";
const loader = ref(false);
const createStatusCode = ref(false);
/**
 * COMPUTED
 */
const customerItem = computed(() =>
  store.getters['customer/itemById'](route.params.id)
);

/**
 * FUNCTIONS
 */

async function createCustomer() {
  loader.value = true;
  const formData = new FormData();

  Object.entries(customer.value).forEach(([key, value]) => {
    if (["thumbnail_image"].includes(key)) {
      value.forEach((file) => {
        formData.append(key, file);
      });
    } else {
      formData.append(key, value);
    }
  });

  try {
    const response = await axios.post("/admin/customers", formData);
    customer.value = response.data.data;
    formError.value = {};
    createStatusCode.value = response.status;
    store.dispatch("addCustomer", response.data.data);
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

async function updateCustomer() {
  loader.value = true;
  const formData = new FormData();

  Object.entries(customer.value).forEach(([key, value]) => {
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
      `/admin/customers/${route.params.id}`,
      formData
    );
    customer.value = response.data.data;
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
    createCustomer();
  } else {
    updateCustomer();
  }
}

function prepareComponent() {
  if (!isNew) {
    customer.value = { ...customerItem.value };
  } else {
    customer.value = defaultCustomer.value;
  }
}

onMounted(() => {
  prepareComponent();
});
</script>

<template>
  <Popover :responseStatus="[200, 201].includes(createStatusCode)"></Popover>
  <div id="create-customer">
    <div class="flex justify-between mb-[16px] items-center">
      <div id="entity-name">
        <h1
          class="text-[1.71429em] leading-[1.16667] text-[#17284d] tracking-[0.01em] font-medium"
        >
          {{ isNew ? "Create" : "Update" }} Customer
        </h1>
      </div>
    </div>
    <form id="form" @submit.prevent="onSubmit">
      <div id="grid" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div id="col-left" class="col-span-2">
          <div
            v-for="(section, index) in sections"
            :key="index"
            id="customer-information"
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
                v-model="customer[field.id]"
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

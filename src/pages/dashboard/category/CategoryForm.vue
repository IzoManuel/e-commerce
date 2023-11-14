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
let category = ref({});
const defaultCategory = ref({
  name: "Default Category",
});
const formError = ref({});
const sections = ref([
  {
    title: "Category Information",
    fields: [
      { label: "Category Name", id: "name", type: "text", required: true },
    ],
  },
]);
const isNew = route.name === "CategoryCreate";
const loader = ref(false);
const createStatusCode = ref(false);
/**
 * COMPUTED
 */
const categoryItem = computed(() =>
  store.getters['category/itemById'](route.params.id)
);

/**
 * FUNCTIONS
 */

 async function createCategory() {
  loader.value = true;
  const formData = new FormData();

  Object.entries(category.value).forEach(([key, value]) => {
    if (["thumbnail_image"].includes(key)) {
      value.forEach((file) => {
        formData.append(key, file);
      });
    } else {
      formData.append(key, value);
    }
  });

  try {
    const response = await axios.post("/admin/categories", formData);
    category.value = response.data.data;
    formError.value = {};
    createStatusCode.value = response.status;
    store.dispatch('addCategory', response.data.data);
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

async function updateCategory() {
  loader.value = true;
  const formData = new FormData();

  Object.entries(category.value).forEach(([key, value]) => {
    if (["thumbnail_image"].includes(key)) {
      value.forEach((file) => {
        formData.append(key, file);
      });
    } else {
      formData.append(key, value);
    }
  });

  try {
    const response = await axios.put(`/admin/categories/${route.params.id}`, formData);
    category.value = response.data.data;
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
    createCategory();
  } else {
    updateCategory();
  }
}

function prepareComponent() {
  if (!isNew) {
    category.value = { ...categoryItem.value };
  } else {
    category.value = defaultCategory.value;
  }
}

onMounted(() => {
  prepareComponent();
});
</script>

<template>
      <Popover :responseStatus="[200, 201].includes(createStatusCode)"></Popover>
  <div id="create-category">
    <div class="flex justify-between mb-[16px] items-center">
      <div id="entity-name">
        <h1
          class="text-[1.71429em] leading-[1.16667] text-[#17284d] tracking-[0.01em] font-medium"
        >
          {{ isNew ? 'Create': 'Update'}} Category
        </h1>
      </div>
    </div>
    <form id="form" @submit.prevent="onSubmit">
      <div id="grid" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div id="col-left" class="col-span-2">
          <div
            v-for="(section, index) in sections"
            :key="index"
            id="category-information"
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
                v-model="category[field.id]"
                :render-as="field.renderAs"
                :required="field.required"
                :options="field.renderAs === 'select' ? field.options : []"
                :multiple = field.multiple
                :option-value="field.optionValue"
                :option-key="field.optionKey"
                :place-holder="field.placeholder"
                class="mb-[20px]"
              ></FormInput>
            </div>
          </div>
        </div>
        <div id="col-right">
        </div>
      </div>
      <div id="submit" class="mt-[20px]">
        <AppButton :label="'Save'" :loader="loader" @click="onSubmit"></AppButton>
      </div>
    </form>
  </div>
</template>

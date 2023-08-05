<script setup>
import { ref } from "vue";
import BreadCrumb from "../../../components/bread-crumb.vue";
import FormInput from "../../../components/form-input.vue";
import AppButton from "../../../components/app-button.vue";
import axios from "../../../axios/axios";
import Popover from "../../../components/popover.vue";

/**
 * REACTIVE STATE
 */
const productImages = ref([]);
const product = ref({
  name: "Example product name",
  description: "Example product description",
  category: 2,
  unit_price: 525,
  current_stock: 1,
  discount: 500,
  min_quantity: 1,
});
const loader = ref(false);
const formError = ref({});
const createStatusCode = ref(false);
const categoryTest = ref([
  {
    id: 1,
    name: "category1",
  },
  {
    id: 2,
    name: "category2",
  },
  {
    id: 3,
    name: "category3",
  },
]);
const sections = ref([
  {
    title: "Product information",
    fields: [
      { label: "Product Name", id: "name", type: "text", required: true },
      {
        label: "Category",
        id: "category_id",
        renderAs: "select",
        required: true,
        options: categoryTest,
        optionValue: "name",
        optionKey: "id",
      },
      {
        label: "Brand",
        id: "brand",
        renderAs: "select",
      },
      {
        label: "Unit Price",
        id: "unit_price",
        type: "number",
        required: true,
      },
      {
        label: "Unit",
        id: "unit",
        type: "text",
        placeholder: "Unit (e.g Kg, Pcs)",
      },
      {
        label: "Weight",
        id: "weight",
        type: "number",
      },
      {
        label: "Minimum Purchase qty",
        id: "min_quantity",
        type: "number",
      },
      {
        label: "Tags",
        id: "tags",
        type: "text",
      },
      {
        label: "Barcode",
        id: "barcode",
        type: "text",
      },
      {
        label: "Refundable",
        id: "refundable",
        type: "radio",
      },
    ],
  },
  {
    title: "Product images",
    fields: [
      { label: "Gallery images", id: "product_images[]", type: "file" },
      { label: "Thumbnail image", id: "thumbnail_img", type: "file" },
    ],
  },
  {
    title: "Product videos",
    fields: [
      { label: "Video provider", id: "video_provider", renderAs: "select" },
      { label: "Video Link", id: "video_link", type: "text" },
    ],
  },
  {
    title: "Product variations",
    fields: [
      { label: "Colors", id: "colors", renderAs: "select" },
      { label: "Attributes", id: "attributes", renderAs: "select" },
    ],
  },
  {
    title: "Product price & stock",
    fields: [
      { label: "Discount date range", id: "discount_date_range", type: "date" },
      { label: "Discount", id: "discount", type: "number" },
      { label: "Set point", id: "set_point", type: "number" },
      { label: "Quantity", id: "quantity", type: "number" },
      { label: "SKU", id: "sku", type: "text" },
      { label: "External link", id: "external_link", type: "text" },
      {
        label: "External link button text",
        id: "external_link_button_text",
        type: "text",
      },
    ],
  },
  {
    title: "Product description",
    fields: [{ label: "Description", id: "description", renderAs: "textarea" }],
  },
  {
    title: "PDF specification",
    fields: [
      { label: "PDF specification", id: "pdf_specification", type: "file" },
    ],
  },
  {
    title: "SEO meta tags",
    fields: [
      { label: "Title", id: "meta_title", type: "text" },
      { label: "Description", id: "meta_description", type: "textarea" },
      { label: "Meta image", id: "meta_image", type: "file" },
    ],
  },
]);
const sectionsRight = ref([
  {
    title: "Shipping configuration",
    fields: [
      { label: "Free shipping", id: "shipping_type", type: "switch", negativeCorrelated:'flat_rate' },
      //{ label: "Flat rate", id: "flat_rate", type: "switch" },
      { label: "Flat rate shipping cost", id: "flat_shipping_cost", type: "number" },
      {
        label: "Is product quantity multiply",
        id: "is_quantity_multiplied",
        type: "switch",
      },
    ],
  },
  {
    title: "Low stock quantity Warning",
    fields: [{ label: "Quantity", id: "current_stock", type: "number" }],
  },
  {
    title: "Stock visibility state",
    fields: [
      {
        label: "Show stock quantity",
        id: "stock_visibility_state",
        type: "switch",
      },
      {
        label: "Show stock with text only",
        id: "stock_with_text",
        type: "switch",
      },
      {
        label: "Hide stock",
        id: "hide_stock",
        type: "switch",
      },
    ],
  },
  {
    title: "Cash on delivery",
    fields: [{ label: "Status", id: "cod_status", type: "switch" }],
  },
  {
    title: "Featured",
    fields: [{ label: "Status", id: "featured_status", type: "switch" }],
  },
  {
    title: "Today's deal",
    fields: [{ label: "Status", id: "todays_deal_status", type: "switch" }],
  },
  {
    title: "Flash deal",
    fields: [
      { label: "Add to flash", id: "todays_deal_status", type: "select" },
      { label: "Discount", id: "flash_deal_discaount", type: "number" },
      {
        label: "Discount type",
        id: "flash_deal_discount_type",
        type: "select",
      },
    ],
  },
  {
    title: "Estimate shipping time",
    fields: [{ label: "Shipping days", id: "shipping_days", type: "number" }],
  },
  {
    title: "Vat & tax",
    fields: [{ label: "Tax", id: "tax", type: "number" }],
  },
]);
/**
 * FUNCTIONS
 *
 * */
function createProduct() {
  loader.value = true;
  const formData = new FormData();

  for (let i = 0; i < productImages.value.length; i++) {
    formData.append("product_images[]", productImages);
  }
  productImages.value.forEach((file) => {
    formData.append("product_images[]", file);
  });

  Object.keys(product.value).forEach(function (key, index) {
    console.log(`Product: ${key}: ${product.value[key]}`);
    formData.append(key, product.value[key]);
  });
  axios
    .post("/admin/products", formData)
    .then((response) => {
      product.value = response.data.product;
      formError.value = {};
      createStatusCode.value = response.status;
    })
    .catch((err) => {
      if (err.response) {
        formError.value = err.response.data.errors;
      }
    })
    .finally(() => {
      loader.value = false;
      setTimeout(() => {
        createStatusCode.value = false;
      }, 3000);
    });
}

function handleFileInputChange(event) {
  console.log(`FILE CHANGING`);
  // Access the files from the event target
  if (event.target.files) {
    console.log(`Files ${Array.from(event.target.files)}`);
    productImages.value = Array.from(event.target.files);
  }
}
</script>

<template>
  <Popover :responseStatus="createStatusCode == 200"></Popover>
  <div id="create-product">
    <div class="flex justify-between mb-[16px] items-center">
      <div id="entity-name">
        <h1
          class="text-[1.71429em] leading-[1.16667] text-[#17284d] tracking-[0.01em] font-medium"
        >
          Create Product
        </h1>
      </div>
    </div>
    <div id="form">
      <div id="grid" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div id="col-left" class="col-span-2">
          <div
            v-for="(section, index) in sections"
            :key="index"
            id="product-information"
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
                ref=""
                @change="handleFileInputChange"
                :label="field.label"
                :type="field.type"
                :id="field.id"
                :form-error="formError[field.id]"
                v-model="product[field.id]"
                :render-as="field.renderAs"
                :required="field.required"
                :options="field.renderAs === 'select' ? field.options : []"
                :option-value="field.optionValue"
                :option-key="field.optionKey"
                :place-holder="field.placeholder"
                class="mb-[20px]"
              ></FormInput>
            </div>
          </div>
        </div>
        <div id="col-right">
          <div
            v-for="(section, index) in sectionsRight"
            :key="index"
            id="product-information"
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
                v-model="product[field.id]"
                :render-as="field.renderAs"
                :required="field.required"
                :options="field.renderAs === 'select' ? field.options : []"
                :option-value="field.optionValue"
                :option-key="field.optionKey"
                :place-holder="field.placeholder"
                class="mb-[20px]"
              ></FormInput>
            </div>
          </div>
        </div>
      </div>
      <div id="submit" class="mt-[20px]">
        <AppButton
          :label="'Save'"
          :action="createProduct"
          :loader="loader"
        ></AppButton>
      </div>
    </div>
  </div>
</template>

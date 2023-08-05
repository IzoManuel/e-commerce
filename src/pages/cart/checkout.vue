<script setup>
import BaseLayout from "../../layouts/base-layout.vue";
import FormInput from "@/components/form-input.vue";
import { ref, computed } from "vue";
import AppButton from "@/components/app-button.vue";
import { getSrc } from "@/composables/util";
import store from "@/store";

const checkout = ref({});
const formError = ref({});
const sections = ref([
  {
    title: "Contact",
    fields: [
      {
        label: "Email",
        id: "email",
        type: "email",
        required: true,
      },
    ],
  },
  {
    title: "Shipping Address",
    fields: [
      {
        label: "Country",
        id: "country",
        type: "select",
        renderAs: "select",
      },
      {
        label: "Full name",
        id: "full_name",
        type: "text",
        required: true,
      },
      {
        label: "Address",
        id: "address",
        type: "text",
        required: true,
      },
      {
        label: "City",
        id: "city",
        type: "text",
        required: true,
      },
      {
        label: "Phone",
        id: "phone",
        type: "text",
        required: true,
      },
    ],
  },
]);

/**
 * COMPUTED
 */
const cartItems = computed(() => store.getters.cartItems);
const totalPriceForCartItem = computed(() => (cartItemId) =>
  store.getters.totalPriceForCartItem(cartItemId)
);
const totalCartPrice = computed(() => store.getters.totalCartPrice);
</script>
<template>
  <!-- <BaseLayout
    ><template #mainContent> </template
  ></BaseLayout> -->
  <div id="checkout">
    <div
      id="checkout-content"
      class="2xl:max-w-[1344px] xl:max-w-[1152px] lg:max-w-[960px] mx-auto relative"
    >
      <div id="grid-cols" class="flex flex-col lg:flex-row">
        <div
          id="col-left"
          class="border-r border-[#d3d3d3] lg:w-[54%] h-[100vh] pt-[4em] pr-[4em]"
        >
          <div class="site-logo">
            <h1 class="text-[2em] text-[#333333]">St. Manuel</h1>
          </div>
          <div id="form" class="mt-[30px] text-[#333333]">
            <div v-for="(section, index) in sections" :key="index">
              <div id="section-header" class="mb-[10px]">
                {{ section.title }}
              </div>
              <div>
                <FormInput
                  :key="index"
                  v-for="(field, index) in section.fields"
                  :label="field.label"
                  :type="field.type"
                  :id="field.id"
                  :form-error="formError[field.id]"
                  v-model="checkout[field.id]"
                  :render-as="field.renderAs"
                  :required="field.required"
                  :option-value="field.optionValue"
                  :option-key="field.optionKey"
                  :place-holder="field.placeholder"
                  class="mb-[20px]"
                ></FormInput>
              </div>
            </div>

            <div id="cta" class="flex justify-end">
              <AppButton
                :label="'Continue to shipping'"
              ></AppButton>
            </div>
          </div>
        </div>
        <div id="col-right" class="lg:w-[46%] pt-[56px] pl-[44px] relative">
          <div id="sidbar-summary">
            <div id="order-summary-sections" class="flex flex-col">
              <div id="product-list-section" class="mt-[0.75em] mb-[1.5em]">
                <div
                  v-for="(cartItem, index) in cartItems"
                  :key="index"
                  id="row product-table"
                  class="flex justify-between items-center"
                >
                  <div id="product-info" class="flex items-center gap-3">
                    <div
                      id="product-image"
                      class="h-[64px] w-[64px] relative border rounded-[6px]"
                    >
                      <div
                        id="item-quantity"
                        class="absolute right-0 top-0 rounded-full bg-[#727272e6] h-[25px] w-[25px] flex items-center"
                      >
                        <span
                          class="text-white text-center text-[0.8571em] font-medium leading-[1.75em] min-w-[1.75em] w-full p-[4px]"
                          >{{ cartItem.quantity }}</span
                        >
                      </div>
                      <img :src="getSrc(`images/${cartItem.thumbnail_img}.jpg`)" />
                    </div>
                    <div id="Product-description">
                      <h1 class="font-medium text-[#323232] text-[14px]">
                        {{ cartItem.name }}
                      </h1>
                    </div>
                  </div>
                  <div id="product-total">
                    <h1 class="font-medium text-[#323232] text-[14px]">${{ totalPriceForCartItem(cartItem.id) }}</h1>
                  </div>
                </div>
              </div>
              <div
                id="discount-section form"
                class="py-[1.5em] border-t border-top flex items-center gap-2"
              >
                <FormInput :label="'Discount code'" :type="'text'"></FormInput>
                <AppButton :label="'Apply'"></AppButton>
              </div>
              <div id="totals-section" class="py-[1.5em] border-t border-top">
                <div id="subtotal" class="flex items-center justify-between">
                  <div id="subtotal-label" class="text-[14px]">Subtotal</div>
                  <div id="subtotal-price" class="font-medium text-[14px]">
                    ${{ totalCartPrice }}
                  </div>
                </div>
                <div
                  id="shipping"
                  class="flex items-center justify-between mt-[7px]"
                >
                  <div id="shipping-label" class="text-[14px]">Shipping</div>
                  <div id="shipping-price" class="font-medium text-[14px]">
                    $0
                  </div>
                </div>
                <div
                  id="total"
                  class="py-[1.5em] border-t border-top mt-[1.5em]"
                >
                  <div id="total" class="flex items-center justify-between">
                    <div id="total-label" class="text-[16px]">Total</div>
                    <div id="total-price" class="font-medium text-[24px]">
                      ${{ totalCartPrice }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import BaseLayout from "../../layouts/base-layout.vue";
import ChevronDown from "../../assets/svgs/chevron-down.vue";
import { getSrc } from "../../composables/util";
import { ref, onMounted, computed } from "vue";
import store from "@/store";

/**
 * COMPUTED
 */
const cartItems = computed(() => store.getters.cartItems);
const totalQuantity = computed(() => store.getters.totalQuantity);
const totalPriceForCartItem = computed(() => (cartItemId) =>
  store.getters.totalPriceForCartItem(cartItemId)
);
const totalCartPrice = computed(() => store.getters.totalCartPrice);

/**
 * FUNCTIONS
 */
const decrementCartItemQuantity = (itemId) => {
  store.dispatch('decrementCartItemQuantity', itemId)
};

const incrementCartItemQuantity = (itemId) => {
  store.dispatch('incrementCartItemQuantity', itemId)
}

const removeCartItem = (itemId) => {
  store.dispatch('removeCartItem', itemId)
}
</script>

<template>
  <BaseLayout>
    <template #mainContent>
      <div id="cart" class="pt-[1rem] pb-[50px]">
        <div
          id="cart-content"
          class="2xl:max-w-[1344px] xl:max-w-[1152px] lg:max-w-[960px] mx-auto"
        >
          <div id="columns" class="p-[0.75rem] flex flex-col lg:flex-row">
            <div id="col-left" class="p-[12px] lg:w-[66%]">
              <div id="return-block" class="">
                <router-link
                  :to="{ name: 'ProductIndex' }"
                  class="flex items-center gap-2 hover:opacity-80"
                >
                  <div class="w-[15px] h-[15px] rotate-90">
                    <ChevronDown></ChevronDown>
                  </div>
                  <p class="text-[14px]">Continue shopping</p>
                </router-link>
              </div>
              <div id="cart-page-title" class="mt-[30px] inline-block">
                <h1
                  class="text-[30px] tracking-[2px] uppercase font-bodoni leading-[1.2]"
                >
                  Your Cart
                </h1>
              </div>
              <div id="items-length" class="inline-block">
                <span class="text-[#4a4a4a] text-[1em] leading-[1.5]"
                  >[ {{ totalQuantity }} items]</span
                >
              </div>
              <div id="card-items-table">
                <div
                  id="card-items-header"
                  class="flex border-b border-[#d3d3d3] pb-[5px]"
                >
                  <div id="header-column" class="w-[67%]">
                    <span
                      class="uppercase text-[12px] tracking-[2.5px] leading-[1.5]"
                      >Item Summary</span
                    >
                  </div>
                  <div id="header-column" class="w-[25%]">
                    <span class="uppercase text-[12px] tracking-[2.5px]"
                      >Quantity</span
                    >
                  </div>
                  <div id="header-column" class="w-[8%]">
                    <span class="uppercase text-[12px] tracking-[2.5px]"
                      >total</span
                    >
                  </div>
                </div>
                <div id="card-items-body">
                  <div
                    v-for="(cartItem, index) in cartItems"
                    :key="index"
                    id="card-item-row"
                    class="py-[16px] flex md:flex-wrap border-b border-[#d3d3d3]"
                  >
                    <div id="item-summary-column" class="w-[67%] flex">
                      <div id="item-image item-summary-column" class="w-[38%]">
                        <img
                          class="w-full h-full"
                          :src="getSrc(`images/${cartItem.thumbnail_img}.jpg`)"
                        />
                      </div>
                      <div
                        id="item-info item-summary-column"
                        class="p-[12px] w-[62%]"
                      >
                        <router-link
                          :to="{ name: 'ProductIndex' }"
                          id="item-name"
                          class="text-[14px] leading-[1.5] tracking-[.5px] font-light"
                        >
                          {{ cartItem.name }}
                        </router-link>
                        <div
                          id="description-excerpt"
                          class="py-[8px] text-[14px] leading-[1.5] tracking-[.5px] font-light"
                        >
                          <p>Soft pillow now available</p>
                        </div>
                      </div>
                    </div>

                    <div
                      id="item-quantity-column"
                      class="text-[14px] w-[25%] flex justify-between flex-col"
                    >
                      <div id="input-group" class="flex items-center mb-[0.5rem] flex-row">
                        <div id="decrement-switch" class="flex items-center justify-center w-[2rem] h-full border">
                          <button class="w-full h-full mx-auto hover:bg-[#f5f5f5]" @click="decrementCartItemQuantity(cartItem.id)"> - </button>
                        </div>
                        <input
                          type="number"
                          min="1"
                          max="12"
                          class="leading-[2rem] border focus:border-black pl-[0.5rem] outline-none"
                          :value="cartItem.quantity"
                        />
                        <div id="decrement-switch" class="flex items-center justify-center w-[2rem] h-full border">
                          <button @click="incrementCartItemQuantity({cartItemId:cartItem.id})" class="w-full h-full mx-auto hover:bg-[#f5f5f5]"> + </button>
                        </div>
                      </div>
                      <div id="" class="flex items-center">
                        <button
                          class="pr-[3px] text-[13px] leading-[1] tracking-[.5px] underline font-thin text-center"
                        >
                          Save for Later
                        </button>
                        <button
                          class="pr-[3px] text-[13px] leading-[1] tracking-[.5px] underline font-thin text-center"
                        >
                          Add to Wishlist
                        </button>
                      </div>
                    </div>
                    <div
                      id="item-total-column"
                      class="w-[8%] flex justify-between flex-col"
                    >
                      <div id="total">
                        <h1 class="text-[14px]">
                          ${{ totalPriceForCartItem(cartItem.id) }}
                        </h1>
                      </div>
                      <div id="" class="flex items-center">
                        <button
                        @click="removeCartItem(cartItem.id)"
                          class="pr-[3px] text-[13px] leading-[1] tracking-[.5px] underline font-thin text-center"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              id="col-right"
              class="p-[0.75rem] lg:w-[44%] w-full max-w-[500px] mx-auto"
            >
              <div id="free-shipping">
                <p
                  class="text-[12px] text-center font-light leading-[1.83] tracking-[.43px] mb-[10px]"
                >
                  Your Order Qualifies For Free Shipping!
                </p>
              </div>
              <div
                id="prices-container"
                class="p-[1.5rem] pt-[.5rem] border border-[#999]"
              >
                <h1
                  id="cart-summary-header"
                  class="text-center text-[18px] tracking-[.5px] pt-[10px] pb-[20px]"
                >
                  Summary
                </h1>
                <div
                  id="prices-container"
                  class="border-y border-y-[#d3d3d3] pt-[20px]"
                >
                  <div id="cart-price" class="flex justify-between">
                    <span
                      id="cart-price-text"
                      class="text-[14px] font-light leading-[1.57] tracking-[.5px]"
                      >Item Total</span
                    >
                    <span
                      id="cart-price-text"
                      class="text-[14px] font-light leading-[1.57] tracking-[.5px] mb-[1rem]"
                      >${{ totalCartPrice }}</span
                    >
                  </div>
                  <div id="type-price" class="flex justify-between">
                    <span
                      id="cart-shipping-text"
                      class="text-[14px] font-light leading-[1.57] tracking-[.5px]"
                      >Estimated Shipping</span
                    >
                    <span
                      id="cart-shippinge-text"
                      class="text-[14px] font-light leading-[1.57] tracking-[.5px] mb-[1rem]"
                      >Free</span
                    >
                  </div>
                  <div id="type-price" class="flex justify-between">
                    <span
                      id="cart-taxes-text"
                      class="text-[14px] font-light leading-[1.57] tracking-[.5px]"
                      >Estimated Taxes</span
                    >
                    <span
                      id="cart-taxes-text"
                      class="text-[14px] font-light leading-[1.57] tracking-[.5px] mb-[1rem]"
                      >TBD</span
                    >
                  </div>
                </div>
                <div id="total-container" class="pt-[1rem]">
                  <div id="type-price" class="flex justify-between">
                    <span
                      id="cart-price-text"
                      class="text-[14px] font-light leading-[1.57] tracking-[.5px]"
                      >Estimated Total</span
                    >
                    <span
                      id="cart-price-text"
                      class="text-[14px] font-light leading-[1.57] tracking-[.5px] mb-[1rem]"
                      >${{ totalCartPrice }}</span
                    >
                  </div>
                  <div id="discount-container">
                    <div id="input-group cart" class="flex flex-nowrap">
                      <input
                        type="text"
                        class="w-[70%] h-[50px] border border-black pl-[0.5rem] mb-[0.5rem] outline-none"
                      />
                      <button
                        class="w-[30%] h-[50px] border border-black bg-black text-white uppercase text-[12px] tracking-[1.5px] ml-[1rem]"
                      >
                        apply
                      </button>
                    </div>
                  </div>
                  <div id="checkout-button" class="mt-[25px]">
                    <router-link :to="{ name: 'Checkout' }">
                      <button
                        class="w-full h-[50px] border border-black bg-black text-white uppercase text-[12px] tracking-[1.5px]"
                      >
                        checkout
                      </button>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </BaseLayout>
</template>

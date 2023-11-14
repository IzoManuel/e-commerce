<script setup>
import { getSrc } from "@/composables/util";
import store from "@/store";
import SlideOver from "@/components/slide-over.vue";
import { computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
/**
 * COMPUTED
 */
const totalQuantity = computed(() => store.getters['cart/totalQuantity']);
const showSlideover = computed(() => store.getters['cart/showSlideover']);
const cartItems = computed(() => store.getters['cart/cartItems']);

/**
 * COMPUTED
 */
const totalCartPrice = computed(() => store.getters['cart/totalCartPrice']);
const totalPriceForCartItem = computed(
  () => (cartItemId) => store.getters['cart/totalPriceForCartItem'](cartItemId)
);

/**
 * FUNCTIONS
 */
const decrementCartItemQuantity = (itemId) => {
  store.dispatch("cart/decrementCartItemQuantity", itemId);
};

const incrementCartItemQuantity = (itemId) => {
  store.dispatch("cart/incrementCartItemQuantity", itemId);
};

const removeCartItem = (itemId) => {
  store.dispatch("cart/removeCartItem", itemId);
};

function toCart() {
  router.push({ name: "Cart" });
  store.dispatch("cart/toggleSlideover");
}

function toCheckout() {
  router.push({ name: "Checkout" });
  store.dispatch("cart/toggleSlideover");
}
</script>
<template>
  <slide-over :slideOverState="showSlideover">
    <template #title
      ><div
        class="px-[1rem] pb-6 border-b border-[#d3d3d3] fixed w-full z-10 bg-white pt-6"
      >
        cart [{{ totalQuantity }}]
      </div></template
    >
    <template #slideOverContent>
      <div id="grid" class="mt-[66px] pb-[179px]">
        <div id="col-left cart-items">
          <div
            v-for="(cartItem, index) in cartItems"
            :key="index"
            id="card-item-row"
            class="p-[16px] flex flex-row border-b border-[#d3d3d3] last:border-b-0"
          >
            <div id="item-summary-column" class="flex">
              <div id="item-image item-summary-column" class="w-[33%]">
                <img
                  class="w-full h-full"
                  :src="getSrc(`images/${cartItem.thumbnail_img}.jpg`)"
                />
              </div>
              <div id="item-info item-summary-column" class="p-[12px] w-[67%]">
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
                <div
                  id="item-quantity-column"
                  class="text-[14px] h-[34px] flex justify-between flex-col"
                >
                  <div
                    id="input-group"
                    class="flex items-center mb-[0.5rem] flex-row"
                  >
                    <div
                      id="decrement-switch"
                      class="flex items-center justify-center w-[2rem] h-full border"
                    >
                      <button
                        class="w-full h-full mx-auto hover:bg-[#f5f5f5]"
                        @click="decrementCartItemQuantity(cartItem.id)"
                      >
                        -
                      </button>
                    </div>
                    <input
                      type="number"
                      min="1"
                      max="12"
                      class="leading-[2rem] border focus:border-black pl-[0.5rem] outline-none"
                      :value="cartItem.quantity"
                    />
                    <div
                      id="decrement-switch"
                      class="flex items-center justify-center w-[2rem] h-full border"
                    >
                      <button
                        @click="
                          incrementCartItemQuantity({
                            cartItemId: cartItem.id,
                          })
                        "
                        class="w-full h-full mx-auto hover:bg-[#f5f5f5]"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="item-total-column" class="flex justify-between flex-col">
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
        <div
          id="footer"
          class="border-t border-[#d3d3d3] fixed p-[1rem] bottom-0 z-10 bg-white w-[448px]"
        >
          <div id="cart-price" class="flex justify-between relative mb-[1rem]">
            <span
              id="cart-price-text"
              class="text-[14px] font-light leading-[1.57] tracking-[.5px]"
              >Subtotal</span
            >
            <span
              id="cart-price-text"
              class="text-[14px] font-light leading-[1.57] tracking-[.5px]"
              >${{ totalCartPrice }}</span
            >
          </div>
          <div id="button-group" class="flex flex-col gap-[10px]">
           
              <button
              @click="toCart()"
                class="w-full h-[50px] border border-black bg-black text-white uppercase text-[12px] tracking-[1.5px]"
              >
                View cart
              </button>
            
            
              <button
              @click="toCheckout"
                id="cta"
                class="w-full py-[17px] border border-black text-[12px] leading-[1] tracking-[1.5px] uppercase text-center"
              >
                Checkout
              </button>
            
          </div>
        </div>
      </div>
    </template>
  </slide-over>
</template>

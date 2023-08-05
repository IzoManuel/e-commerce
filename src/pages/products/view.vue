<script setup>
import { getSrc } from "@/composables/util";
import ChevronDown from "../../assets/svgs/chevron-down.vue";
import { useRoute } from "vue-router";
import { onMounted, computed, ref } from "vue";
import store from "@/store";
import CartSlideover from "@/pages/cart/partials/cart-slideover.vue";

const route = useRoute();
const productSlug = route.params.id;
const product = ref({});
const itemQuantity = ref(1);

/**
 * COMPUTED
 */
const products = computed(() => store.getters.productItems);
const totalPrice = computed(() => {
  if (itemQuantity.value < 1 || itemQuantity.value > 12) {
    return product.value.unit_price;
  }
  return product.value.unit_price * itemQuantity.value;
});


/**
 * FUNCTIONS
 */
function prepareComponent() {
  store.dispatch("getProductItems");
  product.value = products.value.find(
    (product) => product.slug === productSlug
  );
}

const addItemToCart = (item) => {
  store.dispatch("addCartItem", item);
};

function handleCartButtonClick(item) {
  addItemToCart({ cartItem: item, increment: itemQuantity.value });
  store.dispatch('toggleSlideover')
}

/**
 * HOOKS
 */
onMounted(() => {
  prepareComponent();
});
</script>

<template>
  <div
    class="product-details-content py-[48px] 2xl:max-w-[1344px] xl:max-w-[1152px] lg:max-w-[960px] mx-auto"
  >
    <div id="product-details" class="grid grid-cols-1 lg:grid-cols-2">
      <div id="col-left" class="p-[12px]">
        <div id="media-select-view">
          <div id="media-viewer-column" class="relative mb-[32px]">
            <div id="image-container">
              <div>
                <div id="nacelle-image" class="w-full">
                  <img
                    :src="getSrc(`images/${product.thumbnail_img}.jpg`)"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div
              id="carousel-left-nav"
              class="h-[25px] w-[25px] rounded-full cursor-pointer absolute top-0 bottom-0 my-auto left-0 bg-white"
            >
              <ChevronDown class="rotate-90"></ChevronDown>
            </div>
            <div
              id="carousel-right-nav"
              class="h-[25px] w-[25px] rounded-full cursor-pointer absolute top-0 bottom-0 my-auto right-0 bg-white"
            >
              <ChevronDown class="-rotate-90"></ChevronDown>
            </div>
            <div id="action-container" class="pt-[15px] flex items-center">
              <div id="carousel-controller" class="mx-auto flex gap-2">
                <div
                  id="carousel-dot"
                  class="rounded-full w-[8px] h-[8px] border border-black bg-black"
                ></div>
                <div
                  id="carousel-dot"
                  class="rounded-full w-[8px] h-[8px] border border-black"
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div id="share-buttons" class="max-w-[200px] mx-auto">
          <h1
            id="title"
            class="text-center uppercase text-[12px] leading-[1.38] tracking-[0.5px] my-[20px] font-walsheim font-[500]"
          >
            Share
          </h1>
          <div class="flex justify-around">
            <div
              :key="index"
              v-for="(item, index) in [
                { title: 'Instagram', svg: 'instagram.svg' },
                { title: 'Facebook', svg: 'facebook.svg' },
                { title: 'Pinterest', svg: 'pinterest.svg' },
                { title: 'Twitter', svg: 'twitter.svg' },
              ]"
              id="footer-link"
              class="text-[14px] tracking-[0.15px] mb-[14px] flex items-center"
            >
              <img
                class="mr-[0.5rem] h-[20px] w-[20px] cursor-pointer"
                :src="getSrc(`svgs/${item.svg}`)"
              />
            </div>
          </div>
        </div>
        <div></div>
      </div>
      <div id="col-right details-column" class="p-[12px] lg:pl-[80px]">
        <h3
          id="product-title"
          class="mx-auto uppercase font-bodoni text-[26px] leading-[1.15] tracking-[1.5px] mb-[1rem] text-center max-w-[450px]"
        >
          {{ product.name }}
        </h3>
        <div id="product-category">
          <p class="text-center text-[18px] tracking-[.5px]">Printed</p>
        </div>
        <div id="price">
          <h1
            class="text-center tracking-[.04em] text-[18px] pb-[30px] leading-[1.5]"
          >
            ${{ product.unit_price }}
          </h1>
        </div>
        <div id="variant-section" class="border-t border-[#d3d3d3]">
          <div id="shipping" class="py-[1rem]">
            <p class="text-[14px] font-light tracking-[.5px]">
              Free shipping on orders over $150
            </p>
          </div>
          <h2
            id="quantity-text"
            class="mb-[10px] text-[12px] font-medium leading-[1] uppercase"
          >
            Quantity:
          </h2>
          <div id="input-group cart" class="grid grid-cols-1 md:grid-cols-2">
            <input
              type="number"
              min="1"
              max="12"
              v-model="itemQuantity"
              class="w-full h-[50px] border border-black pl-[0.5rem] mb-[0.5rem] outline-none"
            />
            <button
              @click="handleCartButtonClick(product)"
              class="w-full h-[50px] border border-black bg-black text-white uppercase text-[12px] tracking-[1.5px]"
            >
              add to cart: ${{ totalPrice }}
            </button>
          </div>
          <div id="wishlist-cta" class="w-full flex justify-end my-[10px]">
            <button
              id="cta"
              class="md:w-1/2 w-full py-[17px] border border-black text-[12px] leading-[1] tracking-[1.5px] uppercase text-center"
            >
              Add to wishlist
            </button>
          </div>
          <div id="product-description" class="mt-[42px] mb-[16px]">
            <div
              id="product-details-container first"
              class="border-y border-y-[#d3d3d3]"
            >
              <div
                id="details-title"
                class="py-[1.25rem] flex justify-between items-center cursor-pointer"
              >
                <h1
                  class="uppercase text-[12px] font-medium leading-[1] tracking-[1.5px] cursor-pointer"
                >
                  Product information
                </h1>
                <div class="w-[24px] h-[24px]"><ChevronDown></ChevronDown></div>
              </div>
              <div id="details-info" class="pb-[30px]">
                <p
                  class="text-[14px] font-light leading-[1.57] tracking-[.5px]"
                >
                  Please remove the down insert before cleaning your pillow
                  cover, then spot clean.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="cart-slide-over">
    <CartSlideover/>
    <!-- <slide-over
      :slideOverState="showSlideover"
      :setSlideOverState="setSlideOverState"
    >
      <template #title><div class="px-[1rem]">cart [{{ totalQuantity }}]</div></template>
      <template #slideOverContent>
        <div id="grid" class="">
          <div id="col-left cart-items">
            <div
              v-for="(cartItem, index) in cartItems"
              :key="index"
              id="card-item-row"
              class="p-[16px] flex flex-row border-b border-[#d3d3d3] first:border-t"
            >
              <div id="item-summary-column" class="flex">
                <div id="item-image item-summary-column" class="w-[33%]">
                  <img
                    class="w-full h-full"
                    :src="getSrc(`images/${cartItem.thumbnail_img}.jpg`)"
                  />
                </div>
                <div
                  id="item-info item-summary-column"
                  class="p-[12px] w-[67%]"
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
              <div
                id="item-total-column"
                class="flex justify-between flex-col"
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
      </template>
    </slide-over> -->
  </div>
</template>

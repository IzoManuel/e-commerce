<script setup>
import { getSrc } from "../composables/util";
import { computed, nextTick } from "vue";
import Spinner from "../components/Spinner.vue";
import GButton from "./g-button.vue";
import store from "@/store";
import CartSlideover from "@/pages/cart/partials/cart-slideover.vue";
import { useRouter } from "vue-router";

const props = defineProps({
  items: {
    type: Array,
  },
  limit: {
    type: Number,
    default: 0,
  },
  list: Boolean,
  loader: Boolean,
});
const router = useRouter();

const hasItems = computed(() => {
  return props.items && props.items.length;
});

const limitedItems = computed(() => {
  if (props.limit === 0) {
    return props.items;
  } else {
    return props.items.slice(0, props.limit);
  }
});

const addItemToCart = (item) => {
  //nextTick(() => {
  store.dispatch("cart/addCartItem", item);
  // });
};

function handleCartButtonClick(item) {
  if (item.current_stock > 0) {
    addItemToCart({ cartItem: item });
    store.dispatch("cart/toggleSlideover");
  }else{
    router.push({name: 'ViewProduct', params: {id: item.slug}})
  }

}
</script>
<template>
  <div id="column" class="mx-auto xl:w-[91.66667%] p-[0.75rem]">
    <div
      v-if="hasItems"
      id="product-grid"
      class="grid lg:grid-cols-4 grid-cols-2 last:-mb-[0.75rem]"
    >
      <div
        id="column"
        class="pt-[0.75rem]"
        :key="index"
        v-for="(item, index) in limitedItems"
      >
        <router-link :to="{ name: 'ViewProduct', params: { id: item.slug } }">
          <div id="product-card" class="p-[1rem]">
            <a id="product-image" class="cursor-pointer relative">
              <div id="product-image-container" class="lg:max-w-[400px] m-auto">
                <div
                  id="badge"
                  class="bg-[#000] rounded-[50px] text-center w-[60px] h-[60px] flex items-center justify-between absolute -right-[15px] -top-[15px] z-10"
                >
                  <p
                    id="badge-text"
                    class="text-[#fff] text-[10px] leading-[1.2] tracking-[1px] uppercase"
                  >
                    Best seller
                  </p>
                </div>
                <div>
                  <div
                    id="nacelle-image"
                    class="max-w-[190px] max-h-[190px] md:max-w-[400px] md:max-h-[400px] mx-auto"
                  >
                    <img
                      :src="getSrc(`images/${item.thumbnail_img}.jpg`)"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </a>
            <div
              id="product-card-details"
              class="flex flex-col pt-[30px] items-center justify-between w-full min-h-[80px]"
            >
              <a class="cursor-pointer">
                <h3
                  id="product-title"
                  class="font-bodoni text-[18px] leading-[1.33] tracking-[0.5px] text-center mb-[0.5rem] hover:text-black/80"
                >
                  {{ item.name }}
                </h3>
              </a>
              <div
                id="product-price-range"
                class="text-center flex items-center gap-1"
              >
                <span
                  id="product-price"
                  class="text-[12px] leading-[1.83] tracking-[0.5px] mb-[0.5px]"
                  >${{ item.unit_price - 200 }}</span
                >
                <span>-</span>
                <span
                  id="product-price"
                  class="text-[12px] leading-[1.83] tracking-[0.5px] mb-[0.5px]"
                  >${{ item.unit_price }}</span
                >
              </div>
              <!-- <h3
                id="product-additional-info"
                class="text-[12px] leading-[1.83] tracking-[0.5px] text-center opacity-90"
              >
                Printed
              </h3> -->
              <h3
                id="product-additional-info"
                class="text-[12px] leading-[1.83] tracking-[0.5px] text-center opacity-90"
              >
                Available in Throw, Lumbar
              </h3>
            </div>
          </div>
        </router-link>
        <div id="add-to-cart" class="flex">
          <GButton
            :label="item.current_stock > 0 ? 'Add to cart' : 'Read More'"
            class="mx-auto bg-[#d3d3d3]/30"
            @click="handleCartButtonClick(item)"
          ></GButton>
        </div>
      </div>
    </div>
    <div class="h-[10vh] w-full flex items-center" v-else>
      <div v-if="loader" id="spinner" class="w-[30px] h-[30px] mx-auto">
        <spinner class="fill-gray-500"></spinner>
      </div>
      <p v-else class="mx-auto">Oops! no Data</p>
    </div>
    <CartSlideover />
  </div>
</template>

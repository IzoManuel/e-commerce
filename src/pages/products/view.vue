<script setup>
import { getSrc } from "@/composables/util";
import ChevronDown from "../../assets/svgs/chevron-down.vue";
import { useRoute } from "vue-router";
import { onMounted, computed, ref } from "vue";
import store from "@/store";
import CartSlideover from "@/pages/cart/partials/cart-slideover.vue";
import { Carousel, Navigation, Pagination, Slide } from "vue3-carousel";

const route = useRoute();
const productSlug = route.params.id;
const product = ref({});
const itemQuantity = ref(1);
const originalUrls = extractOriginalUrls(product.value.productImages)

/**
 * COMPUTED
 */
const products = computed(() => store.getters["product/items"]);
const totalPrice = computed(() => {
  if (itemQuantity.value < 1 || itemQuantity.value > 12) {
    return product.value.unit_price;
  }
  return product.value.unit_price * itemQuantity.value;
});

/**
 * FUNCTIONS
 */
function fetchProducts(searchQuery) {
  store.dispatch("product/getItems", { endpoint: "products", searchQuery });
}

function prepareComponent() {
  fetchProducts();
  product.value = products.value.find(
    (product) => product.slug === productSlug
  );
}

const addItemToCart = (item) => {
  store.dispatch("cart/addCartItem", item);
};

function handleCartButtonClick(item) {
  if (item.current_stock > 0) {
    addItemToCart({ cartItem: item, increment: itemQuantity.value });
    store.dispatch("cart/toggleSlideover");
  }
}

function extractOriginalUrls(productImages) {
    const originalUrls = [];

    for (const key in productImages) {
      const image = productImages[key];
      const originalUrl = image.custom_properties.original_url;

      originalUrls.push(originalUrl);
    }

    return originalUrls.length > 1 ? originalUrls: [getSrc(`images/pillow-1.jpg`),getSrc(`images/pillow-2.jpg`)];
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
        <Carousel>
          <Slide
            v-for="slide in extractOriginalUrls(product.product_images)"
            :key="slide"
          >
            <!-- <img :src="slide" alt="" class="mx-auto" /> -->
            <img  :src="slide"/>
          </Slide>

          <template #addons>
            <Navigation />
            <Pagination />
          </template>
        </Carousel>

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
              {{
                product.current_stock < 1
                  ? `Out of stock`
                  : `Add to cart: $${totalPrice}`
              }}
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
    <CartSlideover />
  </div>
</template>

<style>
.carousel__item {
  min-height: 200px;
  width: 100%;
  background-color: blue;
  color: white;
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel__slide {
  padding: 10px;
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
}
</style>

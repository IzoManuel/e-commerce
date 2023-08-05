<script setup>
import DropDown from "../../components/drop-down.vue";
import ChevronDown from "../../assets/svgs/chevron-down.vue";
import ProductsGrid from "../../components/products-grid.vue";
import { ref, onMounted, computed } from "vue";
import store from "@/store";
import GButton from "@/components/g-button.vue";

/**
 * REACTIVE STATE
 */
const loadingMore = ref(false);

/**
 * COMPUTED
 */
const products = computed(() => store.getters.productItems);
const loading = computed(() => store.getters.loading);
const nextPageExists = computed(() => store.getters.nextPageExists);

/**
 * FUNCTIONS
 */
function prepareComponent() {
  store.dispatch("getProductItems");
}

const loadMore = () => store.dispatch("loadMore");

/**
 * HOOKS
 */
onMounted(() => {
  prepareComponent();
});
</script>
<template>
  <div id="list" class="">
    <div id="collection-banner" class="flex items-center bg-[#000]">
      <div
        id="banner-text"
        class="py-[40px] uppercase mx-auto text-white max-w-[370px]"
      >
        <span
          class="text-center block text-[12px] tracking-[2.5px] mb-[10px] leading-[1.2]"
          >Shop</span
        >
        <p
          class="text-[42px] leading-[1.14] tracking-[3px] font-bodoni text-center"
        >
          Pillows + Throws
        </p>
      </div>
    </div>
    <div
      id="items-list"
      class="2xl:max-w-[1344px] xl:max-w-[1152px] lg:max-w-[960px] mx-auto"
    >
      <div id="filter-section" class="pt-[45px] pb-[2rem]">
        <div id="filters" class="flex justify-between items-center">
          <div id="col-left" class="flex items-center">
            <div id="action-label">
              <h1 class="font-light text-[14px] p-[0.5rem]">Filter:</h1>
            </div>
            <div id="filter-attribute">
              <DropDown>
                <template #menuButton>
                  <button
                    class="text-[10px] text-black uppercase p-[0.75rem] font-medium leading-[1px] flex items-center border border-transparent hover:border-black hover:text-black/80"
                  >
                    <span>Colors</span>
                    <div id="chevron-icon" class="w-[15px] h-[15px]">
                      <ChevronDown></ChevronDown>
                    </div>
                  </button>
                </template>
                <template #menuData>
                  <div
                    id="dropdown-content"
                    class="p-[16px] z-[50] shadow-none"
                  >
                    <div id="info">
                      <p class="text-black text-[14px]">
                        Selecting filters below will automatically update the
                        products on the page.
                      </p>
                    </div>
                  </div>
                </template>
              </DropDown>
            </div>
          </div>
          <div id="col-right" class="flex items-center">
            <div id="action-label">
              <h1 class="font-light text-[14px] p-[0.5rem]">Sort by:</h1>
            </div>
            <div id="filter-attribute">
              <DropDown>
                <template #menuButton>
                  <button
                    class="text-[10px] text-black uppercase p-[0.75rem] font-medium leading-[1px] flex items-center border border-transparent hover:border-black hover:text-black/80"
                  >
                    <span>Featured</span>
                    <div id="chevron-icon" class="w-[15px] h-[15px]">
                      <ChevronDown></ChevronDown>
                    </div>
                  </button>
                </template>
              </DropDown>
            </div>
          </div>
        </div>
      </div>
      <div id="items-container" class="py-[48px]">
        <div>
          <ProductsGrid :items="products" :loader="loading"></ProductsGrid>
          <div id="load-more-cta" class="flex mt-[20px]">
            <button
            @click="loadMore()"
            :disabled="!nextPageExists"
            :class="{ 'cursor-not-allowed': !nextPageExists }"
              id="cta"
              class="mx-auto transition bg-[#000] py-[17px] px-[40px] border border-[#000] hover:text-[#000] hover:bg-[#fff] text-[12px] leading-[1] tracking-[1.5px] uppercase text-[#fff] mb-[2rem]"
            >
              Load More
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

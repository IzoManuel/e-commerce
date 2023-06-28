<script setup>
import { ref, onMounted, computed } from "vue";
import ChevronDown from "../assets/svgs/chevron-down.vue";
import { getSrc } from "../composables/util";
/**REACTIVE STATE*/

/**COMPUTED PROPERTIES */

/** FUNCTIONS */

/**HOOK */
</script>
<template>
  <div id="header" class="fixed top-0 left-0 right-0 z-20 bg-[#fff]">
    <div id="top-columns" class="min-w-[12px] bg-[#000]">
      <div id="top-column" class="py-[9px] flex justify-center">
        <p
          id="top-text"
          class="text-[12px] text-white tracking-[1.35px] leading-[1] uppercase underline"
        >
          SHOP 25% OFF WITH CODE CUSHLIFE
        </p>
      </div>
    </div>
    <div id="columns" class="border-b border-[#eee]">
      <div id="column" class="max-w-[1120px] mx-auto">
        <div
          id="navigation"
          class="h-[64px] text-black uppercase flex items-center justify-between"
        >
          <!-- <div id="main-nav-left" class="lg:hidden"></div> -->
          <div id="main-nav-left" class="hidden lg:block">
            <div id="main-nav-menu" class="flex">
              <a
                :key="index"
                v-for="(navItem, index) in ['About', 'locations', 'Blog']"
                class="tracking-[1.25px] cursor-pointer first:pl-0 p-[0.75rem] text-[11px] font-[500] transition hover:text-black/70"
                >{{ navItem }}</a
              >
            </div>
          </div>
          <div id="main-nav-brand" class="lg:p-0 pl-[15px]">
            <div id="nav-brand-logo" class="cursor-pointer h-[24px] w-[185px]">
              <img src="../assets/svgs/brand-logo.svg" />
            </div>
          </div>
          <div id="main-nav-right">
            <div id="main-nav-menu" class="flex items-center">
              <a
                :key="index"
                v-for="(navItem, index) in ['search', 'sign in']"
                class="hidden lg:block tracking-[1.25px] cursor-pointer first:pl-0 p-[0.75rem] text-[11px] font-[500] transition hover:text-black/70"
                >{{ navItem }}</a
              >

              <a
                :key="index"
                v-for="(navItem, index) in [
                  'images/search.png',
                  'images/shopping-bag.png',
                ]"
                class="tracking-[1.25px] cursor-pointer first:pl-0 p-[0.75rem] text-[11px] font-[500] transition hover:text-black/70"
                ><img class="w-[20px] h-[20px]" :src="getSrc(navItem)" alt=""
              /></a>
              <a
                :key="index"
                v-for="(navItem, index) in [
                  'images/heart.png',
                  'images/shopping-bag.png',
                ]"
                class="lg:hidden tracking-[1.25px] cursor-pointer first:pl-0 p-[0.75rem] text-[11px] font-[500] transition hover:text-black/70"
                ><img class="w-[20px] h-[20px]" :src="getSrc(navItem)" alt=""
              /></a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="columns" class="hidden lg:block border-b border-[#eee]">
      <div
        id="column"
        class="flex justify-between items-center max-w-[1120px] mx-auto"
      >
        <div
          id="nav-{}"
          :key="index"
          v-for="(item, index) in [
            'New',
            'Pillows + throws',
            'Bedding + Bath',
            'Fabric + wallpaper',
            'Art',
            'Dining',
            'Rugs + Window',
            'Decor',
            'Gifts',
            'Sale',
          ]"
        >
          <div id="dropdown-trigger">
            <a
              class="cursor-pointer flex items-center uppercase py-[0.75rem] text-[11px] tracking-[1px] transition hover:text-black/70"
            >
              {{ item }}
              <div class="h-[15px] w-[15px] ml-[10px]">
                <chevron-down class=""></chevron-down>
              </div>
            </a>
          </div>
          <div id="nav-drop-{}"></div>
        </div>
      </div>
    </div>
  </div>
</template>

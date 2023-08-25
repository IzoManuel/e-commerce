<script setup>
import ChevronDown from "../assets/svgs/chevron-down.vue";
import DropDown from "@/components/drop-down-hover.vue";
import { getSrc, currentRouteName } from "../composables/util";
import { ref } from "vue";

/**REACTIVE STATES */
const sections = [
  {
    sectionTitle: "Pillows",
    sectionItems: ["Handmade", "printed", "Shop all"],
  },
  {
    sectionTitle: "Throw Blankets",
    sectionItems: ["Shop all"],
  },
  {
    sectionTitle: "Shop the look",
    sectionItems: ["Bedrooms", "Living Rooms"],
  },
];

const mainNavItems = [
  "New",
  "Pillows + throws",
  "Bedding + Bath",
  "Fabric + wallpaper",
  "Art",
  "Dining",
  "Rugs + Window",
  "Decor",
  "Gifts",
  "Sale",
];
/**COMPUTED PROPERTIES*/

/** FUNCTIONS */

/**HOOK */
</script>
<template>
  <div
    id="header"
    class="fixed top-0 left-0 right-0 z-20 bg-[#fff] font-walsheim"
  >
    <div id="top-columns" class="min-w-[12px] bg-[#000]">
      <div id="top-column" class="py-[9px] flex justify-center">
        <p
          id="top-text"
          class="text-[12px] text-white tracking-[1.35px] leading-[1] uppercase underline"
        >
          {{ currentRouteName() }}
          SHOP 25% OFF WITH CODE CUSHLIFE
        </p>
      </div>
    </div>
    <div id="columns" class="border-b border-[#eee]">
      <div
        id="column"
        class="2xl:max-w-[1344px] xl:max-w-[1152px] lg:max-w-[960px] mx-auto"
      >
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
          <router-link
            :to="{ name: 'Home' }"
            id="main-nav-brand"
            class="lg:p-0 pl-[15px]"
          >
            <div id="nav-brand-logo" class="cursor-pointer h-[24px] w-[185px]">
              <img src="../assets/svgs/brand-logo.svg" />
            </div>
          </router-link>
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
                v-for="(navItem, index) in ['images/search.png']"
                class="tracking-[1.25px] cursor-pointer first:pl-0 p-[0.75rem] text-[11px] font-[500] transition hover:text-black/70"
                ><img class="w-[20px] h-[20px]" :src="getSrc(navItem)" alt=""
              /></a>
              <a
                :key="index"
                v-for="(navItem, index) in ['images/heart.png']"
                class="lg:hidden tracking-[1.25px] cursor-pointer first:pl-0 p-[0.75rem] text-[11px] font-[500] transition hover:text-black/70"
                ><img class="w-[20px] h-[20px]" :src="getSrc(navItem)" alt=""
              /></a>
              <router-link
                :to="{ name: 'Cart' }"
                class="cart tracking-[1.25px] cursor-pointer first:pl-0 p-[0.75rem] text-[11px] font-[500] transition hover:text-black/70"
                ><img
                  class="w-[20px] h-[20px]"
                  :src="getSrc('images/shopping-bag.png')"
                  alt=""
              /></router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="columns" class="hidden lg:block border-b border-[#eee]">
      <div
        v-if="!['Register', 'Login'].includes(currentRouteName())"
        id="column"
        class="flex justify-between items-center 2xl:max-w-[1344px] xl:max-w-[1152px] lg:max-w-[960px] mx-auto"
      >
        <DropDown :key="index" v-for="(item, index) in mainNavItems">
          <template #menuButton>
            <router-link :to="{ name: 'ProductIndex' }" id="nav-{}" class="cursor-pointer">
              <div id="dropdown-trigger">
                <a
                  class="flex items-center uppercase py-[0.75rem] text-[11px] tracking-[1px] transition hover:text-black/70 border-b border-transparent hover:border-[#1a1919]"
                >
                  {{ item }}
                  <div class="h-[15px] w-[15px] ml-[10px]">
                    <chevron-down class=""></chevron-down>
                  </div>
                </a>
              </div>
              <div id="nav-drop-{}"></div>
            </router-link>
          </template>
          <template #menuData
            ><div id="grid" class="flex flex-row justify-between">
              <div id="col-left" class="flex flex-row">
                <div
                  id="section"
                  v-for="(section, index) in sections"
                  class="flex-col p-[12px] mr-[48px] last:mr-0"
                >
                  <div id="drop-down-header" class="mb-[20px]">
                    {{ section.sectionTitle }}
                  </div>
                  <div
                    v-for="(sectionItem, index) in section.sectionItems"
                    id="section-item"
                    class="mb-[0.5rem] text-[14px] font-light hover:underline hover:opacity-70 cursor-pointer"
                  >
                    {{ sectionItem }}
                  </div>
                </div>
              </div>
              <div id="col-rigth">
                <div class="py-[12px]">
                  <div
                    id="image-container"
                    class="w-[373px] h-[211px] cursor-pointer"
                  >
                    <img
                      class="object-contain w-full h-full"
                      :src="getSrc('images/pillow-4.jpg')"
                      alt=""
                    />
                  </div>
                  <div id="text">
                    <p
                      class="text-[12px] font-light tracking[.025px] text-[#1a1919] leading-[1.2] hover:underline hover:opacity-70 cursor-pointer"
                    >
                      Layer in color and pattern with with handmade and printed
                      pillows
                    </p>
                  </div>
                </div>
              </div>
            </div></template
          >
        </DropDown>
      </div>
    </div>
  </div>
</template>

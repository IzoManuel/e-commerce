<script setup>
import ChevronDown from "../../../assets/svgs/chevron-down.vue";
import ShoppingBag from "../../../assets/svgs/shopping-bag.vue";
</script>

<template>
  <div id="header">
    <div
      id="header-content"
      class="fixed top-[56px] left-0 bottom-0 min-w-[240px] bg-[#fafbfc] border-r"
    >
      <div id="sidebar-sections">
        <div id="sidebar-section" class="pt-[24px] mx-[8px] text-[#42526e]">
          <div
            id="section-title"
            class="group flex items-center hover:cursor-pointer mb-[6px]"
          >
            <div id="chevron" class="invisible group-hover:visible h-[18px] w-[18px] mr-[6px]">
              <ChevronDown></ChevronDown>
            </div>
            <h1 id="" class="uppercase text-[11px] font-bold leading-[1.45455]">
              Entities
            </h1>
          </div>
          <div id="section-items">
            <div id="section-item" class="">
              <router-link
              :to="{name: 'DashProductIndex'}"
                class="relative min-h-[40px] pl-[17px] flex items-center gap-[12px] hover:bg-[#e6effc] active:bg-[#e6effc] active:text-[#0052cc] rounded-[4px] w-full before:absolute before:h-[16px] before:w-[4px] before:left-0 top-[12px] before:rounded-tr-[1.998px] before:rounded-br-[1.998px]"
              >
                <div id="icon" class="h-[24px] w-[24px]">
                  <ShoppingBag></ShoppingBag>
                </div>
                <span class="text-[14px] leading-[1.2] font-light"
                  >Products</span
                >
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
a.router-link-active::before {
  background-color: #0052cc;
}

a.router-link-active {
  color: #0052cc;
  background-color: #e6effc;
}

</style>
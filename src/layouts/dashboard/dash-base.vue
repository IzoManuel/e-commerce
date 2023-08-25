<script setup>
import DashHeader from "./dash-header.vue";
import DashSidebar from "./dash-sidebar.vue";
</script>
<template>
  <DashHeader></DashHeader>
  <div>
    <DashSidebar></DashSidebar>
    <div id="main-content" class="relative mt-[80px] ml-[240px] px-[40px] text-[#17284d]">
      <slot name="mainContent" class=""></slot>
    </div>
  </div>
</template>

<script setup>
import GButton from '@/components/g-button.vue'
</script>

<template>
  <div id="live-in-color-content">
    <div id="columns" class="flex flex-col md:flex-row">
      <div id="column-left" class="md:w-1/2">
        <slot name="image"></slot>
      </div>
      <div
        id="column-right"
        class="flex flex-col items-center justify-center pt-[3rem] pb-[3.75rem] px-[1.5rem] lg:p-[80px] bg-[#000] text-[#fff] text-center md:w-1/2"
      >
        <div id="text">
          <h3
            id="top-text"
            class="text-[12px] leading-[1] tracking-[2.5px] mb-[1.5rem] uppercase"
          >
            <slot name="top-text"></slot>
          </h3>
          <h3
            id="title"
            class="font-bodoni text-[30px] leading-[1.33] tracking-[2px] mb-[2rem] uppercase"
          >
            <slot name="title"></slot>
          </h3>
          <p
            id="text"
            class="max-w-[460px] text-[14px] tracking-[0.5px] mb-[2.5rem]"
          >
            <slot name="description"></slot>
          </p>
        </div>
        <router-link :to="{name: 'ProductIndex'}">
        <GButton :label="'Shop now'" class="bg-white"></GButton>
      </router-link>
      </div>
    </div>
  </div>
</template>

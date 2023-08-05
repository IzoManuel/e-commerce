<script setup>
import Spinner from './Spinner.vue'

const props = defineProps({
    label:{
        type: String,
        required: true,
        default: 'Save'
    },
    loader: {
        type:Boolean,
        default: false
    },
    action: {
        type: Function
    }
})
</script>
<template>
  <button
    :disabled="loader"
    :class="{ 'cursor-not-allowed': loader }"
    id="login"
    class="transition py-[17px] px-[40px] border border-[#fff] hover:text-[#fff] hover:bg-[#000] text-[12px] leading-[1] tracking-[1.5px] uppercase text-[#000]"
    @click="action"
  >
    <div
      id="spinner"
      :class="{ hidden: !loader }"
      class="w-[24px] h-[24px] absolute top-0 right-0 bottom-0 left-0 m-auto"
    >
      <spinner></spinner>
    </div>
    <span :class="{ invisible: loader }">{{ label }}</span>
  </button>
</template>

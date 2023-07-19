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
    class="px-[10px] bg-[#0052cc] text-white h-[36px] flex items-center rounded-[3px] font-medium hover:bg-[#0065ff] text-[14px] relative"
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

<script setup>
const props = defineProps({
    entity:{
        type: String
    },
    entityRouteName: {
        type:String
    },
    action: {
        type: String
    }
})
</script>

<template>
    <div
      id="bread-crumbs"
      class="flex gap-3 leading-[1.71429] text-[#68778c] text-[14px] mb-[8px]"
    >
    <RouterLink :to="{name: entityRouteName}" class="lowercase first-letter:uppercase hover:underline hover:text-[#8993A4]">{{ entity }}</RouterLink>
      <span>/</span>
      <h1 class="lowercase">{{ action }}</h1>
    </div>
</template>
<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const props = defineProps({
  entity: {
    type: String,
  },
  entityRouteName: {
    type: String,
  },
  action: {
    type: String,
  },
});

const breadcrumbs = computed(() => {
  const segments = route.path.split("/").filter((segment) => segment !== "");
  let path = "";

  return segments.map((segment, index) => {
    path += `/${segment}`;
    return {
      label: segment,
      to: path,
    };
  });
});
</script>

<template>
  <div
    id="bread-crumbs"
    class="flex gap-3 leading-[1.71429] text-[#68778c] text-[14px] mb-[8px]"
  >
    <!-- <RouterLink
      :to="{ name: entityRouteName }"
      class="lowercase first-letter:uppercase hover:underline hover:text-[#8993A4]"
      >{{ entity }}</RouterLink
    >
    <span>/</span>
    <h1 class="lowercase">{{ action }}</h1> -->
    <span v-for="(crumb, index) in breadcrumbs" :key="index">
      <span v-if="index !== 0" class="mr-[0.75rem]">/</span>
      <router-link :to="crumb.to" class="capitalize hover:underline hover:text-[#8993A4]">{{ crumb.label }}</router-link>
    </span>
  </div>
</template>

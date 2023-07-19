<script setup>
import { getSrc } from "../composables/util";
import { computed } from "vue";
import Spinner from "../components/Spinner.vue";

const props = defineProps({
  headers: {
    type: Array,
  },
  items: {
    type: Array,
  },
  list: Boolean,
  loader: Boolean
});

const hasItems = computed(() => {
  return props.items && props.items.length;
});
</script>
<template>
  <div>
    <div id="search-input">
      <div
        id="field-group"
        class="relative md:flex-row items-center gap-4 mb-[12px]"
      >
        <label
          id="search"
          for="email"
          class="w-[120px] text-[#6b778c] font-[500] text-[14px] hidden"
          >Search</label
        >
        <input
          type="text"
          id="search"
          class="w-full transition border-2 focus:border-[#4c9aff] focus:outline-none hover:bg-[#ebecf0] py-[6px] px-[6px] pr-[30px] font-[14px] rounded-[3.01px] focus:bg-white block"
        />
        <div
          id="search-icon"
          class="h-[15px] w-[15px] absolute right-[10px] top-0 bottom-0 m-auto"
        >
          <img :src="getSrc('images/search.png')" />
        </div>
      </div>
    </div>
    <div class="border rounded-[6px] bg-[#F4F5F7] pb-[42px] pt-[5px]">
      <table class="w-full text-left">
        <thead
          v-if="hasItems"
          class="text-[#44546f] text-[12px] font-semibold leading-[1.6666] border-b"
        >
          <tr>
            <th class="py-[7px] px-[10px]">#</th>
            <th
              class="py-[7px] px-[10px]"
              v-for="(header, index) in headers"
              :key="index"
            >
              {{ header.value }}
            </th>
          </tr>
        </thead>
        <tbody v-if="hasItems" class="bg-white">
          <tr
            class="text-[#172b4d] border-b text-[14px]"
            v-for="(item, index) in items"
            :key="index"
          >
          <td
              class="py-[7px] px-[10px]"
            >
              {{ index+1 }}
            </td>
            <td
              class="py-[7px] px-[10px]"
              v-for="(header, index) in headers"
              :key="index"
            >
              {{ item[header.key] }}
            </td>
          </tr>
        </tbody>
        <div class="h-[35vh] w-full flex items-center" v-else>
          <div v-if="loader" id="spinner" class="w-[30px] h-[30px] mx-auto">
            <spinner></spinner>
          </div>
          <p v-else class="mx-auto">Oops! no Data</p>
        </div>
      </table>
    </div>
  </div>
</template>

<style>
#search-input #field-group {
  width: 120px;
  transition: width 0.1s linear;
}

#search-input #field-group:focus-within {
  width: 184px;
}
</style>

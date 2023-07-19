<script setup>
import { ref } from "vue";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";
import { getSrc } from "../composables/util";

/**
 * PROPS
 */
const props = defineProps({
  title: {
    type: String,
    default: "Success!",
  },
  description: {
    type: String,
    default: "Changes saved successfully",
  },
  responseStatus: {
    type: Boolean,
    default: false,
  },
});

/**
 * COMPUTED PROPERTIES
 */

/**
 * FUNCTIONS
 */
function closeTimeout(close) {
  setTimeout(() => {
    close();
  }, 3000);
}
</script>

<template>
  <Popover class="relative" v-slot="{ close }">
    <!-- <PopoverButton @click="closeTimeout(close)">Solutions1</PopoverButton> -->
    <PopoverPanel
      static
      :class="{ hidden: !responseStatus, block: responseStatus }"
      class="fixed top-[56px] z-10 border bg-white shadow-lg left-[50%] -translate-x-[50%] p-[15px] roudned-[8px]"
    >
      <div id="popover-content" class="flex gap-[10px] text-[14px]">
        <div id="col-left">
          <div id="success-icon" class="w-[16px] h-[16px]">
            <img :src="getSrc('svgs/success-icon.svg')" />
          </div>
        </div>
        <div id="col-right">
          <div id="popover-title" class="mb-[8px]">
            <h1 class="font-bold leading-none text-[#172b4d]">{{ title }}</h1>
          </div>
          <div id="popover-description" class="">
            <p>{{ description }}</p>
          </div>
        </div>
      </div>
    </PopoverPanel>
  </Popover>
</template>

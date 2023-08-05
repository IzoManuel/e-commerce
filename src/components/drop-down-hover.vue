<script setup>
import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  TransitionRoot,
} from "@headlessui/vue";

const props = defineProps({
  menuButtonLabel: {
    type: String,
  },
});
</script>
<template>
  <div class="group" style="">
    <Menu as="div" class="relative inline-block text-left">
      <div>
        <MenuButton>
          <slot name="menuButton"></slot>
        </MenuButton>
      </div>
      <TransitionRoot
        class="hidden group-hover:block before:content before:absolute before:top-[20px] before:h-6 before:w-[80px] before:left-0 before:right-0"
        :show="true"
        enter="transition-opacity duration-75"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="transition-opacity duration-150"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <MenuItems
          class="w-full fixed right-0 left-0 origin-top-right divide-y divide-gray-100 bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <div class="pl-5 py-8 2xl:max-w-[1344px] xl:max-w-[1152px] lg:max-w-[960px] mx-auto">
            <MenuItem as="div">
                <div><slot name="menuData"></slot></div>
            </MenuItem>
          </div>
        </MenuItems>
      </TransitionRoot>
    </Menu>
  </div>
</template>

<style scoped>
</style>
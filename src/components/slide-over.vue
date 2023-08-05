<script setup>
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import XMark from '@/assets/svgs/x-mark.vue'
import store from "@/store";

const props = defineProps({
  slideOverState: {
    type: Boolean,
    required: true,
    default: false,
  },
  setSlideOverState: {
    type: Function,
  },
  title: {
    type: String
  },
  actions:{
    type: Array
  }
});

const toggleSlideover = () => {
  store.dispatch('toggleSlideover')
};
</script>

<template>
  <TransitionRoot as="template" :show="slideOverState">
    <Dialog as="div" class="relative z-40" @close="toggleSlideover()">
      <TransitionChild
        as="template"
        enter="ease-in-out duration-500"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in-out duration-500"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        />
      </TransitionChild>

      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div
            class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10"
          >
            <TransitionChild
              as="template"
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enter-from="translate-x-full"
              enter-to="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leave-from="translate-x-0"
              leave-to="translate-x-full"
            >
              <DialogPanel
                class="pointer-events-auto relative w-screen max-w-md"
              >
                <TransitionChild
                  as="template"
                  enter="ease-in-out duration-500"
                  enter-from="opacity-0"
                  enter-to="opacity-100"
                  leave="ease-in-out duration-500"
                  leave-from="opacity-100"
                  leave-to="opacity-0"
                >
                  <div
                    class="absolute z-20 right-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4"
                  >
                    <button
                      type="button"
                      class="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                      @click="toggleSlideover()"
                    >
                      <span class="hidden">Close panel</span>
                      <XMark class="h-[40px] w-[40px] stroke-black"/>
                    </button>
                  </div>
                </TransitionChild>
                <div
                  class="flex h-full flex-col overflow-y-scroll bg-white pb-6 shadow-xl"
                >
                  <div class="">
                    <DialogTitle
                      class="font-medium text-gray-900 uppercase text-[11px] tracking-[1.38px]"
                      ><slot name="title"></slot></DialogTitle
                    >
                  </div>
                  <div class="relative flex-1">
                    <!-- Your content -->
                    <slot name="slideOverContent"></slot>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
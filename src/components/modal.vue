<script setup>
import { onMounted } from "vue";
import AppButton from "./app-button.vue";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogDescription,
} from "@headlessui/vue";

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
    default: false,
  },
  modalTitle: {
    type: String,
    required: true,
  },
  modalDescription: {
    type: String,
  },
  setIsOpen: {
    type: Function,
    default: () => isOpen = false,
  },
  actions: {
    type: Array,
  },
  actionLabel: {
    type: String,
  },
  loader: {
    type: Boolean,
    default: false
  }
});

/**
 * FUNCTIONS
 */
 function closeModal() {
  props.isOpen = false
}
</script>

<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="setIsOpen(false)" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-[6px] bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-[#6b778c] font-medium text-[14px] block"
              >
                {{ modalTitle }}
              </DialogTitle>
              <DialogDescription>
                {{ modalDescription }}
              </DialogDescription>
              <slot name="modalBody"> </slot>
              <div class="mt-2"></div>

              <div class="mt-4 flex gap-4">
                <slot name="modalAction"></slot>
                <AppButton
                  :key="index"
                  v-for="(action, index) in actions"
                  :loader="loader"
                  :action-label="action.actionLabel"
                  @click="action.actionFunction"
                >
                </AppButton>
                <button
                  type="button"
                  class="inline-flex justify-center rounded-[3px] border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-[#42526e] hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  @click="setIsOpen(false)"
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
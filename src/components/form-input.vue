<script setup>
import { computed, ref } from "vue";
import ErrorNotice from "../assets/svgs/error-notice.vue";
import { Switch } from "@headlessui/vue";

const enabled = ref(false);

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  placeholder: {
    type: String,
  },
  formError: {
    //type: String || Array,
    default: "",
  },
  modelValue: {
    type: [String, Number, Array, Boolean],
    default: "",
  },
  type: {
    type: String,
  },
  renderAs: {
    type: String,
  },
  options: {
    type: Array,
    default: [],
  },
  optionValue: {
    type: String,
  },
  optionKey: {
    type: String,
  },
  required: {
    type: Boolean,
    default: false,
  },
  negativeCorrelated: {
    type:String
  }
});

const isValid = computed(() => {
  return !props.formError;
});

const emit = defineEmits(["update:modelValue"]);

function input(e) {
  emit("update:modelValue", e.target.value);
}
function switchInput(e) {
  emit("update:modelValue", e);
}
</script>

<template>
  <div id="field-group" class="w-full mb-[12px] text-[14px]">
    <label :for="id" class="text-[#6b778c] font-medium text-[14px] block"
      >{{ label }}<span v-if="required" class="text-[#ae2a19]">*</span>
    </label>
    <!-- Input field -->
    <input
      v-if="['date', 'text', 'password', 'email', 'number'].includes(type)"
      :type="type"
      :name="id"
      :id="id"
      :class="{
        'border-[#de350b] border-2': formError,
        'border-[#dfe1e6]': !formError,
      }"
      class="transition w-full border focus:border-[#4c9aff] focus:border-2 focus:outline-none hover:bg-[#ebecf0] py-[3px] px-[4px] rounded-[3.01px] focus:bg-white block"
      :placeholder="placeholder"
      :value="modelValue"
      @input="input"
    />

    <!--File input field -->
    <input
      v-if="['file'].includes(type)"
      :type="type"
      :name="id"
      :multiple="type === 'file'"
      :id="id"
      :class="{
        'border-[#de350b]': formError,
        'border-[#dfe1e6]': !formError,
      }"
      class="transition w-full border focus:border-2 focus:border-[#4c9aff] focus:outline-none hover:bg-[#ebecf0] py-[3px] px-[4px] rounded-[3.01px] focus:bg-white block"
      :placeholder="placeholder"
      :value="modelValue"
      @input="input"
    />
    <!-- Textarea field -->
    <textarea
      v-if="renderAs === 'textarea'"
      :name="id"
      :id="id"
      class="transition w-full border focus:border-2 focus:border-[#4c9aff] focus:outline-none hover:bg-[#ebecf0] py-[3px] px-[4px] rounded-[3.01px] focus:bg-white block"
      :placeholder="placeholder"
      :value="modelValue"
      @input="input"
    />

    <!-- Select field -->
    <select
      v-if="renderAs === 'select'"
      :id="id"
      :value="modelValue"
      class="transition w-full border focus:border-2 focus:border-[#4c9aff] focus:outline-none hover:bg-[#ebecf0] py-[3px] px-[4px] rounded-[3.01px] focus:bg-white block"
      @input="input"
    >
      <option value="">Select option</option>
      <option
        :value="option[optionKey]"
        :key="index"
        v-for="(option, index) in options"
      >
        {{ option[optionValue] }}
      </option>
    </select>

    <!-- Switch -->
    <Switch
      v-if="type == 'switch'"
      v-model="enabled"
      :class="enabled ? 'bg-[#0052cc]' : 'bg-[#e6effc]'"
      class="relative inline-flex h-[23px] w-[45px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      @click="switchInput(enabled)"
    >
      <span class="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        :class="enabled ? 'translate-x-[22px]' : 'translate-x-0'"
        class="pointer-events-none inline-block h-[19px] w-[19px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
      />
    </Switch>

    <div id="field-error-text" class="flex gap-1" v-if="formError">
      <div id="error-notice-icon" class="h-[24px] w-[24px]">
        <error-notice></error-notice>
      </div>
      <p class="text-[0.857em] leading-[1.3333] mt-[4px] text-[#ae2a19]">
        {{ formError[0] }}
      </p>
    </div>
  </div>
</template>

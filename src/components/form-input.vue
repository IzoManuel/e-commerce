<script setup>
import { computed, ref, onMounted, watch } from "vue";
import ErrorNotice from "../assets/svgs/error-notice.vue";
import { Switch } from "@headlessui/vue";
import Multiselect from "vue-multiselect";

const enabled = ref(false);

const props = defineProps({
  label: {
    type: String,
    required: true,
    default: "text",
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
    type: [String, Number, Array, Boolean, FileList],
    //default: "",
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
    default: "name",
  },
  optionKey: {
    type: String,
    default: "id",
  },
  required: {
    type: Boolean,
    default: false,
  },
  negativeCorrelated: {
    type: String,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
});

const selectedOptions = ref([]);
const emit = defineEmits(["update:modelValue", "select"]);

watch(
  () => props.modelValue,
  (newValue) => {
    selectedOptions.value = newValue || [];
    
  }
);

/**
 * COMPUTED
 */
const isValid = computed(() => {
  return !props.formError;
});

const tagNames = computed(() => {
  return props.options
    .map((option) => {
      if (props.multiple) {
        if (selectedOptions.value.includes(option[props.optionKey])) {
          return option;
        }
      } else {
        if (option[props.optionKey] == selectedOptions.value) {
          return option;
        }
      }
    })
    .filter((item) => item != null);
});

const getFieldError = computed(() => {
  return props.formError[props.id] || null// props.formError[props.id] ? formError[props.id] : null
});
/**
 * FUNCTIONS
 */
function handleInput(e) {
  emit("update:modelValue", e.target.value);
}

function handleInputSelect(value) {
  if (props.multiple) {
    if (!selectedOptions.value.includes(value[props.optionKey])) {
      selectedOptions.value.push(value[props.optionKey]);
    }
  } else {
    selectedOptions.value = value[props.optionKey];
  }
  emit("update:modelValue", selectedOptions.value);
  emit("select", selectedOptions.value);
}

function switchInput(e) {
  emit("update:modelValue", e);
}

const handleFileInput = (event) => {
  if (event.target.files) {
    emit("update:modelValue", Array.from(event.target.files));
  }
};

const removeTag = (option) => {
  if (props.multiple) {
    selectedOptions.value = selectedOptions.value.filter(
      (selected) => selected !== option
    );
  } else {
    selectedOptions.value = [];
  }

  emit("update:modelValue", selectedOptions.value);
};

/**
 * HOOKS
 */
onMounted(() => {});
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
        'border-[#de350b] border-2': getFieldError,
        'border-[#dfe1e6]': !getFieldError,
      }"
      class="focus:outline-offset-0 focus:outline-2 focus:outline-[#4c9aff] transition w-full border focus:border-[#4c9aff] focus:border-1 hover:bg-[#ebecf0] py-[3px] px-[4px] rounded-[3.01px] focus:bg-white block"
      :placeholder="placeholder"
      :value="modelValue"
      @input="handleInput"
    />

    <!--File input field -->
    <input
      v-if="['file'].includes(type)"
      :type="type"
      :name="id"
      :multiple="type === 'file'"
      :id="id"
      :class="{
        'border-[#de350b]': getFieldError,
        'border-[#dfe1e6]': !getFieldError,
      }"
      class="focus:outline-offset-0 focus:outline-2 focus:outline-[#4c9aff] transition w-full border focus:border-1 focus:border-[#4c9aff] focus:outline-none hover:bg-[#ebecf0] py-[3px] px-[4px] rounded-[3.01px] focus:bg-white block"
      :placeholder="placeholder"
      @change="handleFileInput"
    />
    <!-- Textarea field -->
    <textarea
      v-if="renderAs === 'textarea'"
      :name="id"
      :id="id"
      class="focus:outline-offset-0 focus:outline-2 focus:outline-[#4c9aff]transition w-full border focus:border-1 focus:border-[#4c9aff] focus:outline-none hover:bg-[#ebecf0] py-[3px] px-[4px] rounded-[3.01px] focus:bg-white block"
      :placeholder="placeholder"
      :value="modelValue"
      @input="handleInput"
    />

    <!-- Select field -->
    <div v-if="renderAs === 'select'">
      <div class="tags flex flex-wrap gap-2 mb-2">
        <span
          class="bg bg-[#42526e]/10 rounded-[3px] px-[8px]"
          v-for="(tagName, index) in tagNames"
        >
          {{ tagName[optionValue] }}
          <button
            type="button"
            @click="removeTag(tagName[optionKey])"
            class="text-xs text-black font-bold ml-2"
          >
            X
          </button>
        </span>
      </div>
      <multiselect
        class="cursor-pointer focus:outline-offset-0 focus:outline-2 focus:outline-[#4c9aff] transition w-full border focus:border-1 focus:border-[#4c9aff] focus:outline-none hover:bg-[#ebecf0] py-[3px] px-[4px] rounded-[3.01px] focus:bg-white block"
        :value="selectedOptions"
        :options="options"
        placeholder="Select one"
        label="name"
        :multiple="multiple"
        track-by="id"
        @select="handleInputSelect"
        :close-on-select="!multiple"
        :show-labels="false"
      ></multiselect>
    </div>

    <!-- radio field -->
    <div v-for="(option, index) in options" class="mb-3 mt-2 cursor-pointer flex gap-3 items-center">
      <input
        v-if="['radio'].includes(type)"
        :type="type"
        :name="id"
        :id="`${id}-${index}`"
        :class="{
          'border-[#de350b] border-2': getFieldError,
          'border-[#dfe1e6]': !getFieldError,
        }"
        class="focus:outline-offset-0 focus:outline-2 focus:outline-[#4c9aff] transition border focus:border-[#4c9aff] focus:border-1 hover:bg-[#ebecf0] py-[3px] px-[4px] rounded-[3.01px] focus:bg-white block"
        :placeholder="placeholder"
        :value="option.value"
        @change="handleInput"
      />
      <label :for="`${id}-${index}`" class="cursor-pointer ">{{option.label}}</label>
    </div>

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

    <div id="field-error-text" class="flex gap-1" v-if="getFieldError">
      <div id="error-notice-icon" class="h-[24px] w-[24px]">
        <error-notice></error-notice>
      </div>
      <p class="text-[0.857em] leading-[1.3333] mt-[4px] text-[#ae2a19]">
        {{ getFieldError[0] }}
      </p>
    </div>
  </div>
</template>

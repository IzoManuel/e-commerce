<script setup>
import { getSrc } from "../composables/util";
import { computed, ref } from "vue";
import Spinner from "../components/Spinner.vue";
import { useRouter } from "vue-router";
import AppButton from "./app-button.vue";
import FormInput from "@/components/form-input.vue";

/**
 * PROPS
 */
const props = defineProps({
  headers: {
    type: Array,
  },
  items: {
    type: Array,
    default: [],
  },
  list: Boolean,
  limit: Number,
  loader: Boolean,
  actions: Array,
  rowRoute: String,
  search: String,
  fetchItems: Function,
  currentPage: Number,
  totalPages: Number,
});
/**
 * REACTIVE STATE
 */
const searchQuery = ref("");
const router = useRouter();
const confirmStatus = ref(Array(props.items.length).fill(false));
const deleteLoaders = ref(Array(props.items.length).fill(false));

const emit = defineEmits(["changePage"]);
/**
 * COMPUTED
 */
const hasItems = computed(() => {
  return props.items && props.items.length;
});
const hasNextPage = computed(() => props.currentPage < props.totalPages);
/**
 * FUNCTIONS
 */
function editItem({ id, slug }) {
  router.push({ name: props.rowRoute, params: { slug: slug, id: id } });
}

async function deleteItem(item, itemIndex, action) {
  if (confirmStatus.value[itemIndex]) {
    deleteLoaders.value[itemIndex] = true;
    try {
      await action.actionFunction(item.id);
      confirmStatus.value[itemIndex] = false;
    } catch (error) {
      console.error(error);
    } finally {
      deleteLoaders.value[itemIndex] = false;
    }
  } else {
    confirmStatus.value[itemIndex] = true;
    setTimeout(() => {
      confirmStatus.value[itemIndex] = false; // Reset state after timeout
    }, 3000);
  }
}

const handleClick = (item, itemIndex, action) => {
  if (action.actionLabel == "Delete") {
    deleteItem(item, itemIndex, action);
  }
};

const changePage = (newPage) => {
  if (newPage >= 1 && newPage <= props.totalPages) {
    props.fetchItems(null, newPage);
    emit("changePage", newPage);
  }
};
</script>
<template>
  <div class="mb-[20px]">
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
          v-model="searchQuery"
          @input="fetchItems(searchQuery)"
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
    <div class="border rounded-[6px] bg-[#F4F5F7] pt-[5px]">
      <table class="w-full text-left">
        <thead
          v-if="hasItems"
          class="text-[#44546f] text-[12px] font-semibold leading-[1.6666] border-b"
        >
          <tr>
            <th class="py-[7px] px-[10px]"><input @click.stop type="checkbox"></th>
            <th
              class="py-[7px] px-[10px]"
              v-for="(header, index) in headers"
              :key="index"
            >
              {{ header.value }}
            </th>
            <th class="py-[7px] px-[10px]">ACTIONS</th>
          </tr>
        </thead>
        <tbody v-if="hasItems" class="bg-white">
          <tr
            v-for="(item, itemIndex) in items"
            :key="itemIndex"
            @click="editItem({ slug: item?.slug, id: item.id })"
            :class="{
              'cursor-not-allowed pointer-events-none opacity-50':
                deleteLoaders[itemIndex],
            }"
            class="text-[#172b4d] border-b text-[14px] hover:bg-[#fafafa] cursor-pointer"
          >
            <td class="py-[7px] px-[10px]">
              <input type="checkbox">
            </td>
            <td
              class="py-[7px] px-[10px]"
              v-for="(header, index) in headers"
              :key="index"
            >
              {{ item[header.key] }}
            </td>
            <td
              :class="{ 'text-[#ae2a19]': confirmStatus[itemIndex] }"
              class="text-[#0052cc] transition py-[7px] px-[10px] cursor flex gap-2"
            >
              <div
                :key="index"
                v-for="(action, index) in actions"
                class="flex relative hover:underline"
              >
                <div
                  v-if="deleteLoaders[itemIndex]"
                  id="spinner"
                  class="w-[20px] h-[20px] mx-auto absolute left-0"
                >
                  <spinner class=""></spinner>
                </div>
                <span
                  :class="{ invisible: deleteLoaders[itemIndex] }"
                  @click.stop="handleClick(item, itemIndex, action)"
                >
                  {{
                    !confirmStatus[itemIndex] ? action.actionLabel : "Confirm"
                  }}
                </span>
              </div>
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
      <div id="table-footer" class="bg-[#F4F5F7] h-[42px] py-[7px] px-[10px]">
        <div id="text" class="flex justify-between text-[14px]">
          <div id="of"></div>
          <div id="pagination-controls" class="flex gap-2">
            <button
              @click="changePage(currentPage - 1)"
              :disabled="currentPage === 1"
              class="border-[2px] px-2 rounded-sm"
              
            >
              Previous
            </button>
            <span>Page {{ currentPage }} of {{ totalPages }}</span>
            <button @click="changePage(currentPage + 1)" :disabled="!hasNextPage" class="border-[2px] px-2 rounded-sm">Next</button>
          </div>
        </div>
      </div>
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

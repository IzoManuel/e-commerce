<script setup>
import NotificationBell from "../../../assets/svgs/notification-bell.vue";
import DropDown from "../../../components/drop-down.vue";
import axios from "../../../axios/axios";
import store from "../../../store";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { getInitials } from '../../../composables/util'
/**REACTIVE STATES */
const router = useRouter();
const loader = ref(false);
/**FUNCTIONS */
function logout() {
  //console.log(`Logging out`)
  axios
    .post("/admin/logout")
    .then((response) => {
      store.dispatch("logout");
      router.push({ name: "AdminLogin" });
    })
    .catch((err) => {
      if (err.response) {
      }
    })
    .finally(() => (loader.value = false));
}
</script>
<template>
  <div id="header" class="fixed w-full top-0 z-20 bg-white">
    <div id="header-content" class="px-[24px] h-[56px] shadow">
      <div id="nav-grid" class="flex items-center h-full">
        <div id="col-left"></div>
        <div id="col-right" class="ml-auto flex gap-5 items-center">
          <button
            id="notification-bell"
            class="bg-transparent relative w-[24px] h-[24px] text-[#344563] hover:text-[#0065ff] hover:bg-[#deebff]/90 rounded-full p-[4px] box-content"
          >
            <NotificationBell class="bg-transparent"></NotificationBell>
          </button>
          <DropDown>
            <template #menuButton>
              <button
                id="avatar"
                class="relative w-[24px] h-[24px] after:absolute after:bg-[#00875a] after:rounded-[50%] after:w-[24px] after:h-[24px] after:left-[7px] after:z-10 text-center text-white box-content p-[7px] hover:bg-[#deebff]/90 rounded-full flex items-center"
              >
                <span class="relative z-20 text-[12px] text-white mx-auto font-bodoni uppercase"
                  >{{getInitials(store.getters.user.name)}}</span
                >
              </button></template
            >
            <template #menuData>
              <div id="dropdown-sections" class=" pt-[20px] pb-[14px]">
                <div id="dropdown-section" class="px-[16px]">
                  <div id="title" class="mb-[6px]">
                    <h1
                      class="text-[#5E6C84] text-[11px] font-bold leading-[1.4545]"
                    >Account</h1>
                  </div>
                  <div id="user-info" class="flex">
                    <div id="col-left" class="mr-[10px]">
                      <div
                        id="avatar"
                        class="relative w-[36px] h-[36px] after:absolute after:bg-[#00875a] after:rounded-[50%] after:w-[36px] after:h-[36px] after:lef after:z-10 text-center text-white  rounded-full flex items-center"
                      >
                        <span
                          class="relative z-20 font-bold text-[12px] text-white mx-auto font-bodoni uppercase"
                          >{{getInitials(store.getters.user.name)}}</span
                        >
                      </div>
                    </div>
                    <div id="col-right" class="flex-col justify-between">
                      <h1 id="name" class="leading-[20px] text-[13px]">{{ store.getters.user.name }}</h1>
                      <h1 id="email" class="text-[11px] leading-[1.4545] text-[#6B778C]">{{ store.getters.user.email }}</h1>
                    </div>
                  </div>
                </div>
                <div id="dropdown-section" class="pt-[14px] mt-[14px] border-t border-gray-200 ">
                  <button @click="logout" class="px-[16px] hover:bg-[#f4f5f7] min-h-[40px] w-full text-left"><h1 class="text-[14px] leading-[16px] hover:cursor-pointer">Logout</h1></button>
                </div>
              </div>
            </template>
          </DropDown>
        </div>
      </div>
    </div>
  </div>
</template>

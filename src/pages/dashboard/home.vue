<script setup>
import axios from "../../axios/axios";
import store from "../../store";
import { useRouter } from "vue-router";
import { ref } from "vue";
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
  dashboard home
  <span
    @click="logout"
    class="block leading-[20px] hover:underline hover:cursor-pointer text-[#0052cc]"
    >log out?</span
  >
</template>

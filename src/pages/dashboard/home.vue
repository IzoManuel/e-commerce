<script setup>
import DashBase from "@/layouts/dashboard/dash-base.vue";
import axios from "../../axios/axios";
import store from "../../store";
import { useRouter } from "vue-router";
import { ref } from "vue";
/**REACTIVE STATES */
const router = useRouter();
const loader = ref(false);
/**FUNCTIONS */

</script>

<template>
  <DashBase>
    <template #mainContent>
      <router-view></router-view>
    </template>

  </DashBase>
</template>

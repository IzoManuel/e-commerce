<script setup>
import MainHeader from "./main-header.vue";
import MainFooter from "./main-footer.vue";

/**REACTIVE STATES */

/**COMPUTED PROPERTIES*/

/**FUNCTIONS */


/**HOOKS*/

</script>
<template>

  <main-header></main-header>

  <div id="main-content" class="relative lg:mt-[137px] mt-[96.5px]">
    <slot name="mainContent"></slot>
  </div>

  <main-footer></main-footer>
</template>

<style scoped>
.splashLogo {
  fill: rgb(0 0 0 / 0);
  animation: splashLogoFadeIn 2s ease-out 1s forwards;
}

@keyframes splashLogoFadeIn {
  to {
    fill: rgb(0 0 0 / 1);
  }
}
</style>

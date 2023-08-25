<template>
    <!-- <nav class="breadcrumb">
      <ul>
        <li>
        </li>
        <li v-for="(crumb, index) in breadcrumbs" :key="index">
          <router-link :to="crumb.link" class="first-letter:uppercase text-red-500">{{ crumb.label }}</router-link>/
        </li>
      </ul>
    </nav> -->
    <div class="breadcrumb">
    <span v-for="(crumb, index) in breadcrumbs" :key="index">
      <span v-if="index !== breadcrumbs.length - 1"> / </span>
      <router-link :to="crumb.to">{{ crumb.label }}</router-link>
    </span>
  </div>
  </template>
  
  <script setup>
  import { computed, defineProps } from 'vue';
  import { useRoute } from 'vue-router';
  
  const props = defineProps({
    items: {
        type: Array,
        default: []
    },
  });
  
  const route = useRoute();
  console.log(`PATH: ${route.path}`)
  // const breadcrumbs = computed(() => {
  //   const basePath = route.path.split('/').slice(1);
  //   return [
  //     //{ label: 'Home', link: '/' },
  //     ...basePath.map((segment, index) => ({
  //       label: segment,
  //       link: basePath.slice(0, index + 1).join('/'),
  //     })),
  //     //...props.items,
  //   ];
  // });
  const breadcrumbs = computed(() => {
  const segments = route.path.split('/').filter(segment => segment !== '');
  let path = '';

  return segments.map((segment, index) => {
    path += `/${segment}`;
    return {
      label: segment,
      to: path,
    };
  });
});
  </script>
  
  <style scoped>
  .breadcrumb {
    margin: 1rem 0;
  }
  
  ul {
    list-style: none;
    padding: 0;
    display: flex;
    align-items: center;
  }
  
  li {
    margin-right: 0.5rem;
  }
  
  .router-link-active {
    font-weight: bold;
  }
  </style>
  
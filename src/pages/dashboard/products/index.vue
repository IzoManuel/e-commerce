<script setup>
import BreadCrumb from "@/components/bread-crumb.vue";
import BreadCrumb2 from "@/components/bread-crumb2.vue";
import { useRoute } from "vue-router";

const route = useRoute();
const action = route.name === "ProductCreate";
const breadcrumbItems = [
  { label: 'Products', link: '/products' },
  { label: 'Product Details' },
];

</script>
<template>
  <div id="bread-crumbs">
    <!-- <BreadCrumb2></BreadCrumb2> -->
    <BreadCrumb
      :entity="'Products'"
      :entity-route-name="'DashProductIndex'"
      :action="'list'"
    ></BreadCrumb>
  </div>
  <RouterView></RouterView>
</template>

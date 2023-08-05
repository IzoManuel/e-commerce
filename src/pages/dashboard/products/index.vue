<script setup>
import BreadCrumb from "../../../components/bread-crumb.vue";
</script>
<template>
  <div id="bread-crumbs">
    <BreadCrumb
      :entity="'Products'"
      :entity-route-name="'DashProductIndex'"
      :action="'create'"
    ></BreadCrumb>
  </div>
  <RouterView></RouterView>
</template>

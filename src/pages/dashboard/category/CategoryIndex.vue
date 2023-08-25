<script setup>
import BreadCrumb from "../../../components/bread-crumb.vue";
</script>
<template>
  <div id="bread-crumbs">
    <BreadCrumb
      :entity="'Categories'"
      :entity-route-name="'DashCategoryIndex'"
      :action="'create'"
    ></BreadCrumb>
  </div>
  <RouterView></RouterView>
</template>

<script setup>
import ParentLayout from '@vuepress/theme-default/layouts/Layout.vue'
import FooterNav from '../components/Footer-Nav.vue'
</script>

<template>
  <ParentLayout>
    <template #page-bottom>
      <FooterNav />
    </template>
  </ParentLayout>
</template>

<style lang="css">
.my-footer {
  text-align: center;
}
</style>
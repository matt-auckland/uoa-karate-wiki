<template>
  <div class="footer-navigation">
    <h2 class="footer-navigation-title">Wiki Pages</h2>
    <div v-for="(cat, i) in footerCategories" class="categories">
      <div class="category-title">
        <router-link v-if="footerLinksContent[cat] && footerLinksContent[cat].path" :to="footerLinksContent[cat].path">
          {{ cat }}
        </router-link>
        <span v-else>
          {{ cat }}
        </span>
      </div>
      <div class="pages">
        <router-link v-for="page in footerLinksContent[cat].pages" class="page-link" :to="page.path">
          {{ page.title }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { footerLinksContent } from '@temp/footerLinks.js'

const footerCategories = Object.keys(footerLinksContent);
</script>

<style scoped>
.footer-navigation {
  --border-colour: #ccc;
  border: 1px solid var(--border-colour);
}

.footer-navigation-title {
  font-size: 18px;
  text-align: center;
  padding: 10px 0;
  margin: 0;
  border: none;
}

.categories {
  display: flex;
  border-top: 1px solid var(--border-colour);
}

.category-title {
  padding: 10px;
  flex: 0 0 100px;
  border-right: 1px solid var(--border-colour);
  text-align: right;
  text-transform: capitalize;
}

.pages {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding: 10px;
}
</style>
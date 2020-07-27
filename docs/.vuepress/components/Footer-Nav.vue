<template>
  <div class="footer-navigation">
    <h2 class="footer-navigation-title">Pages</h2>
    <div
      v-for="(cat, i) in footerCategories"
      class="categories"
    >
      <div class="category-title">
        {{cat}}
      </div>
      <div class="pages">
        <a
          v-for="page in footerCategoriesObj[cat]"
          class="page-link"
          :href="page.path"
        >
          {{page.title}}
        </a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    trimmedPageObjs() {
      let trimmedPageObjs = this.$site.pages.map((page) => {
        return {
          categories: page.frontmatter && page.frontmatter.categories,
          title: page.title,
          path: page.path,
        };
      });

      return trimmedPageObjs;
    },
    footerCategoriesObj() {
      const footerCategoriesObj = {};
      this.trimmedPageObjs.forEach((page) => {
        if (page.categories && page.categories.length) {
          page.categories.forEach((cat) => {
            if (footerCategoriesObj[cat]) {
              footerCategoriesObj[cat].push(page);
            } else {
              footerCategoriesObj[cat] = [page];
            }
          });
        }
      });
      return footerCategoriesObj;
    },
    footerCategories() {
      return Object.keys(this.footerCategoriesObj);
    },
  },
};
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
}

.pages {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding: 10px;
}

.page-link {
}
</style>
<template>
  <div class="footer-navigation">
    <h2 class="footer-navigation-title">Wiki Pages</h2>
    <div
      v-for="(cat, i) in footerCategories"
      class="categories"
    >
      <div class="category-title">
        <a
          v-if="footerCategoriesObj[cat] && footerCategoriesObj[cat].path"
          :href="footerCategoriesObj[cat].path"
        >
          {{cat | categoryName}}
        </a>
        <span v-else>
          {{cat | categoryName}}
        </span>
      </div>
      <div class="pages">
        <a
          v-for="page in footerCategoriesObj[cat].pages"
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
  filters: {
    categoryName(name) {
      switch (name) {
        case "Important":
          return "Important Pages";
        default:
          return name;
      }
    },
  },
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
      // we add Important here so it's the first category to show in the footer
      const footerCategoriesObj = { Important: {} };
      this.trimmedPageObjs.forEach((page) => {
        if (page.categories && page.categories.length) {
          page.categories.forEach((cat) => {
            // We don't want to display these categories right now
            if (cat != "Hojo Undo" && cat != "Misc") {
              if (footerCategoriesObj[cat] && footerCategoriesObj[cat].pages) {
                footerCategoriesObj[cat].pages.push(page);
              } else {
                footerCategoriesObj[cat] = { pages: [page] };
              }

              // We don't want these categories to be links
              if (cat != "Important" && cat != "Misc") {
                if (page.path && page.path[page.path.length - 1] == "/") {
                  console.log(page.path[page.path.length - 1]);
                  footerCategoriesObj[cat].path = page.path;
                  console.log(footerCategoriesObj[cat].path);
                }
              }
            }
          });
        }
      });
      console.log(footerCategoriesObj);
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
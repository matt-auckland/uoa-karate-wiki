<template>
  <div>
    <!-- <ul>
      <li v-for="page in sortedPages">
        <b>
          {{page.categories}}
        </b>
        -- {{page.title}}. {{page.path}}.
        </li>
    </ul> -->
    <div v-for="(cat, i) in footerCategories">
      {{footerCategories[i]}}
      <ul>
        <li v-for="page in cat">
          {{page.title}}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    sortedPages() {
      let sortedPages = this.$site.pages.map(page => {
        return {
          categories: page.frontmatter && page.frontmatter.categories,
          title: page.title,
          path: page.path
        };
      });

      return sortedPages;
    },
    footerCategories() {
      const footerCategories = this.sortedPages.reduce((categories, page) => {
        if (page.categories && page.categories.length) {
          page.categories.forEach(cat => {
            console.log(categories);
            if (categories[cat]) {
              categories[cat].push(page);
            } else {
              categories[cat] = [page];
            }
          }, {});
        }
      });
      return footerCategories;
    }
  }
};
</script>
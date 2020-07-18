<template>
  <div class="infobox">
    <div v-for="property in computedInfo">
      <span class="prop-title">{{property.title}}: </span>
      <span v-html="property.data" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      banlist: ["sidebar", "title"]
    };
  },
  computed: {
    computedInfo() {
      const ctrl = this;
      const keys = Object.keys(this.$page.frontmatter);
      let modifiedInfo = keys
        .filter(key => !ctrl.banlist.includes(key))
        .map((key, i) => {
          const computedData = {
            title: key.replace(/\_/g, " "),
            data: this.$page.frontmatter[key]
          };

          if (computedData.title.indexOf(/\d/) > -1) {
            console.log("test");
          }

          return computedData;
        });

      return modifiedInfo;
    }
  }
};
</script>

<style scoped>
.infobox {
  border: 1px solid black;
}
.prop-title {
  text-transform: capitalize;
}
</style>


<template>
  <div class="infobox">
    <div class="title">
      {{ $page.frontmatter.name }}
    </div>
    <div v-for="property in computedInfo">
      <span class="prop-title">{{ property.title }}: </span>
      <span v-html="property.data" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      banlist: [
        "sidebar",
        "title",
        "isDraft",
        "noFooter",
        "categories",
        "name",
        "head"
      ],
    };
  },
  computed: {
    computedInfo() {
      const ctrl = this;
      const keys = Object.keys(this.$page.frontmatter);
      let modifiedInfo = keys
        .filter((key) => !ctrl.banlist.includes(key))
        .map((key, i) => {
          const computedData = {
            title: key.replace(/\_/g, " "),
            data: this.$page.frontmatter[key],
          };

          if (computedData.title.indexOf(/\d/) > -1) {
            // console.log("test");
          }

          return computedData;
        });

      return modifiedInfo;
    },
  },
};
</script>

<style>
.infobox {
  border: 1px solid #a2a9b1;
  border-spacing: 3px;
  /* background-color: #f8f9fa; */
  /* color: black; */
  margin: 0.5em 0 0.5em 1em;
  padding: 0.2em;
  float: right;
  clear: right;
  font-size: 88%;
  line-height: 1.5em;
}

.infobox .title {
  text-align: center;
  font-size: 125%;
  font-weight: bold;
  background-color: #8b0b14;
  margin-bottom: 8px;
}

.infobox .prop-title {
  font-weight: bold;
  text-transform: capitalize;
}

.infobox rt {
  font-size: 80%;
}
</style>

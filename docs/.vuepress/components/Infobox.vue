<template>
  <div class="infobox">
    <div class="title">
      {{ $page.frontmatter.name }}
    </div>
    <div v-for="[key, value] in properties" :key="key">
      <span class="prop-title">{{ key.replaceAll("_", " ") }}: </span>
      <ul v-if="key === 'alternate_names'" class="alternate-names">
        <li v-for="alias in value" :key="alias.name + (alias.kanji || '')">
          {{ alias.name }} <span v-if="alias.kanji" v-html="alias.kanji" />
        </li>
      </ul>
      <span v-else v-html="value" />
    </div>
  </div>
</template>

<script>
const hiddenFields = new Set(["sidebar", "title", "isDraft", "noFooter", "categories", "name", "head"]);

export default {
  computed: {
    properties() {
      return Object.entries(this.$page.frontmatter).filter(([key]) => !hiddenFields.has(key));
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

.infobox .alternate-names {
  margin: 0;
  padding-inline-start: 1.5em;
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

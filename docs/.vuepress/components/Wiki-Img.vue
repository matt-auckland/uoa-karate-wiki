<template>
  <figure
    class="wiki-img"
    :class="{float: float}"
  >
    <a
      :href="src"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        :src="src"
        :alt="caption"
      >
    </a>
    <figcaption v-if="caption">{{caption}}</figcaption>
  </figure>
</template>

<script>
export default {
  props: {
    src: String,
    caption: String,
    float: Boolean,
  },
};
</script>

<style scoped>
.wiki-img {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  inline-size: fit-content;
  max-inline-size: 100%;
  margin-block: 1.5rem;
  margin-inline: auto;
  border: 1px solid var(--vp-c-border-hard, #c0c0c0);
  padding: 0.375rem;
}

.wiki-img > a {
  display: block;
  min-inline-size: 0;
  max-inline-size: 100%;
}

.wiki-img img {
  display: block;
  inline-size: auto;
  max-inline-size: 100%;
  block-size: auto;
  margin-inline: auto;
}

.wiki-img figcaption {
  padding: 0.375rem;
  background-color: var(--vp-c-bg-alt, #f6f6f7);
  color: var(--vp-c-text, #222);
  font-size: 0.875em;
  font-style: italic;
  line-height: 1.4;
  overflow-wrap: anywhere;
  text-align: center;
}

.wiki-img.float {
  float: right;
  max-inline-size: min(100%, 22rem);
  margin-block: 0.5rem 1rem;
  margin-inline: 1.5rem 0;
}

@media (max-width: 959px) {
  .wiki-img.float {
    float: none;
    max-inline-size: 100%;
    margin-block: 1.5rem;
    margin-inline: auto;
  }
}
</style>

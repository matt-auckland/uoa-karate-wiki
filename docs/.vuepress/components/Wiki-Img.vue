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
    <figcaption>{{caption}}</figcaption>
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
  margin-bottom: 50px;
  display: block;
}

.wiki-img,
q figure {
  border: thin #c0c0c0 solid;
  display: flex;
  flex-flow: column;
  padding: 5px;
  max-width: 220px;
  margin: auto;
}

figure.float {
  float: right;
  margin: 10px;
}

img {
  max-width: 400px;
  max-height: 300px;
  max-height: 200px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

figcaption {
  background-color: #222;
  color: #fff;
  font: italic smaller sans-serif;
  padding: 3px;
  text-align: center;
}
</style>


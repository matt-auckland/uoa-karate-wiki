<template>
  <div class="video">
    <iframe
      width="560"
      height="315"
      :src="url"
      frameborder="0"
      allow="autoplay; encrypted-media"
      allowfullscreen
    ></iframe>
  </div>
</template>

<script>
export default {
  props: ["url"]
};
</script>
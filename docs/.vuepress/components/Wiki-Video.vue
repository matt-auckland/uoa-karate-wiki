<template>
  <div class="video">
    <iframe
      width="560"
      height="315"
      :src="processedUrl"
      frameborder="0"
      allowfullscreen
    ></iframe>
  </div>
</template>

<script>
export default {
  props: ["url"],
  computed: {
    processedUrl() {
      /**
        Any of the following URL formats will be properly handled
        https://www.youtu.be/3HGX7L6VIcU
        https://youtube.com/3HGX7L6VIcU
        https://www.youtube.com/watch?v=bB2PVbEQtL8
        http://youtube.com/embed/3HGX7L6VIcU
       */

      const fullYTUrl = /^(http|https):\/\/(www.|)youtu(be.com|.be)\/(?!embed)\(watch\?v=|[az-0-9]+)/;
      const partialYTUrl = /^(http|https):\/\/(www\.)?youtu(be.com|.be)\/(?!embed)(watch\?v=|)/;
      const embedString = "https://youtube.com/embed/";

      let processedUrl = this.url;
      if (fullYTUrl.test(this.url)) {
        processedUrl = this.url.replace(partialYTUrl, embedString);
      }

      return processedUrl;
    },
  },
};
</script>
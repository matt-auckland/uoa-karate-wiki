<template>
  <video v-if="url" :src="url" class="local-vid" controls width="560" height="315" loading="lazy" playsinline />
  <iframe v-else-if="ytUrl" width="560" height="315" loading="lazy" :src="processedUrl" frameborder="0"
          allowfullscreen />
</template>

<script setup>
import { defineProps, computed } from 'vue'

const props = defineProps(["url", "ytUrl"])
const processedUrl = computed(() => {
  /**
   * https://regexr.com/594r0
    Any of the following URL formats will be properly handled
    https://www.youtu.be/3HGX7L6VIcU
    https://youtube.com/3HGX7L6VIcU
    https://youtu.be/YtcRO7zceIg
    https://www.youtube.com/watch?v=bB2PVbEQtL8
    http://youtube.com/embed/3HGX7L6VIcU
  */

  const fullYTUrl = /^(http|https):\/\/(www\.)?youtu(be.com|.be)\/(?!embed)(watch\?v=|[a-z0-9]+)/i;
  const partialYTUrl = /^(http|https):\/\/(www\.)?youtu(be.com|.be)\/(?!embed)(watch\?v=)?/i;
  const embedString = "https://youtube.com/embed/";

  let processedUrl = props.ytUrl;
  if (fullYTUrl.test(props.ytUrl)) {
    processedUrl = props.ytUrl.replace(partialYTUrl, embedString);
  }

  return processedUrl;
})
</script>

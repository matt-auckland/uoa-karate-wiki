<template>
  <div class="wiki-video">
    <div v-if="url || youtube" class="video-player">
      <video v-if="url" :src="url" class="local-vid" controls width="560" height="315" loading="lazy" playsinline />
      <iframe v-else width="560" height="315" loading="lazy" :src="youtube.embed" frameborder="0"
              title="YouTube video player" referrerpolicy="strict-origin-when-cross-origin"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen />
    </div>
    <p v-if="!url && youtube" class="video-link">
      <a :href="youtube.watch" target="_blank" rel="noopener">Watch on YouTube</a>
    </p>
    <p v-else-if="!url && ytUrl">This video link is invalid.</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { youtubeLinks } from '../utils/youtube.mjs'

const props = defineProps(["url", "ytUrl"])
const youtube = computed(() => youtubeLinks(props.ytUrl))
</script>

<style scoped>
.wiki-video {
  max-width: 560px;
  width: 100%;
}

.video-player {
  aspect-ratio: 16 / 9;
  width: 100%;
}

.video-link {
  margin-top: 0.5rem;
}

.wiki-video video,
.wiki-video iframe {
  display: block;
  height: 100%;
  width: 100%;
}
</style>

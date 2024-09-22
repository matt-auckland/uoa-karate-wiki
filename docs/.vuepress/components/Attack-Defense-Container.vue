<template>
  <div class="attack-defense-container">
    <div v-if="label" class="label" :class="[hasVideo && 'no-bottom-border']">{{ label }}</div>
    <div class="container">
      <div class="video-cont">
        <slot name="video"></slot>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { useSlots, defineProps } from 'vue'
const slots = useSlots()
const props = defineProps({ label: String })

const hasSlot = (name) => {
  return
}

const hasVideo = !!slots['video']

</script>

<style scoped>
.attack-defense-container {
  margin: 20px 0;
}

.label {
  padding: 8px 20% 8px 8px;
  font-size: 1.2em;
  margin: 0;
  border: 3px solid;
  border-color: #5f5c5c;
  font-weight: 700;
  display: inline-block;
  border-radius: 8px 50px 0 0;

  &.no-bottom-border {
    border-bottom: none;
  }
}

[data-theme='dark'] {
  .label {
    background: initial;
    /* border: 1px solid #fff; */
  }

  .container {
    /* border: 1px solid #fff; */
    border-right: none;
    border-top: none;
  }

}

.video-cont {
  /* width: 100%; */
  /* background: #000; */
  /* display: flex; */
  /* gap: 10px; */
  /* justify-content: center; */
}


.container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  line-height: 1.7;
}
</style>
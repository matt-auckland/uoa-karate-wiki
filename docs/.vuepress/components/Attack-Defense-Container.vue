<template>
  <div class="attack-defense-container">
    <div v-if="label" class="label">{{label}}</div>
    <div class="container">
      <div class="video-cont">
        <slot name="video"></slot>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: { label:String },
}
</script>

<style scoped>
.attack-defense-container {
  margin: 20px 0;
}

.label {
  padding: 8px 20% 8px 8px;
  font-size: 1.2em;
  margin: 0;
  background: #5f5c5c;
  font-weight: 700;
  display: inline-block;
  border-radius: 8px 50px 0 0;
}

.video-cont {
  width: 100%;
  background: #000;
  display: flex;
  justify-content: center;
}
.video-cont > * {
  margin: 10px 0;
} 

.container {
  line-height: 1.7;
}
</style>
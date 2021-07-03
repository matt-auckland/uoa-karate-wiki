<template>
  <div
    class="attack-defense-component"
    :class="[type === 'attack' ? 'attack' : 'defense']"
  >
    <div class="type">{{type === 'attack' ? 'Attacker' : 'Defender'}}:</div>
    <div class="content">
      <slot></slot>
      <div v-if="note" class="note">{{note}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: { type: String, note: String },
};
</script>

<style scoped>
.type {
  font-weight: bold;
}

.content {
  padding-left: 8px;
}
.content p {
  margin-top: 0;
}

.content p:last-child {
  margin-bottom: 0;
}

.attack-defense-component {
  padding: 8px;
}

.attack-defense-component.attack {
  background: #572222;
}

.attack-defense-component.defense {
  background: #243f5b;
}

.attack-defense-component:first-of-type {
  border-radius: 0;
}

.attack-defense-component:last-of-type {
  border-radius: 0 0 8px 8px;
}

.note {
  margin-top: 10px;
  font-style: italic;
}
</style>
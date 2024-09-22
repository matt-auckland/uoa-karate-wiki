<template>
  <div class="attack-defense-component" :class="[type === 'attack' ? 'attack' : 'defense']">
    <div class="type">{{ type === 'attack' ? 'Attacker' : 'Defender' }}:</div>
    <div class="content">
      <slot></slot>
      <div v-if="note" class="note">{{ note }}</div>
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

  p {
    margin-top: 0;

    &:last-child {
      margin-bottom: 0;
    }
  }
}

.attack-defense-component {
  --border-rad: 8px;
  padding: 8px;
  border: 4px dashed;

  &.attack {
    border-color: var(--persian-red);
  }

  &.defense {
    border-color: #538fcf;
  }

  :is(.attack, .defence):first-of-type {
    border-radius: var(--border-rad) var(--border-rad) 0 0;
  }

  &:last-of-type {
    border-radius: 0 0 var(--border-rad) var(--border-rad);
  }
}

[data-theme='dark'] {}

.note {
  margin-top: 10px;
  font-style: italic;
}
</style>
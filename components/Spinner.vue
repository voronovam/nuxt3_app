<template lang="pug">
.spinner(:class="props.look ? `_${props.look}` : ''")
</template>

<script setup lang="ts">
type Props = {
  look?: string
}

const props = defineProps<Props>()
</script>

<style lang="scss">
.spinner {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin: auto;
  position: relative;
  color: var(--color-dark);
  box-sizing: border-box;
  animation: animloader 1s linear infinite alternate;

  &._accent {
    color: var(--done-color);
  }
}

@keyframes animloader {
  0% {
    box-shadow: -38px -6px, -14px 6px,  14px -6px;
  }
  33% {
    box-shadow: -38px 6px, -14px -6px,  14px 6px;
  }
  66% {
    box-shadow: -38px -6px, -14px 6px, 14px -6px;
  }
  100% {
    box-shadow: -38px 6px, -14px -6px, 14px 6px;
  }
}
</style>

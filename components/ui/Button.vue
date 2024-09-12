<template lang="pug">
button.ui-button(
  @click="$emit('click', $event)"
)
  slot

</template>

<style lang="scss">
.ui-button {
  border-radius: 2px;
  color: var(--color-dark);
  background-color: var(color-light);
  padding: 4px 8px;
  transition: box-shadow .2s ease;
  outline: none;

  &:hover,
  &:focus-visible {
    box-shadow: 5px 5px 0 -2px var(--color-dark)
  }
}
</style>

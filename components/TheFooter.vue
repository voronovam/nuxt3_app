<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<template lang="pug">
.the-footer
  .container
    .the-footer__body
      .the-footer__year 2013 - {{ currentYear}}

      a.the-footer__vk-link(
        :href="`https://vk.com/soundost`"
        target="_blank"
        title="VK Community"
      )
        UiIcon(name="vk" :size="42")

</template>

<style lang="scss">
.the-footer {
  padding: 24px 0;
  font-family: monospace;

  &__body {
    display: flex;
    justify-content: space-between;
  }

  &__vk-link {
    transition: all .2s ease;

    &:hover,
    &:focus-visible {
      color: var(--color-accent-1);
    }
  }
}
</style>

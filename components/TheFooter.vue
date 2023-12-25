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
      ) soundOST

</template>

<style lang="sass">
.the-footer
  background-color: $color-dark
  padding: 24px 0

  &__body
    display: flex
    justify-content: space-between

  &__vk-link
    transition: $transition-base

    &:hover,
    &:focus-visible
      color: $color-accent

</style>

<script setup lang="ts">

</script>

<template lang="pug">
.the-menu
  .container
    .the-menu__body
      nuxt-link(
        to="/"
      )
        TheLogo.the-menu__home-logo

      nuxt-link(
        to="/"
      ) sign up


</template>

<style lang="sass">
.the-menu
  padding: 16px 0
  margin-bottom: 24px
  background-color: $color-default
  box-shadow: 0 2px 4px 0 $color-dark

  &__body
    display: flex
    justify-content: space-between
    align-items: flex-end


  &__home-logo
    width: 140px
    &:hover, &:focus-visible
      color: $color-accent

</style>

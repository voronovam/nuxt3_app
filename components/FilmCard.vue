<template lang="pug">
nuxt-link.film-card(
  :to="`/film/${film.id}`"
)
  .film-card__poster
    img.film-card__poster-img(
      v-if="film.poster && film.poster !== 'N/A'"
      :src="film.poster"
      :alt="film.title"
      draggable="false"
    )

  .film-card__info
    h3.film-card__title {{film.title}}
    .film-card__year {{film.year}}

</template>

<script setup lang="ts">

export interface FilmCard {
  id: string;
  title: string;
  poster: string;
  year: string;
}

defineProps<{
  film: FilmCard;
}>();


</script>

<style lang="sass">
.film-card
  border-radius: 2px
  border: 2px solid var(--color-dark)
  outline: none
  transition: box-shadow .2s ease
  &:hover,
  &:focus-visible
    box-shadow: 6px 6px 0 -2px var(--color-dark)

  &__poster
    text-align: center
    height: 180px
    &:empty
      background-color: var(--color-accent)

  &__poster-img
    max-width: 100%
    max-height: 100%
    background-color: var(--color-accent)

  &__info
    padding: 8px

  &__title
    font-size: 14px
    @include textClamp2

  &__year
    font-size: 12px
    color: var(--color-accent-1)

</style>

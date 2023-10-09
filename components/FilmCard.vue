<template lang="pug">
.film-card
  nuxt-link(
    :to="`/film/${film.id}`"
  )
    .film-card__poster
      img(
        v-if="film.poster"
        :src="film.poster"
        :alt="film.title"
        draggable="false"
      )

    h3 {{film.title}}
    div {{film.year}}

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
  &__poster
    & > img
      max-width: 100%

</style>

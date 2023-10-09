<template lang="pug">
.film-page.container
  nuxt-link.film-page__go-back(
    to="/"
  )
    | ⇽ Go Back

  article.film-page__article(
    v-if="filmData"
  )
    .film-page__poster
      img(
        v-if="filmData.poster"
        :src="filmData.poster"
        :alt="filmData.title"
        draggable="false"
      )

    .film-page__info
      h1.film-page__headline
        | {{filmData.title}}

      .film-page__info-item
        span Year:
        | {{filmData.year}}

      .film-page__info-item
        span Released:
        | {{ filmData.released }}

      .film-page__info-item
        span Runtime:
        | {{ filmData.runtime }}

      .film-page__info-item
        span Genre:
        | {{ filmData.genre }}

      .film-page__info-item
        span Director:
        | {{ filmData.director }}

      .film-page__info-item
        span Writer:
        | {{ filmData.writer }}

      .film-page__info-item
        span Actors:
        | {{ filmData.actors }}

      .film-page__info-item
        span Country:
        | {{ filmData.country }}

      .film-page__info-item
        span Awards:
        | {{ filmData.awards }}

      .film-page__info-item
        span Plot:
        | {{ filmData.plot }}

</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
const route = useRoute();

let pageTitle = ref('');

const { data: filmData, error } = useLazyAsyncData(async () => {
  try {
    const url = `${import.meta.env.VITE_OMDB_API_URL}/?i=${route.params.id}&apikey=${import.meta.env.VITE_OMDB_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    return {
      id: data.imdbID,
      title: data.Title,
      poster: data.Poster,
      year: data.Year,
      released: data.Released,
      runtime: data.Runtime,
      genre: data.Genre,
      director: data.Director,
      writer: data.Writer,
      actors: data.Actors,
      country: data.Country,
      awards: data.Awards,
      plot: data.Plot,
    };
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
});

console.log('filmData->', filmData)

useHead({
  titleTemplate: `${ filmData.value?.title } | SoundOST`
})
</script>

<style lang="sass">
.film-page
  &__go-back
    color: $color-accent

  &__content
    min-width: 320px
    max-width: $container-max-width
    margin: 0 auto

  &__article
    display: flex

  &__headline
    margin-bottom: 16px

  &__info
    padding-left: 20px

  &__info-item
    display: flex
    margin-top: 4px

    & span
      flex-shrink: 0
      font-weight: 700
      width: 120px

</style>

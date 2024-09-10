<script setup lang="ts">
import type { FilmModel } from '~/models/FilmModel';
const { id } = useRoute().params;
console.log('id ->', id) //TODO remove
const url = `${import.meta.env.VITE_OMDB_API_URL}/?i=${id}&apikey=${import.meta.env.VITE_OMDB_API_KEY}`;
const pageTitle = ref('');

const { data: filmData, error } = useLazyAsyncData<FilmModel>(async () => {
  try {
    const { data } = await useFetch(url, { key: id });

    //TODO create type
    const film: FilmModel = {
      id: data.value.imdbID,
      title: data.value.Title,
      poster: data.value.Poster,
      year: data.value.Year,
      released: data.value.Released,
      runtime: data.value.Runtime,
      genre: data.value.Genre,
      director: data.value.Director,
      writer: data.value.Writer,
      actors: data.value.Actors,
      country: data.value.Country,
      plot: data.value.Plot,
    };
    pageTitle.value = `${film.title} | SoundOST`;
    return film;

  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
});


pageTitle.value = filmData && filmData.value && filmData.value.title ? `${filmData.value.title} | ` : '';

useHead({
  title: `${pageTitle.value} SoundOST`
});


</script>

<template lang="pug">
.film-page.container
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
        span Plot:
        | {{ filmData.plot }}

</template>

<style lang="sass">
.film-page
  &__go-back
    display: inline-block
    color: $color-accent
    margin-top: 16px
    margin-bottom: 24px

  &__article
    display: flex
    grid-gap: 16px

  &__headline
    margin-bottom: 16px

  &__info
    max-width: 600px

  &__info-item
    display: grid
    grid-template-columns: 84px 1fr
    grid-gap: 8px
    margin-top: 4px

</style>

<template lang="pug">
main.start-page.container
  form(
    @submit.prevent="searchData"
  )
    input(
      v-model="value"
      placeholder="search"
      type="search"
      autocomplete
    )

    button(
      type="submit"
    )
      | Find

  div(
    v-if="moviesData && responseData === responseStatus.success"
  )
    .start-page__list
      FilmCard(
        v-for="movie in moviesData"
        :key="movie.id"
        :film="movie"
      )

    p total results {{ totalResults }}

    button.start-page__more-btn(
      v-if="moviesData"
      type="button"
      @click="getMoreData"
    ) load more

  EmptyResults(
    v-if="responseData === responseStatus.fail"
    :message="apiMessage"
  )

</template>

<script setup lang="ts">
import { ref } from 'vue';

useHead({
  titleTemplate: 'Home | SoundOST'
})

let value = ref('');
let totalResults = ref('');
let apiMessage = ref('');

enum responseStatus {
  success = 'True',
  fail = 'False',
}
interface ResponseData {
  status: responseStatus;
}
const responseData = ref<ResponseData | null>(null);

export interface FilmCard {
  id: string;
  title: string;
  poster: string;
  year: string;
}
const moviesData = ref<FilmCard[] | null>(null);

async function searchData() {
  try {
    const url = `${import.meta.env.VITE_OMDB_API_URL}/?s=${value.value}&apikey=${import.meta.env.VITE_OMDB_API_KEY}`
    const { data: apiData } = await useFetch(url);

    moviesData.value = apiData.value?.Search?.map((movie: any) => ({
      id: movie.imdbID,
      title: movie.Title,
      poster: movie.Poster,
      year: movie.Year,
    }));
    totalResults.value = apiData.value?.totalResults;
    responseData.value = apiData.value?.Response;
    apiMessage.value = apiData.value?.Error;

  } catch (error) {
    console.info('Error:', error);
  }
}

const currentPage = ref(1);
async function getMoreData() {
  try {
    currentPage.value++;

    const url = `${import.meta.env.VITE_OMDB_API_URL}/?s=${value.value}&apikey=${import.meta.env.VITE_OMDB_API_KEY}&page=${currentPage.value}`;
    const { data: apiData } = await useFetch(url);

    const newMovies = apiData.value?.Search?.map((movie: any) => ({
      id: movie.imdbID,
      title: movie.Title,
      poster: movie.Poster,
      year: movie.Year,
    }));

    moviesData.value = moviesData.value?.concat(newMovies);
    totalResults = apiData.value?.totalResults;
    responseData.value = apiData.value?.Response;
    apiMessage.value = apiData.value?.Error;

  } catch (error) {
    console.info('Error:', error);
  }
}

</script>

<style lang="sass">
.start-page
  &__list
    display: grid
    grid-template-columns: repeat(2, 1fr)
    grid-gap: 16px

    @media (min-width: $tablet-portrait)
      grid-template-columns: repeat(5, 1fr)

    @media (min-width: $tablet-landscape)
      grid-template-columns: repeat(6, 1fr)

    @media (min-width: $desktop)
      grid-template-columns: repeat(9, 1fr)

  &__more-btn
    margin-top: 24px

</style>

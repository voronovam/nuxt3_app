<script setup lang="ts">
import type { FilmCardModel } from '~/models/FilmCardModel';
import { useSearchValue } from '~/composables/useSearchValue';

useHead({
  title: 'SoundOST'
})

const { searchValue } = useSearchValue();

let totalResults = ref('');
let apiMessage = ref('');
const router = useRouter()
const isLoading = ref(false)
enum responseStatus {
  success = 'True',
  fail = 'False',
}

interface ResponseData {
  status: responseStatus;
}
const responseData = ref<ResponseData | null>(null);
const moviesData = ref<FilmCardModel[] | null>(null);

onMounted(async () => {
  await searchData()
})

async function searchData() {
  try {
    isLoading.value = true
    const url = `${import.meta.env.VITE_OMDB_API_URL}/?s=${searchValue.value}&apikey=${import.meta.env.VITE_OMDB_API_KEY}`
    isLoading.value = false
    const { data: apiData } = await useFetch(url);

    moviesData.value = apiData.value?.Search?.map(movie => ({
      id: movie.imdbID,
      title: movie.Title,
      poster: movie.Poster,
      year: movie.Year,
    }));

    totalResults.value = apiData.value?.totalResults;
    responseData.value = apiData.value?.Response;
    apiMessage.value = apiData.value?.Error;

    if (moviesData.value) {
      const currentRoute = router.currentRoute.value.path;
      const newRoute = `${currentRoute}?search=${searchValue.value}`;
      await router.push(newRoute);
    }

  } catch (error) {
    console.error('Error:', error);
  }
}

const currentPage = ref(1);
async function getMoreData() {
  try {
    currentPage.value++;

    const url = `${import.meta.env.VITE_OMDB_API_URL}/?s=${searchValue.value}&apikey=${import.meta.env.VITE_OMDB_API_KEY}&page=${currentPage.value}`;
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
    console.error('Error:', error);
  }
}

</script>

<template lang="pug">
.start-page
  .container
    TheSearchForm.start-page__form(
      v-model="searchValue"
      @search-data="searchData"
    )

    Spinner(v-if="isLoading")

    template(v-else)
      template(
        v-if="moviesData && responseData === responseStatus.success"
      )
        .start-page__list
          FilmCard(
            v-for="movie in moviesData"
            :key="movie.id"
            :film="movie"
          )

        //.start-page__search-results total results {{ totalResults }}

        UiButton.start-page__more-btn(
          v-if="moviesData"
          type="button"
          @click="getMoreData"
        ) load more

      EmptyResults(
        v-if="responseData === responseStatus.fail"
        :message="apiMessage"
      )

</template>

<style lang="sass">
.start-page
  &__form
    margin-top: 16px
    margin-bottom: 24px

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
    margin-bottom: 24px

  &__search-results
    font-size: 14px
    margin-top: 16px

</style>

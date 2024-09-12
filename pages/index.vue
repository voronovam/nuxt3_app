<script setup lang="ts">
import { useSearchValue } from '~/composables/useSearchValue';
import { useGetSearchData } from '~/composables/useGetSearchData';

export interface FilmCardModel {
  id: string;
  title: string;
  poster: string;
  year: string;
}

const currentPage = ref(1);
//const router = useRouter();
const moviesData = ref<FilmCardModel[] | null>(null);

const { searchValue } = useSearchValue();

const { data, responseStatus, totalResults, error, isLoading, fetchSearchData } = useGetSearchData();

async function searchData() {
  try {
    currentPage.value = 1;

    await fetchSearchData(searchValue.value);

    if (data.value) {
      moviesData.value = data.value.map((movie) => ({
        id: movie.imdbID || '',
        title: movie.Title || '',
        poster: movie.Poster || '',
        year: movie.Year || '',
      }));
    }
  } catch (err) {
    console.log(error.value);
  }
}

const getMoreData = async () => {
  try {
    currentPage.value++;
    await fetchSearchData(searchValue.value, currentPage.value);

    if (data.value) {
      const newMovies = data.value.map((movie) => ({
        id: movie.imdbID || '',
        title: movie.Title || '',
        poster: movie.Poster || '',
        year: movie.Year || '',
      }));

      const uniqueMovies = newMovies.filter(
        (newMovie) => !moviesData.value.some((existingMovie) => existingMovie.id === newMovie.id)
      );

      moviesData.value = [...moviesData.value, ...uniqueMovies];
    }
  } catch (err) {
    console.error('Error get more data:', err);
  }
};

const isShowMoreBtn = computed(() => {
  return moviesData.value.length < totalResults.value && !isLoading.value;
});

useHead({
  title: 'Search'
})

</script>

<template lang="pug">
.start-page
  .container
    TheSearchForm.start-page__form(
      v-model="searchValue"
      @search-data="searchData"
    )

    Spinner(v-if="isLoading")

    EmptyResults(
      v-if="error"
      :message="error"
    )

    template(v-else)
      template(
        v-if="moviesData && responseStatus === 'True'"
      )
        .start-page__list
          FilmCard(
            v-for="movie in moviesData"
            :key="movie.id"
            :film="movie"
          )

        .start-page__search-results total results: {{ totalResults }}

        UiButton.start-page__more-btn(
          v-if="isShowMoreBtn"
          type="button"
          @click="getMoreData"
        ) load more

</template>

<style lang="scss">
.start-page {
  &__form {
    margin-top: 16px;
    margin-bottom: 24px;
  }

  &__list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 16px;

    @include mobile-landscape {
      grid-template-columns: repeat(4, 1fr);
    }

    @include tablet {
      grid-template-columns: repeat(5, 1fr);
    }

    @include tablet-landscape {
      grid-template-columns: repeat(6, 1fr);
    }

    @include desktop {
      grid-template-columns: repeat(9, 1fr);
    }
  }

  &__more-btn {
    margin-top: 24px;
    margin-bottom: 24px;
  }

  &__search-results {
    font-size: 14px;
    margin-top: 16px;
  }
}
</style>

<script setup lang="ts">
import { useSearchStore } from '~/stores/movieSearch';
const searchStore = useSearchStore();

const searchValue = ref('');

const searchData = async () => {
  if (searchValue.value.trim()) {
    searchStore.setSearchTerm(searchValue.value);
  } else {
    console.error('Search term is empty.');
  }
};

const loadMoreMovies = () => {
  if (searchStore.searchTerm) {
    searchStore.loadMoreData();
  } else {
    console.error('Search term is empty, cannot load more movies.');
  }
};

useHead({
  title: 'Search'
})
</script>

<template lang="pug">
.start-page
  .container
    TheSearchForm.start-page__form(
      @search-data="searchStore.fetchSearchData(searchStore.searchTerm)"
    )

    Spinner(v-if="searchStore.isLoading")

    EmptyResults(
      v-if="searchStore.error"
      :message="searchStore.error"
    )

    template(v-else)
      template(
        v-if="searchStore.getMoviesData && searchStore.responseStatus === 'True'"
      )
        .start-page__list
          FilmCard(
            v-for="movie in searchStore.getMoviesData"
            :key="movie.id"
            :film="movie"
          )

        .start-page__search-results total results: {{ searchStore.totalResults }}

        UiButton.start-page__more-btn(
          v-if="searchStore.isShowMoreBtn"
          type="button"
          @click="loadMoreMovies" :disabled="!searchStore.isShowMoreBtn"
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

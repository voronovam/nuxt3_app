<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useMovieItem } from '@/stores/movieItem';

const route = useRoute();
const movieItemStore = useMovieItem();

onMounted(() => {
  const id = route.params.id;

  if (typeof id === 'string' && id) {
    movieItemStore.getMovie(id);
  }
});

watch(
  () => movieItemStore.title,
  (newTitle) => {
    document.title = `${newTitle || 'Movie'} | soundOST`;
  },
  { immediate: true }
);
</script>

<template lang="pug">
.film-page
  .container
    Spinner(v-if="movieItemStore.isLoading")

    article.film-page__article(v-else-if="movieItemStore.data")
      .film-page__poster
        img(
          v-if="movieItemStore.poster"
          :src="movieItemStore.poster"
          :alt="movieItemStore.title"
          draggable="false"
        )

      .film-page__info
        h1.film-page__headline
          | {{ movieItemStore.title }}

        .film-page__info-item
          span Year:
          | {{ movieItemStore.year }}

        .film-page__info-item
          span Released:
          | {{ movieItemStore.released }}

        .film-page__info-item
          span Runtime:
          | {{ movieItemStore.runtime }}

        .film-page__info-item
          span Genre:
          | {{ movieItemStore.genre }}

        .film-page__info-item
          span Director:
          | {{ movieItemStore.director }}

        .film-page__info-item
          span Writer:
          | {{ movieItemStore.writer }}

        .film-page__info-item
          span Actors:
          | {{ movieItemStore.actors }}

        .film-page__info-item
          span Country:
          | {{ movieItemStore.country }}

        .film-page__info-item
          span Plot:
          | {{ movieItemStore.plot }}

    EmptyResults(v-else) {{ movieItemStore.error }}
</template>


<style lang="scss">
.film-page {
  &__go-back {
    display: inline-block;
    color: var(--color-accent);
    margin-top: 16px;
    margin-bottom: 24px;
  }

  &__article {
    display: flex;
    grid-gap: 16px;
  }

  &__headline {
    margin-bottom: 16px;
  }

  &__info {
    max-width: 600px;
  }

  &__info-item {
    display: grid;
    grid-template-columns: 100px 1fr;
    grid-gap: 8px;
    margin-top: 4px;
  }
}
</style>

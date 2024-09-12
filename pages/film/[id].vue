<script setup lang="ts">
import { useGetFilmData } from '~/composables/useGetFilmData';

const { id } = useRoute().params;
const { filmData, error, isLoading, fetchFilmData } = useGetFilmData();

fetchFilmData(id as string);

watch(filmData, (newFilmData) => {
  if (newFilmData && newFilmData.title) {
    useHead({
      title: newFilmData.title,
    });
  } else {
    useHead({
      title: 'Movie',
    });
  }
}, { immediate: true });

</script>

<template lang="pug">
.film-page
  .container
    Spinner(v-if="isLoading")

    article.film-page__article(
      v-else-if="filmData"
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


    EmptyResults(v-else) {{error}}
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

<script setup lang="ts">
import { useSearchStore } from '@/stores/movieSearch';
const searchStore = useSearchStore();

const startVoiceSearch = () => {
  searchStore.startVoiceSearch();
};

const handleInput = (event: Event) => {
  searchStore.searchTerm = (event.target as HTMLInputElement).value;
  searchStore.searchQuery = '';
};
</script>

<template lang="pug">
.the-search-form
  form.the-search-form__form(
    @submit.prevent="searchStore.fetchSearchData(searchStore.searchTerm)"
  )
    label
      input.the-search-form__input(
        v-model="searchStore.searchTerm"
        @input="handleInput"
        placeholder="find a movie"
        type="search"
        name="search"
        autocomplete="search"
      )

    UiButton search

  .the-search-form__voice-search
    UiButton(
      title="voice search"
      @click="startVoiceSearch"
    ) 🎤

    small(v-if="searchStore.searchQuery") {{ searchStore.searchQuery }}
</template>

<style lang="scss">
.the-search-form {
  display: flex;
  flex-direction: column;
  grid-gap: var(--gap);
  align-items: flex-start;

  &__form {
    display: flex;
    grid-gap: var(--gap);
  }

  &__input {
    border-radius: 2px;
    border: 2px solid var(--color-dark);
    padding: 4px 8px;
    outline: none;

    &:focus-visible {
      box-shadow: 5px 5px 0 -2px var(--color-dark);
    }
  }

  &__voice-search {
    display: flex;
    align-items: center;
    grid-gap: var(--gap);
  }
}
</style>

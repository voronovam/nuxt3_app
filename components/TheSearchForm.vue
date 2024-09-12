<script setup lang="ts">
defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue', 'searchData']);
</script>

<template lang="pug">
form.the-search-form(
  @submit.prevent="emit('searchData')"
)
  label
    input.the-search-form__input(
      @input="emit('update:modelValue', $event.target.value)"
      placeholder="find a movie"
      type="search"
      name="search"
      autocomplete="search"
    )

  UiButton search

</template>

<style lang="scss">
.the-search-form {
  display: flex;
  grid-gap: var(--gap);

  &__input {
    border-radius: 2px;
    border: 2px solid var(--color-dark);
    padding: 4px 8px;
    outline: none;

    &:focus-visible {
      box-shadow: 5px 5px 0 -2px var(--color-dark);
    }
  }
}
</style>

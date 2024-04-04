<script setup lang="ts">
defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue', 'searchData']);
</script>

<template lang="pug">
form(
  @submit.prevent="emit('searchData')"
)
  label
    input(
      @input="emit('update:modelValue', $event.target.value)"
      placeholder="search"
      type="search"
      name="search"
      autocomplete="search"
    )

  button(
    type="submit"
  )
    | search

</template>

<script setup lang="ts">
defineProps(['modelValue'])
defineEmits(['update:modelValue'])
</script>

<template lang="pug">
form(
  @submit.prevent="$emit('searchData')"
)
  label
    input(
      @input="$emit('update:modelValue', $event.target.value)"
      placeholder="search"
      type="search"
      autocomplete
    )

  button(
    type="submit"
  )
    | Find
</template>

<style lang="sass">

</style>
